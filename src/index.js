import express from 'express';
import { routes } from './routes/routes.js';

//CONFIGURABLE VARIABLES
const port = 8080;

const app = express();
app.use(express.json());
routes(app);


//default GET end point
app.get('/', (request, response)=> {
    response.send(200, '<h1>Node server running...</h1>');
    //response.json(200, '<h1>Node server running...</h1>');
});


app.listen(port, ()=> {
    console.log('the server is running');
});