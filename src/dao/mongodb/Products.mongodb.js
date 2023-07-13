/********************************************/
//IMPORT MODULES
/********************************************/
import model from "./models/products.js";
import CustomError from "../../util/customError.js";

class ProductDB{

    constructor(){}

    async getAll() {
        try{

            const products = await model.find();
            if(products) return products;

        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }
    }

    async getPagination(queryObj){

        const { limit, page, sort , category, available} = queryObj;

        //build filter obj
        const filterObj = {};
        if(category) filterObj.category = category;
        if(available) filterObj.available = available;
        
        //build option obj
        const optionObj = {};
        optionObj.limit = limit;
        optionObj.page = page;

        //build sort obj
        if(sort){
            optionObj.sort = {
                price: sort //{field: sort (asc/desc)}
            };
        }

        const mongodbResponse = await model.paginate(filterObj, optionObj);
        
        const pagination = {};
        pagination.currentPage = mongodbResponse.page;
        pagination.nextPage = mongodbResponse.nextPage;
        pagination.prevPage = mongodbResponse.prevPage;
        pagination.totalProducts = mongodbResponse.totalDocs;
        pagination.totalPages = mongodbResponse.totalPages;
        pagination.nextPageLink = mongodbResponse.nextPage ? `http://localhost:8080/api/views/home?limit=${limit}&page=${mongodbResponse.nextPage}&sort=${sort}` : null;
        pagination.prevPageLink = mongodbResponse.prevPage ? `http://localhost:8080/api/views/home?limit=${limit}&page=${mongodbResponse.prevPage}&sort=${sort}` : null;
        pagination.products = mongodbResponse.docs.map(product => {
            return {
                amount: product.amount,
                title: product.title,
                description: product.description,
                price: product.price,
                image: product.image,
                code: product.code,
                stock: product.stock,
                
            }
        });

        console.log( mongodbResponse.docs);

        return pagination;
    }

    async getById(id) {
        try{
            const product = await model.findById(id);
            if(product) return product;

        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }
    }

    async getByCode(code) {
        try{
            const filterObj = {};
            filterObj.code = code;

            const product = await model.findOne(filterObj);    
            if(product) return product;

        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }
    }

    async create(newProduct) {
        try{
            const productCreated = await model.create(newProduct);
            return productCreated;
        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }
    }

    async deleteById(id){
        try{
            const filterObj = {};
            filterObj.id = id;
    
            await model.deleteOne(filterObj);
           
        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }
    }

    async deleteByCode(code){
        try{
            const filterObj = {};
            filterObj.code = code;
    
            await model.deleteOne(filterObj);
           
        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }
    }

    async checkProductExist(code){
        try{
            let productExist = false;

            const queryObj = {};
            queryObj.code = code;

            const mongodbResponse = await model.exists(queryObj);
            if(mongodbResponse) productExist = true;

            return productExist;

        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }   
    }

    async updateStock(code, newStock){
        try{
            const mongodbResponse = await model.updateOne({code}, {stock: newStock});
            return mongodbResponse.modifiedCount ? 'Success' : 'Error';
        }catch(error){
            throw new CustomError(500, `Could not update stock on product with code ${code}. An unexpected error has occurred: ${error.message}`);
        }
    }
}

const productDB = new ProductDB();

export default productDB;


