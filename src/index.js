import express from 'express';
import {ProductManager} from './ProductManager.js';

const app = express();
const productManager = new ProductManager();

app.listen(8080, ()=> {
    console.log('the server is running');
});

//default GET end point
app.get('/', (request, response)=> {
    response.send('<h1>Node server running...</h1>');
});

//end point GET products
app.get('/products', async (request, response)=> {

    const responseObj = {};
    
    const limit = parseInt(request.query.limit);

    const array = await productManager.getProducts();

    if(limit){

        responseObj.products = [];

        let i = 0;

        //handle case 1: clien asks for a number of products higher than avaiable
        //handle case 2: client asks for a number of products lower than avaiable
        while(i < array.length && i < limit){
            responseObj.products[i] = array[i];
            i++;
        }

    }else{
        responseObj.products = array;
    }

    response.end(JSON.stringify(responseObj));

});

//end point GET products by id
app.get('/products/:id', async (request, response)=> {

    const responseObj = {};
    
    const id = isNaN(request.params.id) ? request.params.id : parseInt(request.params.id);

    const product = await productManager.getProductByID(id);
    
    if(product){
        responseObj.status = 200;
        responseObj.product = product;
    }else{
        responseObj.status = 404;
        responseObj.product = null
        responseObj.message = `Could not found product with id: ${id}`;
    }

    response.end(JSON.stringify(responseObj));
});