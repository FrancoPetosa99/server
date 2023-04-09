/********************************************/
//IMPORT MODULES
/********************************************/
import ui from "./ui.js";

/********************************************/
//DOM ELEMENTS
/********************************************/
const logoutBtn = document.getElementById('logoutBtn');

/********************************************/
//GLOBAL VARIABLES
/********************************************/

/********************************************/
//HELPER FUNCTIONS
/********************************************/


/********************************************/
//MAIN CODE
/********************************************/


/********************************************/
//DOM EVENT LISTENERS
/********************************************/

logoutBtn.addEventListener('click', async (e)=> {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/api/session/logout');

    const data = await response.json();

    if(response.status == 200 && data.status == 'Success'){
        ui.displayAlert('success', data.message);
        setTimeout(()=> window.location.href = 'http://localhost:8080/api/views/logging', 1000);
    }else{
        ui.displayAlert('error', 'An error has occurred');
    }

});
