const express = require('express');
const salesManagerController = require('../Controllers/salesmanagerController');

if (!salesManagerController) {
    console.error("Error: salesManagerController is undefined");
}

const router = express.Router();

router.post('/labours', salesManagerController.createLabour);               
router.get('/labours', salesManagerController.getLabours);                 
router.put('/labours', salesManagerController.updateLabour);                
router.delete('/labours/:userId', salesManagerController.deleteLabour);    

router.put('/labours/track-time', salesManagerController.trackInOutTime);   

router.get('/test', (req, res) => {
    console.log("Test route reached");
    res.send("Test route works");
});

module.exports = router;
