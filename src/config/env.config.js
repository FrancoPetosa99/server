import dotenv from 'dotenv';


if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
}

const { 
    NODE_ENV, 
    PORT, 
    MONGODB_DB_NAME,
    MONGODB_PASSWORD, 
    JWT_SECRET_KEY, 
    SERVICE_EMAIL,
    SERVICE_EMAIL_PORT,
    GMAIL_USER,
    GMAIL_PASSWORD,
    STRIPE_PRIVATE_KEY,
    MP_ACCESS_TOKEN } = process.env;

export {
    NODE_ENV,
    PORT,
    MONGODB_DB_NAME,
    MONGODB_PASSWORD,
    JWT_SECRET_KEY,
    SERVICE_EMAIL,
    SERVICE_EMAIL_PORT,
    GMAIL_USER,
    GMAIL_PASSWORD,
    STRIPE_PRIVATE_KEY,
    MP_ACCESS_TOKEN
};
