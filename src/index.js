/********************************************/
//IMPORT MODULES
/********************************************/
import { PORT } from './config/env.config.js';
import express from 'express';
import routes from './routes/routes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// import MongoStore from 'connect-mongo';
import connectMongodb from './db/mongodb.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import ServerSocket from './sockets/index.js';
import passport from 'passport';
import initializePassport from './config/passport.js';
import swagger from './docs/swaggerDocs.js';

const app = express();

/********************************************/
//RUN SERVER
/********************************************/
const httpServer = app.listen(PORT, ()=> console.log(`Node Server running at port: ${PORT}`));
app.get('/', ( /*request, response*/ )=> console.log(`Node Server running at port: ${PORT}`));

/********************************************/
//MIDDLEWARE CONFIGURATIONS
//Description: This functions are executed first before the request reaches the endpoint
/********************************************/
app.use('/docs', swagger.ui, swagger.setUp());
app.use(express.json()); //convert data sent on the body request to javascript object
app.use(cookieParser()); //convert data sent from cookies browser to javascript object
app.use(express.static(__dirname + '/public'));
app.use(session({
    // store: MongoStore.create({ // save sessions on mongodb data base
    //     mongoUrl: mongoURL,
    //     mongoOptions: {useNewUrlParser: true, useUniFiedTopology: true}
    // }),
    secret: 'secretCode',
    resave: false,
    saveUninitialized: false
}));
initializePassport();
app.use(passport.initialize());

const serverSocket = ServerSocket(httpServer); //INITIALIZE SOCKET SERVER

/********************************************/
//ENGINE TEMPLATE CONFIGURATIONS
//Description: this configurations allow the api to work with engine templates (type: module)
/********************************************/
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

connectMongodb(); //CONNECT SERVER TO MONGODB DATA BASE
routes(app); //INITIALIZE SERVER ROUTES


/********************************************/
//MODULES EXPORTED
/********************************************/
export { serverSocket };

//https://drive.google.com/drive/u/0/folders/1t9COby1-r5xI2HdHfEyyyhRyp9EVXGVE

//GitHub Client Secret: dd50fe05fd5571fdf8f23177131731c6342836b1