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

router.get('/webhook', (request, response)=> {

    console.log('WEBHOOK:', request.query);
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

            await paymentService.createOrder(products);

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