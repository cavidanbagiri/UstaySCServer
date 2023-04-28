
const db = require('../models/index');

// Import Moment JS for Creating Coming Date
const moment = require('moment');

const MTFModel = db.MTFModel;
const STFModel = db.STFModel;

const ConditionModel = db.ConditionModel;

class ProcurementService {

    // Get Waiting MTF From MTF Tables
    static async getWaitingMTF(){

        // Get All Data From mtfs table
        // const temp_string_query = 'select * from mtfs ';

        // Execute query
        // const resu = await db.sequelize.query(temp_string_query);
        // for(let i = 0 ; i < resu[0].length ; i ++ ){
        //     const temp = await ConditionModel.create({
        //         'condition': 'Waiting',
        //         "MTFModelId": resu[0][i].id,
        //         "ProjectModelId": 1
        //     })
        // }

        const string_query = `select m.*, u.username, u."ProjectModelId", u."DepartmentModelId", f.field_name as fieldName, c.condition as cond from mtfs m
        left join users u on m."UserModelId"=u.id
        left join fields f on f.id=m."FieldsModelId"
        left join conditions c on c.id=m.id
        where c.condition='waiting' 
        ORDER BY m.mtf_num DESC
        ` 
        const result = await db.sequelize.query(string_query);
        return result[0];
    }

    // Create STF Function
    static async createStf(data){
        let sm_num = '';
        let returning_data = ''
        for(let i = 0 ; i < data.length; i ++ ){
            data[i].procurement_coming_date = moment(data[i].procurement_coming_date).format('YYYY-MM-DD');
            if(i === 0){
                const creating_data = await STFModel.create(data[i]);
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
                        `update stfs set sm_num = '${sm_num}' where id=${creating_data.id}`
                    );
                    continue
                }
            }
            data[i].sm_num = sm_num;
            const temp = await STFModel.create(data[i]);
        }

        return 'OK';
    }

    // Fetch Companies Names
    static async fetchCompaniesNames(req, res, next) {
        let string_query = 'select id, vendor_name from vendors';
        const result = await db.sequelize.query(string_query);
        return result[0];
    }

    // Fetch Users Names
    static async fetchUsers(req, res, next) {
        let string_query = 'select id, username from users where "StatusModelId"=4 ';
        const result = await db.sequelize.query(string_query);
        return result[0];
    }


}

module.exports = ProcurementService