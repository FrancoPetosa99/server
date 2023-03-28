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

//OPTIONAL
const schemaConfigObj = {
    timestamps: false,
    versionKey: false
};

//INSTANCE SCHEMA OBJ
const schema = new mongoose.Schema(dataModelObj, schemaConfigObj);

//INSTANCE SCHEMA MODEL
const model = mongoose.model(collection, schema);

export default model;