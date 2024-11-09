const express = require('express');
const labourController = require('../Controllers/labourController');
const router = express.Router();

router.get('/tasks', labourController.viewTasks);                     
router.put('/tasks/complete', labourController.completeTask);        

router.get('/attendance', labourController.viewAttendance);           
router.post('/attendance', labourController.recordAttendance);        

module.exports = router;
