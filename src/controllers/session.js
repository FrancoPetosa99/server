/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import userService from "../services/UserService.js";

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
router.get('/logout', (request, response)=> {
    try{
        request.session.destroy((error)=> {
            if(error) throw new Error(error);
            //response.redirect('api/views/logging');
            const responseObj = {};
            responseObj.message = 'succesfully logout';
            response.json(200, responseObj);
        });
    }catch(error){
        const responseObj = {};
        responseObj.message = 'unhandle error has occurred';
        response.json(500, responseObj);
    }
});

/********************************************/
//POST METHOD ENDPOINTS
/********************************************/
router.post('/', async (request, response)=> {

    const responseObj = {};

    try{
        const { email, password } = request.body;

        const userData = await userService.checkEmailAndPassword(email, password)

        request.session.user = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            id: userData.id
        }
        
        responseObj.message = 'Successfully loggin';
        response.json(200, responseObj); 
    }catch(error){
        responseObj.message = 'email address and password are not correct';
        response.json(400, responseObj);   
    }
});

/********************************************/
//PUT METHOD ENDPOINTS
/********************************************/

/********************************************/
//DELETE METHOD ENDPOINTS
/********************************************/

export default router;
