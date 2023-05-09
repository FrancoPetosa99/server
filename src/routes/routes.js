import products from '../controllers/products.js';
import users from '../controllers/users.js';
import categories from '../controllers/categories.js';
import carts from '../controllers/carts.js';
import views from '../controllers/views.js';
import session from '../controllers/session.js';
import email from '../controllers/email.js';
import { HTTPMethod } from '../middlewares/index.js';

const routes = (app)=>  {
    app.use('/api/products', HTTPMethod(['GET', 'POST', 'PATCH', 'DELETE']), products);
    app.use('/api/users', HTTPMethod(['GET', 'POST', 'PATCH']), users);
    app.use('/api/categories', HTTPMethod(['GET', 'POST', 'PATCH', 'DELETE']), categories);
    app.use('/api/carts', HTTPMethod(['GET', 'POST', 'PATCH', 'DELETE']), carts);
    app.use('/api/views', HTTPMethod(['GET']), views);
    app.use('/api/session', HTTPMethod(['GET', 'POST']), session);
    app.use('/api/email', HTTPMethod(['POST']), email)

    //In case client requests for a not supported resource by the API
    app.use('*', (request, response)=> {
        response
        .status(404)
        .json({
            status: 'Error',
            error: {
                message: 'API does not support requested resource'
            }
        });
    });
}
export default routes;