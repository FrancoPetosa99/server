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
    
    ui.handleBtnLoading();

    const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserObj)
    });

    ui.handleBtnLoading();

    const data = response.json();

    ui.displayAlert('success', data.message);
    
    if(response.status == 200) {
        setTimeout(()=> {
            window.location.href = 'http://localhost:8080/api/views/logging';
        }, 1500);
    }

}

function handleValidation(input){

    let isValid = true;

    const value = input.value;

    if(!value){
        isValid = false;
        ui.setErrorOnField(input);
    }

    return isValid;
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

    let isAllDataValid = true;

    formData.forEach((value, key) => {

        const input = form.querySelector(`[name = ${key}]`);

        const isValid = handleValidation(input);

        if(isValid){
            newUserObj[key] = value;
        }else{
            isAllDataValid = false;
        }

    });

    if(isAllDataValid){
        await signUp(newUserObj);
    }
});

//handle inputs validations on blur event
[...formInputs].forEach(input => {
    input.addEventListener('blur', (e)=> {

        const input = e.target;

        const isValid = handleValidation(input);

        if(isValid){
            ui.removeErrorOnField(input);
        }

    });
});