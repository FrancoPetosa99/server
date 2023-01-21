/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
router.get('/', async (request, response)=> {

    response.json('end point GET categories')

});

export default router;