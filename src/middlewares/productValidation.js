import { body, validationResult } from "express-validator";

/*
    VALIDATIONS

    Params: title, description, price, image, code, stock, category
        
        title:  Required
                String

        description:   Required
                       String
        price:  Required
                Float

        image:  Required
        
        code: Required
              Integer

        stock: Required
               Integer

        category Required
                 String
        
        available: Required
                   Boolean

*/

const productValidation = [
    body('title')
        .exists().withMessage('Required')
        .isString().withMessage('Must be a string value'),
    body('description')
        .exists().withMessage('Required')
        .isString().withMessage('Must be a string value'),
    body('price')
        .exists().withMessage('Required')
        .isFloat().withMessage('Must be a float value'),
    body('code')
        .exists().withMessage('Required')
        .isInt().withMessage('Must be a integer value'),
    body('stock')
        .exists().withMessage('Required')
        .isInt().withMessage('Must be a integer value'),
    body('category')
        .exists().withMessage('Required')
        .isString().withMessage('Must be a string value'),
    body('available')
        .exists().withMessage('Required')
        .isBoolean().withMessage('Must be a boolean value'),
    
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

export default productValidation;