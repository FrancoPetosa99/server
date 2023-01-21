/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import cartManager from "../CartManager.js";

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
router.get('/:cid', async (request, response)=> {
    try{
        const cartId = request.params.cid;
        const products = await cartManager.getCartProductsById(cartId);
        response.json(200, products);
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

/********************************************/
//POST METHOD ENDPOINTS
/********************************************/
router.post('/', async (request, response)=> {
    try{
        await cartManager.addCart();
        response.json(200, 'Cart successfully created');
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

router.post('/:cid/product/:pid', async (request, response)=> {
    try{
        const cartId = request.params.cid;
        const productId = request.params.pid;

        await cartManager.addProductToCart(productId, cartId);

        response.json(200, 'Cart successfully created');
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

export default router;