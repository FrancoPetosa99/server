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
}

export default routes;