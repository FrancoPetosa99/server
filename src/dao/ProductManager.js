//modules
import model from "./models/products.js";

class ProductManager{

    constructor(){
        this.populatedFields = [
            'title',
            'description',
            'price',
            'image',
            'code',
            'stock'
        ];
    }

    async getAll() {

        const mongodbResponse = await model.find();

        const productList = mongodbResponse.map(product => {

            const populatedObj = {};

            for (const key in product) {
                if (this.populatedFields.includes(key)) {
                    populatedObj[key] = product[key];
                }
            }

            populatedObj.id = product._id;

            return populatedObj;
        });

        return productList;
    }

    async getById(id) {

        const mongodbObjResponse = await model.findById(id).exec();
        
        if(mongodbObjResponse){
            const productObj = {};
    
            for (const key in mongodbObjResponse) {
                if (this.populatedFields.includes(key)) {
                    productObj[key] = mongodbObjResponse[key];
                }
            }
    
            productObj.id = mongodbObjResponse._id;
            return productObj;
            
        }
    }

    async getByFilter(filterObj = {}) {
        const productObj = await model.find(filterObj);
        return productObj;
    }

    async create(newProductObj) {
        const mongodbResponse = await model.create(newProductObj);
        return mongodbResponse;
    }

    async updateById(id, updateObj) {
        const filterObj = {};
        filterObj._id = id;

        await model.updateOne(filterObj, updateObj);

        const updatedProductObj = await this.getById(id);

        return updatedProductObj;
    }

    async deleteById(id){
        const filterObj = {};
        filterObj._id = id;

        const mongodbResponse = await model.deleteOne(filterObj);
        return mongodbResponse;
    }

    async checkProductExist(id){

        let productExist = false;

        const queryObj = {};
        queryObj._id = id;

        const mongodbResponse = await model.exists(queryObj);

        if(mongodbResponse) productExist = true;

        return productExist;
    }
}

const productManager = new ProductManager();
export default productManager;


