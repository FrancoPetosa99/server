/********************************************/
//IMPORT MODULES
/********************************************/
import express from 'express';
import routes from './routes/routes.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import ServerSocket from './sockets/index.js';

/********************************************/
//CONFIGURABLE VARIABLES
/********************************************/
const port = 8080;

/********************************************/
//RUN SERVER
/********************************************/
const app = express();
const httpServer = app.listen(port, ()=> console.log(`Node Server running at port: ${port}`));

/********************************************/
//SERVER CONFIGURATIONS
/********************************************/
app.use(express.json());

//ENGINE TEMPLATE CONFIGURATIONS
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

routes(app); //INITIALIZE SERVER ROUTES
const serverSocket = ServerSocket(httpServer); //INITIALIZE SOCKET SERVER

export {serverSocket};







