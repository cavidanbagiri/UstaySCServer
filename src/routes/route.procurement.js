
const express  = require("express");
const ProcurementController = require("../controllers/controller.procurement");

const router  = express.Router();


// Get All STF
router.get('/allstf', ProcurementController.fetchAllSTF);
// Get STF Statistics Result
router.get('/stfstatisticsresult', ProcurementController.getSTFStatisticsResult);
// Get STF Statistic Result Data
router.get('/getstatisticresult', ProcurementController.fetchStatisticResultData);


// Get All SM
router.get('/allsm', ProcurementController.getAllSm);
// Get SM Statistics Result
router.get('/smstatisticsresult', ProcurementController.getSMStatisticsResult);
// Get STF Statistic Result Data
router.get('/getstatisticresultsm', ProcurementController.fetchStatisticResultDataSM);

// Get Filtered Data
router.get('/filteredobjecstf', ProcurementController.getFilteredDataSTF);
router.get('/filteredobjectsm', ProcurementController.getFilteredDataSM);

// Create SM
router.post('/createsm', ProcurementController.createSm);

// Fetch Companies and Users for creatting SM
router.get('/companies', ProcurementController.fetchCompaniesNames);
router.get('/users', ProcurementController.fetchUsers);


module.exports = router;
