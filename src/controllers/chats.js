/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
//import { serverSocket } from "../index.js";
import chatService from "../services/chatService.js";

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//GET METHOD ENDPOINTS
/********************************************/
router.get('/', async (request, response)=> {
    try{

        const messages = await chatService.getMessages();

        response.json(200, messages);

    }catch(error){
        response.json(400, "An error has occurred: " + error.message);
    }

});

/********************************************/
//POST METHOD ENDPOINTS
/********************************************/
router.post('/', async (request, response)=> {
    try{

        const messageObj = {};
        messageObj.message = request.body.message;
        messageObj.user = request.body.user;

        const newMessage = await chatService.saveNewMessage(messageObj);
        response.json(201, `message with id ${newMessage.id} was successfully saved`);
        //serverSocket.emit('new-message', newProduct);
    }catch(error){
        response.json(400, 'The following errors has occurred: ' + error.message);
    }
});

/********************************************/
//PUT METHOD ENDPOINTS
/********************************************/
router.put('/:id', async (request, response)=> {
    try{
        const messageObjData = {};

        messageObjData.id = request.params.id;
        messageObjData.message = request.body.message;

        const editedMessageId = await chatService.editMessage(messageObjData);
        response.json(200, `Message id ${editedMessageId} successfully edited`);
    }catch(error){
        response.json(400, 'The following errors has occurred: ' + error.message);
    }
});

/********************************************/
//DELETE METHOD ENDPOINTS
/********************************************/
router.delete('/:id', async (request, response)=> {
    try{
        const messageId = request.params.id;
        await chatService.deleteMessage(messageId);
        response.json(200, `Message with id ${messageId} successfully deleted`);
        //serverSocket.emit('product-deleted', productId);
    }catch(error){
        response.json(400, 'The following errors has occurred: ' + error.message);
    }
});

export default router;