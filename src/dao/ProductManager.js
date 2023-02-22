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
            'stock',
            'category',
            'available'
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

        console.log(filterObj);
        
        const mongodbResponse = await model.paginate(filterObj, optionObj);

        const responseObj = {};

        responseObj.currentPage = mongodbResponse.page;
        responseObj.nextPage = mongodbResponse.nextPage;
        responseObj.prevPage = mongodbResponse.prevPage;
        responseObj.totalProducts = mongodbResponse.totalDocs;
        responseObj.totalPages = mongodbResponse.totalPages;
        responseObj.nextPageLink = responseObj.nextPage ? `http://localhost:8080/api/products?limit=${limit}&page=${responseObj.nextPage}&sort=${sort}` : null;
        responseObj.prevPageLink = responseObj.prevPage ? `http://localhost:8080/api/products?limit=${limit}&page=${responseObj.prevPage}&sort=${sort}` : null;
        responseObj.products = mongodbResponse.docs.map(product => this.mapProductObj(product));

        return responseObj;
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

    mapProductObj(productObj) {

        const mapedObjProduct = {};

        mapedObjProduct.amount = productObj.amount;

        mapedObjProduct.id = productObj._id;
        mapedObjProduct.title = productObj.title;
        mapedObjProduct.description = productObj.description;
        mapedObjProduct.price = productObj.price;
        mapedObjProduct.image = productObj.image;
        mapedObjProduct.code = productObj.code;
        mapedObjProduct.stock = productObj.stock

        return mapedObjProduct;
    }
}

const productManager = new ProductManager();
export default productManager;


