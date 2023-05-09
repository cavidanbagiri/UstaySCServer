const WarehouseService = require("../services/service.warehouse");
const tryCatch = require("../utils/trycatch");

class WarehouseController {
  // Fetch Materials
  static async fetchWaitingSMS(req, res, next) {
    tryCatch(
      await WarehouseService.fetchWaitingSMS()
        .then((respond) => {
          return res.send(respond);
        })
        .catch((err) => {
          console.log("Get Waiting SMS Error From Warehouse : ", err);
          next(err);
        })
    );
  }

  // Post Accpeted Materials
  static async acceptWaitingSM(req, res, next) {
    const data = req.body;
    tryCatch(
      await WarehouseService.acceptWaitingSM(data)
        .then((respond) => {
          console.log("res is : ", respond);
          res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Warehouse Accpeting Materials Error : ", err);
          next(err);
        })
    );
  }
}

module.exports = WarehouseController;
