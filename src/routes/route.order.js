
const express = require('express');

const router = express.Router();

const OrderController = require('../controllers/controller.order');

router.post('/createmtf', OrderController.createMtf);

module.exports = router
