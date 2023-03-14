import bcrypt from 'bcrypt';

function Encrypt(){

    function getHashedPassword(password){
        const salt = bcrypt.genSaltSync(10);
        const encriptedPassword = bcrypt.hashSync(password, salt);
    
        return encriptedPassword;
    }

    function checkPassword(decryptedPassword, encryptedPassword){
        const passwordMatch = bcrypt.compareSync(decryptedPassword, encryptedPassword);

        return passwordMatch;
    }

    return {
        getHashedPassword,
        checkPassword
    }
}

const encrypt = Encrypt();

export default encrypt;