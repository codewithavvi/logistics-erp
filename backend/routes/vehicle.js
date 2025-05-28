const express = require('express');
   const router = express.Router();
   const { protect, authorize } = require('../middleware/authMiddleware');
   const { createVehicle, getVehicles } = require('../controllers/vehicleController');

   router.post('/', protect, authorize('Admin'), createVehicle);
   router.get('/', protect, authorize('Admin', 'Manager'), getVehicles);

   module.exports = router;