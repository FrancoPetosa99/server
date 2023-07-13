/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import paymentService from "../services/PaymentService.js";
import cartService from "../services/CartService.js";
import authentication from "../middlewares/authentication.js";
import permission from "../middlewares/permission.js";
import productDTO from "../dto/Product.dto.js";
import paymentDTO from "../dto/Payment.dto.js";

const router = Router(); //INITIALIZE ROUTER

router.post('/webhook', async (request, response)=> {
    try{
        const payment = request.query;
       
        if(payment.type == 'payment'){
            const paymentId = payment["data.id"];
            const paymentData = await paymentService.getPaymentById(paymentId);

            if(paymentData.body.status == 'approved'){
                
                const cartId = paymentData.body.external_reference;

                const payment = paymentDTO.mp(paymentData.body);
                
                const result = await Promise.all([
                    paymentService.createPayment(payment),
                    cartService.emptyCart(cartId)
                ]);

                console.log(result);

            }
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
            
            const { purchasedList, unpurchasedList } = await cartService.reserveProducts(cart.products);

            if(purchasedList.length == 0) throw new Error('Several errors have ocurred and could not complete process');

            const products = productDTO.orderItems(purchasedList);

            const result = await paymentService.createOrder(products, cartId);
            console.log('BODY:', result.body.init_point);
            console.log('************************************************************');
            console.log(cartId);

            //return success response to client
            response
            .status(200)
            .json({
                status: 'Success',
                message: unpurchasedList.length == 0 ? 'Payment order successfully created' : 'Payment order created with some minor errors',
                data: {
                    unpurchasedList: unpurchasedList,
                    paymentURL: result.body.init_point
                }
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