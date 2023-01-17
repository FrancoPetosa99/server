import { Router } from "express";
import { CartManager } from "../CartManager.js";

const router = Router();
const cartManager = new CartManager();

//end point GET cart by Id
router.get('/:cid', async (request, response)=> {
    try{
        const cartId = request.params.cid;
        const products = await cartManager.getCartProductsById(cartId);
        response.json(200, products);
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

//end point POST carts
router.post('/', async (request, response)=> {
    try{
        await cartManager.addCart();
        response.json(200, 'Cart successfully created');
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

//end point POST add product Id to cart by Id
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