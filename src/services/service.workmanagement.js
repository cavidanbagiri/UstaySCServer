

const db = require('../models');
const WorkManagementModel = db.WorkManagementModel;

class WorkSpaceService {
  
    // Create New Task
  static async createNewTask(data) {

    const creating_data = await WorkManagementModel.create(data);

    return creating_data[0];

  }



}   


module.exports = WorkSpaceService;