/********************************************/
//IMPORT MODULES
/********************************************/
import model from "./models/carts.js";

/********************************************/
//CART MANAGER CLASS
/********************************************/
class CartDB{

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

        if(mongodbResponse) {

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

    async create() {
        const cartObj = {};

        cartObj.products = [];
        // cartObj.products.push({
        //     product: productObj.id,
        //     amount: productObj.amount
        // });

        const mongodbResponse = await model.create(cartObj);

        const newCartObj = {};
        newCartObj.id = mongodbResponse._id;
        newCartObj.products = mongodbResponse.products;

        return newCartObj;
    }

    async updateById(id, updateObj) {
        const filterObj = {};
        filterObj._id = id;

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

    async checkCartExist(id){

        let cartExist = false;

        const queryObj = {};
        queryObj._id = id;

        const mongodbResponse = await model.exists(queryObj);

        if(mongodbResponse) cartExist = true;

        return cartExist;
    }
    
    async updateCartProducts(cartId, productsArr){

        const mapedProductsArr = productsArr.map(({ id, amount }) => {
            const objMaped = {};
            objMaped.product = id;
            objMaped.amount = amount;
            return objMaped;
        });

        const updateObj = {};
        updateObj.products = mapedProductsArr;

        const updatedCartObj = await this.updateById(cartId, updateObj);

        return updatedCartObj;
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



