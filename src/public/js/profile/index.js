/********************************************/
//IMPORT MODULES
/********************************************/
import ui from "./ui.js";

/********************************************/
//DOM ELEMENTS
/********************************************/
const btnLogOut = document.getElementById('btnLogOut');
const userEmail = document.getElementById('user-email');
const userName= document.getElementById('user-name');
const userLastName = document.getElementById('user-lastname');

/********************************************/
//GLOBAL VARIABLES
/********************************************/

/********************************************/
//HELPER FUNCTIONS
/********************************************/
async function getUserData(){
    return fetch('http://localhost:8080/api/users/profile')
    .then((res)=> res.json());
}

function logOut(){
    fetch('http://localhost:8080/api/session/logout')
    .then((res)=> res.json())
    .then((data)=> ui.displayAlert('success', data.message))
    .then(setTimeout(()=> window.location.href = 'http://localhost:8080/api/views/logging', 500))
    .catch((error)=> ui.displayAlert('error', error.message));
}
/********************************************/
//MAIN CODE
/********************************************/
try{

    const response = await getUserData();
    const { email, firstName, lastName } = response.data;

    userEmail.textContent = email;
    userName.textContent = firstName;
    userLastName.textContent = lastName;

    ui.displayAlert('success', `Welcome ${firstName}!`);

}catch(error){
    console.log(error);
}

/********************************************/
//DOM EVENT LISTENERS
/********************************************/
btnLogOut.addEventListener('click', logOut);