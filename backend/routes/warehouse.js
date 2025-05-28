const express = require('express');
   const router = express.Router();
   const { protect, authorize } = require('../middleware/authMiddleware');
   const { createWarehouse, getWarehouses } = require('../controllers/warehouseController');

   router.post('/', protect, authorize('Admin'), createWarehouse);
   router.get('/', protect, authorize('Admin', 'Manager'), getWarehouses);

   module.exports = router;