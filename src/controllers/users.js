/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import userService from "../services/UserService.js";
import userDTO from "../dto/Users.dto.js";
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
        const newUserData = userDTO.newUser(request.body);

        const userExist = await userService.checkUserExists(newUserData.email);

        if(userExist) throw new CustomError(400, `Already exist user with email ${newUserData.email}`);

        //create user on data base
        const userData = await userService.createNewUser(newUserData);

        //avoids put into the token sensitive user data
        const userTokenData = userDTO.token(userData);

        //generate jwt token and send to client by cookies
        const token = jwtManager.generateToken(userTokenData);
        
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

router.patch('/passwordReset', async (request, response)=> {
    
    try{
        const credentials = userDTO.resetPassword(request.body);

        await userService.resetPassword(credentials);

        const responseObj = {};
        responseObj.message = 'Password successfully updated';
    
        //send response to client
        response
        .status(200)
        .json({
            status: 'Success',
            message: 'Password successfully updated'
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

export default router;