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
            const cart = await model.findOne({_id: id}).populate('products.product');
            if(cart) return cart;    
        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }
    }

    async createCart() {
        try{
            const newCart = await model.create({});
            if(newCart) return newCart._id;
        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }    
    }
    
    async addProduct(cartId, product){
        try{
            return model.updateOne({_id: cartId}, 
                { $set: { "products.$[product].amount": product.amount } },
                {
                    arrayFilters: [{ 'product._id': product.id}]
                }
            );
        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }
    }

    async insertNewProduct(cartId, productId){
        try{
            return model.updateOne(
                { _id: cartId },
                { 
                    $push: { 
                        products: { 
                            product: productId, 
                            amount: 1 
                        } 
                    } 
                },
            );
        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }
    }

    async updateProducts(cartId, products){
        try{
            return model.updateOne({ _id: cartId }, { products: products });
        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }  
    }
}

const cartDB = new CartDB(); //INITIALIZE THE CART MANAGER

export default cartDB;