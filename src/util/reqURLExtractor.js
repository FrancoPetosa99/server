function reqURLExtractor(request){
    const { protocol, originalUrl } = request;
    const fullURL = protocol + '://' + request.get('host') + originalUrl;
    return fullURL;
}

export default reqURLExtractor;