function UI(){

    function displayAlert(type, message){
        Swal.fire({
            toast: true,
            text: message,
            position: 'bottom-end',
            icon: type,
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
    }

    function buildMessageBox(messajeObj){

        const messageBox = document.createElement('div');
        messageBox.className = 'message-box';

        messageBox.innerHTML = `
            <p class="message-user">${messajeObj.user}</p>
            <p class="message-text">${messajeObj.message}</p>
        `;

        return messageBox;
    }

    async function getUserEmail(){

        const { value: email } = await Swal.fire({
            title: 'Welcome to Node Chat!',
            input: 'email',
            inputLabel: 'Please identify yourself with an email address',
            inputPlaceholder: 'Email address...'
        });

        return email;
    }

    return {
        displayAlert,
        buildMessageBox,
        getUserEmail
    }
}

const ui = UI();

export default ui;