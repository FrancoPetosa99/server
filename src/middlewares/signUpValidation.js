import moment from 'moment';
import { body, validationResult } from "express-validator";

function checkUserAge(date){
    const birthdate = new moment(date, 'YYYY/MM/DD');
    const currentDate = new moment();
    const age = currentDate.diff(birthdate, 'years');
    return age >= 18;
}

function checkPasswordAndConfirmPassword(password, {req}){
    return password === req.body.confirmPassword;
}

/*
    VALIDATIONS

    Params: firstName, lastName, email, birthdate, password, confirmPassword
        
        firstName:  Required
                    Only alpha characters are allow

        lastName:   Required
                    Only alpha characters are allow

        birtdate:   Required
                    Format must be YYYY/MM/DD
                    Users must be at least 18 years old
        
        email:      Required
                    Must valid e.g test@example.com

        password:   Required
                    Length must be greater than or equal to 8
                    Must contain one or more uppercase characters
                    Must contain one or more lowercase characters
                    Must contain one or more numeric values
                    Must contain one or more special characters
                    Must be equal to confirmPassword parameter

*/
const validationRules = {
    firstName: [
        'Required',
        'Only alpha characters are allow'
    ],
    lastName: [
        'Required',
        'Only alpha characters are allow'
    ],
    birtdate: [
        'Required',
        'Format must be YYYY/MM/DD',
        'Users must be at least 18 years old'
    ],
    email: [
        'Required',
        'Must valid e.g test@example.com'
    ],
    password: [
        'Required',
        'Length must be greater than or equal to 8',
        'Must contain one or more uppercase characters',
        'Must contain one or more lowercase characters',
        'Must contain one or more numeric values',
       ' Must contain one or more special characters',
        'Must be equal to confirmPassword parameter'
    ]
}

const signUpValidation = [
    body('email')
        .exists().withMessage('Required')
        .isEmail().withMessage('Must be a valid email address'),
    body('firstName')
        .exists().withMessage('Required')
        .isAlpha().withMessage('Must contain only alphabetical chars'),
    body('lastName')
        .exists().withMessage('Required')
        .isAlpha().withMessage('Must contain only alphabetical chars'),
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
        .custom(checkPasswordAndConfirmPassword).withMessage('Confirmation password is not correct'),
    body('confirmPassword')
        .exists().withMessage('Required'),
    body('birthdate')
        .exists().withMessage('Required')
        .isDate('YYYY/MM/DD').withMessage('Date format must be YY/MM/DD')
        .custom(checkUserAge).withMessage('Users must be at least 18 years old'),
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

export default signUpValidation;