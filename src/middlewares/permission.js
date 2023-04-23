function permission(roles){
    
    roles = roles || ['Standard', 'Admin', 'Premium', 'Master'];

    return function(request, response, next){
        try{

            //check the client has permissions
            const userRole = request.user.role;
            const isRoleValid = roles.includes(userRole);

            if(!isRoleValid){
                return response
                .status(403)
                .json({
                    status: 'Error',
                    error:{
                        message: 'Client does not have permission'
                    }
                });
            }

            //if validation are passed, the middleware allows to continue
            next();

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

export default permission;