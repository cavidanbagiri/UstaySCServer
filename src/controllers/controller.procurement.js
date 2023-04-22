
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

    static async createStf(req, res, next) {
        // Get Waiting MTF data for creating stf
        const data = req.body;
            
        await ProcurementService.createStf
        .then((respond)=>{
            res.send(respond);
        }).catch((err)=>{
            console.log('Get Waiting MTF Error ');
        })
    }

}

module.exports = ProcurementController
