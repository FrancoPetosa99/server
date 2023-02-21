function UI(){
    
    const loading = new bootstrap.Modal('#loading', {
        keyboard: false  
    });

    const container = document.getElementById('container');

    function buildProductRow(product){

        const { id, price, amount, title } = product;

        const row = document.createElement('tr');
        row.setAttribute('product-id', id);

        let subTotal = price * amount;

        row.innerHTML = `
            <td>${title}</td>
            <td><img class="product-row-image" src="/images/test.jpg"/></td>
            <td>$${price}</td>
            <td>X${amount}</td>
            <td>$${subTotal}</td>
        `;

        return row;
    }

    function buildTotalRow(total){

        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="table-active" colspan="4">Total:</td>
            <td class="table-active">$${total}</td>
        `;

        return row;

    }

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

    function showLoading(){
        loading.show();
    }

    function hideLoading(){
        setTimeout(() => {
            loading.hide();
        }, 500);
    }

    function hideContainer(){
        container.classList.add('hide');
    }

    function showContainer(){
        container.classList.remove('hide');
    }

    return {
        buildProductRow,
        showLoading,
        hideLoading,
        hideContainer,
        showContainer,
        buildTotalRow,
        displayAlert
    }
}

const ui = UI();

export default ui;