/********************************************/
//IMPORT MODULES
/********************************************/
import model from "./models/carts.js";

/********************************************/
//CART MANAGER CLASS
/********************************************/
class CartManager{

    constructor(){
    }

    async getAll() {
        const mongodbResponse = await model.find();

        const cartList = mongodbResponse.map(cart => {

            const populatedObj = {};
            populatedObj.products = cart.products.map(productObj => {
                const populatedProductObj = {};

                populatedProductObj.product = productObj.id;
                populatedProductObj.amount = productObj.amount;

                return populatedProductObj;
            });

            populatedObj.id = cart._id;
    
            return populatedObj;
        });

        return cartList;
    }

    async getById(id) {
        const mongodbResponse = await model.findById(id).exec();
        
        if(mongodbResponse){
            const populatedCartObj = {};
            populatedCartObj.id = mongodbResponse._id;
    
            populatedCartObj.products = mongodbResponse.products.map(productObj => {
                const populatedProductObj = {};
                
                populatedProductObj.product = productObj.product;
                populatedProductObj.amount = productObj.amount;
    
                return populatedProductObj;
            });
    
            return populatedCartObj;
        }
    }

    async getByFilter(filterObj = {}) {
        const cartObj = await model.find(filterObj);
        return cartObj;
    }

    async create(productObj) {
        const cartObj = {};

        cartObj.products = [];
        cartObj.products.push({
            product: productObj.id,
            amount: productObj.amount
        });

        const mongodbResponse = await model.create(cartObj);
        return mongodbResponse;
    }

    async updateById(id, updateObj) {
        const filterObj = {};
        filterObj._id = id;

        const updatedData = {};


        await model.updateOne(filterObj, updateObj);

        const updatedCartObj = await this.getById(id);

        return updatedCartObj;
    }

    async deleteById(id){
        const filterObj = {};
        filterObj._id = id;

        const mongodbResponse = await model.deleteOne(filterObj);
        return mongodbResponse;
    }
    
}

const cartManager = new CartManager(); //INITIALIZE THE CART MANAGER

export default cartManager;



