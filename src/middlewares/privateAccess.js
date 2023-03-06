function privateAccess(request, response, next){

    const isAuthenticated = request.session.user ? true : false;

    if(isAuthenticated){
        next();
    }else{
        response.redirect('/api/views/logging');
    }
}

export default privateAccess;