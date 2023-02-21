import cartManager from "../dao/CartManager.js";
import productManager from "../dao/ProductManager.js";

class CartService{

    constructor(){}

    async getCarts(limit = 50){

        const carts = await cartManager.getAll();

        const limitedCartList = carts.slice(0, limit);
    
        return limitedCartList;
    }

    async createNewCart(){

        // const productId = productObj.id;

        // if(!productId) throw new Error(`The product id is missing`);

        // const isValidProductId = this.verifyHexaNumber(productId);

        // if(!isValidProductId) throw new Error(`The product id ${productId} is not valid. Must be hexadecimal number with 24 characters`);

        // const product = await productManager.getById(productId);

        // if(!product) throw new Error(`The product id ${productId} does not exist`);

        const newCart = await cartManager.create();

        return newCart;
    }
    
    async getCartById(id){

        const isValidId = this.verifyHexaNumber(id);

        if(!isValidId) throw new Error(`The id ${id} is not valid. Must be an hexadecimal number of 24 characters`);

        const cart = await cartManager.getById(id);

        if(!cart) throw new Error(`The cart with id ${id} could not be found`);

        return cart;

    }

    async addProduct(cartId, productId){

        const cartObj = await this.getCartById(cartId);

        const productsArr = cartObj.products;
        
        const product = productsArr.find(product => product.id == productId);

        if(product) {

            product.amount++;

        }else {

            const newProduct = {};

            newProduct.id = productId;
            newProduct.amount = 1;

            productsArr.push(newProduct);
        }

        const updatedCart = await cartManager.updateCartProducts(cartId, productsArr);

        return updatedCart;
    }

    async removeProduct(cartId, productId){

        const cartObj = await this.getCartById(cartId);

        const product = cartObj.products.find(product => product.id == productId);

        if(!product) throw new Error(`product with id ${product.id} could not be found on cart with id ${cartId}`);

        const productExist = await productManager.checkProductExist(productId);

        if(!productExist) throw new Error(`product with id ${product.product} could not be found on data base`);

        
        const newProductsArr = cartObj.products.filter(product => product.id != productId);

        await cartManager.deleteProductFromCart(cartId, newProductsArr);
    }

    async deleteCart(id){

        const product = await this.getCartById(id);

        if(!product) throw new Error(`The product with id ${id} could not be found`);

        await productManager.deleteById(id);
    }

    async emptyCart(id){

        const isValidId = this.verifyHexaNumber(id);

        if(!isValidId) throw new Error(`The id ${id} is not valid. Must be an hexadecimal number of 24 characters`);

        const cartExist = await cartManager.checkCartExist(id);

        if(!cartExist) throw new Error(`The cart id ${id} could not be found`);

        const updateObj = {};
        updateObj.products = [];

        const cartObj = await cartManager.updateById(id, updateObj);

        return cartObj;
        
    }

    async updateCartContent(cartId, productsArr){

        const isValidId = this.verifyHexaNumber(cartId);
        
        if(!isValidId) throw new Error(`The id ${cartId} is not valid. Must be an hexadecimal number of 24 characters`);
        
        const cartExist = await cartManager.checkCartExist(cartId);
        
        if(!cartExist) throw new Error(`The cart id ${cartId} could not be found`);

        const errorLog = [];

        //check all products exist on the data base
        await Promise.all(productsArr.map((product) => {

            const id = product.id;

            return productManager.checkProductExist(id)
            .then(productExist => {
                if(!productExist) errorLog.push(`The product with id ${id} could not be found`);
            });
        }));

        if(errorLog.length > 0) throw new Error(errorLog.join(' ;'));

        const mapedProductsArr = productsArr.map(({ id, amount }) => {
            const objMaped = {};
            objMaped.id = id;
            objMaped.amount = amount;
            return objMaped;
        });

        await cartManager.updateCartProducts(cartId, mapedProductsArr);
    }

    async updateProductInCart(cartId, productId, newAmount){

        if(typeof newAmount != 'number') throw new Error(`The amount must be number type`);

        if(!newAmount) throw new Error(`The amount is missing`);

        const cart = await this.getCartById(cartId);

        const productsArr = cart.products;

        const product = productsArr.find(product => product.id == productId);

        if(!product) throw new Error(`The product with id ${productId} is not added to the cart`);

        product.amount = newAmount;

        await cartManager.updateCartProducts(cartId, productsArr);

    }

    async calculateTotal(cartId){

        let total = 0;

        const cart = await cartManager.getById(cartId);

        const products = cart.products;

        for (let i = 0; i < products.length; i++) {
            total += products[i].price * products[i].amount;
        }

        return total;
    }

    verifyHexaNumber(hexaNumber){

        let isNumberValid = true;

        const maxLength = 24;

        //list of valid characters in hexadecimal number system
        const hexaCharacters = [
            '0','1','2','3','4','5','6','7','8','9',
            'a','b','c','d','e','f'
        ];

        try{
            //verify if the number has hexadecimal characters only
            for (let i = 0; i < hexaNumber.length; i++) {
                const isCharacterValid = hexaCharacters.includes(hexaNumber[i]);
                if(!isCharacterValid) throw new Error(`The character ${hexaNumber[i]} is not valid`);
            }

            //verify the hexadecimal number has 24 characters only
            if(hexaNumber.length !== maxLength) throw new Error(`hexadecimal number does not have 24 characters`);

        }catch(error){
            isNumberValid = false;
        }finally{
            return isNumberValid;
        }
    }
}


const cartService = new CartService();

export default cartService;