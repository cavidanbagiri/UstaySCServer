
const express = require('express');
const router = express.Router();

const WarehouseController = require('../controllers/controller.warehouse');

router.get('/waitingsm', WarehouseController.fetchWaitingSMS);
router.post('/accept', WarehouseController.acceptWaitingSM);
router.get('/receivedsm', WarehouseController.fetchReceivedSM);

module.exports = router;
