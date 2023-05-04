
const UserService = require("../services/service.user");

// Import tryCatch function
const tryCatch = require("../utils/trycatch");


class UserController {
  static async LoginUser(req, res, next) {
    const user_inform = req.body;

    tryCatch(
        await UserService.LoginUser(user_inform)
        .then((respond) => {
          return res.status(200).send(respond);
        })
        .catch((err) => {
          next(err);
        })
    );
  }
}

module.exports = UserController;
