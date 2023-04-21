/********************************************/
//IMPORT MODULES
/********************************************/
import model from "./models/carts.js";
import CustomError from "../../util/customError.js";

/********************************************/
//CART MANAGER CLASS
/********************************************/
class CartDB{

    constructor(){}

    async getById(id) {
        try{
            const cart = await model.findById(id);
            if(cart) return cart;
            
        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }
    }

    async create() {
        try{
            const cartObj = {};
            cartObj.products = [];

            const newCart = await model.create(cartObj);
            if(newCart) return newCart.id;

        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }    
    }
    
    async updateProducts(cartId, products){
        try{
            const updateObj = {};
            updateObj.products = products;

            await this.updateById(cartId, updateObj);

        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }
    }

    async deleteProductFromCart(cartId, productsArr){

        const updateObj = {};
        updateObj.products = productsArr.map(({id, amount}) => {
            const mapedObj = {};
            mapedObj.product = id;
            mapedObj.amount = amount;
            return mapedObj;
        });

        await this.updateById(cartId, updateObj);
    }
}

const cartDB = new CartDB(); //INITIALIZE THE CART MANAGER

export default cartDB;



