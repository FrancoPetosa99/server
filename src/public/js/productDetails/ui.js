function UI(){

    const modalLoading = new bootstrap.Modal('#loading', {
        keyboard: false  
    });
    
    const btnLoading = document.getElementById('btn-loading');
    const container = document.getElementById('container');

    function displayAlert(type, message){
        Swal.fire({
            toast: true,
            title: type == 'error' ? 'Ups! Something went wrong' : null,
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

    function showBtnLoading(){
        btnLoading.classList.remove('hide');
    }

    function hideBtnLoading(){
        setTimeout(() => {
            btnLoading.classList.add('hide');
        }, 500);
    }

    function showModalLoading(){
        modalLoading.show();
    }

    function hideModalLoading(){
        setTimeout(() => {
            modalLoading.hide();
        }, 500);
    }

    function hideContainer(){
        container.classList.add('hide');
    }

    function showContainer(){
        container.classList.remove('hide');
    }

    function updateBtnLabels(newAmount, newTotal){
        const btnAdd = document.getElementById('btn-add-cart');
        const btnCheck = document.getElementById('btn-check-out');
        btnAdd.innerText = `Add cart (${newAmount})`;
        btnCheck.innerText = `Check-out ($${newTotal})`;
    }

    return {
        showBtnLoading,
        hideBtnLoading,
        showModalLoading,
        hideModalLoading,
        hideContainer,
        showContainer,
        updateBtnLabels,
        displayAlert
    }
}

const ui = UI();

export default ui;