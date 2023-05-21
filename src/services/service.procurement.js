const db = require("../models/index");

// Import Moment JS for Creating Coming Date
const moment = require("moment");

const STFModel = db.STFModel;
const SMModel = db.SMModel;
const SMSNumsModel = db.SMSNumsModel;

const ConditionModel = db.ConditionModel;

class ProcurementService {

  // Fetch STF Statistic Result
  static async getSTFStatisticsResult(){

    const result = await db.sequelize.query(`
      select "SituationModelId", COUNT("SituationModelId") from conditions 
      GROUP BY "SituationModelId"
      ORDER BY "SituationModelId"
    `);
    return result[0];
  }

  static async fetchAllSTF() {


    // Fetch All STF
    const string_query = `
    SELECT situations.situation,
    stfs.stf_num, stfs.created_at, stfs.material_name, stfs.count, stfs.unit,
    users.username
    FROM conditions
    LEFT JOIN situations ON conditions."SituationModelId"=situations.id
    LEFT JOIN stfs ON conditions."STFModelId"=stfs.id
    LEFT JOIN users ON stfs."UserModelId"=users.id   
    `
    const result = await db.sequelize.query(string_query);
    return result[0];
  }

  static async fetchStatisticResultData (result_value_id) {

    const string_query = `
    SELECT situations.situation,
    stfs.stf_num, stfs.created_at, stfs.material_name, stfs.count, stfs.unit,
    users.username
    FROM conditions
    LEFT JOIN situations ON conditions."SituationModelId"=situations.id
    LEFT JOIN stfs ON conditions."STFModelId"=stfs.id
    LEFT JOIN users ON stfs."UserModelId"=users.id   
    where conditions."SituationModelId"=${result_value_id}
    `

    const result = await db.sequelize.query(string_query);

    return result[0];
  }


  // Fetch All SM
  static async getAllSm() {
    const string_query = `
    SELECT sms.* , users.username as orderer, vendors.vendor_name, s.situation,
    stfs.created_at, stfs.stf_num, stfs.material_name,
    stfs.count, stfs.unit, us.username
    FROM sms
    LEFT JOIN stfs ON sms."STFModelId"=stfs.id
    LEFT JOIN vendors ON sms."VendorModelId"=vendors.id
    LEFT JOIN users ON stfs."UserModelId"=users.id
    left join users us on us.id=sms."supplierName"
    LEFT JOIN conditions c ON c."STFModelId"=stfs.id
    LEFT JOIN situations s ON c."SituationModelId"=s.id
    `;

    const result = await db.sequelize.query(string_query);
    console.log("sm result : ", result[0]);
    return result[0];
  }

  // Get Waiting STF From STF Tables
  static async getWaitingSTF() {
    const string_query = `
        SELECT stfs.*, users.username, fields.field_name, situations.situation FROM stfs
        LEFT JOIN users ON stfs."UserModelId"=users.id
        LEFT JOIN fields ON fields.id=stfs."FieldsModelId"
        LEFT JOIN conditions cond ON cond."STFModelId" = stfs.id
        LEFT JOIN situations ON situations.id=cond."SituationModelId"
        WHERE situations.situation='Waiting'
        ORDER BY stfs.stf_num DESC
    `;
    const result = await db.sequelize.query(string_query);
    return result[0];
  }

  // Create Firstly SMS Num
  static async getLastNumFromSMSnums() {
    const string_query =
      'insert into smsnums(smnum, "createdAt", "updatedAt") values( 1+ (select smnum from smsnums order by smnum desc limit 1), current_timestamp, current_timestamp ) returning smnum ';
    const result = await db.sequelize.query(string_query);
    console.log('sm_num : ',result[0][0].snnum);
    return result[0][0].smnum;
  }

  // Create an sm
  static async createSm(data) {
    // Get Last Number From Sm Num
    const sm_num = await this.getLastNumFromSMSnums();
    for (let i = 0; i < data.length; i++) {
      // If There is a Data
      if (data[i].procurement_coming_date != '') {
        data[i].procurement_coming_date = moment(
          data[i].procurement_coming_date
        ).format("YYYY-MM-DD");
      }
      else{
        data[i].procurement_coming_date = null;
      }
      // Create sn_num form
      switch (data[i].ProjectModelId) {
        case 1:
          data[i].sm_num = `SRU.RS21.SM.${sm_num}`;
          break;
      }
      // Update Conditions set SitutationModelId with Processing
      const update_situations = await db.sequelize.query(
        `update conditions set "SituationModelId"=2 where "STFModelId"=${data[i].STFModelId} `
      );

      const temp = await SMModel.create(data[i]);

    }

    return "OK";
  }

  // Fetch Companies Names
  static async fetchCompaniesNames(req, res, next) {
    let string_query = "select id, vendor_name from vendors";
    const result = await db.sequelize.query(string_query);
    return result[0];
  }

  // Fetch Users Names
  static async fetchUsers(req, res, next) {
    let string_query =
      'select id, username from users where "StatusModelId"=2 ';
    const result = await db.sequelize.query(string_query);
    return result[0];
  }

 
}

module.exports = ProcurementService;
