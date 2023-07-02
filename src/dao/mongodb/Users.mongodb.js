/********************************************/
//IMPORT MODULES
/********************************************/
import users from './models/users.js'
import CustomError from '../../util/customError.js';
import moment from 'moment';

class UserDB{

    constructor(){}

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

    async getUsers(){
        try{
            const fields = {
                active: 0, 
                password: 0,
                cartId: 0,
            };

            return users.find({ active: true, role: 'Standard' }, fields);
            
        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }

    async updateLastSession(userEmail){
        try{
            const today = moment().format('DD/MM/YYYY HH:mm');
            return users.updateOne({ email: userEmail}, {lastSessionDate: today });
        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }

    async deleteUsersForInactivity(limitDate){
        try{
            return users.deleteMany({ lastSessionDate: { $lt: limitDate}, role: 'Standard' });
        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }
}

const userDB = new UserDB(); //INITIALIZE THE CART MANAGER

export default userDB;



