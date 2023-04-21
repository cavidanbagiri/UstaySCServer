
const db = require('../models/index');

const MTFModel = db.MTFModel;

class ProcurementService {

    // Get Waiting MTF From MTF Tables
    static async getWaitingMTF(){

        const string_query = `select * from mtfs where cond='Wait'`;
        const result = await db.sequelize.query(string_query);

        return result[0];

    }

}

module.exports = ProcurementService