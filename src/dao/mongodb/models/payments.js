import mongoose from 'mongoose';

//SET COLLECTION NAME
const collection = 'payments';

//DEFINE MODEL STRUCTURE
const dataModelObj = {
    code: String,
    items: {
        type: [
            {
                title: String,
                price: mongoose.Schema.Types.Decimal128,
                amount: Number,
                subTotal: mongoose.Schema.Types.Decimal128
            }
        ]
    },
    total: mongoose.Schema.Types.Decimal128,
    purchaser: {
        name: String,
        lastName: String,
        identification: Number
    },
    card_holder: String,
    pay_holder: String,
    payment_type: String
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