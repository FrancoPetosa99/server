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
                    const user = jwtManager.parseToken(authToken);
                    const isRoleValid = roles.includes(user.role);

                    if(!isRoleValid) {
                        const renderObj = {
                            title: 'Denied Access',
                            cssFileName: 'deniedAccess.css',
                        };
                        
                        return response.render('deniedAccess', renderObj);
                    }

                    request.user = user;
                }

                return next();
            }
        }
        
        response.redirect('/api/views/logging')
    }
}

export default privateAccess;