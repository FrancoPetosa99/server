/********************************************/
//IMPORT MODULES
/********************************************/
import ui from "./ui.js";
import cart from "./cart.js";

/********************************************/
//DOM ELEMENTS
/********************************************/
const btnAdd = document.getElementById('btn-add-cart');

/********************************************/
//GLOBAL VARIABLES
/********************************************/
const  baseURL = window.location.origin;

/********************************************/
//HELPER FUNCTIONS
/********************************************/
async function addProductToCart(){
    
    //get product id from cart module
    const productId = getProductIdByURL();

    //get cart id from local storage
    const cartId = localStorage.getItem('cartId');

    const response = await fetch(`${baseURL}/api/carts/${cartId}/product/${productId}`, {
        method: 'POST'
    });

    if(response.status != 201) throw new Error('Could not add product to cart');

    const responseObj = await response.json();

    return responseObj.data;
}

async function getCartData(){
    //get cart id from local storage
    const cartId = localStorage.getItem('cartId');

    const cartObj = await fetch(`${baseURL}/api/carts/${cartId}`)
                    .then(res => res.json());

    return cartObj;
}

function getProductIdByURL(){
    //get product id from URL
    const queryParams = window.location.search;
    const URLSearch = new URLSearchParams(queryParams);
    const productId = URLSearch.get('pid');

    return productId;
}

/********************************************/
//MAIN CODE
/********************************************/
async function startApp(){
    try{

        const cartData = await getCartData();

        console.log(cartData);

        cart.products = cartData.products;

        const currentProduct = cartData.products.find(product => product.id == getProductIdByURL());

        if(currentProduct){
            cart.currentProduct = currentProduct;
        }


    }catch(error){
        ui.displayAlert('error', error.message);
    }
}

/********************************************/
//DOM EVENT LISTENERS
/********************************************/
window.addEventListener('DOMContentLoaded', startApp);

btnAdd.addEventListener('click', async ()=> {

    try{
        ui.showBtnLoading();
    
        const updatedCartObj = await addProductToCart();

        cart.setProducts(updatedCartObj.products);

        const product = updatedCartObj.products.find(product => product.id == getProductIdByURL());

        const newAmount = product.amount;
        const newTotal = cart.calculateTotal();
    
        ui.updateBtnLabels(newAmount, newTotal);

        ui.hideBtnLoading();

        ui.displayAlert('success', 'product added successfully');

    }catch(error){
        ui.displayAlert('error', error.message);
    }

})