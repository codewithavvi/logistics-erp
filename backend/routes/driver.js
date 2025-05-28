const express = require('express');
   const router = express.Router();
   const { protect, authorize } = require('../middleware/authMiddleware');
   const { createDriver, assignDriver, getDrivers } = require('../controllers/driverController');

   router.post('/', protect, authorize('Admin'), createDriver);
   router.post('/assign', protect, authorize('Admin', 'Manager'), assignDriver);
   router.get('/', protect, authorize('Admin', 'Manager'), getDrivers);

   module.exports = router;