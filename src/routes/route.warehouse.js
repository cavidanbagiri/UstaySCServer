
const express = require('express');
const router = express.Router();

const WarehouseController = require('../controllers/controller.warehouse');

router.get('/waitingsm', WarehouseController.fetchWaitingSMS);
router.get('/receivedsm', WarehouseController.fetchReceivedSM);
router.get('/statisticresult', WarehouseController.getStatisticResult);
router.get('/statisticresultdata', WarehouseController.getStatisticResultData);

router.get('/filteredobjectwait', WarehouseController.getFilteredDataWait);
router.get('/filteredobjectreceived', WarehouseController.getFilteredDataReceived);

router.post('/accept', WarehouseController.acceptWaitingSM);

module.exports = router;
