/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import paymentService from "../services/PaymentService.js";
import cartService from "../services/CartService.js";
import authentication from "../middlewares/authentication.js";
import permission from "../middlewares/permission.js";
import productDTO from "../dto/Product.dto.js";

const router = Router(); //INITIALIZE ROUTER

router.post('/webhook', async (request, response)=> {
    try{
        const payment = request.query;
       
        if(payment.type == 'payment'){
            const paymentId = payment["data.id"];
            const paymentData = await paymentService.getPaymentById(paymentId);
            console.log('PAYMENT DATA: ', paymentData.body.external_reference);
        }

        //return success response to client
        response
        .status(204);
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
//POST METHOD ENDPOINTS
/********************************************/
router.post(
    '/order', 
    authentication('authToken'),
    permission(['Premium', 'Standard']),
    async (request, response)=> {
        try{
            const { cartId } = request.user;

            const cart = await cartService.getCartById(cartId);

            const { availableProducts, unavailableProducts } = await cartService.reserveProducts(cart.products);

            console.log(availableProducts);
            console.log(unavailableProducts);
            
            const products = productDTO.orderItems(cart);

            // const result = await paymentService.createOrder(products, cartId);
            // console.log('BODY:', result.body.init_point);
            // console.log('************************************************************');

            //return success response to client
            response
            .status(200)
            .json({
                status: 'Success',
                message: `Payment order successfully created`
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
    }
);

export default router;