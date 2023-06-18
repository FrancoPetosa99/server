/********************************************/
//IMPORT MODULES
/********************************************/
import ui from "./ui.js";
import pag from "./pagination.js";

/********************************************/
//DOM ELEMENTS
/********************************************/
const tbody = document.querySelector('tbody');
const pagination = document.querySelector('.pagination');

/********************************************/
//GLOBAL VARIABLES
/********************************************/
const  baseURL = window.location.href;

/********************************************/
//HELPER FUNCTIONS
/********************************************/
async function getProducts(page = 1, limit = 10, sort = 'asc'){

    const response = await fetch(`${baseURL}/api/products?limit=${limit}&page=${page}&sort=${sort}`);
    const objResponse = await response.json();

    console.log(objResponse);

    return objResponse;
}

async function createCart(){

    let cartId = localStorage.getItem('cartId');

    //if cart does not exist in the current session request to create one
    if(!cartId){
        const response = await fetch(`${baseURL}/api/carts`, {
            method: 'POST'
        });
        const responseObj = await response.json();
        const cartObj = responseObj.data;
        localStorage.setItem('cartId', cartObj.id);
        cartId = cartObj.id;
    }

    return cartId;
}

/********************************************/
//MAIN CODE
/********************************************/
async function startApp(){
    try{

        ui.showLoading();

        const APIresponse = await getProducts();
        const { products, totalPages, nextPage, prevPage, currentPage, nextPageLink, prevPageLink } = APIresponse;

        await createCart();

        pag.setLastPage(totalPages);
        pag.setFirstPage(1);

        //render table rows on dom
        products.forEach(product => {
            const row = ui.buildProductRow(product);
            tbody.appendChild(row);
        });

        //build pagination bar
        const pagObj = {};

        pagObj.totalPages = totalPages;
        pagObj.nextPage = nextPage;
        pagObj.prevPage = prevPage;
        pagObj.currentPage = currentPage;
        pagObj.nextPageLink = nextPageLink;
        pagObj.prevPageLink = prevPageLink;

        pag.buildPaginationNavbar(pagObj);

        ui.showContainer();
        ui.hideLoading();
        
    }catch(error){
        ui.displayAlert('error', error.message);
    }
}

/********************************************/
//DOM EVENT LISTENERS
/********************************************/
window.addEventListener('DOMContentLoaded', startApp);

pagination.addEventListener('click', async (e)=> {

    ui.showLoading();

    const btnLabel = e.target.textContent.toLowerCase();

    let pageNumber;

    //identify which btn is clicked
    switch (btnLabel) {

        case 'previous':
            pageNumber = pag.getCurrentPage() - 1;
        break;

        case 'next':
            pageNumber = pag.getCurrentPage() + 1;
        break;

        default:
            pageNumber = parseInt(btnLabel);
        break;

    }

    //get data from the selected page
    const APIresponse = await getProducts(pageNumber);
    
    const { products } = APIresponse;

    //render table rows on dom
    tbody.innerHTML = '';
    products.forEach(product => {
        const row = ui.buildProductRow(product);
        tbody.appendChild(row);
    });

    pag.turnTo(pageNumber);
    pag.updateCurrentPage(pageNumber);

    const lastPage = pag.getLastPage();
    const firstPage = pag.getFirstPage();

    const nextBtn = pag.global.nextBtnItem;
    const prevBtn = pag.global.prevBtnItem;

    const isNextBtnEnable = !nextBtn.classList.contains('disabled');
    const isPrevBtnEnable = !prevBtn.classList.contains('disabled');

    //check if next btn should be enable or desable
    if(lastPage == pageNumber && isNextBtnEnable){

        nextBtn.classList.add('disabled');

    }else if(lastPage != pageNumber && !isNextBtnEnable){

        nextBtn.classList.remove('disabled');
    
    }

    //check if previous btn should be enable or desable
    if(firstPage == pageNumber && isPrevBtnEnable){
        
        prevBtn.classList.add('disabled');

    }else if(firstPage != pageNumber && !isPrevBtnEnable){

        prevBtn.classList.remove('disabled');
    
    }

    ui.hideLoading();

});