import { Router } from "express";

const router = Router();

//end point GET categories
router.get('/', async (request, response)=> {

    response.json('end point GET categories')

});

export default router;