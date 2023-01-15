// import users from '../controllers/users';
import products from '../users/controller.products.js'

const routes = (app)=>  {
    app.use('/products', products);
    // app.use('/products', products);
    // app.use('/categories', categories);
}


export {
    routes
}