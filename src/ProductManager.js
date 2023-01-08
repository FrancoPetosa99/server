//modules importation
import fs from 'fs';

//classes declaration

class ProductManager{

    constructor(){
        this.path = './products.json';
        this.autoIncrementID = 1;
    }

    async addProduct(product){
        
        const errorLog = [];

        try{

            //fetch already created products
            const products = await this.getProducts();

            //verify id is not duplicate
            const validProductCode = !products.some(productInArray => productInArray.code === product.code);
    
            if(!validProductCode){
                errorLog.push(`The code ${product.code} already exist and duplicates are not allow`);
            }
    
            for(let key in product){
    
                if(
                    product[key] == null ||
                    product[key] == '' ||
                    product[key] == undefined 
                ){
                    errorLog.push(`The field ${key} is required`);
                }
            }

            //verify no errors occurred during the validation process 
            if(errorLog.length > 0){
                throw new Error(errorLog.join('\n '));
            }

            //assing an id
            product.id = this.autoIncrementID;

            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products));
            
            this.autoIncrementID++; //only update once the new product is successfully added to the file

            console.log(`the product ${product.title} has been added successfully`);

        }catch(error){
            console.log('The following errors has occurred: ', error.message);
        }

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

        const product = products.find(product => product.id === id);

        if(product){
            return product
        }else{
            console.error(`The product with id ${id} could not be found`)
        }

    }

    async updateProduct(id, newData){

        const products = await this.getProducts();

        const product = products.find(product => product.id === id);

        //update only the fields that has been modified
        for (const key in newData) {
            product[key] = newData[key];
        }

        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }

    async deleteProduct(id){

        try{

            let products = await this.getProducts();
    
            const productDeleted = products.find(product => product.id === id);

            //verify if the product attempted to be deleted actually exists
            if(!productDeleted) throw new Error(`product with id ${id} does not exist`);
    
            products = products.filter(product => product.id !== id);
    
            await fs.promises.writeFile(this.path, JSON.stringify(products));

        }catch(error){
            console.log(error.message);
        }

    }
}

export {
    ProductManager
}


