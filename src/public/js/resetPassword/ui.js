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

    return {
        handleBtnLoading,
        hideContainer,
        showContainer,
        displayAlert
    }
}

const ui = UI();

export default ui;