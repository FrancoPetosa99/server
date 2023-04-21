import { body, validationResult } from "express-validator";

/*
    VALIDATIONS

    Params: email, password
    
        email:      Required

        password:   Required
*/
const signInValidation = [
    body('email')
        .exists().withMessage('Required')
        .isEmail().withMessage('Must be a valid email address'),
    body('password')
        .exists().withMessage('Required'),
        
    //once validations process are completed...
    (request, response, next) => {
        const { errors } = validationResult(request);
        
        if(errors.length > 0){
            return response
            .status(412)
            .json({
                status: 'Error',
                error:{
                    message: 'Missing or invalid data sent to server',
                    errorList: errors,
                }
            });
        }

        next();
    }
];

export default signInValidation;