/****************************************************************************************/
//DATA BASE CONNECTION CONFIGURATIONS
//Description: connects the api to the mongodb data base (no relational data base)
/****************************************************************************************/
import mongoose from "mongoose";

function connectMongodb(){
    
    const mongodbPassword = 'p';
    const mongodbDataBaseName = 'ecommerce';
    const mongoURL = `mongodb+srv://usertest:${mongodbPassword}@clusterserver.n5yxv60.mongodb.net/${mongodbDataBaseName}?retryWrites=true&w=majority`;
    //const mongoURL = mongodb://localhost:27017/coderhouse

    mongoose.set('strictQuery', true);
    mongoose.connect(mongoURL, (error)=> {
        if(error) {
            console.log(error);
            process.exit();
        }
    });
}

export default connectMongodb;