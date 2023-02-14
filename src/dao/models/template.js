import mongoose from 'mongoose';

//SET COLLECTION NAME
const collection = 'COLLECTION NAME';

//DEFINE MODEL STRUCTURE
const dataModelObj = {
    'PROPERTY NAME': 'VALUE TYPE',
    'PROPERTY NAME': 'VALUE TYPE',
    'PROPERTY NAME': 'VALUE TYPE',
    'PROPERTY NAME': 'VALUE TYPE'
};

//INSTANCE SCHEMA OBJ
const schema = new mongoose.Schema(dataModelObj);

//INSTANCE SCHEMA MODEL
const model = mongoose.model(collection, schema);

export default model;