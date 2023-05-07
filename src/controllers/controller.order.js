const OrderService = require("../services/service.order");

const tryCatch = require("../utils/trycatch");

class OrderController {
  // Create a MTF form
  static async createStf(req, res, next) {
    const data = req.body;
    tryCatch(
      await OrderService.createStf(data)
        .then((respond) => {
          return res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Creating MTF Failed : ", err);
          next(err);
        })
    );
  }

  // Fetch MTF For User
  static async showSTF(req, res, next) {
    // Get User Inform for getting possible MTFS from mtfs table
    const user_inform = {};
    user_inform.id = req.query.id;
    user_inform.ProjectModelId = req.query.ProjectModelId;
    // Get Data From Service
    await OrderService.showSTF(user_inform)
      .then((respond) => {
        return res.send(respond);
      })
      .catch((err) => {
        console.log("Getting MTF Is Wrong");
      });
  }

  // Fetch Fields From Fields Model
  static async fetchField(req, res, next) {
    const ProjectModelId = req.params.projectmodelid;
    // const ProjectModelId = 1;
    await OrderService.fetchField(ProjectModelId)
      .then((respond) => {
        return res.send(respond);
      })
      .catch((err) => {
        console.log("Getting MTF Is Wrong");
      });
  }
}

module.exports = OrderController;
