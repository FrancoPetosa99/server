/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import cartManager from "../dao/CartManager.js";
import cartService from "../services/CartService.js";

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
router.get('/', async (request, response)=> {
    try{
        const cartList = await cartManager.getAll();
        response.json(200, cartList);
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

router.get('/:cid', async (request, response)=> {
    try{
        const cartId = request.params.cid;
        const products = await cartManager.getById(cartId);
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

        const productObj = {};
        productObj.id = request.body.productId;
        productObj.amount = request.body.productAmount;

        const newCart = await cartService.createNewCart(productObj);

        response.json(200, `Cart id ${newCart.id} successfully created`);
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

router.post('/:cid/product/:pid', async (request, response)=> {
    try{
        const cartId = request.params.cid;
        const productId = request.params.pid;
        
        await cartService.addProduct(cartId, productId);

        response.json(200, 'Product successfully added');
    }catch(error){
        response.json(400, 'An error occurred during process:' + error.message);
    }
});

/********************************************/
//DELETE METHOD ENDPOINTS
/********************************************/
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