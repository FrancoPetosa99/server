/********************************************/
//IMPORT MODULES
/********************************************/
import { Router } from "express";
import transport from "../util/gmail.js";

const router = Router(); //INITIALIZE ROUTER

/********************************************/
//POST METHOD ENDPOINTS
/********************************************/
router.post('/', async (request, response)=> {
    
    try{

        const { to, subject } = request.body;
        const from = 'coder40305@gmail.com';

        console.log(process.cwd());
        
        const emailSent = await transport.sendMail({
            from: from,
            to: to,
            subject: subject,
            attachments: [
                {
                    filename: 'PDFTestFile.pdf',
                    path: process.cwd() + '/src/files/PDFTestFile.pdf'
                },
                {
                    filename: 'TXTTestFile.pdf',
                    path: process.cwd() + '/src/files/TXTTestFile.txt'
                }
            ]
        });

        //send response to client
        response
        .status(200)
        .json({
            status: 'Success',
            message: 'Email successfully sent'
        });

    }catch(error){
        //handle error response

        const statusCode = error.statusCode || 500;
        const message = error.message || 'An unexpected error has ocurred';

        //send response to client
        response
        .status(statusCode)
        .json({
            status: 'Error',
            error: {
                message: message
            }
        });
    }

});

export default router;