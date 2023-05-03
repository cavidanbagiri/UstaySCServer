
const WarehouseService = require('../services/service.warehouse'); 

class WarehouseController {

    // Fetch Materials
    static async fetchWaitingSMS(req, res, next){

        await WarehouseService.fetchWaitingSMS()
        .then((respond)=>{
            console.log('respond is : ',respond);
            return res.send(respond);
        }).catch((err)=>{
            console.log('Get Waiting SMS Error From Warehouse : ',err);
        })

    }



}

module.exports = WarehouseController