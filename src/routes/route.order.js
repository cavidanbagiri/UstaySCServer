
const express = require('express');

const router = express.Router();

const OrderController = require('../controllers/controller.order');

router.post('/mtf', OrderController.createStf);
router.get('/showorders',OrderController.showSTF);
router.get('/getfields/:projectmodelid',OrderController.fetchField);

module.exports = router
