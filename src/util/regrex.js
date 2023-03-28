function Regrex(){

    function email(){
        const regularExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regrex = new RegExp(regularExpression);
        return regrex;
    }

    function onlyAlphaCharacters(){
        const regularExpression = /^[A-Z]+$/i;
        const regrex = new RegExp(regularExpression);
        return regrex;
    }

    function strongPassword(){
        const regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,25}/;
        const regrex = new RegExp(regularExpression);
        return regrex;
    }

    return {
        email,
        onlyAlphaCharacters, 
        strongPassword  
    }
}

const regrex = Regrex();

export default regrex;