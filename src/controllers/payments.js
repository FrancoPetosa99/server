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
            const paymentData = await paymentService.getPaymentData(paymentId);
            console.log('PAYMENT DATA: ', paymentData.body.external_reference);
            console.log(request.query);
            console.log(request.body);
        }

        //return success response to client
        response
        .status(204);
    }catch(error){
        console.log(error);
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

            const products = productDTO.orderItems(cart);

            const result = await paymentService.createOrder(products);
            console.log('TRANSACTION ID: ', result.body);
            console.log('BODY:', result.body.init_point);
            console.log('BODY:', result.body.notification_url);
            console.log('************************************************************');

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