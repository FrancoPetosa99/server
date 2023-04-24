/********************************************/
//IMPORT MODULES
/********************************************/
import model from "./models/ticket.js";
import CustomError from "../../util/customError.js";

/********************************************/
//CART MANAGER CLASS
/********************************************/
class TicketDB{

    constructor(){}

    async createTicket(data){
        try{
            const newTicket = await model.create(data);
            if(newTicket) return newTicket.code;
        }catch(error){
            throw new CustomError(`An unexpected error has occurred: ${error.message}`, 500);
        }   
    }
}

const cartDB = new TicketDB(); //INITIALIZE THE CART MANAGER

export default cartDB;