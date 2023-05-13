const db = require("../models");

const STFModel = db.STFModel;
const FieldsModel = db.FieldsModel;
const ConditionModel = db.ConditionModel;
const STFSNumsModel = db.STFSNumsModel;

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

  static async getLastNumFromSTFSNums() {
    const string_query =
      'insert into stfsnums(stfnum, "createdAt", "updatedAt") values( 1+ (select stfnum from stfsnums order by stfsnums desc limit 1), current_timestamp, current_timestamp ) returning stfnum ';
    const result = await db.sequelize.query(string_query);
    return result[0][0].stfnum;
  }

  static async createStf(data) {
    // Take User Inform from data
    const user_data = data.user;
    // Take Order Data from data
    const order_data = data.orders;

    // Create stfsnums just one time and get stfs nums
    let stf_num = await this.getLastNumFromSTFSNums();

    // Get Project Model Id Name + stfnum for inserting stf table
    switch (user_data.ProjectModelId) {
      case 1:
        stf_num = `SRU.RS21.${stf_num}`;
    }

    // Check How Many true order row have
    const order_length = await this.checkData(order_data);

    // If Order Length is 0 throw Error Else Create STF
    if (order_length === 0) {
      throw new Error("MTF Cant Create first");
    } else {
      for (let i = 0; i < order_length; i++) {
        order_data[i].UserModelId = user_data.id;
        order_data[i].ProjectModelId = user_data.ProjectModelId;
        order_data[i].DepartmentModelId = user_data.DepartmentModelId;
        order_data[i].stf_num = stf_num;
        const creating_data = await STFModel.create(order_data[i])
        .then(async (respond)=>{
          console.log('respond is : ',respond);
          const adding_conditions = await ConditionModel.create({
            SituationModelId: 1,
            STFModelId: respond.dataValues.id,
            ProjectModelId: respond.dataValues.ProjectModelId,
          });
        }).catch((err)=>{
          console.log('Error Happen inside of Create STFTemp : ',err);
          throw new Error(err);
        })
      }
    }

    // Return Creating STF
    const returning_result = `select * from stfs where stf_num=${stf_num}`;
    return returning_result[0];

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
    `;

    const result = await db.sequelize.query(string_query);

    return result[0];
  }

  // Fetch Fields From Fields Model
  static async fetchField(ProjectModelId) {
    const string_query = `select id, field_name from fields where "ProjectModelId" = ${ProjectModelId} `;
    const fields = await db.sequelize.query(string_query);
    return fields[0];
  }

  // Get STF Statistics
  static async getUserStaticSTFS(user_id) {
    const result = await db.sequelize.query(`
    select "SituationModelId", COUNT("SituationModelId") from conditions 
    where "STFModelId" IN ( select id from stfs where "UserModelId" = ${user_id} )
    GROUP BY "SituationModelId"
    ORDER BY "SituationModelId"
  `);
    console.log(result[0]);
    return result[0];
  }
}

module.exports = OrderService;
