function cookieExtractor(request, cookieName){
    let token = null;

    if(request && request.cookies){
        token = request.cookies[cookieName];
    }

    return token;
}

export default cookieExtractor;