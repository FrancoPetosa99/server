import cookieExtractor from "../util/cookieExtractor.js";
import jwtManager from "../util/jwt.js";

function privateAccess(request, response, next){
    
    const cookieName = 'authToken';
    const authToken = cookieExtractor(request, cookieName);

    if(authToken){
        const isTokenValid = jwtManager.verifyToken(authToken);
        if(isTokenValid){
            return next();
        }
    }
    
    response.redirect('/api/views/logging');
}

export default privateAccess;