//modules
import fs from 'fs';

class ProductManager{

    constructor(){
        this.path = './products.json';
    }

    async addProduct(product){
        
        const errorLog = [];

        //fetch already created products
        const products = await this.getProducts();

        //verify id is not duplicate
        const validProductCode = !products.some(productInArray => productInArray.code === product.code);

        if(!validProductCode){
            errorLog.push(`The code ${product.code} already exist and duplicates are not allow`);
        }

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
        if(errorLog.length > 0){
            throw new Error(errorLog.join('\n '));
        }

        //assing an id
        product.id = this.getAvailableID(products);

        products.push(product);

        await fs.promises.writeFile(this.path, JSON.stringify(products));
        
        console.log(`the product ${product.title} has been added successfully`);

        return product.id;

    }

    async getProducts(){
        if(fs.existsSync(this.path)){
            const readFileRes = await fs.promises.readFile(this.path);
            return JSON.parse(readFileRes);
        }else{
            console.log(`no se encuentra el file ${this.path}`);
            return [];
        }
    }

    async getProductByID(id){

        const products = await this.getProducts();

        const product = products.find(product => product.id == id);

        if(!product) throw new Error(`The product with id ${id} could not be found`);

        return product;

    }

    async updateProduct(id, newData){

        //handle validations first
        if(!newData) throw new Error('No data sent to update prodcut');

        const products = await this.getProducts();
        const product = products.find(product => product.id == id);
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

        for(const key in newData){
            try{
                const isKeyValid = validFieldList.some(field => field == key);
                const isValueValid = newData[key] ? true : false;

                if(!isKeyValid) throw new Error(`The field key ${key} is not recognized`);
                if(!isValueValid) throw new Error(`The field value ${newData[key]} is not valid`);

                //only change the updated fields
                product[key] = newData[key];

            }catch(error){
                errorLog.push(error.message);
            }
        }

        //verify no error has occurred during the process before writing the "db"
        if(errorLog.length > 0) throw new Error(errorLog.join('; '));

        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }

    async deleteProduct(id){

        let products = await this.getProducts();

        const productDeleted = products.find(product => product.id == id);

        //verify if the product attempted to be deleted actually exists
        if(!productDeleted) throw new Error(`product with id ${id} does not exist`);

        //create a new array with all products except for the deleted one
        products = products.filter(product => product.id != id);

        return fs.promises.writeFile(this.path, JSON.stringify(products));

    }

    getAvailableID(productsArr){
        let availableID = 1;

        let idFound = false;

        while (!idFound) {
            idFound = !productsArr.some(products => products.id == availableID)
            if(!idFound) availableID++;
        }

        return availableID;
    }
    
}

const productManager = new ProductManager();
export default productManager;


