
const WarehouseService = require('../services/service.warehouse'); 

class WarehouseController {

    // Fetch Materials
    static async fetchWaitingSMS(req, res, next){

        await WarehouseService.fetchWaitingSMS()
        .then((respond)=>{
            return res.send(respond);
        }).catch((err)=>{
            console.log('Get Waiting SMS Error From Warehouse : ',err);
        })

    }

    // Post Accpeted Materials
    static async acceptWaitingSM(req, res, next){
        const data = req.body;
        await WarehouseService.acceptWaitingSM(data)
        .then((respond)=>{
            console.log('res is : ',respond);
            res.status(200).send(respond);
        })
        .catch((err)=>{
            console.log('Warehouse Accpeting Materials Error : ',err);
        })
    }

    
}

module.exports = WarehouseController