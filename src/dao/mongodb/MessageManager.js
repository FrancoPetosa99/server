//modules
import model from "./models/messages.js";

class MessageManager{

    constructor(){
        this.populatedFields = [
            'user',
            'message',
            'date'
        ];
    }

    async getAll() {

        const mongodbResponse = await model.find();

        const messageList = mongodbResponse.map(message => {

            const populatedObj = {};

            for (const key in message) {
                if (this.populatedFields.includes(key)) {
                    populatedObj[key] = message[key];
                }
            }

            populatedObj.id = message._id;

            return populatedObj;
        });

        return messageList;
    }

    async getById(id) {

        const mongodbObjResponse = await model.findById(id).exec();
        
        if(mongodbObjResponse){
            const messageObj = {};
    
            for (const key in mongodbObjResponse) {
                if (this.populatedFields.includes(key)) {
                    messageObj[key] = mongodbObjResponse[key];
                }
            }
    
            messageObj.id = mongodbObjResponse._id;
            return messageObj;
            
        }
    }

    async getByFilter(filterObj = {}) {
        const messageObj = await model.find(filterObj);
        return messageObj;
    }

    async create(newMessageObj) {

        const mongodbResponse = await model.create(newMessageObj);

        const populatedObj = {};

        for (const key in mongodbResponse) {
            if (this.populatedFields.includes(key)) {
                populatedObj[key] = mongodbResponse[key];
            }
        }

        populatedObj.id = mongodbResponse._id;

        console.log(populatedObj);

        return populatedObj;
    }

    async updateById(id, updateObj) {
        const filterObj = {};
        filterObj._id = id;

        await model.updateOne(filterObj, updateObj);

        const updatedMessageObj = await this.getById(id);

        return updatedMessageObj;
    }

    async deleteById(id){
        const filterObj = {};
        filterObj._id = id;

        const mongodbResponse = await model.deleteOne(filterObj);
        return mongodbResponse;
    }

    async checkMessageExist(id){

        let messageExist = false;

        const queryObj = {};
        queryObj._id = id;

        const mongodbResponse = await model.exists(queryObj);

        if(mongodbResponse) messageExist = true;

        return messageExist;
    }

}

const messageManager = new MessageManager();
export default messageManager;


