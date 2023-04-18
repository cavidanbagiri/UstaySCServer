
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

    // Show MTF For User
    static async showMTF(req, res, next){
        // Get User Inform for getting possible MTFS from mtfs table
        const user_inform = {};
        user_inform.id=req.query;
        const user_data = {
            id:2,
            ProjectModelId:1
        };
        // Get Data From Service
        await OrderService.showMTF(user_data)
        .then((respond)=>{  
            return res.send(respond);
        }).catch((err)=>{
            console.log('Getting MTF Is Wrong');
        })

    }   

}


module.exports = OrderController;