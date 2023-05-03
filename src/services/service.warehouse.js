
const db = require('../models/index');

const WarehouseModel = db.WarehouseModel;

class WarehouseService {

    // Fetch Materials
    static async fetchWaitingSMS(){

        const string_query = `
            select sm.* from conditions c
            left join stfs s on c."STFModelId"=s.id
            left join sms sm on sm."STFModelId"=s.id
            where c.condition='processing'
        `

        const result = await db.sequelize.query(string_query);

        console.log('result us : ',result[0]);

        return result[0];

    }

}

module.exports = WarehouseService