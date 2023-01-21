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
    console.log('New Product Available: ' + product);
    const card = ui.buildProductCard(product);
    const container = document.querySelector('.container-cards-products');
    container.appendChild(card);
    Swal.fire({
        toast: true,
        text: 'New product available',
        position: 'bottom-end',
        icon: 'success',
        showConfirmButton: false,
        timer: 4500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
});

socket.on('product-deleted', productId => {
    console.log('funciona');
    ui.removeProductCard(productId);
    Swal.fire({
        toast: true,
        text: 'Product deleted',
        position: 'bottom-end',
        icon: 'error',
        showConfirmButton: false,
        timer: 4500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
});

socket.on('EVENT NAME', data => {
    console.log('DATA SENT FROM SERVER: ' + data);
});

socket.on('EVENT NAME', data => {
    console.log('DATA SENT FROM SERVER: ' + data);
});
