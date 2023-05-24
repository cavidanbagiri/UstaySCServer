const tryCatch = require("../utils/trycatch");
const WorkSpaceService = require("../services/service.workmanagement.js");

class WorkSpaceController {
  // Fetch All Creating Plans
  static async fetchWorkTables(req, res, next) {
    tryCatch(
      await WorkSpaceService.fetchWorkTables()
        .then((respond) => {
          return res.send(respond);
        })
        .catch((err) => {
          next(err);
        })
    );
  }

  // Create New Task
  static async createNewTask(req, res, next) {
    const creating_data = req.body;

    tryCatch(
      await WorkSpaceService.createNewTask(creating_data)
        .then((respond) => {
          res.send(respond);
        })
        .catch((err) => {
          next(err);
        })
    );
  }
}

module.exports = WorkSpaceController;
