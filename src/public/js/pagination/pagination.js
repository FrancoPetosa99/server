function Pagination(){

    const global = {
        currentPage: 1,
        lastPage: null,
        firstPage: null,
        itemSelected: null,
        prevBtnItem: null,
        nextBtnItem: null
    }

    const itemList = [];
    const pagination = document.querySelector('.pagination');

    function selectItem(){
        if(global.itemSelected){
            global.itemSelected.classList.add('active');
        }
    }

    function deselectItem(){
        if(global.itemSelected){
            global.itemSelected.classList.remove('active');
        }
    }

    function buildPaginationNavbar(pagObj){

        const totalPages = pagObj.totalPages;
        const nextPage = pagObj.nextPage;
        const prevPage = pagObj.prevPage;
        // const nextPageLink = pagObj.nextPageLink;
        // const prevPageLink = pagObj.prevPageLink;
        
        global.currentPage = pagObj.currentPage;

        //build prev btn
        const prevBtn = document.createElement('li');
        prevBtn.className = 'page-item';
        // prevBtn.innerHTML = `<a class="page-link" href=${prevPageLink}>Previous</a>`;
        prevBtn.innerHTML = `<button class="page-link">Previous</button>`;
        if(!prevPage)  prevBtn.className += ' disabled';

        pagination.append(prevBtn);
        global.prevBtnItem = prevBtn;

        // //build index page
        // const index = document.createElement('li');
        // index.className = 'page-item';
        // index.innerHTML = `<span class="page-link">page ${currentPage}/${totalPages}</span>`;
        // pagination.append(index);

        //build item btns
        for (let i = 0; i < totalPages; i++) {
            const page = i + 1;
            const itemBtn = document.createElement('li');
            itemBtn.className = 'page-item';
            itemBtn.innerHTML = `<button class="page-link">${page}</button>`;
            if(global.currentPage == page){
                global.itemSelected = itemBtn;
                this.selectItem();
            }
    
            pagination.append(itemBtn);
            itemList.push(itemBtn);
        }

        //build next btn
        const nextBtn = document.createElement('li');
        nextBtn.className = 'page-item';
        // nextBtn.innerHTML = `<a class="page-link" href=${nextPageLink}>Next</a>`;
        nextBtn.innerHTML = `<button class="page-link">Next</button>`;
        if(!nextPage)  nextBtn.className += ' disabled';

        pagination.append(nextBtn);
        global.nextBtnItem = nextBtn;
    }

    function turnNext(pagObj){

        const { totalPages, nextPage, prevPage, currentPage, nextPageLink, prevPageLink } = pagObj;

    }

    function turnPrev(pagObj){

        const { totalPages, nextPage, prevPage, currentPage, nextPageLink, prevPageLink } = pagObj;

    }

    function turnTo(page){
        
        this.deselectItem();

        const item = itemList.find(item => item.textContent == page);
        global.itemSelected = item;

        this.selectItem();

        console.log('first page', global.firstPage);
        console.log('last page', global.lastPage);
    }

    function getCurrentPage(){
        return parseInt(global.currentPage);
    }

    function updateCurrentPage(page){
        global.currentPage = page;
    }

    function setLastPage(page){
        global.lastPage = page;
    }

    function setFirstPage(page){
        global.firstPage = page;
    }

    function getLastPage(){
        return global.lastPage;
    }

    function getFirstPage(){
        return global.firstPage;
    }

    return {
        buildPaginationNavbar,
        deselectItem,
        selectItem,
        getCurrentPage,
        updateCurrentPage,
        setLastPage,
        setFirstPage,
        getLastPage,
        getFirstPage,
        turnTo,
        global
    }
}

const pag = new Pagination();

export default pag;