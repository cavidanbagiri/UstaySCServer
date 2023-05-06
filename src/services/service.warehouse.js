
const db = require('../models/index');

const WarehouseModel = db.WarehouseModel;

class WarehouseService {

    // Fetch Materials
    static async fetchWaitingSMS(){

        const string_query = `
            select u.username as orderer, sm.id as mainid, * from conditions c
            left join stfs s on c."STFModelId"=s.id
            left join sms sm on sm."STFModelId"=s.id
            left join vendors vn on sm."VendorModelId"=vn.id
            left join users u on u.id=s."UserModelId"
            left join users us on us.id=sm."supplierName"
            where c.condition='processing'
        `
        const result = await db.sequelize.query(string_query);
        return result[0];

    }

    // Post Accpeted Materials
    static async acceptWaitingSM(data){
        delete data[0].id;
        delete data[1].id;
        data[0].passport=false;
        data[0].certificate=false;
        
        data[1].passport=false;
        data[1].certificate=false;
        // console.log(data);
        for(let i of data){
            const temp = await WarehouseModel.create(
                i
            )
        }
        return 'OK';
    }

}

module.exports = WarehouseService