
const express = require('express');
const WorkSpaceController = require('../controllers/controller.workspace');
const router = express.Router();


router.get('/', WorkSpaceController.fetchWorkTables);
router.post('/createnewtask', WorkSpaceController.createNewTask);

module.exports = router;
