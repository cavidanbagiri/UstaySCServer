
const express = require('express');

const router = express.Router();

const OrderController = require('../controllers/controller.order');

router.post('/mtf', OrderController.createMtf);
router.get('/showorders',OrderController.showMTF);
router.get('/getfields',OrderController.fetchField);

module.exports = router
