import dotenv from 'dotenv';


if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
}
const { NODE_ENV, PORT, MONGODB_DB_NAME, MONGODB_PASSWORD, JWT_SECRET_KEY } = process.env;

export {
    NODE_ENV,
    PORT,
    MONGODB_DB_NAME,
    MONGODB_PASSWORD,
    JWT_SECRET_KEY
};
