/********************************************/
//IMPORT MODULES
/********************************************/
import users from './models/users.js'
import CustomError from '../../util/customError.js';

class UserDB{

    constructor(){
    }

    async createUser(newUserData){
        try{
            const newUser = await users.create(newUserData);
            return newUser;

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }

    async getUserByEmail(userEmail){
        try{
            const user = await users.findOne({email: userEmail});
            return user;

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }

    async resetPassword(userEmail, newPassword){
        try{
            return users.updateOne({ email: userEmail}, {password: newPassword });

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }
}

const userDB = new UserDB(); //INITIALIZE THE CART MANAGER

export default userDB;



