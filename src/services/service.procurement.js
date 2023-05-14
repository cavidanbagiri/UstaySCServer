const db = require("../models/index");

// Import Moment JS for Creating Coming Date
const moment = require("moment");

const STFModel = db.STFModel;
const SMModel = db.SMModel;

const ConditionModel = db.ConditionModel;

class ProcurementService {
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

  // Create an sm
  static async createSm(data) {
    let sm_num = "";
    let returning_data = "";
    for (let i = 0; i < data.length; i++) {
      data[i].procurement_coming_date = moment(
        data[i].procurement_coming_date
      ).format("YYYY-MM-DD");
      if (i === 0) {
        const creating_data = await SMModel.create(data[i]);
        if (creating_data.id) {
          let counting = creating_data.id + 1000;
          switch (data[i].ProjectModelId) {
            case 1:
              sm_num = `SRU.RS21.${counting}`;
              break;
          }
          returning_data = await db.sequelize.query(
            `update sms set sm_num = '${sm_num}' where id=${creating_data.id}`
          );
          const temp = await db.sequelize.query(
            `update conditions set "SituationModelId"=2 where "STFModelId"=${data[i].STFModelId} `
          );
          continue;
        }
      }
      data[i].sm_num = sm_num;
      const temp = await SMModel.create(data[i]);
      const ttemp = await db.sequelize.query(
        `update conditions set "SituationModelId"=2 where "STFModelId"=${data[i].STFModelId} `
      );
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

  // Fetch Processing
  static async fetchProcessingSM(req, res, next) {
    const string_query = `
      SELECT stfs.*, users.username, fields.field_name, situations.situation FROM stfs
      LEFT JOIN users ON stfs."UserModelId"=users.id
      LEFT JOIN fields ON fields.id=stfs."FieldsModelId"
      LEFT JOIN conditions cond ON cond."STFModelId" = stfs.id
      LEFT JOIN situations ON situations.id=cond."SituationModelId"
      WHERE situations.situation='Processing'
      ORDER BY stfs.stf_num DESC
    `;
    const result = await db.sequelize.query(string_query);
    console.log("result is : ", result[0]);
    return result[0];
  }

  // Fetch Receiving
  static async fetchReceivingSM(req, res, next) {
    const string_query = `
      SELECT stfs.*, users.username, fields.field_name, situations.situation FROM stfs
      LEFT JOIN users ON stfs."UserModelId"=users.id
      LEFT JOIN fields ON fields.id=stfs."FieldsModelId"
      LEFT JOIN conditions cond ON cond."STFModelId" = stfs.id
      LEFT JOIN situations ON situations.id=cond."SituationModelId"
      WHERE situations.situation='Received'
      ORDER BY stfs.stf_num DESC
    `;
    const result = await db.sequelize.query(string_query);
    console.log("result is : ", result[0]);
    return result[0];
  }
}

module.exports = ProcurementService;
