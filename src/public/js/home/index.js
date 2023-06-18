/********************************************/
//IMPORT MODULES
/********************************************/
import ui from "./ui.js";

/********************************************/
//DOM ELEMENTS
/********************************************/
const logoutBtn = document.getElementById('logoutBtn');
const cardsContainer = document.querySelector('.container-cards-products');

/********************************************/
//GLOBAL VARIABLES
/********************************************/
const  baseURL = window.location.href;

/********************************************/
//HELPER FUNCTIONS
/********************************************/
function addToCartProduct(id){
    console.log(id);
}

/********************************************/
//MAIN CODE
/********************************************/


/********************************************/
//DOM EVENT LISTENERS
/********************************************/


//avoids error when the user is not authenticated
if(logoutBtn){
    logoutBtn.addEventListener('click', async (e)=> {
        e.preventDefault();

        const response = await fetch(`${baseURL}/api/session/logout`);

        const data = await response.json();

        if(response.status == 200 && data.status == 'Success'){
            ui.displayAlert('success', data.message);
            setTimeout(()=> window.location.href = `${baseURL}/api/views/logging`, 1000);
        }else{
            ui.displayAlert('error', 'An error has occurred');
        }
    });
}

cardsContainer.addEventListener('click', (e)=> {
    const element = e.target;
    if(element.tagName == 'BUTTON'){
        const productId = element.id;
        addToCartProduct(productId);
    }
});
