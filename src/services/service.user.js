
const db = require('../models/index');
const UserModel = db.UserModel;

// Import UserNotFoundError
const UserNotFoundError = require('../exceptions/UserError');

class UserService {

    static async LoginUser(user_data){

        const user = await UserModel.findOne({where:{
            email:user_data.email,
            password: user_data.password
        }});
        if(user) {
            return user.dataValues;
        }
        else {
            throw new UserNotFoundError('User Not Found',400);
        }
    }

}

module.exports = UserService
