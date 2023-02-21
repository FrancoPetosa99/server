function UI(){
    
    const loading = new bootstrap.Modal('#loading', {
        keyboard: false  
    });

    const container = document.getElementById('container');

    function buildProductCard(product){

        const card = document.createElement('div');

        let cardHtml = `
            <div class="card-product">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>$${product.price}</p>
                <p>${product.price}</p>
            </div>
        `;

        card.innerHTML = cardHtml;

        return card;
    }

    function buildProductRow(product){

        const row = document.createElement('tr');
        row.setAttribute('product-id', product.id);

        let iconSVG = '';

        if(product.stock > 0){
            iconSVG =`
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
            `;
        }else {
            iconSVG = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                </svg>
            `;
        }

        row.innerHTML = `
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td><img class="product-row-image" src="/images/test.jpg"/></td>
            <td>${iconSVG}</td>
            <td><a target="_blank" href="http://localhost:8080/api/views/product?pid=${product.id}&cid=${localStorage.getItem('cartId')}">View details</a></td>
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

    function buildPaginationItem(page){
        const btn = document.createElement('button');
        
        btn.className = 'page-btn';
        btn.textContent = page;

        return btn;
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
        buildProductCard,
        buildPaginationItem,
        showLoading,
        hideLoading,
        hideContainer,
        showContainer,
        displayAlert
    }
}

const ui = UI();

export default ui;