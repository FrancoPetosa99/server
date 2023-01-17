import { Router } from "express";

const router = Router();

//end point GET carts
router.get('/', async (request, response)=> {

    response.json('end point GET carts')

});

export default router;