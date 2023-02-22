/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import productService from "../services/ProductService.js";
import cartService from "../services/cartService.js";
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
    try{

        const queryObj = request.query;

        const productBatch = await productService.getProducts(queryObj);

        const renderObj = {};
        renderObj.productBatch = productBatch;

        response.render('home', renderObj);

    }catch(error){
        response.send(`<h1>The following error has occurred: ${error.message}</h1>`);
    }
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

router.get('/pagination', async (request, response)=> {
    try{
        const renderObj = {
            title: 'Pagination',
            cssFileName: 'pagination.css',
        };
    
        response.render('pagination', renderObj);
        
    }catch(error){
        response.send(`<h1>The following error has occurred: ${error.message}</h1>`);
    }
});

router.get('/product', async (request, response)=> {
    try{

        const productId = request.query.pid;
        const cartId = request.query.cid;

        const promiseArrResults = await Promise.all([
            productService.getProductByID(productId),
            cartService.getCartById(cartId),
        ]);

        const productData = promiseArrResults[0];
        const cartData = promiseArrResults[1];
        let totalToPay = 0;

        const productOnCart = cartData.products.find(product => product.id == productId);
        
        let amount = 0;

        if(productOnCart){
            amount = productOnCart.amount;
        }


        for (let i = 0; i < cartData.products.length; i++) {
            totalToPay += cartData.products[i].price * cartData.products[i].amount;
        }

        const renderObj = {
            title: 'Product Details',
            cssFileName: 'productDetails.css',
            product: productData,
            amount: amount,
            totalToPay: totalToPay
        };
        
        response.render('productDetails', renderObj);
        
    }catch(error){
        response.send(`<h1>The following error has occurred: ${error.message}</h1>`);
    }
});

router.get('/cart', async (request, response)=> {
    try{
        const renderObj = {
            title: 'Check-out',
            cssFileName: 'checkout.css',
        };
        
        response.render('checkout', renderObj);
        
    }catch(error){
        response.send(`<h1>The following error has occurred: ${error.message}</h1>`);
    }
});

export default router;