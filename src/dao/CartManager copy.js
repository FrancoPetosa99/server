/********************************************/
//IMPORT MODULES
/********************************************/
import fs from 'fs';

/********************************************/
//CART MANAGER CLASS
/********************************************/
class CartManager{

    constructor(){
        this.path = './carts.json';
    }

    async addCart(){
        
        const errorLog = [];

        //fetch already created carts
        const carts = await this.getCarts();

        //create new cart obj
        const newCart = {};
        newCart.id = this.getAvailableID(carts);
        newCart.products = [];

        carts.push(newCart);

        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        
        return newCart.id;

    }

    async addProductToCart(productId, cartId){

        const carts = await this.getCarts();

        if(carts.length == 0) throw new Error('No carts avaiable');
        const cart = carts.find(cart => cart.id == cartId);

        if(!cart) throw new Error(`Could not found cart with id ${id}`);

        const productInCart = cart.products.find(product => product.id == productId);

        if(productInCart){
            //the product is already in cart, so add one unit
            productInCart.quantity++;

        }else{
            //the product is not in cart and have to add it
            const productObj = {};
            productObj.id = productId;
            productObj.quantity = 1;

            cart.products.push(productObj);
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts));
    }

    async getCarts(){
        if(fs.existsSync(this.path)){
            const readFileRes = await fs.promises.readFile(this.path);
            return JSON.parse(readFileRes);
        }else{
            console.log(`no se encuentra el file ${this.path}`);
            return [];
        }
    }

    async getCartProductsById(id){

        const carts = await this.getCarts();

        if(carts.length == 0) throw new Error('No carts avaiable');
        const cart = carts.find(cart => cart.id == id);

        if(!cart) throw new Error(`Could not found cart with id ${id}`);
        return cart.products;
    }

    getAvailableID(cartsArr){
        let availableID = 1;

        let idFound = false;

        if(cartsArr.length > 0){
            while (!idFound) {
                idFound = cartsArr.some(cart => cart.id == availableID)
                if(idFound) availableID++;
            }
        }

        return availableID;
    }
    
}

const cartManager = new CartManager(); //INITIALIZE THE CART MANAGER

export default cartManager;



