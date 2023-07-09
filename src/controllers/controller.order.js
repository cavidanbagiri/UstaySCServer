const OrderService = require("../services/service.order");

const tryCatch = require("../utils/trycatch");

class OrderController {
  // Create a MTF form
  static async createStf(req, res, next) {
    const data = req.body;
    tryCatch(
      await OrderService.createStf(data)
        .then((respond) => {
          return res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Creating MTF Failed : ", err);
          next(err);
        })
    );
  }

  // Fetch MTF For User
  static async showSTF(req, res, next) {
    // Get User Inform for getting possible MTFS from mtfs table
    const user_inform = {};
    user_inform.id = req.query.id;
    // Get Data From Service
    tryCatch(
      await OrderService.showSTF(user_inform)
        .then((respond) => {
          return res.send(respond);
        })
        .catch((err) => {
          console.log('Getting Show STF Error : ',err);
          next(err);
        })
    );
  }

  // Get Filtered Data
  static async getFilteredData(req, res, next){
    const filtered_query = req.query;
    // Get Data From Service
    tryCatch(
      await OrderService.getFilteredData(filtered_query)
        .then((respond) => {
          return res.send(respond);
        })
        .catch((err) => {
          console.log('Getting Filtered STF Error : ',err);
          next(err);
        })
    );
  }

  // Fetch Fields From Fields Model
  static async fetchField(req, res, next) {
    const ProjectModelId = req.params.projectmodelid;
    // const ProjectModelId = 1;
    tryCatch(
      await OrderService.fetchField(ProjectModelId)
        .then((respond) => {
          return res.send(respond);
        })
        .catch((err) => {
          console.log("Fetch Field Error");
          next(err);
        })
    );
  }

  // Get STF Statistics
  static async getUserStaticSTFS(req, res, next) {
    const user_id = req.params.userid;
    tryCatch(
      await OrderService.getUserStaticSTFS(user_id)
      .then((respond)=>{
        return res.send(respond);
      }).catch((err)=>{
        console.log('Get Statistics Error is : ',err);
        next(err);
      })
    )
  }

  // Fetch Statistic Data For Each User
  static async fetchStatisticResultData(req, res, next) {
    const data = {
      user_id : req.query.user_id,
      result_value : req.query.result_value_id
    }

    tryCatch(
      await OrderService.fetchStatisticResultData(data)
      .then((respond)=>{
        return res.send(respond);
      }).catch((err)=>{
        console.log('Get Statistics Data Error is : ',err);
        next(err);
      })
    )

  }

  // Get Order Detail
  static async getRowDetails (req, res, next) {
    const stfid = req.params.stfid;
    console.log('stf : ',stfid);
    tryCatch(
      await OrderService.getRowDetails(stfid)
      .then((respond)=>{
        res.send(respond);
      })
      .catch((err)=>{
        console.log('Return ROw Detail Error : ', err);
        next(err)
      })
    )
  }

}

module.exports = OrderController;
