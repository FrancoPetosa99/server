function getTemplateString(admin, link){
    const { firstName, lastName } = user;
    const templateString = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>New Sale Notification</title>
        </head>
            <body>
                <h1>New Sale Notification</h1>
                <p>Dear [Administrator's Name],</p>
                
                <p>We are pleased to inform you that a new sale has been made on [eCommerce Name]. Here are the details of the transaction:</p>
                
                <ul>
                    <li><strong>Customer:</strong> [Customer Name]</li>
                    <li><strong>Product(s) Purchased:</strong> [List of Products]</li>
                    <li><strong>Total Amount:</strong> [Total Sale Amount]</li>
                    <li><strong>Date and Time of Sale:</strong> [Transaction Date and Time]</li>
                </ul>
                
                <p>Please take the following actions:</p>
                
                <ol>
                    <li>Review the sale details and ensure everything is in order.</li>
                    <li>Process the customer's order and arrange for shipping.</li>
                    <li>Update the product inventory to reflect the completed sale.</li>
                    <li>Contact the customer to provide them with the sale confirmation and delivery details.</li>
                </ol>
                
                <p>If you have any questions or require further information, please don't hesitate to contact us. We are here to provide you with any assistance you may need.</p>
                
                <p>Thank you for your attention and dedication in managing our eCommerce. We wish you great success in your work!</p>
                
                <p>Best regards,</p>
                
                <p>[Your Name]<br>
                [eCommerce Name]<br>
                [eCommerce Email]<br>
                [Contact Phone]</p>
            </body>
        </html>
    `;

    return templateString;
}

export default getTemplateString;