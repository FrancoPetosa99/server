function Cart(){

    let products = null;
    
    function setProducts(productsArr){
        products = productsArr;
    }

    function calculateTotal(){

        let total = 0;

        products.forEach(product => {
            total += product.price * product.amount;
        });

        return total;
    }

    return{
        setProducts,
        calculateTotal,
    }
}

const cart = new Cart();

export default cart;