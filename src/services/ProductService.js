import productManager from "../dao/ProductManager.js";

class ProductService{

    constructor(){
        
    }

    async getProducts(limit = null){
        
        const productList = await productManager.getAll();

        const availableProductsNumber = productList.length;

        if(!limit || limit > availableProductsNumber){
            return productList;
        }

        const productShortedList = [];

        for (let i = 0; i < limit; i++) {
            productShortedList.push(productList[i]);
        }

        return productShortedList;

    }

    async createNew(product){
        
        const errorLog = [];

        const queryFilterObj = {};
        queryFilterObj.code = product.code;

        const queryResponse = await productManager.getByFilter(queryFilterObj);

        console.log(queryResponse);

        const isValidCode = queryResponse.length == 0 ? true : false;

        if(!isValidCode) errorLog.push(`The code ${product.code} already exist and duplicates are not allow`);

        const requiredFieldsName = [
            'title',
            'description',
            'price',
            'image',
            'code',
            'stock',
        ];

        //verify no required field is missing
        for (let i = 0; i < requiredFieldsName.length; i++) {

            const hasProperty = product.hasOwnProperty(requiredFieldsName[i]);

            if(!hasProperty || !product[requiredFieldsName[i]]) errorLog.push(`The field ${requiredFieldsName[i]} is required`);
        }

        //verify no errors occurred during the validation process 
        if(errorLog.length > 0) throw new Error(errorLog.join('\n '));

        const newProduct = await productManager.create(product);
        
        console.log(`the product ${newProduct.title} has been added successfully`);

        return newProduct;

    }
    
    async getProductByID(id){

        const isValidId = this.verifyHexaNumber(id);

        if(!isValidId) throw new Error(`The id ${id} is not valid. Must be an hexadecimal number of 24 characters`);

        const product = await productManager.getById(id);

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

       const updatedProduct = await productManager.updateById(id, newData);

       return updatedProduct;
    }

    async deleteProduct(id){

        const product = await this.getProductByID(id);

        if(!product) throw new Error(`The product with id ${id} could not be found`);

        await productManager.deleteById(id);
    }

    verifyHexaNumber(hexaNumber){

        let isNumberValid = true;

        const maxLength = 24;

        //list of valid characters in hexadecimal number system
        const hexaCharacters = [
            '0','1','2','3','4','5','6','7','8','9',
            'a','b','c','d','e','f'
        ];

        try{
            //verify if the number has hexadecimal characters only
            for (let i = 0; i < hexaNumber.length; i++) {
                const isCharacterValid = hexaCharacters.includes(hexaNumber[i]);
                if(!isCharacterValid) throw new Error(`The character ${hexaNumber[i]} is not valid`);
            }

            //verify the hexadecimal number has 24 characters only
            if(hexaNumber.length !== maxLength) throw new Error(`hexadecimal number does not have 24 characters`);

        }catch(error){
            isNumberValid = false;
        }finally{
            return isNumberValid;
        }
    }
}


const productService = new ProductService();

export default productService;