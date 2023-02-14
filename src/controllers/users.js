/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import model from "../dao/models/users.js";

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
router.get('/', async (request, response)=> {
    try{
        const userList = await model.find();
        response.json(200, userList);

    }catch(error){
        
        response.json(400, 'The following error has occurred: ' + error.message);

    }
});

/********************************************/
//POST METHOD ENDPOINTS
/********************************************/
router.post('/', async (request, response)=> {
    
    const userObj = request.body;
    const responseDB = await model.create(userObj);
    response.json('end point POST users');

});

export default router;