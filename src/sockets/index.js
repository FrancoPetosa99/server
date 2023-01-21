/********************************************/
//IMPORT MODULES
/********************************************/
import { Server } from 'socket.io';

function ServerSocket(httpServer){

    let clientSocket = 0;

    const socketServer = new Server(httpServer);

    socketServer.on('connection', socket => {

        clientSocket++;

        /********************************************/
        //SOCKET EVENT CLIENT LISTENERS
        /********************************************/
        socket.on('EVENT NAME', data => console.log('DATA SENT FROM CLIENT: ' + data));
        socket.on('EVENT NAME', data => console.log('DATA SENT FROM CLIENT: ' + data));
        socket.on('EVENT NAME', data => console.log('DATA SENT FROM CLIENT: ' + data));

        /********************************************/
        //SOCKET CLIENT COMUNNICATION CHANNELS
        /********************************************/
        // socket.emit('EVENT NAME', 'DATA FOR INDIVIDUAL CLIENT');
        // socket.broadcast.emit('EVENT NAME', 'DATA FOR EVERY CONNECTED CLIENT EXCEPT THE CURRENT ONE');
        // socketServer.emit('EVENT NAME', 'DATA FOR EVERY CONNECTED CLIENT');

        console.log('NEW CLIENT CONNECTED');
        console.log('CURRENT NUMBER: ' + clientSocket);

    });
    
    return socketServer;
}

export default ServerSocket;