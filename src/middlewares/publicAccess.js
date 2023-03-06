function publicAccess(request, response, next){
    
    const isAuthenticated = request.session.user ? true : false;

    if(isAuthenticated){
        response.redirect('/api/views/profile');
    }else{
        next();
    }
}

export default publicAccess;