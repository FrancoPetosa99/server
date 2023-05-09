/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import productService from "../services/ProductService.js";
import cartService from "../services/CartService.js";
import { privateAccess, publicAccess } from '../middlewares/index.js';
import reqURLExtractor from "../util/reqURLExtractor.js";
import cookieExtractor from "../util/cookieExtractor.js";
import jwtManager from "../util/jwt.js";
import CustomError from "../util/customError.js";

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
        const authToken = cookieExtractor(request, 'authToken');
        const payLoad = jwtManager.parseToken(authToken);
        
        const requestedURL = reqURLExtractor(request);
        const pagination = await productService.getProducts(request.query);

        //build render obj
        const renderObj = {};
        renderObj.title = 'Home';
        renderObj.cssFileName = 'home.css';
        renderObj.pagination = pagination;
        if(payLoad){
            renderObj.isAuthenticated = true;
            renderObj.userEmail = payLoad.email;
        }
                
        response.render('home', renderObj);
        
    }catch(error){
        console.log(error);
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

router.get('/logging', publicAccess, async (request, response)=> {
    try{

        const renderObj = {
            title: 'Logging',
            cssFileName: 'logging.css',
        };
        
        response.render('logging', renderObj);
        
    }catch(error){
        response.send(`<h1>The following error has occurred: ${error.message}</h1>`);
    }
});

router.get('/signup', publicAccess, async (request, response)=> {
    try{

        const renderObj = {
            title: 'Sign Up',
            cssFileName: 'signup.css',
        };
        
        response.render('signup', renderObj);
        
    }catch(error){
        response.send(`<h1>The following error has occurred: ${error.message}</h1>`);
    }
});

router.get('/profile', privateAccess, async (request, response)=> {
    try{

        const renderObj = {
            title: 'Profile',
            cssFileName: 'profile.css',
        };
        
        response.render('profile', renderObj);
        
    }catch(error){
        response.send(`<h1>The following error has occurred: ${error.message}</h1>`);
    }
});

router.get('/resetPassword', publicAccess, async (request, response)=> {
    try{

        const renderObj = {
            title: 'Reset Password',
            cssFileName: 'resetPassword.css',
        };
        
        response.render('resetPassword', renderObj);
        
    }catch(error){
        response.send(`<h1>The following error has occurred: ${error.message}</h1>`);
    }
});

router.get('/changePassword/:token', async (request, response)=> {
    try{
        const { token } = request.params;
        const isTokenValid = jwtManager.verifyToken(token);
        
        if(!isTokenValid) throw new CustomError(401, 'Token is not valid or has expired');

        const renderObj = {
            title: 'Change Password',
            cssFileName: 'changePassword.css',
        };
        
        response
        .cookie('resetToken', token)
        .render('changePassword', renderObj);
        
    }catch(error){

        response
        .render('resetPassword', {
            title: 'Reset Password',
            cssFileName: 'resetPassword.css'
        });
    }
});

export default router;