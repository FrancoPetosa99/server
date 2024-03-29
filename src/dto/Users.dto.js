class UserDTO{

    constructor(){}

    newUser(user){
        const userDTO = {};
        userDTO.firstName = user.firstName;
        userDTO.lastName = user.lastName;
        userDTO.email = user.email;
        userDTO.password = user.password;
        userDTO.birthdate = user.birthdate;
        userDTO.role = user.role;
        return userDTO;
    }

    public(user){
        const userDTO = {};
        userDTO.firstName = user.firstName;
        userDTO.lastName = user.lastName;
        userDTO.email = user.email;
        userDTO.role = user.role;
        userDTO.active = user.active;
        return userDTO;
    }

    token(user){
        const userDTO = {};
        userDTO.firstName = user.firstName;
        userDTO.lastName = user.lastName;
        userDTO.email = user.email;
        userDTO.role = user.role;
        userDTO.active = user.active;
        userDTO.cartId = user.cartId;
        userDTO.id = user.id;
        return userDTO;
    }

    loggin(credentials){
        const userDTO = {};
        userDTO.email = credentials.email;
        userDTO.password = credentials.password;
        return userDTO;
    }

    resetPassword(email, password, confirmPassword){
        const userDTO = {};
        userDTO.email = email;
        userDTO.newPassword = password;
        userDTO.confirmPassword = confirmPassword;
        return userDTO;
    }
}

const userDTO = new UserDTO(); //INITIALIZE USER DTO

export default userDTO;



