/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import { serverSocket } from "../index.js";
import productService from "../services/ProductService.js";
import { permission, authentication, productValidation } from '../middlewares/index.js';

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
router.get('/', async (request, response)=> {
    try{
        //query params 
        const queryObj = request.query;

        const products = await productService.getProducts(queryObj);

        response.json(200, products);

    }catch(error){
        response.json(400, "An error has occurred: " + error.message);
    }

});

router.get('/:code', async (request, response)=> {
    try{
        const code = request.params.code;

        const product = await productService.getProductByCode(code);
        
        response.json(200, product);

    }catch(error){
        response.json(400, "An error has occurred: " + error.message);
    }

});

/********************************************/
//POST METHOD ENDPOINTS
/********************************************/
router.post(
    '/',
    authentication('authToken'), 
    permission(['Admin', 'Master']), 
    productValidation, 
    async (request, response)=> {
        try{
            const dataProductObj = request.body;
            const newProduct = await productService.createNew(dataProductObj);
            response.json(201, `product with id ${newProduct.id} was successfully added`);
            serverSocket.emit('product-added', newProduct);

            //send response to client
            response
            .status(201)
            .json({
                status: 'Success',
                message: 'Product successfully created'
            });

        }catch(error){
            //handle error response
            const statusCode = error.statusCode || 500;
            const message = error.message || 'An unexpected error has ocurred';

            //send response to client
            response
            .status(statusCode)
            .json({
                status: 'Error',
                error: {
                    message: message
                }
            });
        }
    }
);

/********************************************/
//PUT METHOD ENDPOINTS
/********************************************/
router.put(
    '/:id', 
    authentication('authToken'), 
    permission(['Admin', 'Master']), 
    async (request, response)=> {
        try{
            const productId = request.params.id;
            const newData = request.body;
            const updatedProduct = await productService.updateProduct(productId, newData);
            response.json(200, `Product ${updatedProduct.title} successfully updated`);
        }catch(error){
            response.json(400, 'The following errors has occurred: ' + error.message);
        }
    }
);

/********************************************/
//DELETE METHOD ENDPOINTS
/********************************************/
router.delete(
    '/:id', 
    authentication('authToken'), 
    permission(['Admin', 'Master']), 
    async (request, response)=> {
        try{
            const productId = request.params.id;
            await productService.deleteProduct(productId);
            response.json(200, `Product with id ${productId} successfully deleted`);
            serverSocket.emit('product-deleted', productId);
        }catch(error){
            response.json(400, 'The following errors has occurred: ' + error.message);
        }
    }
);

export default router;