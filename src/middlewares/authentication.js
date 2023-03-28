import cookieExtractor from "../util/cookieExtractor.js";
import jwtManager from "../util/jwt.js";

function authentication(cookieName){
    return function(request, response, next){
        
        try{
            const authToken = cookieExtractor(request, cookieName);
        
            if(authToken){
                const payload = jwtManager.parseToken(authToken);
                if(payload){
                    request.user = payload;
                    return next(); //if validation are passed, the middleware allows to continue
                }
            }

            response
            .status(401)
            .json({
                status: 'Error',
                error:{
                    message: 'Invalid credentials provided by client'
                }
            });

        }catch(error){
            //build error response
            const errorResponseObj = {};
            errorResponseObj.status = 'Error';
            errorResponseObj.error = error.message || 'An unexpected error has ocurred';

            //send response to client
            response.json(500, errorResponseObj);
        }
    }
}

export default authentication;