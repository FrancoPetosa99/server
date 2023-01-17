import { Router } from "express";
import { ProductManager } from '../ProductManager.js';


const router = Router();
const productManager = new ProductManager();

//end point GET products
router.get('/', async (request, response)=> {

    const responseObj = {};
    
    const limit = parseInt(request.query.limit);

    const array = await productManager.getProducts();

    if(limit){

        responseObj.products = [];

        let i = 0;

        //handle case 1: clien asks for a number of products higher than avaiable
        //handle case 2: client asks for a number of products lower than avaiable
        while(i < array.length && i < limit){
            responseObj.products[i] = array[i];
            i++;
        }

    }else{
        responseObj.products = array;
    }

    response.end(JSON.stringify(responseObj));

});

//end point GET products by id
router.get('/:id', async (request, response)=> {

    const responseObj = {};
    
    const id = isNaN(request.params.id) ? request.params.id : parseInt(request.params.id);

    const product = await productManager.getProductByID(id);
    
    if(product){
        responseObj.status = 200;
        responseObj.product = product;
    }else{
        responseObj.status = 404;
        responseObj.product = null
        responseObj.message = `Could not found product with id: ${id}`;
    }

    response.end(JSON.stringify(responseObj));
});

router.post('/', async (request, response)=> {
    try{
        const newProduct = request.body;
        const id = await productManager.addProduct(newProduct);
        response.json(201, `product with id ${id} was successfully added`);
    }catch(error){
        response.json(400, 'The following errors has occurred: ' + error.message);
    }
});

router.put('/:id', async (request, response)=> {
    try{
        const productId = request.params.id;
        const newData = request.body;
        await productManager.updateProduct(productId, newData);
        response.json(200, 'Product successfully updated');
    }catch(error){
        response.json(400, 'The following errors has occurred: ' + error.message);
    }
});

router.delete('/:id', async (request, response)=> {
    try{
        const productId = request.params.id;
        await productManager.deleteProduct(productId);
        response.json(200, `Product with id ${productId} successfully deleted`);
    }catch(error){
        response.json(400, 'The following errors has occurred: ' + error.message);
    }
});

export default router;