import { body, validationResult } from "express-validator";

function checkConfirmPassword(password, {req}){
    return password === req.body.confirmPassword;
}

/*
    VALIDATIONS

    Params: password, confirmPassword

        password:   Required
                    Length must be greater than or equal to 8
                    Must contain one or more uppercase characters
                    Must contain one or more lowercase characters
                    Must contain one or more numeric values
                    Must contain one or more special characters
                    Must be equal to confirmPassword parameter

*/

const resetPasswordValidation = [
    body('password')
        .exists().withMessage('Required')
        .isStrongPassword().withMessage({
            message: 'Must follow all validation rules',
            validationRules: [
                'Required',
                'Length must be greater than or equal to 8',
                'Must contain one or more uppercase characters',
                'Must contain one or more lowercase characters',
                'Must contain one or more numeric values',
                'Must contain one or more special characters',
                'Must be equal to confirmPassword parameter'
        ]})
        .custom(checkConfirmPassword).withMessage('Confirmation password is not correct'),
    body('confirmPassword')
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

export default resetPasswordValidation;