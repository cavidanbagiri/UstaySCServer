const db = require("../models");

const MTFModel = db.MTFModel;
const FieldsModel = db.FieldsModel;

class OrderService {

  // Create a MTF form
  static async createMtf(data) {
    const user_data = data.user;
    const order_data = data.orders;
    let return_data = '';
    let mtf_num = 0;
    for (let i = 0; i < order_data.length; i++) {
      if (
        order_data[i].material_type !== "" &&
        order_data[i].material_name !== "" &&
        order_data[i].count !== 0 &&
        order_data[i].count !== ""
      ) {
        order_data[i].UserModelId = user_data.id
        order_data[i].ProjectModelId = user_data.ProjectModelId
        order_data[i].DepartmentModelId = user_data.DepartmentModelId
        if (i === 0) {
          const creating_data = await MTFModel.create(order_data[i]);
          if (creating_data.id) {
            let counting = creating_data.id + 1000;
            // Check project for prefix
            switch(user_data.ProjectModelId){
              case 1:
                mtf_num = `SRU.RS21.${counting}`;
                break;
              case 2:
                mtf_num = `DCU.RS21.${counting}`;
                break;
            }
            return_data = db.sequelize.query(
              `update mtfs set mtf_num = '${mtf_num}' where id=${creating_data.id}`
            );
            continue;
          }
        }
        order_data[i].mtf_num = mtf_num;
        const temp = await MTFModel.create(order_data[i]);
      }
    }

    return return_data;
  }

  // Show User MTF
  static async showMTF(userData) {
    const user_id = userData.id;
    const project_id = userData.ProjectModelId;

    const string_query = `SELECT mtfs.*, users.username as username FROM mtfs  
    LEFT JOIN users ON users.id=mtfs."UserModelId"
    WHERE mtfs."UserModelId"=${user_id} AND mtfs."ProjectModelId"=${project_id}
    `;
    const result = await db.sequelize.query(string_query);
    return result[0];
  }

   // Fetch Fields From Fields Model
   static async fetchField(ProjectModelId){
    const string_query = `select id, field_name from fields where "ProjectModelId" = ${ProjectModelId} `;
    const fields = await db.sequelize.query(string_query);
    console.log(fields[0]);
    return fields[0];
   }

}

module.exports = OrderService;
