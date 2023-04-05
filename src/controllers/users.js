/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import userService from "../services/UserService.js";
import jwtManager from "../util/jwt.js";
import signUpValidation from "../middlewares/signUpValidation.js";
import CustomError from "../util/customError.js";

const router = Router(); //INITIALIZE ROUTER

router.get('/failRegister', ()=> {
    const error = {};
    error.message = 'Could not create account';
    response.json(200, error);
});

router.post('/', signUpValidation, async (request, response)=> {
    try{
        const { firstName, lastName, email, password, role } = request.body;

        const userExist = await userService.checkUserExists(email);

        if(userExist) throw new CustomError(400, `Already exist user with email ${email}`);

        const newUserData = {};
        newUserData.firstName = firstName;
        newUserData.lastName = lastName;
        newUserData.email = email;
        newUserData.password = password;
        newUserData.role = role;
        
        //create user on data base
        const userData = await userService.createNewUser(newUserData);

        //generate jwt token and send to client by cookies
        const token = jwtManager.generateToken(userData);
        
        //send response to client and the access token by cookies
        response
        .cookie('authToken', token)
        .status(201)
        .json({
            status: 'Success',
            message: 'Account successfully created'
        });

    }catch(error){
        //handle error response

        const statusCode = error.statusCode || 500;
        const message = error.message || 'An unexpected error has ocurred';

        //send response to client
        response
        .status(statusCode)
        .json({
            status: 'Error',
            error: {
                message: message
            }
        });
    }
});

router.patch('/', async (request, response)=> {
    
    try{
        
        const { email, newPassword, oldPassword } = request.body;

        const userData = {};
        userData.email = email;
        userData.oldPassword = oldPassword;
        userData.newPassword = newPassword;

        await userService.resetPassword(userData);

        const responseObj = {};
        responseObj.message = 'Password successfully updated';
    
        response.json(200, responseObj);
        
    }catch(error){
        //build error response
        const errorResponseObj = {};
        errorResponseObj.status = 'Error';
        errorResponseObj.error = error.message || 'An unexpected error has ocurred';

        //send response to client
        response.json(500, errorResponseObj);
    }
});

export default router;