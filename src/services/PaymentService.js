import { paymentDB } from '../dao/index.js';
import mercadopago from 'mercadopago';
import { MP_ACCESS_TOKEN } from '../config/env.config.js';

class PaymentService {
    
    constructor(){
        this.mp = mercadopago;
        this.mp.configure({
            access_token: MP_ACCESS_TOKEN
        });
    }

    async createOrder(products, cartId){
       return this.mp.preferences.create({
            items: products,
            back_urls: {
                success: '',
                failure: '',
                pending: ''
            },
            notification_url: 'https://ab1d-186-137-136-245.ngrok-free.app/api/payments/webhook',
            external_reference: cartId
       });
    }

    async getPaymentById(paymentId){
        return this.mp.payment.findById(paymentId);
    }

    async createPayment(payment){
        return paymentDB.createPayment(payment);
    }
    
}


const paymentService = new PaymentService();

export default paymentService;