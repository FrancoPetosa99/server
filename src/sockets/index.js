/********************************************/
//IMPORT MODULES
/********************************************/
import { Server } from 'socket.io';

function ServerSocket(httpServer){

    const socketServer = new Server(httpServer);

    socketServer.on('connection', socket => {

        /********************************************/
        //SOCKET EVENT CLIENT LISTENERS (CLIENT TO SERVER)
        /********************************************/
        // socket.on('EVENT NAME', data => console.log('DATA SENT FROM CLIENT: ' + data));
        // socket.on('EVENT NAME', data => console.log('DATA SENT FROM CLIENT: ' + data));
        
        socket.on('message-sent', async (data) => {
            try{
                await chatService.saveNewMessage(data);
                socket.broadcast.emit('new-message', data);
            }catch(error){
                console.log(error);
            }
        });

       


        /********************************************/
        //SOCKET CLIENT COMUNNICATION CHANNELS (SERVER TO CLIENT)
        /********************************************/
        // socket.emit('EVENT NAME', 'DATA FOR INDIVIDUAL CLIENT');
        // socket.broadcast.emit('EVENT NAME', 'DATA FOR EVERY CONNECTED CLIENT EXCEPT THE CURRENT ONE');
        // socketServer.emit('EVENT NAME', 'DATA FOR EVERY CONNECTED CLIENT');

    });
    
    return socketServer;
}

export default ServerSocket;