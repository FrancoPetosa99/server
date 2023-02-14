import mongoose from 'mongoose';

//SET COLLECTION NAME
const collection = 'messages';

//DEFINE MODEL STRUCTURE
const dataModelObj = {
    user: String,
    message: String,
    date: mongoose.Schema.Types.Date
};

//INSTANCE SCHEMA OBJ
const schema = new mongoose.Schema(dataModelObj);

//INSTANCE SCHEMA MODEL
const model = mongoose.model(collection, schema);

export default model;