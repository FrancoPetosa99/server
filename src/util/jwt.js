import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/env.config.js';

function JWTManager(){

    function generateToken(payload, time = '20m'){
        const token = jwt.sign({payload}, JWT_SECRET_KEY, { expiresIn: time });
        return token;
    }
    
    function parseToken(token){

        let payload = null;

        //check the token sent on the request is valid
        jwt.verify(token, JWT_SECRET_KEY, (error, credentials)=> {
            if(error) payload = null;
            else payload = credentials.payload;
        });

        return payload;
    }

    function verifyToken(token){
        let isTokenValid = true;

        jwt.verify(token, JWT_SECRET_KEY, (error)=> {
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