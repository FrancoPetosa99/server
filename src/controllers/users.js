import { Router } from "express";

const router = Router();

//end point GET users
router.get('/', async (request, response)=> {

    response.json('end point GET users')

});

export default router;