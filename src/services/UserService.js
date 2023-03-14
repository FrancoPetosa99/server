import userManager from "../dao/UserManager.js";
import encrypt from "../util/encrypt.js";

class UserService{

    constructor(){}

    async createNewUser(newUserData){
        
        //hash password
        newUserData.password = encrypt.getHashedPassword(newUserData.password);

        const userData = await userManager.createUser(newUserData);
        
        return userData;

    }

    async createNewUserByThird(newUserData){
        
        const userData = await userManager.createUser(newUserData);
        
        return userData;

    }

    async checkEmailAndPassword(email, password){

        const userData = await userManager.getUserByEmail(email);

        //check user exist
        if(!userData) {
            const error = new Error('user not found');
            error.code = 404;
            throw error;
        }

        //check passwords matches
        const passwordMatch = encrypt.checkPassword(password, userData.password);
           
        if(!passwordMatch){
            const error = new Error('incorrect password');
            error.code = 200;
            throw error;
        }

        return userData;
    }

    async resetPassword(userObjData){
        
        const { email, oldPassword, newPassword } = userObjData;

        //check email and old password are valid
        await this.checkEmailAndPassword(email, oldPassword);

        //encrypt new password
        const encryptedNewPassword = encrypt.getHashedPassword(newPassword);

        await userManager.updatePassword(email, encryptedNewPassword);

    }
    
    async getUserData(userEmail){

        const userData = await userManager.getUserByEmail(userEmail)
        
        return userData;
        
    }

    verifyHexaNumber(hexaNumber){

        let isNumberValid = true;

        const maxLength = 24;

        //list of valid characters in hexadecimal number system
        const hexaCharacters = [
            '0','1','2','3','4','5','6','7','8','9',
            'a','b','c','d','e','f'
        ];

        try{
            //verify if the number has hexadecimal characters only
            for (let i = 0; i < hexaNumber.length; i++) {
                const isCharacterValid = hexaCharacters.includes(hexaNumber[i]);
                if(!isCharacterValid) throw new Error(`The character ${hexaNumber[i]} is not valid`);
            }

            //verify the hexadecimal number has 24 characters only
            if(hexaNumber.length !== maxLength) throw new Error(`hexadecimal number does not have 24 characters`);

        }catch(error){
            isNumberValid = false;
        }finally{
            return isNumberValid;
        }
    }
}


const userService = new UserService();

export default userService;