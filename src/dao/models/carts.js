import mongoose from 'mongoose';

//SET COLLECTION NAME
const collection = 'carts';

//DEFINE MODEL STRUCTURE
const dataModelObj = {
    'products': {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                },
                amount: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: []
    }
};

//INSTANCE SCHEMA OBJ
const schema = new mongoose.Schema(dataModelObj);

//INSTANCE SCHEMA MODEL
const model = mongoose.model(collection, schema);

export default model;