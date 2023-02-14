/********************************************/
//IMPORT MODULES
/********************************************/
import ui from "../chat/ui.js";

/********************************************/
//GLOBAL VARIABLES
/********************************************/
let userEmail = '';

/********************************************/
//DOM ELEMENTS
/********************************************/
const chatBox = document.getElementById('chat-box');
const btnSend = document.getElementById('btn-send');
const inputMessage = document.getElementById('input-message');

/********************************************/
//CLIENT-SIDE SOCKET
/********************************************/
const socket = io();

// socket.emit('EVENT NAME',  'CLIENT MESSAGE TO SERVER');
// socket.emit('EVENT NAME',  'CLIENT MESSAGE TO SERVER');

/********************************************/
//CONFIGURABLE SERVER LISTENERS
/********************************************/
socket.on('new-message', data => {

    const messageBox = ui.buildMessageBox(data);
    chatBox.appendChild(messageBox);

    ui.displayAlert('success', `New Message from ${data.user}`);
});

// socket.on('EVENT NAME', data => {
//     console.log('DATA SENT FROM SERVER: ' + data);
// });

// socket.on('EVENT NAME', data => {
//     console.log('DATA SENT FROM SERVER: ' + data);
// });


/********************************************/
//CONFIGURABLE DOM LISTENERS
/********************************************/
document.addEventListener('DOMContentLoaded', async ()=> {
    userEmail = await ui.getUserEmail();
});

btnSend.addEventListener('click', ()=> {
    
    const newMessageObj = {};
    newMessageObj.message = inputMessage.value;
    newMessageObj.user = userEmail;

    socket.emit('message-sent', newMessageObj);

    const messageBox = ui.buildMessageBox(newMessageObj);
    chatBox.appendChild(messageBox);

    inputMessage.value = '';

});