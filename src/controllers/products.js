/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import productService from "../services/ProductService.js";
import { permission, authentication, productValidation } from '../middlewares/index.js';
import productDTO from "../dto/Product.dto.js";

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
router.get('/', async (request, response)=> {
    try{
        //query params 
        const queryObj = request.query;

        const products = await productService.getProducts(queryObj);

        response
        .status(200)
        .json(products);

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

});

router.get('/:code', async (request, response)=> {
    try{
        const code = request.params.code;

        const product = await productService.getProductByCode(code);
        
        response
        .status(200)
        .json(product);

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

});

/********************************************/
//POST METHOD ENDPOINTS
/********************************************/
router.post(
    '/',
    authentication('authToken'), 
    permission(['Premium', 'Admin', 'Master']), 
    productValidation, 
    async (request, response)=> {
        try{
            const user = request.user;
            const newProductData = productDTO.newProduct(request.body, user);
            const newProduct = await productService.createNew(newProductData);

            //send response to client
            response
            .status(201)
            .json({
                status: 'Success',
                message: 'Product successfully created',
                data: {
                    newProduct: newProduct
                }
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
    '/:code', 
    authentication('authToken'), 
    permission(['Premium', 'Admin', 'Master']), 
    async (request, response)=> {
        try{
            //HERE GOES YOUR CODE

            response
            .status(200)
            .json(`Product ${updatedProduct.title} successfully updated`);

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
//DELETE METHOD ENDPOINTS
/********************************************/
router.delete(
    '/:code', 
    authentication('authToken'), 
    permission(['Premium', 'Admin', 'Master']), 
    async (request, response)=> {
        try{
            const productCode = request.params.code;
            const user = request.user;
            await productService.deleteProduct(productCode, user);

            //return success response to client
            response
            .status(200)
            .json({
                status: 'Success',
                message: `Product with id ${productCode} successfully deleted`
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

export default router;