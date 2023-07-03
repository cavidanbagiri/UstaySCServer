const db = require("../models/index");

// Import Moment JS for Creating Coming Date
const moment = require("moment");

const STFModel = db.STFModel;
const SMModel = db.SMModel;

class STFProcurementService {
  // Fetch STF Statistic Result
  static async getSTFStatisticsResult() {
    const result = await db.sequelize.query(`
      select "SituationModelId", COUNT("SituationModelId") from conditions 
      GROUP BY "SituationModelId"
      ORDER BY "SituationModelId"
    `);
    return result[0];
  }

  // Fetch All STF
  static async fetchAllSTF() {
    const string_query = `
    SELECT stfs.id as stf_id, stfs.stf_num, stfs.material_type, stfs.material_name, stfs.count, stfs.created_at,stfs.unit,
    sms.sm_num,
    sms.procurement_coming_date,
    vendors.vendor_name,
    users.username,
    fields.field_name,
    situations.situation
    FROM stfs
    LEFT JOIN fields ON fields.id=stfs."FieldsModelId"
    LEFT JOIN conditions cond ON cond."STFModelId" = stfs.id
    LEFT JOIN situations ON situations.id=cond."SituationModelId"
    LEFT JOIN sms on sms."STFModelId"=stfs.id
    LEFT JOIN vendors on sms."VendorModelId"=vendors.id
    LEFT JOIN users on sms."supplierName"=users.id
      ORDER BY stfs.stf_num DESC
    `;
    const result = await db.sequelize.query(string_query);
    return result[0];
  }

  static async fetchStatisticResultData(result_value_id) {
    const string_query = `
    SELECT situations.situation,
    stfs.stf_num, stfs.created_at, stfs.material_name, stfs.count, stfs.unit,
    users.username
    FROM conditions
    LEFT JOIN situations ON conditions."SituationModelId"=situations.id
    LEFT JOIN stfs ON conditions."STFModelId"=stfs.id
    LEFT JOIN users ON stfs."UserModelId"=users.id   
    where conditions."SituationModelId"=${result_value_id}
    `;

    const result = await db.sequelize.query(string_query);
    return result[0];
  }
}

class SMProcurementService {
  // Fetch All SM
  static async getAllSm() {
    const string_query = `
    SELECT sms.id as sm_id, sms.sm_num, sms.procurement_coming_date, sms.price, sms.total, sms.currency, sms.created_at, sms.sms_amount, sms.left_over_amount,
    users.username as orderer, vendors.vendor_name, s.situation,
    stfs.id as stf_id, stfs.created_at, stfs.stf_num, stfs.material_name, stfs.count, stfs.unit,
    us.username
    FROM sms
    LEFT JOIN stfs ON sms."STFModelId"=stfs.id
    LEFT JOIN vendors ON sms."VendorModelId"=vendors.id
    LEFT JOIN users ON stfs."UserModelId"=users.id
    left join users us on us.id=sms."supplierName"
    LEFT JOIN conditions c ON c."STFModelId"=stfs.id
    LEFT JOIN situations s ON c."SituationModelId"=s.id
    `;

    const result = await db.sequelize.query(string_query);
    // console.log("sm result : ", result[0]);
    return result[0];
  }

  // Fetch SM Statistic Result
  static async getSMStatisticsResult() {
    const result = await db.sequelize.query(`
      select "SituationModelId", COUNT("SituationModelId") from conditions 
      GROUP BY "SituationModelId"
      ORDER BY "SituationModelId"
    `);
    return result[0];
  }

  // Fetch SM Data accoring to processing or Received
  static async fetchStatisticResultDataSM(result_value_id) {
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
    where c."SituationModelId"=${result_value_id}
    `;

    const result = await db.sequelize.query(string_query);

    return result[0];
  }
}

class ProcurementService {

  // Get STF Service Class
  static getSTFProcurementService() {
    return STFProcurementService;
  }

  // Get SM Service Class
  static getSMProcurementService() {
    return SMProcurementService;
  }


  // Create Firstly SMS Num
  static async getLastNumFromSMSnums() {
    const string_query =
      'insert into smsnums(smnum, "createdAt", "updatedAt") values( 1+ (select smnum from smsnums order by smnum desc limit 1), current_timestamp, current_timestamp ) returning smnum ';
    const result = await db.sequelize.query(string_query);
    return result[0][0].smnum;
  }

  // Create an sm
  static async createSm(data) {
    console.log('data : ',data);
    //Get Last Number From Sm Num

    const sm_num = await this.getLastNumFromSMSnums()
    .then(async (respond)=>{
      for (let i = 0; i < data.length; i++) {
        // If There is a Data
        if (data[i].procurement_coming_date != "") {
          data[i].procurement_coming_date = moment(
            data[i].procurement_coming_date
          ).format("YYYY-MM-DD");
        } else {
          data[i].procurement_coming_date = null;
        }
        data[i].sm_num = `SRU.RS21.SM.${respond}`;
        console.log(`sm num is ${respond} : `,data[i]);
        const temp = await SMModel.create(data[i])
        .then(async (respond)=>{
          // Update Conditions set SitutationModelId with Processing
          const update_situations = await db.sequelize.query(
            `update conditions set "SituationModelId"=2 where "STFModelId"=${data[i].STFModelId} `
          );
        })
        .catch((err)=>{
          throw new Error(err);
        })
  
      }
    })
    .catch((err)=>{
      throw new Error(err);
    })

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
