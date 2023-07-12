
const db = require("../models/index");
const whereQuery = require('../helpers/whereQuery');
const ReturnStatisticResult = require('../helpers/returnStatisticsResult');

const WarehouseModel = db.WarehouseModel;

class WarehouseService {

  static display_data_query = `SELECT sms.id as sm_id, sms.sm_num, sms.procurement_coming_date, sms.price, sms.total, sms.sms_amount, sms.left_over_amount,
  sms.currency, 
  users.username as orderer, vendors.vendor_name, s.situation,
  stfs.id as stf_id, stfs.created_at, stfs.stf_num, 
  stfs.material_name,stfs.count, stfs.unit,
  us.username
  FROM sms
  LEFT JOIN stfs ON sms."STFModelId"=stfs.id
  LEFT JOIN vendors ON sms."VendorModelId"=vendors.id
  LEFT JOIN users ON stfs."UserModelId"=users.id
  left join users us on us.id=sms."supplierName"
  LEFT JOIN conditions c ON c."STFModelId"=stfs.id
  LEFT JOIN situations s ON c."SituationModelId"=s.id`

  // Fetch Materials
  static async fetchWaitingSMS() {
    const string_query = `      
    ${this.display_data_query}
        `;
    const result = await db.sequelize.query(string_query);
    return result[0];
  }

  // Fetch Received Sm
  static async fetchReceivedSM() {
    const string_query = `      
    ${this.display_data_query}
        `;
    const result = await db.sequelize.query(string_query);
    return result[0];
  }

  // Post Accpeted Materials
  static async acceptWaitingSM(data) {

    for (let i = 0; i < data?.checked_values?.length; i++) {
      const left_over_amount = await this.findSM(data.checked_values[i].stf_id);
      // Create Warehouse Model
      const temp = await this.createWarehouseModel(data, i)
        .then(async (respond) => {

          // Withdrow left over amount
          await this.withdrowLeftOver(data.table_data[i].delivery_amount, data.checked_values[i].stf_id);

          // Check If Entering amount - and sms_left_over_amount is 0
          if (left_over_amount - data.table_data[i].delivery_amount <= 0) {
            await this.changeConditions(data.checked_values[i].stf_id);
          }

        })
        .catch((err) => {
          throw new Error(err);
        });
    }
    return "OK";
  }

  // Find sms left_over_amount with stf_model_id
  static async findSM(STF_id) {
    const string_query = `select * from sms where sms."STFModelId"=${STF_id} `;
    const result = await db.sequelize.query(string_query);
    return result[0][0].left_over_amount;
  }

  // Change Conditions variable
  static async changeConditions(STF_id) {
    let string_query = `
      update conditions set "SituationModelId"=3 where "STFModelId"=${STF_id}
    `;
    const update_temp = await db.sequelize
      .query(string_query)
      .then(async (respond) => {
        console.log('Update Conditions Completed');
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  // Withdrow Operation after entering delivery amount data
  static async withdrowLeftOver(amount, STF_id){
    // When Condition Change from Processing To Received
    const string_query = `
    update sms
    set left_over_amount = left_over_amount - ${amount} 
    where "STFModelId"=${STF_id}
    `;
    const temp = await db.sequelize
      .query(string_query)
      .then((respond) => {
        console.log("update operation executed successfuly");
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  // Create Warehouse Model
  static async createWarehouseModel (data, i){
      return await WarehouseModel.create({
        // Each Table Inform
        delivery_amount: data.table_data[i].delivery_amount,
        passport: data.table_data[i].passport,
        certificate: data.table_data[i].certificate,
  
        // Common Information
        delivery_date: data.sms_data.delivery_date,
        doc_number: data.sms_data.doc_number,
        doc_date: data.sms_data.doc_date,
  
        // User Information
        acceptedBy: data.user.id,
        ProjectModelId: data.user.ProjectModelId,
  
        // Get SM Model ID
        SMModelId: data.checked_values[i].sm_id,
      })
  }

  static async getStatisticResult (){
    const string_query = 
    `
    select "SituationModelId", COUNT("SituationModelId") from conditions 
      GROUP BY "SituationModelId"
      ORDER BY "SituationModelId"
    `
    const result = await db.sequelize.query(string_query);
    return ReturnStatisticResult.returnStatisticResultSM(result[0]);
  }

  static async getStatisticResultData (result_value_id){
    const string_query = `
    ${this.display_data_query}
    where c."SituationModelId"=${result_value_id}
    `;

    const result = await db.sequelize.query(string_query);
    return result[0];
  }


  static async getFilteredDataWait (filtered_query){
    const where_query = whereQuery('where',filtered_query);
    const string_query = `
    ${this.display_data_query}
    ${where_query}
    ORDER BY stfs.stf_num DESC
    `;

    const result = await db.sequelize.query(string_query);

    return result[0];
  }

  static async getFilteredDataReceived (filtered_query){
    const where_query = whereQuery('where',filtered_query);
    const string_query = `
    ${this.display_data_query}
    ${where_query}
    ORDER BY stfs.stf_num DESC
    `;

    const result = await db.sequelize.query(string_query);

    return result[0];
  }



}

module.exports = WarehouseService;
