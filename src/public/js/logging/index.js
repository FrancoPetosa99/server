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

/********************************************/
//HELPER FUNCTIONS
/********************************************/

async function login(email, password){
    
    const httpMethod = 'POST';

    const bodyRequest = {};
    bodyRequest.email = email;
    bodyRequest.password = password;

    const response = await fetch(`http://localhost:8080/api/session`, {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyRequest)
    })
    .then((res) => checkStatusCode(res))
    .then((res)=> res.json())

    ui.displayAlert('success', response.message);

    setTimeout(()=> {
        window.location.href = 'http://localhost:8080/api/views/logging';
    }, 2500)

}

function handleValidationInput(input){

    let validationPassed = true;

    const inputValue = input.value;
   
    if(!inputValue){

        ui.setErrorOnField(input);
        validationPassed = false;

    }else{
        ui.removeErrorOnField(input);
    }

    return validationPassed;
}

function checkStatusCode(res){

    if(res.status == 400){
        throw new Error(`Incorrect email address and password`);
    }

    return res
}
/********************************************/
//MAIN CODE
/********************************************/


/********************************************/
//DOM EVENT LISTENERS
/********************************************/

btnLogin.addEventListener('click', async ()=> {
    try{
        ui.handleBtnLoading();

        const email = inputEmail.value;
        const password = inputPassword.value;

        const isPasswordValid = handleValidationInput(inputPassword);
        const isEmailValid = handleValidationInput(inputEmail);
        

        if(isEmailValid && isPasswordValid){
            await login(email, password);
        }
    
        
    }catch(error){

        ui.displayAlert('error', error.message);

    }finally{
        ui.handleBtnLoading();
    }
});

//handle input validation on blur event
[inputEmail, inputPassword].forEach(input => {
    input.addEventListener('blur', (e)=> {

        const input = e.target;

        const validationPassed = handleValidationInput(input);

        if(validationPassed){
            ui.removeErrorOnField(input);
        }

    });
});
