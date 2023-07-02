/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import userService from "../services/UserService.js";
import userDTO from "../dto/Users.dto.js";
import jwtManager from "../util/jwt.js";
import signUpValidation from "../middlewares/signUpValidation.js";
import CustomError from "../util/customError.js";
import { authentication, resetPasswordValidation, permission } from "../middlewares/index.js";

const router = Router(); //INITIALIZE ROUTER

router.get(
    '/', 
    authentication('authToken') 
    ,permission(['Master','Admin']), 
    async (request, response)=> {
        try{

            const userList = await userService.getUsers()
            //send response to client
            response
            .status(200)
            .json({
                status: 'Success',
                message: 'Users successfully delivered',
                data: userList
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
    }
);

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

router.post('/passwordResetEmail', async (request, response)=> {
    try{
        const { email } = request.body;

        const user = await userService.getUserByEmail(email);

        if(!user) throw new CustomError(404, `User with email ${email} could not be found`);

        await userService.sendResetPasswordEmail(user)

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

router.patch('/passwordReset/', authentication('resetToken'), resetPasswordValidation, async (request, response)=> {
    try{
        const { password, confirmPassword } = request.body;
        const { email } = request.user;

        const credentials = userDTO.resetPassword(email, password, confirmPassword);

        await userService.resetPassword(credentials);

        //send response to client
        response
        .clearCookie('resetToken')
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

router.patch('/premium/uid', authentication('authToken'), resetPasswordValidation, async (request, response)=> {
    try{
        
        //YOUR CODE GOES HERE

        //send response to client
        response
        .status(200)
        .json({
            status: 'Success',
            message: 'User role successfully updated'
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

router.delete(
    '/inactivity', 
    authentication('authToken'),
    permission(['Master','Admin']),
    async (request, response)=> {
        try{

            await userService.deleteUsersForInactivity();
    
            //send response to client
            response
            .status(200)
            .json({
                status: 'Success',
                message: 'Inactive users have been deleted',
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
    }
);

router.delete(
    '/:id', 
    authentication('authToken'),
    permission(['Master','Admin']),
    async (request, response)=> {
        try{

            const userId = request.params.id;
            console.log(userId);
            //send response to client
            response
            .status(200)
            .json({
                status: 'Success',
                message: 'Users successfully delivered',
                data: userList
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
    }
);

export default router;