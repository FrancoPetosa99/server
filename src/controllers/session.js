/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import passport from "passport";
import userService from "../services/UserService.js";
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
    response.json(200, error);
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
        const userData = await userService.getUserData(userEmail);

        const { email, firstName, lastName, birthdate, id, active } = userData;

        const mapUserObj = {};
        mapUserObj.email = email;
        mapUserObj.firstName = firstName;
        mapUserObj.lastName = lastName;
        mapUserObj.birthdate = birthdate;
        mapUserObj.id = id;
        mapUserObj.active = active;

       //send response to client and the access token by cookies
       response
       .status(200)
       .json({
            status: 'Success',
            data: mapUserObj
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

        const { email, password } = request.body;

        //check if email and password are valid
        const userData = await userService.checkEmailAndPassword(email, password);

        //user credentials are valid so generate jwt token
        const token = jwtManager.generateToken(userData);
        
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
