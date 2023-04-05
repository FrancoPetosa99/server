import jwt from 'jsonwebtoken';

function JWTManager(){

    const SECRET_KEY = process.env.JWT_SECRET_KEY;

    function generateToken(payload){
        const token = jwt.sign({payload}, SECRET_KEY, { expiresIn: '20m' });
        return token;
    }
    
    function parseToken(token){

        let payload = null;

        //check the token sent on the request is valid
        jwt.verify(token, SECRET_KEY, (error, credentials)=> {
            if(error) payload = null;
            else payload = credentials.payload;
        });

        return payload;
    }

    function verifyToken(token){
        let isTokenValid = true;

        jwt.verify(token, SECRET_KEY, (error)=> {
            if(error) isTokenValid = false;
        });

        return isTokenValid;
    }
    
    return {
        generateToken,
        parseToken,
        verifyToken
    }

}

const jwtManager = JWTManager();

export default jwtManager;