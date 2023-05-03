const db = require("../models/index");

// Import Moment JS for Creating Coming Date
const moment = require("moment");

const STFModel = db.STFModel;
const SMModel = db.SMModel;

const ConditionModel = db.ConditionModel;

class ProcurementService {

    // Fetch All SM
    static async getAllSm(){
      
      const string_query = `select * from sms 
      left join stfs on sms."STFModelId"=stfs.id 
      left join conditions c on c."STFModelId"=sms."STFModelId"
      left join vendors v on v.id=sms."VendorModelId"
      left join users u on u.id=sms."UserModelId""`;
      const result = await db.sequelize.query(string_query);  
      console.log('sm result : ',result[0]);
      return result[0];
      }

  // Get Waiting STF From STF Tables
  static async getWaitingSTF() {
    //const temp_string_query = `select m.*, u.username, u."ProjectModelId", u."DepartmentModelId", f.field_name as fieldName, c.condition as cond from stfs m`;

    const string_query = `select m.*, u.username, u."ProjectModelId", u."DepartmentModelId", f.field_name as fieldName, c.condition as cond from stfs m

        left join users u on m."UserModelId"=u.id
        left join fields f on f.id=m."FieldsModelId"
        left join conditions c on c."STFModelId"=m.id
        where c.condition='waiting' 
        ORDER BY m.stf_num DESC
        `;
    const result = await db.sequelize.query(string_query);
    return result[0];
  }

  // Create an sm
  static async createSm(data){
    console.log('sm data  : ',data);
    let sm_num = '';
    let returning_data = ''
    for(let i = 0 ; i < data.length; i ++ ){
        data[i].procurement_coming_date = moment(data[i].procurement_coming_date).format('YYYY-MM-DD');
        if(i === 0){
            const creating_data = await SMModel.create(data[i]);
            if(creating_data.id){
                let counting = creating_data.id+1000;
                switch (data[i].ProjectModelId){
                    case 1 : 
                        sm_num = `SRU.RS21.${counting}`
                        break;
                    case 2:
                        sm_num = `DCU.RS21.${counting}`
                        break;
                }
                returning_data = await db.sequelize.query(
                    `update sms set sm_num = '${sm_num}' where id=${creating_data.id}`
                );
                const temp = await db.sequelize.query(
                    `update conditions set condition='processing' where "STFModelId"=${data[i].STFModelId} `
                )
                continue
            }
        }
        data[i].sm_num = sm_num;
        const temp = await SMModel.create(data[i]);
        const some_temp = await db.sequelize.query(
            `update conditions set condition='processing' where "STFModelId"=${data[i].STFModelId} `
        )
    }

    return 'OK';
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
      'select id, username from users where "StatusModelId"=4 ';
    const result = await db.sequelize.query(string_query);
    return result[0];
  }
}

module.exports = ProcurementService;
