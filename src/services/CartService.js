import cartManager from "../dao/CartManager.js";
import productManager from "../dao/ProductManager.js";

class CartService{

    constructor(){}

    async getCarts(limit = 50){

        const carts = await cartManager.getAll();

        const limitedCartList = carts.slice(0, limit);
    
        return limitedCartList;
    }

    async createNewCart(productObj){

        const productId = productObj.id;

        if(!productId) throw new Error(`The product id is missing`);

        const isValidProductId = this.verifyHexaNumber(productId);

        if(!isValidProductId) throw new Error(`The product id ${productId} is not valid. Must be hexadecimal number with 24 characters`);

        const product = await productManager.getById(productId);

        if(!product) throw new Error(`The product id ${productId} does not exist`);

        const newCart = await cartManager.create(productObj);

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

        const product = cartObj.products.find(product => product.product == productId);

        if(product) {

            product.amount++;

        }else {

            const newCartItem = {};

            newCartItem.product = productId;
            newCartItem.amount = 1;

            cartObj.products.push(newCartItem);
        }

        const updatedCart = await cartManager.updateById(cartId, cartObj);

        return updatedCart;
        
    }

    async removeProduct(cartId, productId){

        const cartObj = await this.getCartById(cartId);

        const product = cartObj.products.find(product => product.product == productId);

        if(!product) throw new Error(`product with id ${product.product} could not be found on cart with id ${cartId}`);

        const productExist = await productManager.checkProductExist(productId);

        if(!productExist) throw new Error(`product with id ${product.product} could not be found on data base`);

        product.amount = product.amount - 1;

        if(product.amount == 0){
            cartObj.products = cartObj.products.filter(product => product.product != productId);
        }

        await cartManager.updateById(cartId, cartObj);

    }

    async deleteCart(id){

        const product = await this.getCartById(id);

        if(!product) throw new Error(`The product with id ${id} could not be found`);

        await productManager.deleteById(id);
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