function getTemplateString(user, product){
    const { firstName, lastName } = user;
    const { title } = product;
    const templateString = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Product Deleted</title>
            </head>
            <body>
                <h1>Product Deleted</h1>
                <p>Hello ${firstName} ${lastName},</p>
                <p>We would like to inform you that the product ${title} has been removed from our inventory and is no longer available for purchase.</p>
                <p>If you have any questions or need further assistance, please feel free to contact our support team.</p>
                <p>Thank you for your understanding.</p>
                <p>Best regards,</p>
                <p>Franco software development team</p>
            </body>
        </html>
    `;

    return templateString;
}

export default getTemplateString;