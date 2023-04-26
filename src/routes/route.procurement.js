
const express  = require("express");
const ProcurementController = require("../controllers/controller.procurement");

const router  = express.Router();


router.get('/waitingmtf', ProcurementController.getWaitingMTF);
router.post('/createstf', ProcurementController.createStf);

router.get('/companies', ProcurementController.fetchCompaniesNames);
router.get('/users', ProcurementController.fetchUsers);


module.exports = router;
