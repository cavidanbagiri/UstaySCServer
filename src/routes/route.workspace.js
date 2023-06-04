
const express = require('express');
const WorkSpaceController = require('../controllers/controller.workspace');
const router = express.Router();


router.get('/', WorkSpaceController.fetchWorkTables);
router.post('/createnewtask', WorkSpaceController.createNewTask);
router.post('/updatetask', WorkSpaceController.updateTask);
router.post('/deletetask', WorkSpaceController.deleteTask);

module.exports = router;
