import mercadopago from 'mercadopago';
import { MP_ACCESS_TOKEN } from '../config/env.config.js';

class PaymentService {
    
    constructor(){
        this.mp = mercadopago;
        this.mp.configure({
            access_token: MP_ACCESS_TOKEN
        });
    }

    async createOrder(products){
       return this.mp.preferences.create({
            items: products,
            back_urls: {
                success: '',
                failure: '',
                pending: ''
            },
            notification_url: 'https://9826-186-137-136-245.ngrok-free.app/api/payments/webhook',
            external_reference: 'TESTIDFRANCO'
       });
    }

    async getPaymentData(paymentId){
        const paymentData = await this.mp.payment.findById(paymentId);
        return paymentData;
    }
    
}


const paymentService = new PaymentService();

export default paymentService;