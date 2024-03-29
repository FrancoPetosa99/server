function UI(){
    
    const container = document.getElementById('container');

    function displayAlert(type, message, title){
        Swal.fire({
            toast: true,
            title: title,
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

    function hideContainer(){
        container.classList.add('hide');
    }

    function showContainer(){
        container.classList.remove('hide');
    }

    function setErrorOnField(inputName, errorMessage){

        const input = document.querySelector(`[name = ${inputName}]`);

        input.classList.add('error-input');
       
        const parent = input.parentNode;

        const p = parent.querySelector('.error-message');

        if(errorMessage) p.textContent = errorMessage;

        p.classList.remove('invisible');

    }

    function removeErrorOnField(input){

        input.classList.remove('error-input');
        
        const parent = input.parentNode;

        const p = parent.querySelector('.error-message');

        if(!p.classList.contains('invisible')){
            p.classList.add('invisible');
        }

    }

    return {
        hideContainer,
        showContainer,
        setErrorOnField,
        removeErrorOnField,
        displayAlert
    }
}

const ui = UI();

export default ui;