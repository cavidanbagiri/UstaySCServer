
const UserService = require("../services/service.user")

class UserController {

    static async LoginUser(req, res, next){

        const user_inform = req.body;

        UserService.LoginUser(user_inform)

        res.send('User Login');

    }

}

module.exports = UserController
