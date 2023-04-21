
const ProcurementService = require("../services/service.procurement")

class ProcurementController {

    // Get Waiting MTF From MTF Tables
    static async getWaitingMTF(req, res, next){
        await ProcurementService.getWaitingMTF()
        .then((respond)=>{
            res.send(respond);
        }).catch((err)=>{
            console.log('Get Waiting MTF Error ');
        })
    }

}

module.exports = ProcurementController
