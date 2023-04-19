
const UserService = require("../services/service.user")

class UserController {

    static async LoginUser(req, res, next){

        const user_inform = req.body;

        await UserService.LoginUser(user_inform)
        .then((user)=>{
            user.password = ''
            res.status(200).send(user)
        }).catch((err)=>{
            res.status(400).send(err);
        })
    }

}

module.exports = UserController
