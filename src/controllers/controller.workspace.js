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

  // Update Task
  static async updateTask(req, res, next) {
    const data = req.body;

    tryCatch(
      await WorkSpaceService.updateTask(data)
      .then((respond)=>{
        res.send(respond);
      }).catch((err)=>{
        next(err);
      })
    )
  }

  // Remove Task
  static async deleteTask(req, res, next) {
    const data = req.body;
    console.log(' sending data is : ', data);
    tryCatch(
      await WorkSpaceService.removeTask(data)
      .then((respond)=>{
        res.send(respond);
      }).catch((err)=>{
        next(err);
      })
    )
  }

}

module.exports = WorkSpaceController;
