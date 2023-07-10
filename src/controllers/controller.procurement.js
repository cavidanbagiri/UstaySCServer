const ProcurementService = require("../services/service.procurement");

const tryCatch = require("../utils/trycatch");

class ProcurementController {

  // Fetch STF Statistic Result
  static async getSTFStatisticsResult(req, res, next){
    tryCatch(
      // await ProcurementService.getSTFStatisticsResult()
      await ProcurementService.getSTFProcurementService().getSTFStatisticsResult()
      .then((respond) => {
        res.send(respond);
      })
      .catch((err) => {
        console.log("Get STF Statistics Result Error : ", err);
      })
    )
  }

  // Fetch All STF
  static async fetchAllSTF(req, res, next) {
    tryCatch(
      await ProcurementService.getSTFProcurementService().fetchAllSTF()
      .then((respond) => {
        res.send(respond);
      })
      .catch((err) => {
        console.log("Get All STF Error : ", err);
      })
    )
  }

  // Fetch Statistics Result Data
  static async fetchStatisticResultData(req, res, next){
    const result_value = req.query.result_value_id;
    tryCatch(
      await ProcurementService.getSTFProcurementService().fetchStatisticResultData(result_value)
      .then((respond) => {
        res.send(respond);
      })
      .catch((err) => {
        console.log("Get All STF Error : ", err);
      })

    )
  }

  // Getch All SM
  static async getAllSm(req, res, next) {
    tryCatch(
      await ProcurementService.getSMProcurementService().getAllSm()
        .then((respond) => {
          res.send(respond);
        })
        .catch((err) => {
          console.log("Get All Sm Error : ", err);
        })
    );
  }

  // Fetch SM Statistic Result
  static async getSMStatisticsResult(req, res, next){
    tryCatch(
      await ProcurementService.getSMProcurementService().getSMStatisticsResult()
      .then((respond) => {
        res.send(respond);
      })
      .catch((err) => {
        console.log("Get STF Statistics Result Error : ", err);
      })
    )
  }

  // Fetch Statistics Result Data
  static async fetchStatisticResultDataSM(req, res, next){
    const result_value = req.query.result_value_id;
    tryCatch(
      await ProcurementService.getSMProcurementService().fetchStatisticResultDataSM(result_value)
      .then((respond) => {
        res.send(respond);
      })
      .catch((err) => {
        console.log("Get All STF Error : ", err);
      })

    )
  }

  // Get Waiting MTF From MTF Tables
  static async getWaitingSTF(req, res, next) {
    tryCatch(
      await ProcurementService.getWaitingSTF()
        .then((respond) => {
          res.send(respond);
        })
        .catch((err) => {
          next(err);
        })
    );
  }

  // Create STF
  static async createSm(req, res, next) {
    // Get Waiting MTF data for creating stf
    const data = req.body;

    tryCatch(
      await ProcurementService.createSm(data)
        .then((respond) => {
          return res.send(respond);
        })
        .catch((err) => {
          console.log("Get Waiting MTF Error : ", err);
          next(err);
        })
    );
  }

  // Fetch Companies Names
  static async fetchCompaniesNames(req, res, next) {
    tryCatch(
      await ProcurementService.fetchCompaniesNames()
        .then((respond) => {
          console.log("companies names : ", respond);
          res.send(respond);
        })
        .catch((err) => {
          console.log("Fetch Companies Names Error Happen : ", err);
          next(err);
        })
    );
  }

  // Fetch Users Names
  static async fetchUsers(req, res, next) {
    tryCatch(
      await ProcurementService.fetchUsers()
        .then((respond) => {
          console.log("users names : ", respond);
          res.send(respond);
        })
        .catch((err) => {
          console.log("Fetch Users Names Error Happen : ", err);
          next(err);
        })
    );
  }

  static async getFilteredDataSTF(req, res, next) {
    const filtered_query = req.query;
    // Get Data From Service
    tryCatch(
      await ProcurementService.getSTFProcurementService().getFilteredDataSTF(filtered_query)
        .then((respond) => {
          return res.send(respond);
        })
        .catch((err) => {
          console.log('Getting Filtered STF Error : ',err);
          next(err);
        })
    );
  }

  static async getFilteredDataSM(req, res, next) {
    const filtered_query = req.query;
    // Get Data From Service
    tryCatch(
      await ProcurementService.getSMProcurementService().getFilteredDataSM(filtered_query)
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

module.exports = ProcurementController;
