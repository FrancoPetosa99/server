import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

//SET COLLECTION NAME
const collection = 'products';

//DEFINE MODEL STRUCTURE
const dataModelObj = {
    title: String,
    description: String,
    price: Number,
    image: String,
    code: Number,
    stock: Number,
    category: String,
    available: Boolean
};

const schemaConfigObj = {
    timestamps: false,
    versionKey: false
};

//INSTANCE SCHEMA OBJ
const schema = new mongoose.Schema(dataModelObj, schemaConfigObj);

//ADD PLUGIN TO SCHEMA (OPTIONAL)
schema.plugin(mongoosePaginate);

//INSTANCE SCHEMA MODEL
const model = mongoose.model(collection, schema);

export default model;