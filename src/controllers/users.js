/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import userService from "../services/UserService.js";

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

/********************************************/
//POST METHOD ENDPOINTS
/********************************************/
router.post('/', async (request, response)=> {
    
    try{
        
        const newUserData = request.body;

        await userService.createNewUser(newUserData);

        const responseObj = {};
        responseObj.message = 'Account succesfully created';
    
        response.json(200, responseObj);
        
    }catch(error){
        response.json(400, 'The following error has occurred: ' + error.message);
    }
});

export default router;