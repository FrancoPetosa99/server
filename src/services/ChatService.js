import messageManager from "../dao/mongodb/MessageManager.js";

class ChatService{

    constructor(){
        
    }

    async getMessages(){

        const limit = 50;

        const messageList = await messageManager.getAll();

        if(limit > messageList.length){
            return messageList;
        }

        const messageShortList = [];

        for (let i = 0; i < limit; i++) {
            messageShortList.push(messageShortList[i]);
        }

        return messageShortList;

    }

    async saveNewMessage({user, message}){

        if(!user || !message) throw new Error('user and message are required values');

        const messageObj = {};
        messageObj.user = user;
        messageObj.message = message;
        messageObj.date = new Date(); //current date

        const dbresponse = await messageManager.create(messageObj);

        if(!dbresponse) throw new Error('Could not save the message on db');

        return dbresponse;

    }
    
    async editMessage(messageObjData){

        const { id, message } = messageObjData;
        
        if(!message) throw new Error('Empty data is not valid');

        const messageExist = await messageManager.checkMessageExist(id);

        if(!messageExist) throw new Error(`The message with id ${id} could not be found`);

        const newMessageObj = {};
        newMessageObj.message = message;
        
        const editedMessageId = await messageManager.updateById(id, newMessageObj);

       return editedMessageId;
    }

    async deleteMessage(id){

        const isValidId = this.verifyHexaNumber(id);

        if(!isValidId) throw new Error(`The id ${id} is not valid`);

        const messageExist = await messageManager.checkMessageExist(id);

        if(!messageExist) throw new Error(`The message with id ${id} could not be found`);

        await messageManager.deleteById(id);
    }

    verifyHexaNumber(hexaNumber){

        let isNumberValid = true;

        const maxLength = 24;

        //list of valid characters in hexadecimal number system
        const hexaCharacters = [
            '0','1','2','3','4','5','6','7','8','9',
            'a','b','c','d','e','f'
        ];

        try{
            //verify if the number has hexadecimal characters only
            for (let i = 0; i < hexaNumber.length; i++) {
                const isCharacterValid = hexaCharacters.includes(hexaNumber[i]);
                if(!isCharacterValid) throw new Error(`The character ${hexaNumber[i]} is not valid`);
            }

            //verify the hexadecimal number has 24 characters only
            if(hexaNumber.length !== maxLength) throw new Error(`hexadecimal number does not have 24 characters`);

        }catch(error){
            isNumberValid = false;
        }finally{
            return isNumberValid;
        }
    }
}


const chatService = new ChatService();

export default chatService;