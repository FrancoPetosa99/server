import { userDB, cartDB } from "../dao/index.js";
import encrypt from "../util/encrypt.js";
import CustomError from "../util/customError.js";
import getTemplateString from '../templates/resetPassword.template.js'
import transport from "../util/gmail.js";
import jwtManager from "../util/jwt.js";

class UserService{

    constructor(){}

    async createNewUser(newUserData){
        
        const { password } = newUserData;
        
        //hash password
        newUserData.password = encrypt.getHashedPassword(password);

        //assign cart
        const newCart = await cartDB.createCart();
        newUserData.cartId = newCart._id;

        //save new user on db
        const userData = await userDB.createUser(newUserData);
        
        return userData;
    }

    async createNewUserByThird(newUserData){
        
        const userData = await userDB.createUser(newUserData);
        
        return userData;

    }

    async checkEmailAndPassword(credentials){

        const { email, password } = credentials;

        const userData = await userDB.getUserByEmail(email);

        //check user exist
        if(!userData) throw new CustomError(404, `Could not found user with email ${email}`);

        //check passwords matches
        const passwordMatch = encrypt.checkPassword(password, userData.password);
           
        if(!passwordMatch)  throw new CustomError(401, 'Email and password are not correct');

        return userData;
    }

    async resetPassword(credentials){
        const { email, newPassword, confirmPassword } = credentials;
        
        //check user exist
        const userData = await userDB.getUserByEmail(email);
        if(!userData) throw new CustomError(404, `Could not found user with email ${email}`);

        //check new password is not equal to old password
        const passwordMatch = encrypt.checkPassword(newPassword, userData.password);
        if(passwordMatch)  throw new CustomError(400, 'New password must be different from previous password');

        //hash new password
        const hashedPassword = encrypt.getHashedPassword(newPassword);

        return userDB.resetPassword(email, hashedPassword);
    }

    async sendResetPasswordEmail(user){
        const { email, firstName, lastName } = user;
        const token = jwtManager.generateToken({email: email}, '60m');
        const templateString = getTemplateString({firstName, lastName}, `http://localhost:8080/api/views/changePassword/${token}`);
        
        const emailConfig = {
            from: 'coder40305@gmail.com',
            to: email,
            subject: 'Reset password',
            html: templateString
        }

        return transport.sendMail(emailConfig, (error)=> {
            const { code, message } = error;
            if(error) throw new CustomError(code, message);
        });
    }

    async getUserByEmail(userEmail){

        const userData = await userDB.getUserByEmail(userEmail)

        if(!userData) throw new CustomError(404, `Could not found user with email ${email}`);

        return userData;
    }

    async getUserDataById(id){

        const userData = await userDB.getUserDataById(id)

        if(!userData) throw new CustomError(404, `Could not found user with email ${email}`);

        return userData;
    }

    async checkUserExists(email){
        let userExist = false;

        const user = await userDB.getUserByEmail(email);

        if(user) userExist = true;
        
        return userExist;
    }
}


const userService = new UserService();

export default userService;