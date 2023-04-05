/********************************************/
//IMPORT MODULES
/********************************************/
import users from './models/users.js'
import CustomError from '../../util/customError.js';

/********************************************/
//CART MANAGER CLASS
/********************************************/
class UserDB{

    constructor(){
    }

    async createUser(newUserData){
        try{
            const mongodbResponse = await users.create(newUserData);

            const usermappedObj = {};
            usermappedObj.firstName = mongodbResponse.firstName;
            usermappedObj.lastName = mongodbResponse.lastName;
            usermappedObj.email = mongodbResponse.email;
            usermappedObj.password = mongodbResponse.password;
            usermappedObj.id = mongodbResponse._id;
    
            return usermappedObj;

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }

    async getUserByEmail(userEmail){
        const mongodbResponse = await users.findOne({email: userEmail});

        if(mongodbResponse){
            //map mongo db query response
            const user =  {};
            user.firstName = mongodbResponse.firstName;
            user.lastName = mongodbResponse.lastName;
            user.email = mongodbResponse.email;
            user.active = mongodbResponse.active;
            user.role = mongodbResponse.role;
            user.password = mongodbResponse.password;
            user.id = mongodbResponse._id;
            user.birthdate = mongodbResponse.birthdate;
            console.log(user);
            return user;
        }
        return null;
    }

    async updatePassword(email, newPassword){
    
        return users.updateOne({ email }, { password: newPassword});
        
    }    
}

const userDB = new UserDB(); //INITIALIZE THE CART MANAGER

export default userDB;



