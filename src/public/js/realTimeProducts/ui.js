function UI(){

    // function buildProductCard(product){

    //     const card = document.createElement('div');

    //     let cardHtml = `
    //         <div class="card-product">
    //             <h3>${product.title}</h3>
    //             <p>${product.description}</p>
    //             <p>$${product.price}</p>
    //             <p>${product.price}</p>
    //         </div>
    //     `;

    //     card.innerHTML = cardHtml;

    //     return card;
    // }

    function buildProductRow(product){

        const row = document.createElement('tr');
        row.setAttribute('product-id', product.id);

        row.innerHTML = `
            <th scope="row">${product.id}</th>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.code}</td>
            <td>${product.stock}</td>
        `;

        return row
    }

    function removeProductRow(productId){
        
        const rowList = [...document.querySelectorAll(`[product-id]`)];
        const row = rowList.find(row => parseInt(row.getAttribute('product-id')) == productId);
        const parent = row.parentNode;
        parent.removeChild(row);
        
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
        buildProductRow,
        removeProductRow,
        displayAlert
    }
}

const ui = UI();

export default ui;