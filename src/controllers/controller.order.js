const OrderService = require("../services/service.order");



class OrderController {

    // Create a MTF form
    static async createMtf(req, res, next){
        const data = req.body;
        console.log('coming data : ',data);

        await OrderService.createMtf(data)
        .then((respond)=>{
            console.log('Creating MTF success : ', respond);
        }).catch((err)=>{
            console.log('Creating MTF Failed : ', err);
        })

        res.send('Create Order MTF can work');

    }

}


module.exports = OrderController;