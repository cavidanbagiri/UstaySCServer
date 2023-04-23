
const db = require('../models/index');

const MTFModel = db.MTFModel;

class ProcurementService {

    // Get Waiting MTF From MTF Tables
    static async getWaitingMTF(){
        const string_query = `select m.*, u.username, f.field_name as fieldName from mtfs m
        left join users u on m."UserModelId"=u.id
        left join fields f on f.id=m."FieldsModelId"
        where cond='Wait' 
        ORDER BY m.mtf_num DESC
        `
        const result = await db.sequelize.query(string_query);
        return result[0];
    }

    // Create STF Function
    static async createStf(data){
        
    }

}

module.exports = ProcurementService