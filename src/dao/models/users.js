import mongoose from 'mongoose';

const collection = 'users';

const dataModelObj = {
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    age: Number,
    active: Boolean
};

const schema = new mongoose.Schema(dataModelObj);

const model = mongoose.model(collection, schema);

export default model;