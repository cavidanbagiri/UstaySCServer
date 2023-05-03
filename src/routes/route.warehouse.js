
const express = require('express');
const router = express.Router();

const WarehouseController = require('../controllers/controller.warehouse');

router.get('/waitingsm', WarehouseController.fetchWaitingSMS);

module.exports = router;
