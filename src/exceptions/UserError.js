
class UserNotFoundError extends Error{

    constructor(message, statusCode, errorCode = []){
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode
    }

    // Login Error If User not Found
    static userNotFoundError(message, statusCode){
        return new UserNotFoundError(message, statusCode);
    }

}

module.exports = UserNotFoundError;
