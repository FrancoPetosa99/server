import mongoose from 'mongoose';

const collection = 'users';

const dataModelObj = {
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    birthdate: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'Standard'
    },
    cartId: {
        ref: "carts",
        type: mongoose.Schema.Types.ObjectId
    }
};

const schemaConfigObj = {
    timestamps: false,
    versionKey: false
};

const schema = new mongoose.Schema(dataModelObj, schemaConfigObj);

const model = mongoose.model(collection, schema);

export default model;