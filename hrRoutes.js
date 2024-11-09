const express = require('express');
const hrController = require('../Controllers/hrController');
const router = express.Router();

router.post('/attendance', hrController.calculateAttendance);        

router.post('/salaries', hrController.calculateSalaries);            
router.get('/salaries/:userId', hrController.viewSalaries);          

module.exports = router;
