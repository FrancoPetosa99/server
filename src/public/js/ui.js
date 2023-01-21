function UI(){

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

    function removeProductCard(productId){
        
        const card = document.querySelector(`[product-card = product-${productId}]`);
        const parent = card.parentNode;
        parent.removeChild(card);
        
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

    return {
        buildProductCard,
        removeProductCard,
        displayAlert
    }
}

const ui = UI();

export default ui;