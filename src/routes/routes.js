import products from '../controllers/products.js';
import users from '../controllers/users.js';
import categories from '../controllers/categories.js';
import carts from '../controllers/carts.js';
import chats from '../controllers/chats.js';
import views from '../controllers/views.js';
import session from '../controllers/session.js'

const routes = (app)=>  {
    app.use('/api/products', products);
    app.use('/api/users', users);
    app.use('/api/categories', categories);
    app.use('/api/carts', carts);
    app.use('/api/chats', chats);
    app.use('/api/views', views);
    app.use('/api/session', session);

    //In case client rquests for a not supported resource by the API
    app.use('*', (request, response)=> {
        response
        .status(404)
        .json({
            status: 'Error',
            error: {
                message: 'API does not support requested resource'
            }
        })
    });
}
export default routes;