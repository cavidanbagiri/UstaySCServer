
const express  = require("express");
const ProcurementController = require("../controllers/controller.procurement");

const router  = express.Router();


router.get('/waitingmtf',ProcurementController.getWaitingMTF);



module.exports = router;
