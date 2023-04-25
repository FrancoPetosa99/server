import mongoose from 'mongoose';

//SET COLLECTION NAME
const collection = 'ticket';

//DEFINE MODEL STRUCTURE
const dataModelObj = {
    code: String,
    items: {
        type: [
            {
                title: String,
                price: mongoose.Schema.Types.Decimal128,
                amount: Number
            }
        ]
    },
    total: mongoose.Schema.Types.Decimal128,
    purchaser: String
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