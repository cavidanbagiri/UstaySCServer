

const tryCatch = require('../utils/trycatch');
const WorkSpaceService = require('../services/service.workmanagement.js');

class WorkSpaceController {
  
    // Fetch All Creating Plans
  static async fetchWorkTables(req, res, next) {
    return res.send("Work Space Work");
  }

  // Create New Task
  static async createNewTask(req, res, next) {

    const creatingData = {
        UserModelId:2,
        task: 'Create Warehouse Provide Model',
        comment: 'Must Create Warehouse Provide Model',
        condition: 'Working',
        setting_at: '05-23-2023'
    }

    tryCatch(
        await WorkSpaceService.createNewTask(creatingData)
        .then((respond)=>{
            res.send(respond);
        })
        .catch((err)=>{
            next(err);
        })
    )

  }

}

module.exports = WorkSpaceController;
