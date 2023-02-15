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

        const queryObj = {};
        queryObj._id = id;

        const mongodbResponse = await model.findOne(queryObj);

        if(mongodbResponse){

            const mapedArrProducts = mongodbResponse.products.map(product => this.mapProductObj(product));

            const mapedObjCart = {};
            mapedObjCart.id = mongodbResponse._id;


            mapedObjCart.products = mapedArrProducts;

            return mapedObjCart;
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

    async deleteById(id) {
        const filterObj = {};
        filterObj._id = id;

        const mongodbResponse = await model.deleteOne(filterObj);
        return mongodbResponse;
    }

    mapProductObj(productObj) {

        const mapedObjProduct = {};

        mapedObjProduct.amount = productObj.amount;

        mapedObjProduct.id = productObj.product._id;
        mapedObjProduct.title = productObj.product.title;
        mapedObjProduct.description = productObj.product.description;
        mapedObjProduct.price = productObj.product.price;
        mapedObjProduct.image = productObj.product.image;
        mapedObjProduct.code = productObj.product.code;
        mapedObjProduct.stock = productObj.product.stock;

        return mapedObjProduct;
    }
    
}

const cartManager = new CartManager(); //INITIALIZE THE CART MANAGER

export default cartManager;



