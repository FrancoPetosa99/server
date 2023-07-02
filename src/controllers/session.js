/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import passport from "passport";
import userService from "../services/UserService.js";
import userDTO from "../dto/Users.dto.js";
import jwtManager from "../util/jwt.js";
import signInValidation from "../middlewares/signInValidation.js";
import authentication from "../middlewares/authentication.js";

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
router.get('/logout', (request, response)=> {
    try{
        const responseObj = {};
        responseObj.status = 'Success';
        responseObj.message = 'succesfully logout';
        
        response
        .clearCookie('authToken')
        .status(200)
        .json(responseObj);

    }catch(error){
        //build error response
        const errorResponseObj = {};
        errorResponseObj.status = 'Error';
        errorResponseObj.error = error.message || 'An unexpected error has ocurred';

        //send response to client
        response
        .status(500)
        .json(errorResponseObj); 
    }
});

router.get('/failLogin', ()=> {
    const error = {};
    error.message = 'Could not loggin';
    response
    .status(400)
    .json(error);
});

router.get('/github', passport.authenticate('github', {scope: ['user: email'] }));

router.get('/githubCallback', passport.authenticate('github',  {failureRedirect: '/logging'}), (request, response)=> {
    try{
        request.session.user = request.user;
        response.redirect('/api/views/profile');

    }catch(error){
        console.log(error);
    }
});

router.get('/current', authentication('authToken'), async (request, response)=> {
    try{

        const userEmail = request.user.email;
        const userData = await userService.getUserByEmail(userEmail);

        const userPublicData = userDTO.public(userData);

       //send response to client and the access token by cookies
       response
       .status(200)
       .json({
            status: 'Success',
            data: userPublicData
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
            error:{
                message: message
            }
        });
    }
});

/********************************************/
//POST METHOD ENDPOINTS
/********************************************/
router.post('/', signInValidation, async (request, response)=> {
    try{

        const credentials = userDTO.loggin(request.body);

        //check if email and password are valid
        const userData = await userService.checkEmailAndPassword(credentials);

        //update last session date
        const { email } = userData;
        await userService.updateLastSession(email);

        //avoids put into the token sensitive user data
        const userTokenData = userDTO.token(userData);

        //generate jwt token - expiry time 60 minutes
        const token = jwtManager.generateToken(userTokenData, '60m');
        
        //send response to client and token by cookies
        response
        .cookie('authToken', token)
        .status(200)
        .json({
            status: 'Success',
            message: 'Successfully loggin'
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


/********************************************/
//PUT METHOD ENDPOINTS
/********************************************/

/********************************************/
//DELETE METHOD ENDPOINTS
/********************************************/

export default router;
