
const UserService = require("../services/service.user")

class UserController {

    static async LoginUser(req, res, next){

        const user_inform = req.body;

        await UserService.LoginUser(user_inform)
        .then((user)=>{
            user.password = ''
            return res.status(200).send(user)
        }).catch((err)=>{
            return res.send('error is : ',err);
        })
    }

}

module.exports = UserController
