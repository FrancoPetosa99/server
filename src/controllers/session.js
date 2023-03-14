/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import passport from "passport";

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

/********************************************/
//POST METHOD ENDPOINTS
/********************************************/
router.post('/', passport.authenticate('login', {failureRedirect: 'failLogin'}), async (request, response)=> {

    const responseObj = {};

    try{

        const { firstName, lastName, email, id } = request.user;

        request.session.user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            id: id
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
