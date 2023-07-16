/********************************************/
//IMPORT MODULES
/********************************************/
import ui from "./ui.js";

/********************************************/
//DOM ELEMENTS
/********************************************/
const productForm = document.getElementById('productForm');

/********************************************/
//GLOBAL VARIABLES
/********************************************/

/********************************************/
//HELPER FUNCTIONS
/********************************************/

async function createForm(newProductObj){

    return fetch('/api/products', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductObj)
    });
}

function handleAPIResonse(statusCode, data){
    const alert = {};

    if(statusCode !== 201){
        alert.type = 'error';
        alert.title = 'Ups! Something went wrong';
        if(statusCode !== 500){
            alert.message = data.error.message;
        }else{
            alert.message = 'Please try again later';
        }
    }else{
        alert.type = 'success';
        alert.title = 'Product Successfully Created';
        alert.message = 'Already available on your market';
    }

    ui.displayAlert(alert.type, alert.message, alert.title);
}

/********************************************/
//MAIN CODE
/********************************************/


/********************************************/
//DOM EVENT LISTENERS
/********************************************/
productForm.addEventListener('submit', async (e)=> {

    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);

    const newProductObj = {};

    formData.forEach((value, key)=> newProductObj[key] = value); 

    console.log(newProductObj);

    try{

        const response = await createForm(newProductObj);

        const statusCode = response.status;
        const data = await response.json();

        handleAPIResonse(statusCode, data);

    }catch(error){
        ui.displayAlert('error', 'Please try again later', 'Ups! Something went wrong');
    }
});
