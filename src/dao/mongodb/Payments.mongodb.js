/********************************************/
//IMPORT MODULES
/********************************************/
import model from './models/payments.js';
import CustomError from '../../util/customError.js';

class PaymentDB{

    constructor(){}

    async createPayment(data){
        try{
            const newTicket = await model.create(data);
            return newTicket.code;
        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }   
    }
}

const paymentDB = new PaymentDB();

export default paymentDB;