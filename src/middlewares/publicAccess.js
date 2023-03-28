import cookieExtractor from "../util/cookieExtractor.js";
import jwtManager from "../util/jwt.js";

function publicAccess(request, response, next){
    
    const cookieName = 'authToken';
    const authToken = cookieExtractor(request, cookieName);

    if(authToken){
        const isTokenValid = jwtManager.verifyToken(authToken);
        if(isTokenValid){
            return response.redirect('/api/views/home');
        }
    } 

    next();
}

export default publicAccess;