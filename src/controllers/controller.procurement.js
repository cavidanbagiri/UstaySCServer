
const ProcurementService = require("../services/service.procurement")

class ProcurementController {

    // Getch All SM
    static async getAllSm(req, res, next){
        await ProcurementService.getAllSm()
        .then((respond)=>{
            res.send(respond);
        }).catch((err)=>{
            console.log('Get All Sm Error : ',err);
        })
    }

    // Get Waiting MTF From MTF Tables
    static async getWaitingSTF(req, res, next){
        await ProcurementService.getWaitingSTF()
        .then((respond)=>{
            res.send(respond);
        }).catch((err)=>{
            console.log('Get Waiting MTF Error : ',err);
        })
    }

    // Create STF
    static async createSm(req, res, next) {
        // Get Waiting MTF data for creating stf
        const data = req.body;
            
        await ProcurementService.createSm(data)
        .then((respond)=>{
            return res.send(respond);
        }).catch((err)=>{
            console.log('Get Waiting MTF Error : ',err);
        })
    }

    // Fetch Companies Names
    static async fetchCompaniesNames(req, res, next) {
        await ProcurementService.fetchCompaniesNames()
        .then((respond)=>{
            console.log('companies names : ',respond);
            res.send(respond);
        }).catch((err)=>{
            console.log('Fetch Companies Names Error Happen : ', err);
        })
    }

    // Fetch Users Names
    static async fetchUsers(req, res, next) {
        await ProcurementService.fetchUsers()
        .then((respond)=>{
            console.log('users names : ',respond);
            res.send(respond);
        }).catch((err)=>{
            console.log('Fetch Users Names Error Happen : ', err);
        })
    }

}

module.exports = ProcurementController
