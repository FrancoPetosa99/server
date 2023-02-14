/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import { serverSocket } from "../index.js";
import productService from "../services/ProductService.js";

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
router.get('/', async (request, response)=> {
    try{
        const limit = parseInt(request.query.limit);

        const products = await productService.getProducts(limit);

        response.json(200, products);

    }catch(error){
        response.json(400, "An error has occurred: " + error.message);
    }

});

router.get('/:id', async (request, response)=> {
    try{
        const id = isNaN(request.params.id) ? request.params.id : parseInt(request.params.id);

        const product = await productService.getProductByID(id);
        
        response.json(200, product);

    }catch(error){
        response.json(400, "An error has occurred: " + error.message);
    }

});

/********************************************/
//POST METHOD ENDPOINTS
/********************************************/
router.post('/', async (request, response)=> {
    try{
        const dataProductObj = request.body;
        const newProduct = await productService.createNew(dataProductObj);
        response.json(201, `product with id ${newProduct._id} was successfully added`);
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
        const updatedProduct = await productService.updateProduct(productId, newData);
        response.json(200, `Product ${updatedProduct.title} successfully updated`);
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
        await productService.deleteProduct(productId);
        response.json(200, `Product with id ${productId} successfully deleted`);
        serverSocket.emit('product-deleted', productId);
    }catch(error){
        response.json(400, 'The following errors has occurred: ' + error.message);
    }
});

export default router;