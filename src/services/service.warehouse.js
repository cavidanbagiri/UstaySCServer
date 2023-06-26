const db = require("../models/index");

const WarehouseModel = db.WarehouseModel;

class WarehouseService {
  // Fetch Materials
  static async fetchWaitingSMS() {
    const string_query = `      
        SELECT sms.id as sm_id, sms.sm_num, sms.procurement_coming_date, sms.price, sms.total,
        sms.currency, 
        users.username as orderer, vendors.vendor_name, s.situation,
        stfs.id as id, stfs.created_at, stfs.stf_num, 
        stfs.material_name,stfs.count, stfs.unit,
        us.username
        FROM sms
        LEFT JOIN stfs ON sms."STFModelId"=stfs.id
        LEFT JOIN vendors ON sms."VendorModelId"=vendors.id
        LEFT JOIN users ON stfs."UserModelId"=users.id
        left join users us on us.id=sms."supplierName"
        LEFT JOIN conditions c ON c."STFModelId"=stfs.id
        LEFT JOIN situations s ON c."SituationModelId"=s.id
        where c."SituationModelId"=2
        `;
    const result = await db.sequelize.query(string_query);
    return result[0];
  }

  // Post Accpeted Materials
  static async acceptWaitingSM(data) {
    // console.log('data is : ',data);
    for (let i = 0; i < data?.checked_values?.length; i++) {
      const temp = await WarehouseModel.create({

        //         
        delivery_amount: data.table_data[i].delivery_amount,
        passport: data.table_data[i].passport,
        certificate: data.table_data[i].certificate,
        
        // Common Information
        delivery_date: data.sms_data.delivery_date,
        doc_number: data.sms_data.doc_number,
        doc_date: data.sms_data.doc_date,

        // User Information
        acceptedBy: data.user.id,
        ProjectModelId: data.user.ProjectModelId,

        // This doeant work
        SMModelId: data.checked_values[i].sm_id,

      }).then(async (respond) => {
        let string_query = `
                    update conditions set "SituationModelId"=3 where "STFModelId"=${data.checked_values[i].id}
                `;
        const update_temp = await db.sequelize.query(string_query);
      }).catch((err)=>{
        throw new Error(err);
      })
    }
    return "OK";
  }

  // Fetch Received Sm
  static async fetchReceivedSM() {
    const string_query = `      
        SELECT sms.id as sm_id, sms.sm_num, sms.procurement_coming_date, sms.price, sms.total,
        sms.currency, 
        users.username as orderer, vendors.vendor_name, s.situation,
        stfs.id as id, stfs.created_at, stfs.stf_num, 
        stfs.material_name,stfs.count, stfs.unit,
        us.username
        FROM sms
        LEFT JOIN stfs ON sms."STFModelId"=stfs.id
        LEFT JOIN vendors ON sms."VendorModelId"=vendors.id
        LEFT JOIN users ON stfs."UserModelId"=users.id
        left join users us on us.id=sms."supplierName"
        LEFT JOIN conditions c ON c."STFModelId"=stfs.id
        LEFT JOIN situations s ON c."SituationModelId"=s.id
        where c."SituationModelId"=2
        `;
    const result = await db.sequelize.query(string_query);
    return result[0];
  }
}

module.exports = WarehouseService;
