

const db = require('../models');
const WorkManagementModel = db.WorkManagementModel;

class WorkSpaceService {
  
  // Fetch All Creating Plans
  static async fetchWorkTables(req, res, next) {
    const string_query = 'select * from workmanagements';
    const result = await db.sequelize.query(string_query);
    console.log('result is : ',result[0]);
    return result[0];
  }

    // Create New Task
  static async createNewTask(data) {

    const creating_data = await WorkManagementModel.create(data);

    return creating_data[0];

  }



}   


module.exports = WorkSpaceService;