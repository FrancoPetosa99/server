/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import cartService from "../services/CartService.js";
import productService from "../services/ProductService.js";
import { permission, authentication } from '../middlewares/index.js';


const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
router.get('/', authentication('authToken'), permission(['Admin', 'Master']) ,async (request, response)=> {
    try{
        const cartList = await cartService.getCarts();
        response.json(200, cartList);
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

router.get('/:cid', authentication('authToken'), permission(['Admin', 'Master']), async (request, response)=> {
    try{
        const cartId = request.params.cid;
        const cart = await cartService.getCartById(cartId);

        //send response to client
        response
        .status(200)
        .json({
            status: 'Success',
            data: cart,
            message: 'Cart successfully retrieved',
        });
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

router.get('/current/cart', authentication('authToken'), permission(['Standard']), async (request, response)=> {
    try{
        const cartId = request.user.cartId;
        const cart = await cartService.getCartById(cartId);
        
        //send response to client
        response
        .status(200)
        .json({
            status: 'Success',
            message: 'Cart successfully retrieved',
            data: cart
        });
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

/********************************************/
//POST METHOD ENDPOINTS
/********************************************/
router.post('/product/:pcode', authentication('authToken'), async (request, response)=> {
    try{
        const productCode = request.params.pcode;
        const cartId = request.user.cartId;
        const user = request.user;

        const product = await productService.getProductByCode(productCode);
        
        await cartService.addProduct(cartId, product.id, user);

        //send response to client
        response
        .status(200)
        .json({
            status: 'Success',
            message: 'Product successfully added to cart'
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
});

/********************************************/
//PUT METHOD ENDPOINTS
/********************************************/


/********************************************/
//DELETE METHOD ENDPOINTS
/********************************************/
router.delete('/:cid', async (request, response)=> {
    try{

        const cartId = request.params.cid;

        await cartService.emptyCart(cartId);

        response.json(200, `Cart with id ${cartId} successfully empty`);
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

router.delete('/:cid/product/:pid', async (request, response)=> {
    try{

        const cartId = request.params.cid;
        const productId = request.params.pid;

        await cartService.removeProduct(cartId, productId);

        response.json(200, `Product with id ${productId} successfully removed`);
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

export default router;