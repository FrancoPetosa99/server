import { cartDB, productDB } from "../dao/index.js";
import ticketService from "./TicketService.js";
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

    async addProduct(cartId, productId){
        const cart = await this.getCartById(cartId);

        const products = cart.products;
        const product = products.find(product => product.product.id == productId);
   
        if(product) {
            product.amount++;
            await cartDB.addProduct(cartId, product);

        }else {
            await cartDB.insertNewProduct(cartId, productId);
        }
    }

    async purchase(cartId){
        const purchasedList = [];

        //get cart from db
        const cart = await cartDB.getById(cartId);
        
        //check there are products in cart
        if(cart.products.length == 0) throw new CustomError(400, 'Purchase process is not allow when cart is empty');

        //collect products with enough stock to complete purchase process
        const availableProducts = cart.products.filter(product => product.product.stock >= product.amount);
        
        //update stock of products
        await Promise.all(availableProducts.map(product => {
            const { title, price, code, stock } = product.product;
            const { amount } = product;

            return productDB.updateStock(code, stock - amount)
            .then(isStockUpdated => {
                //if stock could be updated, so add it to purchased list and remove it from the cart
                if(isStockUpdated){
                    purchasedList.push({ title, price, amount });

                    const index = cart.products.findIndex(product => product.product.code == code);
                    
                    if (index >= 0) {
                        cart.products.splice(index, 1);
                    }
                }
            });
        }));

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