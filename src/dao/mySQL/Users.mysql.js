/********************************************/
//IMPORT MODULES
/********************************************/
import CustomError from '../../util/customError.js';

class UserDB{

    constructor(){
    }

    async createUser(newUserData){
        try{
            //HERE GOES MYSQL DATA BASE ACCESS LOGIC

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }

    async getUserByEmail(userEmail){
        try{
            //HERE GOES MYSQL DATA BASE ACCESS LOGIC

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }

    async updatePassword(email, newPassword){
        try{
            //HERE GOES MYSQL DATA BASE ACCESS LOGIC

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }   
    }    
}

const userDB = new UserDB(); //INITIALIZE THE CART MANAGER

export default userDB;



