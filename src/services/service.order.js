const db = require("../models");

const STFModel = db.STFModel;
const FieldsModel = db.FieldsModel;
const ConditionModel = db.ConditionModel;

class OrderService {
  
  // Check Sending Data Length
  static async checkData(order_data) {
    let count = 0;
    for (let i = 0; i < order_data.length; i++) {
      if (
        order_data[i].material_type !== "" &&
        order_data[i].material_name !== "" &&
        order_data[i].count !== "" &&
        order_data[i].unit !== ""
      ) {
        count++;
      }
    }
    return count;
  }

  // Create a MTF form
  static async createStf(data) {
    const user_data = data.user;
    const order_data = data.orders;
    let stf_num = 0;
    let return_data = "";
    // Check How Many true orders have
    const order_length = await this.checkData(order_data);
    // If True order length is zero return Error else continue
    if (order_length === 0) {
      throw new Error("MTF Cant Create first");
    } else {
      // Loop Will Work true length of orders;
      for (let i = 0; i < order_length; i++) {
          order_data[i].UserModelId = user_data.id;
          order_data[i].ProjectModelId = user_data.ProjectModelId;
          order_data[i].DepartmentModelId = user_data.DepartmentModelId;
          if (i === 0) {
            const creating_data = await STFModel.create(order_data[i]);
            if (creating_data.id) {
              let counting = creating_data.id + 1000;
              // Check project for prefix
              switch (user_data.ProjectModelId) {
                case 1:
                  stf_num = `SRU.RS21.${counting}`;
                  break;
              }
              return_data = await db.sequelize.query(
                `update stfs set stf_num = '${stf_num}' where id=${creating_data.id}`
              );
              const adding_conditions = await ConditionModel.create({
                SituationModelId: 1,
                STFModelId: creating_data.id,
                ProjectModelId: creating_data.ProjectModelId,
              });
              continue;
            }
          }
          order_data[i].stf_num = stf_num;
          const creating_data = await STFModel.create(order_data[i]);
          const adding_conditions = await ConditionModel.create({
            SituationModelId: 1,
            STFModelId: creating_data.id,
            ProjectModelId: creating_data.ProjectModelId,
          });
      }
      // Check and Fetch Creating MTF and send Client Side
      if (stf_num === 0) {
        throw new Error("MTF Cant Create For STF NUM ");
      } else {
        const string_query = `SELECT stfs.*, u.username FROM stfs LEFT JOIN users u on stfs."UserModelId"=u.id where stf_num = '${stf_num}'`;
        const result_data = await db.sequelize.query(string_query);
        return result_data[0];
      }
    }
  }

  // Show User MTF
  static async showSTF(userData) {
    const user_id = userData.id;
    const project_id = userData.ProjectModelId;

    const string_query = `
    SELECT stfs.*, users.username, fields.field_name, situations.situation FROM stfs
    LEFT JOIN users ON stfs."UserModelId"=users.id
    LEFT JOIN fields ON fields.id=stfs."FieldsModelId"
    LEFT JOIN conditions cond ON cond."STFModelId" = stfs.id
    LEFT JOIN situations ON situations.id=cond."SituationModelId"
    WHERE stfs."UserModelId"=${user_id} AND stfs."ProjectModelId"=${project_id}
    ORDER BY stfs.stf_num DESC
    `

    const result = await db.sequelize.query(string_query);

    return result[0];
  }

  // Fetch Fields From Fields Model
  static async fetchField(ProjectModelId) {
    const string_query = `select id, field_name from fields where "ProjectModelId" = ${ProjectModelId} `;
    const fields = await db.sequelize.query(string_query);
    return fields[0];
  }
}

module.exports = OrderService;
