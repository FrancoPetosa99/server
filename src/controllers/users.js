/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
router.get('/', async (request, response)=> {

    response.json('end point GET users')

});

export default router;