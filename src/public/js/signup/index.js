/********************************************/
//IMPORT MODULES
/********************************************/
import ui from "./ui.js";

/********************************************/
//DOM ELEMENTS
/********************************************/
const formSignUp = document.getElementById('sigUpForm');
const formInputs = document.querySelectorAll('.input');
/********************************************/
//GLOBAL VARIABLES
/********************************************/

/********************************************/
//HELPER FUNCTIONS
/********************************************/

async function signUp(newUserObj){

    const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserObj)
    });

   return response;
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
        alert.title = 'Welcome';
        alert.message = data.message;
        setTimeout(()=> window.location.href = 'http://localhost:8080/api/views/logging', 1500);
    }

    ui.displayAlert(alert.type, alert.message, alert.title);
}

/********************************************/
//MAIN CODE
/********************************************/


/********************************************/
//DOM EVENT LISTENERS
/********************************************/
formSignUp.addEventListener('submit', async (e)=> {

    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);

    const newUserObj = {};

    formData.forEach((value, key)=> newUserObj[key] = value); 

    try{
        ui.handleBtnLoading();
        const response = await signUp(newUserObj);
        ui.handleBtnLoading();

        const statusCode = response.status;
        const data = await response.json();

        handleAPIResonse(statusCode, data);

    }catch(error){
        console.log(error);
        ui.displayAlert('error', 'Please try again later', 'Ups! Something went wrong');
    }
});

//handle inputs validations on blur event
[...formInputs].forEach(input => {
    input.addEventListener('blur', (e)=> {
        
    });
});

//handle inputs on focus event
[...formInputs].forEach(input => {
    input.addEventListener('focus', (e)=> {
        ui.removeErrorOnField(e.target);
    });
});