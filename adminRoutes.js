const express = require('express');
const adminController = require('../Controllers/adminController');
const router = express.Router();

router.post('/sales-managers', adminController.createSalesManager);       
router.get('/sales-managers', adminController.getSalesManagers);          
router.put('/sales-managers', adminController.updateSalesManager);        
router.delete('/sales-managers/:id', adminController.deleteSalesManager); 

router.post('/labours', adminController.createLabour);                    
router.get('/labours', adminController.getLabours);                       
router.put('/labours', adminController.updateLabour);                     
router.delete('/labours/:userId', adminController.deleteLabour);          

module.exports = router;
