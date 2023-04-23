
const OrderService = require("../services/service.order");

class OrderController {

    // Create a MTF form
    static async createMtf(req, res, next){
        const data = req.body;
        await OrderService.createMtf(data)
        .then((respond)=>{
            console.log('Creating MTF success : ', respond);
            return res.send(respond);
        }).catch((err)=>{
            console.log('Creating MTF Failed : ', err);
        })
    }

    // Fetch MTF For User
    static async showMTF(req, res, next){
        // Get User Inform for getting possible MTFS from mtfs table
        const user_inform = {};
        user_inform.id=req.query.id;
        user_inform.ProjectModelId=req.query.ProjectModelId;
        // Get Data From Service
        await OrderService.showMTF(user_inform)
        .then((respond)=>{  
            return res.send(respond);
        }).catch((err)=>{
            console.log('Getting MTF Is Wrong');
        })

    }   

    // Fetch Fields From Fields Model
    static async fetchField(req, res, next){
        const ProjectModelId = req.params.projectmodelid;
        // const ProjectModelId = 1;
        await OrderService.fetchField(ProjectModelId)
        .then((respond)=>{  
            return res.send(respond);
        }).catch((err)=>{
            console.log('Getting MTF Is Wrong');
        }); 
    }

}


module.exports = OrderController;