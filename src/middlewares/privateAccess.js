import cookieExtractor from "../util/cookieExtractor.js";
import jwtManager from "../util/jwt.js";

function privateAccess(roles){
    return function(request, response, next){
    
        const cookieName = 'authToken';
        const authToken = cookieExtractor(request, cookieName);

        if(authToken){
            const isTokenValid = jwtManager.verifyToken(authToken);
            if(isTokenValid){
                if(roles){
                    //check the client has permissions
                    const { role } = jwtManager.parseToken(authToken);
                    const isRoleValid = roles.includes(role);

                    const renderObj = {
                        title: 'Denied Access',
                        cssFileName: 'deniedAccess.css',
                    };

                    if(!isRoleValid) return response.render('deniedAccess', renderObj);
                }

                return next();
            }
        }
        
        response.redirect('/api/views/logging')
    }
}

export default privateAccess;