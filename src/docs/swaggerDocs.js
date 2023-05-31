import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import __dirname from '../utils.js';

function Swagger(){

    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'API REST - Server documentation',
                description: 'Here goes a brief description'
            }
        },
        apis: [`${__dirname}/docs/**/*.yaml`]
    };
    
    const ui = swaggerUiExpress.serve;

    function setUp(){
        const specs = swaggerJsDoc(options);
        return swaggerUiExpress.setup(specs);
    }

    return {
        setUp,
        ui
    }
}

const swagger = Swagger();

export default swagger;