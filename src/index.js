import express from 'express';
import { routes } from './routes/routes.js';

const port = 8080;
const app = express();
routes(app);

app.listen(port, ()=> {
    console.log('the server is running');
});

//default GET end point
app.get('/', (request, response)=> {
    response.send('<h1>Node server running...</h1>');
});