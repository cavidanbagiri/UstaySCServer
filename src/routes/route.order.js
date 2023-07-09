
const express = require('express');

const router = express.Router();

const OrderController = require('../controllers/controller.order');

// Create STF
router.post('/stf', OrderController.createStf);
// Show User STF
router.get('/showorders',OrderController.showSTF);
// Get Filtered Data
router.get('/filteredobject', OrderController.getFilteredData);
// Fetch FIeld For Creating STF
router.get('/getfields/:projectmodelid',OrderController.fetchField);
// Get User Statistics Result STFS
router.get('/userstatistic/:userid', OrderController.getUserStaticSTFS);
// Get User STF for Condition 
router.get('/getstatisticresult', OrderController.fetchStatisticResultData);
// Get Row Details For User STF
router.get('/getrowdetails/:stfid', OrderController.getRowDetails);

module.exports = router
