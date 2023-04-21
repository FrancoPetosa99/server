import nodemailer from 'nodemailer';
import { SERVICE_EMAIL, SERVICE_EMAIL_PORT, GMAIL_USER, GMAIL_PASSWORD } from '../config/env.config.js';

const transport = nodemailer.createTransport({
    service: SERVICE_EMAIL,
    port: SERVICE_EMAIL_PORT,
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASSWORD
    }
});

export default transport;