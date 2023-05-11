
const express = require('express');

const router = express.Router();

const OrderController = require('../controllers/controller.order');

router.post('/stf', OrderController.createStf);
router.get('/showorders',OrderController.showSTF);
router.get('/getfields/:projectmodelid',OrderController.fetchField);
router.get('/userstatistic/:userid', OrderController.getUserStaticSTFS);

module.exports = router
