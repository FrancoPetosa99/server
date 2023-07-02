import nodemailer from 'nodemailer';
import { SERVICE_EMAIL, SERVICE_EMAIL_PORT, GMAIL_USER, GMAIL_PASSWORD } from '../config/env.config.js';
import CustomError from './customError.js';

function Gmail(){
    const transport = nodemailer.createTransport({
        service: SERVICE_EMAIL,
        port: SERVICE_EMAIL_PORT,
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASSWORD
        }
    });

    function sendEmail(emailConfig){
        return new Promise((resolve, reject)=> {
            transport.sendMail(emailConfig, (error)=> {
                if(error){
                    const { code, message } = error;
                    reject(new CustomError(code, message));
                }
                resolve();
            });
        });
    }

    return {
        sendEmail
    }
}

const gmail = Gmail();

export default gmail;