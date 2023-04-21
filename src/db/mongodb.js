/****************************************************************************************/
//DATA BASE CONNECTION CONFIGURATIONS
//Description: connects the api to the mongodb data base (no relational data base)
/****************************************************************************************/
import mongoose from "mongoose";
import { MONGODB_DB_NAME, MONGODB_PASSWORD } from "../config/env.config.js";

function connectMongodb(){
    const mongoURL = `mongodb+srv://usertest:${MONGODB_PASSWORD}@clusterserver.n5yxv60.mongodb.net/${MONGODB_DB_NAME}?retryWrites=true&w=majority`;
    // const mongoURL = 'mongodb://localhost:27017/coderhouse';

    mongoose.set('strictQuery', true);
    mongoose.connect(mongoURL, (error)=> {
        if(error) {
            console.log(error);
            process.exit();
        }
    });
}

export default connectMongodb;