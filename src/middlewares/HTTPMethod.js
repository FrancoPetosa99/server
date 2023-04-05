function HTTPMethod(validMethods){
    return function(request, response, next){
        const HTTPMethod = request.method;
        const isHTTPMethodValid = validMethods.includes(HTTPMethod);
        if(!isHTTPMethodValid){
            response
            .status(405)
            .json({
                status: 'Error',
                error: {
                    message: `API does not support ${HTTPMethod} method for the requested resource`
                }
            });
        }
        next();
    }
}

export default HTTPMethod;