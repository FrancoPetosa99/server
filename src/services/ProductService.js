import { productDB } from "../dao/index.js";
import CustomError from "../util/customError.js";

class ProductService{

    constructor(){
        
    }

    async getProducts(queryObj){

        const { limit, page, sort, category, available} = queryObj;

        const filterObj = {};

        //check sort param is valid otherwise set to default value
        if(sort){
            const sortLowercased = sort.toLowerCase();
            const isAsc = sortLowercased == 'asc' ? true : false;
            const isDesc = sortLowercased == 'desc' ? true : false;
            if(isAsc && isDesc){
                filterObj.sort = sort;
            }
        }
    
        //check limit param is valid otherwise set to default value
        try{
            
            const isNumber = isNaN(limit) ? false : true;

            if(!isNumber) throw new Error('limit param is not a number');

            const isBiggerThanCero = limit > 0 ? true : false;

            if(!isBiggerThanCero) throw new Error('limit param must be bigger than cero');

            //at this point validations passed
            filterObj.limit = JSON.parse(limit);

        }catch(error){
            console.log(error.message);
            filterObj.limit = 10;
        }

        //check page param is valid otherwise set to default value
        try{
            
            const isNumber = isNaN(page) ? false : true;

            if(!isNumber) throw new Error('limit param is not a number');

            const isBiggerThanCero = page > 0 ? true : false;

            if(!isBiggerThanCero) throw new Error('limit param must be bigger than cero');

            //at this point validations passed
            filterObj.page = JSON.parse(page);

        }catch(error){
            console.log(error.message);
            filterObj.page = 1;
        }

        //check available param is valid otherwise set to default value
        if(available){
            const availableLowerCased = available.toLowerCase();
            if(availableLowerCased == 'true' || availableLowerCased == 'false'){
                filterObj.available = JSON.parse(availableLowerCased);
            }
        }

        //check category param is valid otherwise set to default value
        if(category){
            const categoryLowerCased = category.toLowerCase()
            filterObj.category = categoryLowerCased;
        }

        const pagination = await productDB.getPagination(filterObj);

        return pagination;
    }

    async createNew(newProductData){
        const { code } = newProductData;

        const duplicatedProduct = await productDB.getByCode(code);

        if(duplicatedProduct) throw new CustomError(400, `Product with code ${code} already exist`);

        const newProduct = await productDB.create(newProductData);

        return newProduct;
    }
    
    async getProductByID(id){

        const isValidId = this.verifyHexaNumber(id);

        if(!isValidId) throw new Error(`The id ${id} is not valid. Must be an hexadecimal number of 24 characters`);

        const product = await productDB.getById(id);

        if(!product) throw new Error(`The product with id ${id} could not be found`);

        return product;

    }

    async updateProduct(id, newData){

        //handle validations first
        if(!newData) throw new Error('Empty data is not valid');

        const product = await this.getProductByID(id);

        if(!product) throw new Error(`The product with id ${id} could not be found`);
        
        //at this point errors will not stop process
        const errorLog = [];

        const validFieldList = [
            'title',
            'description',
            'price',
            'image',
            'code',
            'stock',
        ];

        //only allow to update valid fields
        for(const key in newData){
            try{
                const isKeyValid = validFieldList.some(field => field == key);
                const isValueValid = newData[key] ? true : false;

                if(!isKeyValid) throw new Error(`The field key ${key} can not be recognized`);
                if(!isValueValid) throw new Error(`The field value ${newData[key]} is not valid`);

            }catch(error){
                errorLog.push(error.message);
            }
        }

        //verify no error has occurred during the process before writing the "db"
        if(errorLog.length > 0) throw new Error(errorLog.join('; '));

       const updatedProduct = await productDB.updateById(id, newData);

       return updatedProduct;
    }

    async deleteProduct(id){

        const product = await this.getProductByID(id);

        if(!product) throw new Error(`The product with id ${id} could not be found`);

        await productDB.deleteById(id);
    }

    async getProductByCode(code){
        const product = await productDB.getByCode(code);

        if(!product) throw new CustomError(404, `Product with code ${code} could not be found`);

        return product;
    }
}


const productService = new ProductService();

export default productService;