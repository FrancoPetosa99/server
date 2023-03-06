function UI(){
    
    const loading = document.getElementById('btn-loading');

    const container = document.getElementById('container');

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

    function handleBtnLoading(){
        loading.classList.toggle('fade');
    }

    function hideContainer(){
        container.classList.add('hide');
    }

    function showContainer(){
        container.classList.remove('hide');
    }

    function setErrorOnField(input){

        const name = input.name;
       
        const parent = input.parentNode;

        const p = parent.querySelector('.error-message');

        p.textContent = `The ${name} is a required field`;

        p.classList.remove('invisible');

    }

    function removeErrorOnField(input){

        const parent = input.parentNode;

        const p = parent.querySelector('.error-message');

        if(!p.classList.contains('invisible')){
            p.classList.add('invisible');
        }

    }

    return {
        handleBtnLoading,
        hideContainer,
        showContainer,
        setErrorOnField,
        removeErrorOnField,
        displayAlert
    }
}

const ui = UI();

export default ui;