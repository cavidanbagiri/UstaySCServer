const db = require("../models");

const STFModel = db.STFModel;
const FieldsModel = db.FieldsModel;
const ConditionModel = db.ConditionModel;

class OrderService {

  // Create a MTF form
  static async createStf(data) {
    const user_data = data.user;
    const order_data = data.orders;
    let stf_num = 0;
    let return_data = '';
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
          const creating_data = await STFModel.create(order_data[i]);
          if (creating_data.id) {
            let counting = creating_data.id + 1000;
            // Check project for prefix
            switch(user_data.ProjectModelId){
              case 1:
                stf_num = `SRU.RS21.${counting}`;
                break;
              case 2:
                stf_num = `DCU.RS21.${counting}`;
                break;
            }
            return_data = await db.sequelize.query(
              `update stfs set stf_num = '${stf_num}' where id=${creating_data.id}`
            );
            const adding_conditions = await ConditionModel.create({
              "condition": 'waiting',
              "STFModelId": creating_data.id,
              "ProjectModelId": creating_data.ProjectModelId
            });
            continue;
          }
        }
        order_data[i].stf_num = stf_num;
        const temp = await STFModel.create(order_data[i]);
        const adding_conditions = await ConditionModel.create({
          "condition": 'waiting',
          "STFModelId": temp.id,
          "ProjectModelId": temp.ProjectModelId
        });
      }
    }
    // Fect Creating MTF and send Client Side
    const string_query = `SELECT stfs.*, u.username FROM stfs LEFT JOIN users u on stfs."UserModelId"=u.id where stf_num = '${stf_num}'`;
    const result_data = await db.sequelize.query(string_query);
    return result_data[0];
  }

  // Show User MTF
  static async showSTF(userData) {
    const user_id = userData.id;
    const project_id = userData.ProjectModelId;

    const string_query = `SELECT stfs.*, users.username as username, f.field_name as fieldname FROM stfs  
    LEFT JOIN users ON users.id=stfs."UserModelId"
    left join fields f on f.id=stfs."FieldsModelId"
    WHERE stfs."UserModelId"=${user_id} AND stfs."ProjectModelId"=${project_id}
    ORDER BY stfs.stf_num DESC
    `;
    const result = await db.sequelize.query(string_query)



    console.log('result is : ',result[0]);
    return result[0];
  }

   // Fetch Fields From Fields Model
   static async fetchField(ProjectModelId){
    const string_query = `select id, field_name from fields where "ProjectModelId" = ${ProjectModelId} `;
    const fields = await db.sequelize.query(string_query);
    return fields[0];
   }

}

module.exports = OrderService;
