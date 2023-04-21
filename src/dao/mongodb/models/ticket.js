import mongoose from 'mongoose';

//SET COLLECTION NAME
const collection = 'ticket';

//DEFINE MODEL STRUCTURE
const dataModelObj = {
    code: String,
    items: {
        type: [
            {
                product: {
                    title: String,
                    price: Double,
                    amount: Number
                }
            }
        ]
    },
    total: Double
};

const schemaConfigObj = {
    timestamps: { createdAt: 'purchase_datetime'},
    versionKey: false
};

//INSTANCE SCHEMA OBJ
const schema = new mongoose.Schema(dataModelObj, schemaConfigObj);

//INSTANCE SCHEMA MODEL
const model = mongoose.model(collection, schema);

export default model;