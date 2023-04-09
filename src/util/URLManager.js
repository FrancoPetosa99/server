function URLManager(request){

    function getProtocol(){
        // http://ejemplo.com/algun/ruta
        const protocol = request.protocol;
        return protocol; //http
    }

    function getSubDomain(){
        // http://wwww.ejemplo.com/algun/ruta
        const subdomain = req.subdomains[0];
        return subdomain; //wwww
    }

    function getHost(){
        // http://ejemplo.com/algun/ruta
        const host = request.get('host');
        return host; // ejemplo.com
    }

    function getPath(){
        // http://ejemplo.com/algun/ruta
        const path = request.protocol;
        return path; // /algun/ruta
    }

    function getFullReqURL(){
        // http://ejemplo.com/algun/ruta
        const { protocol, originalUrl } = request;
        const fullURL = protocol + '://' + request.get('host') + originalUrl;
        return fullURL; // http://ejemplo.com/algun/ruta
    }

    return {
        getProtocol,
        getHost,
        getPath,
        getFullReqURL
    }
}

export default URLManager;