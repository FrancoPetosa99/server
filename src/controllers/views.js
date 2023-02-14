/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import productService from "../services/ProductService.js";
import chatService from "../services/chatService.js";

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
    
    const products = await productService.getProducts();
    
    //sort products by id ASC
    const sortedList = products.sort((x, y) => x.id - y.id);
   
    const renderObj = {
        products: sortedList
    }
    
    response.render('realTimeProducts2', renderObj);

});

router.get('/chat', async (request, response)=> {

    try{

        const previousMessages = await chatService.getMessages();
    
        const renderObj = {
            title: 'Public Chat',
            cssFileName: 'chat.css',
            messages: previousMessages
        };
    
        response.render('chat', renderObj);
        
    }catch(error){
       
        response.send(`<h1>The following error has occurred: ${error.message}</h1>`);
    }
    

});

export default router;