import mercadopago  from 'mercadopago';
import { MP_ACCESS_TOKEN } from '../config/env.config.js';

class PaymentService {
    
    constructor(){
        this.mp = mercadopago;
        this.mp.configure({
            access_token: MP_ACCESS_TOKEN
        });
    }

    async createOrder(products){
        const order = {};
        order.items = products;
        order.back_urls = {
            success: '',
            failure: '',
            pending: ''
        }
        order.notification_url = 'https://e62b-186-137-136-245.ngrok-free.app/api/payments/webhook';
        const result = await this.mp.preferences.create(order);
        console.log('BODY:', result.body.init_point);
        console.log('BODY:', result.body.notification_url);

    }
    
}


const paymentService = new PaymentService();

export default paymentService;