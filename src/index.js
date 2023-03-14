/********************************************/
//IMPORT MODULES
/********************************************/
import express from 'express';
import routes from './routes/routes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import ServerSocket from './sockets/index.js';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport.js';

const app = express();

/********************************************/
//CONFIGURABLE VARIABLES
/********************************************/
const port = 8080;

const mongodbPassword = 'p';
const mongodbDataBaseName = 'ecommerce';
const mongoURL = `mongodb+srv://usertest:${mongodbPassword}@clusterserver.n5yxv60.mongodb.net/${mongodbDataBaseName}?retryWrites=true&w=majority`;
//const mongoURL = mongodb://localhost:27017/coderhouse

/********************************************/
//RUN SERVER
/********************************************/
const httpServer = app.listen(port, ()=> console.log(`Node Server running at port: ${port}`));
app.get('/', ( /*request, response*/ )=> console.log(`Node Server running at port: ${port}`));

/********************************************/
//MIDDLEWARE CONFIGURATIONS
//Description: This functions are executed first before the request reaches the endpoint
/********************************************/
app.use(express.json()); //convert data sent on the body request to javascript object
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoURL,
        mongoOptions: {useNewUrlParser: true, useUniFiedTopology: true}
    }),
    secret: 'secretCode',
    resave: false,
    saveUninitialized: false
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const serverSocket = ServerSocket(httpServer); //INITIALIZE SOCKET SERVER

/********************************************/
//DATA BASE CONNECTION CONFIGURATIONS
//Description: connects the api to the mongodb data base (no relational data base)
/********************************************/
mongoose.connect(mongoURL, (error)=> {
    if(error) {
        console.log(error);
        process.exit();
    }
});

/********************************************/
//ENGINE TEMPLATE CONFIGURATIONS
//Description: this configurations allow the api to work with engine templates (type: module)
/********************************************/
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

/********************************************/
//INITIALIZE SERVER ROUTES
//Description: directs requests to targeted endpoint
/********************************************/
routes(app);


/********************************************/
//MODULES EXPORTED
/********************************************/
export { serverSocket };

//https://drive.google.com/drive/u/0/folders/1t9COby1-r5xI2HdHfEyyyhRyp9EVXGVE

//GitHub Client Secret: dd50fe05fd5571fdf8f23177131731c6342836b1