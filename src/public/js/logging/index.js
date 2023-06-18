/********************************************/
//IMPORT MODULES
/********************************************/
import ui from "./ui.js";

/********************************************/
//DOM ELEMENTS
/********************************************/
const btnLogin = document.getElementById('btn-loggin');
const inputPassword = document.getElementById('input-password');
const inputEmail = document.getElementById('input-email');
/********************************************/
//GLOBAL VARIABLES
/********************************************/
const  baseURL = window.location.origin;

/********************************************/
//HELPER FUNCTIONS
/********************************************/

async function login(email, password){
    
    const httpMethod = 'POST';

    const bodyRequest = {};
    bodyRequest.email = email;
    bodyRequest.password = password;

    return fetch(`${baseURL}/api/session`, {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyRequest)
    });
}

function handleAPIResponse(statusCode, data){
    const alert = {};

    if(statusCode !== 200){
        alert.type = 'error';
        if(statusCode !== 500){
            alert.message = data.error.message;
        }else{
            alert.message = 'Ups! Something went wrong. Please try again later';
        }
    }else{
        alert.type = 'success';
        alert.message = data.message;
        setTimeout(()=> window.location.href = `${baseURL}/api/views/home`, 1500);
    }

    ui.displayAlert(alert.type, alert.message);
}
/********************************************/
//MAIN CODE
/********************************************/


/********************************************/
//DOM EVENT LISTENERS
/********************************************/

btnLogin.addEventListener('click', async ()=> {
    try{
        const email = inputEmail.value;
        const password = inputPassword.value;

        ui.handleBtnLoading();
        const response = await login(email, password);
        ui.handleBtnLoading();

        const data = await response.json();

        handleAPIResponse(response.status, data);

        
    }catch(error){
        ui.displayAlert('error', 'Ups! Something went wrong. Please try again later. ');
    }
});

//handle input validation on blur event
[inputEmail, inputPassword].forEach(input => {
    input.addEventListener('blur', (e)=> {
        
    });
});
