import { cartDB, productDB } from "../dao/index.js";
import CustomError from "../util/customError.js";

class CartService{

    constructor(){}

    async createNewCart(){
        const newCart = await cartDB.create();
        return newCart;
    }
    
    async getCartById(id){
        const cart = await cartDB.getById(id);

        if(!cart) throw new CustomError(404, `The cart with id ${id} could not be found`);
        return cart;
    }

    async addProduct(cartId, productId, user){
        const userEmail = user.email;

        //get products on cart
        const cart = await this.getCartById(cartId);
        const products = cart.products;

        //check if product is already on cart
        const productInsideCart = products.find(product => product.product.id == productId);
        
        //if product is already on cart add 1 unit to the current amount
        if(productInsideCart) {
            productInsideCart.amount++;
            await cartDB.addProduct(cartId, productInsideCart);

        }else {
            //must check if product belongs to current user
            const product = await productDB.getById(productId);
            const productOwner = product.owner;
            if(productOwner && userEmail === productOwner) throw new CustomError(403, 'Client can not add owned products on cart');
            await cartDB.insertNewProduct(cartId, productId);
        }
    }

    async purchase(cartId){
        const errorLog = [];
        const purchasedList = [];

        //get cart from db
        const cart = await cartDB.getById(cartId);
        
        //check there are products in cart
        if(cart.products.length == 0) throw new CustomError(400, 'Cart is empty');

        //collect products with enough stock to complete purchase process
        const availableProducts = cart.products.filter(product => product.product.stock >= product.amount);
        
        //update stock of products. If an error occurs on one product process still runs
        await Promise.all(availableProducts.map(product => {
            const { title, price, code, stock } = product.product;
            const { amount } = product;

            return productDB.updateStock(code, stock - amount)
            .then(() => {
                //if stock was updated, add it to purchased list and remove it from the cart
                purchasedList.push({ title, price, amount });
                const index = cart.products.findIndex(product => product.product.code == code);
                if (index >= 0) cart.products.splice(index, 1);
            })
            .catch((error)=> {
                errorLog.push(error.message);
            });
        }));

        //record errors on logger
        if(errorLog.length > 0){
            //implementar logger
            const error = errorLog.join('; ')
            console.log(error);
        }

        //update products on cart
        const unpurchasedList = cart.products;
        await cartDB.updateProducts(cartId, unpurchasedList);
    
        return {
            purchasedList,
            unpurchasedList
        };
    }

}


const cartService = new CartService();

export default cartService;