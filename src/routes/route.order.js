
const express = require('express');

const router = express.Router();

const OrderController = require('../controllers/controller.order');

router.post('/createmtf', OrderController.createMtf);
router.get('/showorders',OrderController.showMTF);

module.exports = router
