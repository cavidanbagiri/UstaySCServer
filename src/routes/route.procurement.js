
const express  = require("express");
const ProcurementController = require("../controllers/controller.procurement");

const router  = express.Router();


router.get('/waitingmtf', ProcurementController.getWaitingSTF);
router.post('/createstf', ProcurementController.createSm);

router.get('/companies', ProcurementController.fetchCompaniesNames);
router.get('/users', ProcurementController.fetchUsers);


module.exports = router;
