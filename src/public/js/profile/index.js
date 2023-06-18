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
const userBirthdate = document.getElementById('user-birthdate')

/********************************************/
//GLOBAL VARIABLES
/********************************************/
const  baseURL = window.location.origin;

/********************************************/
//HELPER FUNCTIONS
/********************************************/
async function getUserData(){
    return fetch(`${baseURL}/api/session/current`)
    .then((res)=> res.json());
}

function logOut(){
    fetch(`${baseURL}/api/session/logout`)
    .then((res)=> res.json())
    .then((data)=> ui.displayAlert('success', data.message))
    .then(setTimeout(()=> window.location.href = `${baseURL}/api/views/logging`, 1000))
    .catch((error)=> ui.displayAlert('error', error.message));
}
/********************************************/
//MAIN CODE
/********************************************/
try{
    const response = await getUserData();
    const { email, firstName, lastName, birthdate } = response.data;

    userEmail.textContent = email;
    userName.textContent = firstName;
    userLastName.textContent = lastName;
    userBirthdate.textContent = birthdate;

    ui.displayAlert('success', `Welcome ${firstName}!`);

}catch(error){
    console.log(error);
}

/********************************************/
//DOM EVENT LISTENERS
/********************************************/
btnLogOut.addEventListener('click', logOut);