/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import { serverSocket } from "../index.js";
import productManager from '../ProductManager.js';

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
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

/********************************************/
//POST METHOD ENDPOINTS
/********************************************/
router.post('/', async (request, response)=> {
    try{
        const newProduct = request.body;
        const id = await productManager.addProduct(newProduct);
        response.json(201, `product with id ${id} was successfully added`);
        serverSocket.emit('product-added', newProduct);
    }catch(error){
        response.json(400, 'The following errors has occurred: ' + error.message);
    }
});

/********************************************/
//PUT METHOD ENDPOINTS
/********************************************/
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

/********************************************/
//DELETE METHOD ENDPOINTS
/********************************************/
router.delete('/:id', async (request, response)=> {
    try{
        const productId = request.params.id;
        await productManager.deleteProduct(productId);
        response.json(200, `Product with id ${productId} successfully deleted`);
        serverSocket.emit('product-deleted', productId);
    }catch(error){
        response.json(400, 'The following errors has occurred: ' + error.message);
    }
});

export default router;