/********************************************/
//IMPORT MODULES
/********************************************/
import ui from "./ui.js";

/********************************************/
//DOM ELEMENTS
/********************************************/
const formResetPassword = document.getElementById('resetPasswordForm');

/********************************************/
//GLOBAL VARIABLES
/********************************************/
const  baseURL = window.location.origin;

/********************************************/
//HELPER FUNCTIONS
/********************************************/
async function resetPassword(newUserObj){

    const response = await fetch(`${baseURL}/api/users/passwordReset`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserObj)
    });

    const data = await response.json();
    
    if(data.status == 'Success'){
        ui.displayAlert('success', data.message);
    }else{
        ui.displayAlert('error', data.error.message);
    }

}

/********************************************/
//MAIN CODE
/********************************************/


/********************************************/
//DOM EVENT LISTENERS
/********************************************/
formResetPassword.addEventListener('submit', async (e)=> {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);

    const newUserObj = {};

    formData.forEach((value, key) => newUserObj[key] = value);

    await resetPassword(newUserObj);
});