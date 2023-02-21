/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import cartService from "../services/CartService.js";

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
router.get('/', async (request, response)=> {
    try{
        const cartList = await cartService.getCarts();
        response.json(200, cartList);
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

router.get('/:cid', async (request, response)=> {
    try{
        const cartId = request.params.cid;
        const cart = await cartService.getCartById(cartId);
        response.json(200, cart);
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

/********************************************/
//POST METHOD ENDPOINTS
/********************************************/
router.post('/', async (request, response)=> {
    try{

        // const productObj = {};
        // productObj.id = request.body.productId;
        // productObj.amount = request.body.productAmount;

        const newCart = await cartService.createNewCart();

        const responseObj = {};
        responseObj.data = newCart;

        response.json(200, responseObj);
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

router.post('/:cid/product/:pid', async (request, response)=> {
    try{
        const cartId = request.params.cid;
        const productId = request.params.pid;
    
        const cartUpdated = await cartService.addProduct(cartId, productId);

        const responseObj = {};
        responseObj.data = cartUpdated;
        responseObj.message = 'Product successfully added';

        response.json(201, responseObj);
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

/********************************************/
//PUT METHOD ENDPOINTS
/********************************************/
router.put('/:cid', async (request, response)=> {
    try{

        const cartId = request.params.cid;
        const newProductArr = request.body;

        await cartService.updateCartContent(cartId, newProductArr);

        response.json(200, `Cart with id ${cartId} successfully updated`);
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

router.put('/:cid/product/:pid', async (request, response)=> {
    try{

        const cartId = request.params.cid;
        const productId = request.params.pid;
        const amount = request.body.amount;

        await cartService.updateProductInCart(cartId, productId, amount);

        response.json(200, `Cart with id ${cartId} successfully updated`);
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

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