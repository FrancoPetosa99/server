/********************************************/
//IMPORT MODULES
/********************************************/
import express from 'express';
import routes from './routes/routes.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import ServerSocket from './sockets/index.js';
import mongoose from 'mongoose';

/********************************************/
//CONFIGURABLE VARIABLES
/********************************************/
const port = 8080;

/********************************************/
//RUN SERVER
/********************************************/
const app = express();
const httpServer = app.listen(port, ()=> console.log(`Node Server running at port: ${port}`));

app.get('/', (request, response)=> {
    console.log(`Node Server running at port: ${port}`);
    response.send(`<h1>Server is running at port ${port}...</h1>`);
});

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

/********************************************/
//DATA BASE CONNECTION CONFIGURATIONS
/********************************************/

const password = 'p';
const db = 'ecommerce';
const mongodbURI = `mongodb+srv://usertest:${password}@clusterserver.n5yxv60.mongodb.net/${db}?retryWrites=true&w=majority`;

mongoose.connect(mongodbURI, (error)=> {
    if(error) {
        console.log(error);
        process.exit();
    }
});

// mongoose.connect(`mongodb://localhost:27017/coderhouse`, (error)=> {
//     if(error) {
//         console.log(error);
//         process.exit();
//     }
// });


export {serverSocket};


//https://drive.google.com/drive/u/0/folders/1IUE6fpYr-82KV_07vFQqlBo_JF9z3u0L






