/********************************************/
//IMPORT MODULES
/********************************************/
import ui from "./ui.js";

/********************************************/
//CLIENT-SIDE SOCKET
/********************************************/
const socket = io();

socket.emit('EVENT NAME',  'CLIENT MESSAGE TO SERVER');
socket.emit('EVENT NAME',  'CLIENT MESSAGE TO SERVER');
socket.emit('EVENT NAME',  'CLIENT MESSAGE TO SERVER');

/********************************************/
//CONFIGURABLE SERVER LISTENERS
/********************************************/
socket.on('product-added', product => {

    const row = ui.buildProductRow(product);
    const container = document.querySelector('tbody');
    
    container.appendChild(row);
    ui.displayAlert('success', `New ${product.title} added`);
});

socket.on('product-deleted', productId => {
    ui.removeProductRow(productId);
    ui.displayAlert('error', `Product with id: ${productId} deleted`);
});

socket.on('EVENT NAME', data => {
    console.log('DATA SENT FROM SERVER: ' + data);
});

socket.on('EVENT NAME', data => {
    console.log('DATA SENT FROM SERVER: ' + data);
});
