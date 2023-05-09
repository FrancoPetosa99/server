function CustomError(statusCode, message, name){
    this.statusCode = statusCode;
    this.message = message;
    this.name = name;
}

export default CustomError;