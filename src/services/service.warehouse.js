
const db = require('../models/index');

const WarehouseModel = db.WarehouseModel;

class WarehouseService {

    // Fetch Materials
    static async fetchWaitingSMS(){

        const string_query = `      
        select stfs.*, users.username as orderer, sms.id as mainid, sms.sm_num,
        sms.price, sms.currency, us.username, vn.vendor_name, situations.situation
        from conditions c
        left join stfs on c."STFModelId"=stfs.id
        left join sms on sms."STFModelId"=stfs.id
        left join vendors vn on sms."VendorModelId"=vn.id
        left join users on users.id=stfs."UserModelId"
        left join users us on us.id=sms."supplierName"
        LEFT JOIN situations ON c."SituationModelId" = situations.id
        where c."SituationModelId"=2
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