import mongoose from 'mongoose';

const collection = 'users';

const dataModelObj = {
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    active: {
        type: Boolean,
        default: true
    },
    password: String
};

const schema = new mongoose.Schema(dataModelObj);

const model = mongoose.model(collection, schema);

export default model;