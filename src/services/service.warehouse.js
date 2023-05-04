
const db = require('../models/index');

const WarehouseModel = db.WarehouseModel;

class WarehouseService {

    // Fetch Materials
    static async fetchWaitingSMS(){

        const string_query = `
            select u.username as orderer, * from conditions c
            left join stfs s on c."STFModelId"=s.id
            left join sms sm on sm."STFModelId"=s.id
            left join vendors vn on sm."VendorModelId"=vn.id
            left join users u on u.id=s."UserModelId"
            left join users us on us.id=sm."supplierName"
            where c.condition='processing'
        `

        const result = await db.sequelize.query(string_query);

        console.log('result us : ',result[0]);

        return result[0];

    }

}

module.exports = WarehouseService