
const db = require('../models/index');
const UserModel = db.UserModel;

class UserService {

    static async LoginUser(user_data){

        const user = await UserModel.findOne({where:{
            email:user_data.email,
            password: user_data.password
        }});
        console.log('return user is : ',user);
        return user;

    }

}

module.exports = UserService
