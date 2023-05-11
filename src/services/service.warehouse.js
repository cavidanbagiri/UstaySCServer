
const db = require('../models/index');

const WarehouseModel = db.WarehouseModel;

class WarehouseService {

    // Fetch Materials
    static async fetchWaitingSMS(){

        const string_query = `      
        select stfs.*, users.username as orderer, sms.id as mainid, 
        sms.id as sms_id, sms.sm_num,
        sms.price, sms.currency, 
        us.username, vn.vendor_name, 
        situations.situation
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
        console.log('data : ',data);                          
        for(let i = 0 ; i < data?.checked_values?.length; i ++ ){
            const temp = await WarehouseModel.create({
                delivery_amount:data.table_data[i].delivery_amount,
                passport: data.table_data[i].passport,
                certificate: data.table_data[i].certificate,
                delivery_date: data.sms_data.delivery_date,
                doc_number: data.sms_data.doc_number,
                doc_date: data.sms_data.doc_date,
                acceptedBy: data.user.id,
                ProjectModelId: data.user.ProjectModelId,
                SMModelId: data.checked_values[i].sms_id,
            }).then(async (respond)=>{
                let string_query = `
                    update conditions set "SituationModelId"=3 where "STFModelId"=${data.checked_values[i].id}
                `
                const update_temp = await db.sequelize.query(string_query);
            });
            
        }
        return 'OK';
    }

}

module.exports = WarehouseService