const WarehouseService = require("../services/service.warehouse");
const tryCatch = require("../utils/trycatch");

class WarehouseController {
  // Fetch Materials
  static async fetchWaitingSMS(req, res, next) {
    tryCatch(
      await WarehouseService.fetchWaitingSMS()
        .then((respond) => {
          return res.send(respond);
        })
        .catch((err) => {
          console.log("Get Waiting SMS Error From Warehouse : ", err);
          next(err);
        })
    );
  }

  // Post Accpeted Materials
  static async acceptWaitingSM(req, res, next) {
    const data = req.body;
    console.log('accept is working in server');
    tryCatch(
      await WarehouseService.acceptWaitingSM(data)
        .then((respond) => {
          res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Warehouse Accpeting Materials Error : ", err);
          next(err);
        })
    );
  }

  // Fetch Received Sm
  static async fetchReceivedSM(req, res, next) { 
    tryCatch(
      await WarehouseService.fetchReceivedSM()
      .then((respond) => {
        res.status(200).send(respond);
      })
      .catch((err) => {
        console.log("Warehouse Received Materials Error : ", err);
        next(err);
      })
    )
  }

  // Get Statistic Result
  static async getStatisticResult(req, res, next){
    tryCatch(
      WarehouseService.getStatisticResult()
      .then((respond)=>{
        console.log('Warehouse Statistic Result  : ',respond);
        res.status(200).send(respond);
      }).catch((err)=>{
        console.log('Get Warehouse Statistic Result Error : ',err);
        next(err)
      })
    )
  }

  //
  static async getStatisticResultData(req, res, next){
    const result_value = req.query.result_value_id;
    tryCatch(
      WarehouseService.getStatisticResultData(result_value)
      .then((respond)=>{
        console.log('Warehouse Statistic Result Data : ',respond);
        res.status(200).send(respond);
      }).catch((err)=>{
        console.log('Get Warehouse Statistic Result Error : ',err);
        next(err)
      })
    )
  }

  static async getFilteredDataWait(req, res, next) {
    const filtered_query = req.query;
    // Get Data From Service
    tryCatch(
      await WarehouseService.getFilteredDataWait(filtered_query)
        .then((respond) => {
          return res.send(respond);
        })
        .catch((err) => {
          console.log('Getting Filtered STF Error : ',err);
          next(err);
        })
    );
  }

  static async getFilteredDataReceived(req, res, next) {
    const filtered_query = req.query;
    // Get Data From Service
    tryCatch(
      await WarehouseService.getFilteredDataReceived(filtered_query)
        .then((respond) => {
          return res.send(respond);
        })
        .catch((err) => {
          console.log('Getting Filtered STF Error : ',err);
          next(err);
        })
    );
  }

}

module.exports = WarehouseController;
