/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import productManager from "../ProductManager.js";

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
router.get('/products/:id', async (request, response)=> {
    try{
        const id = request.params.id;
        const product = await productManager.getProductByID(id);
        const renderObj = {
            products: [product]
        }
        response.render('products', renderObj);
    }catch(error){
        response.json(400,'The following errors has occurred:' + error.message);
    }

});

router.get('/home', async (request, response)=> {
    const products = await productManager.getProducts();
    const renderObj = {
        products: products
    }
    response.render('home', renderObj);

});

router.get('/realtimeproducts', async (request, response)=> {
    const products = await productManager.getProducts();
    const renderObj = {
        products: products
    }
    response.render('realTimeProducts', renderObj);

});

export default router;