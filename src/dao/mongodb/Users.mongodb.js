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

    async updatePassword(email, newPassword){
        try{

            const mongodbResponse = users.updateOne({ email }, { password: newPassword});
            console.log(mongodbResponse);

            return mongodbResponse;

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }        
    }
}

const userDB = new UserDB(); //INITIALIZE THE CART MANAGER

export default userDB;



