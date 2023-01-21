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
        console.log(productId + 1);
        const card = document.querySelector(`[product-card = product-${productId}]`);
        const parent = card.parentNode;
        parent.removeChild(card);
        
    }

    return {
        buildProductCard,
        removeProductCard
    }
}

const ui = UI();

export default ui;