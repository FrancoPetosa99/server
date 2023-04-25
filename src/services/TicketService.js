import CustomError from "../util/customError.js";
import { ticketDB } from "../dao/index.js";
import UUID from '../util/UUID.js'

class TicketService{

    constructor(){}

    async generateTicket(productList, email){
        if(productList.length > 0){
            //calculate total amount
            const total = productList.reduce((prev, current) => prev + current.price * current.amount, 0);
    
            //generate a UUID
            const ticketCode = UUID.generate();
    
            const ticketData = {};
            ticketData.items = productList;
            ticketData.total = total;
            ticketData.code = ticketCode;
            ticketData.purchaser = email;
            
            return ticketDB.createTicket(ticketData);
        }
    }
    
}


const ticketService = new TicketService();

export default ticketService;