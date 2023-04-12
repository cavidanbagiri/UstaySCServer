
const db = require('../models');

const MTFModel = db.MTFModel;

class OrderService{
    
    // Create a MTF form
    static async createMtf(){

        const data = {
            mtf_num:'SRU.2023.0001',
            material_type: 'Consumable',
            material_name: 'Kesme Tas 115mm Karbonsteel',
            material_name_other: 'Cutting Disc 115mm Carbonsteel',
            count: 1000,
            unit: 'Adet',
            field: 'SRU Area Gazprom',
            comment: 'Urgently Request',
            "ProjectModelId":1,
            "UserModelId":1,
            "DepartmentModelId":1
        }

        const creatingMTF = await MTFModel.create(data);
        
        return creatingMTF;
    }

}


module.exports = OrderService;