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
};

//INSTANCE SCHEMA OBJ
const schema = new mongoose.Schema(dataModelObj);

//ADD PLUGIN TO SCHEMA (OPTIONAL)
schema.plugin(mongoosePaginate);

//INSTANCE SCHEMA MODEL
const model = mongoose.model(collection, schema);

export default model;