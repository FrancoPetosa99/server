function getTemplateString(user, link){
    const { firstName, lastName } = user;
    const templateString = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Reset Password</title>
            </head>
            <body>
                <h1>Reset Password</h1>
                <p>Hello ${firstName} ${lastName} We have recieved a reset password request. If you have not requested a password reset please ignore this email.</p>
                <p>Click in the following link to reset your password</p>
                <a href="${link}">${link}</a>
                <p>The link will expire in an hour.</p>
                <p>If you have problems with the link you can just copy and paste it on the browser navegation bar.</p>
                <p>If you need any help or question please do not hesitate to contact out support team</p>
                <p>Regards,</p>
                <p>Franco software development team</p>
            </body>
        </html>
    `;

    return templateString;
}

export default getTemplateString;