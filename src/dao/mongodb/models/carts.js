import mongoose from 'mongoose';

//SET COLLECTION NAME
const collection = 'carts';

//DEFINE MODEL STRUCTURE
const dataModelObj = {
    products: {
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

const schemaConfigObj = {
    timestamps: false,
    versionKey: false
};

//INSTANCE SCHEMA OBJ
const schema = new mongoose.Schema(dataModelObj, schemaConfigObj);

//INSTANCE SCHEMA MODEL
const model = mongoose.model(collection, schema);

export default model;