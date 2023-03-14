/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import userService from "../services/UserService.js";
import passport from "passport";

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
router.get('/profile', async (request, response)=> {
    try{

        const email = request.session.user.email;

        const userData = await userService.getUserData(email);
        
        const responseObj = {};
        responseObj.data = userData;

        response.json(200, responseObj);
    }catch(error){
        response.json(400, 'The following error has occurred: ' + error.message);
    }
});

router.get('/failRegister', ()=> {
    const error = {};
    error.message = 'Could not create account';
    response.json(200, error);
});

/********************************************/
//POST METHOD ENDPOINTS
/********************************************/
router.post('/', passport.authenticate('register', {failureRedirect: '/failRegister'}), async (request, response)=> {
    
    try{
    
        const responseObj = {};
        responseObj.message = 'Account succesfully created';
    
        response.json(200, responseObj);
        
    }catch(error){
        console.log(error.message);
        response.json(400, 'The following error has occurred: ' + error.message);
    }
});

/********************************************/
//PATCH METHOD ENDPOINTS
/********************************************/
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
        console.log(error.message);
        const responseObj = {};
        responseObj.message = 'The following error has occurred: ' + error.message;
        response.json(400, responseObj);
    }
});

export default router;