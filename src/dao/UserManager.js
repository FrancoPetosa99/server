/********************************************/
//IMPORT MODULES
/********************************************/
import users from '../dao/models/users.js'

/********************************************/
//CART MANAGER CLASS
/********************************************/
class UserManager{

    constructor(){
    }

    async createUser(newUserData){

        const mongodbResponse = await users.create(newUserData);
        
        const usermappedObj = {};
        usermappedObj.firstName = mongodbResponse.firstName;
        usermappedObj.lastName = mongodbResponse.lastName;
        usermappedObj.email = mongodbResponse.email;
        usermappedObj.password = mongodbResponse.password;
        usermappedObj.id = mongodbResponse._id;

        return usermappedObj;
    }

    async getUserByEmail(userEmail){

        let user = null;

        const mongodbResponse = await users.findOne({email: userEmail});

        if(mongodbResponse){
            //map mongo db query response
            user =  {};
            user.firstName = mongodbResponse.firstName;
            user.lastName = mongodbResponse.lastName;
            user.email = mongodbResponse.email;
            user.active = mongodbResponse.active;
            user.password = mongodbResponse.password;
            user.id = mongodbResponse._id;
        }

        return user;
    }

    async updatePassword(email, newPassword){
    
        return users.updateOne({ email }, { password: newPassword});
        
    }
    
}

const userManager = new UserManager(); //INITIALIZE THE CART MANAGER

export default userManager;



