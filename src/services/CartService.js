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

    async reserveProducts(products){
        //check cart is not empty
        if(products.length == 0) throw new CustomError(400, 'Cart is empty');
        
        const purchasedList = [];
        const unpurchasedList = [];

        //collect products with enough stock to complete purchase process
        const availableProducts = products.filter(product => product.product.stock >= product.amount);
        
        //update stock of products. If an error occurs on one product process still runs
        await Promise.all(availableProducts.map(product => {
            const { code, stock } = product.product;
            const { amount } = product;

            return productDB.updateStock(code, stock - amount)
            .then((result) => {
                if(result == 'Success') purchasedList.push(product)
            })
            .catch(()=> unpurchasedList.push(product));
        }));

        return {
            purchasedList,
            unpurchasedList
        }
    }

    async emptyCart(cartId){
        return cartDB.updateProducts(cartId, []);
    }
}


const cartService = new CartService();

export default cartService;