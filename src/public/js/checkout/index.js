/********************************************/
//IMPORT MODULES
/********************************************/
import ui from "./ui.js";

/********************************************/
//DOM ELEMENTS
/********************************************/
const tbody = document.querySelector('tbody');

/********************************************/
//GLOBAL VARIABLES
/********************************************/

/********************************************/
//HELPER FUNCTIONS
/********************************************/
async function getCartData(){

    const cartId = localStorage.getItem('cartId');

    const response = await fetch(`http://localhost:8080/api/carts/${cartId}`)
                    .then(res => res.json());

    return response;
}

function calculateTotal(productsArr){
    let total = 0;

    productsArr.forEach(product => {
        total += product.price * product.amount;
    });

    return total;
}

/********************************************/
//MAIN CODE
/********************************************/
async function startApp(){
    try{

        ui.showLoading();

        const cartData = await getCartData();

        const products = cartData.products;

        console.log(products);

        //render table rows on dom
        products.forEach(product => {
            const row = ui.buildProductRow(product);
            tbody.appendChild(row);
        });

        const totalToPay = calculateTotal(products);

        const totalRow = ui.buildTotalRow(totalToPay);
        tbody.appendChild(totalRow);


        ui.showContainer();

        ui.hideLoading();
        
    }catch(error){
        ui.displayAlert('error', error.message);
    }
}

/********************************************/
//DOM EVENT LISTENERS
/********************************************/
window.addEventListener('DOMContentLoaded', startApp);

