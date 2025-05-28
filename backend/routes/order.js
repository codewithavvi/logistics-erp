const express = require('express');
   const router = express.Router();
   const { protect, authorize } = require('../middleware/authMiddleware');
   const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');

   router.post('/', protect, authorize('Admin', 'Manager'), createOrder);
   router.get('/', protect, authorize('Admin', 'Manager'), getOrders);
   router.put('/:orderId/status', protect, authorize('Admin', 'Manager', 'Driver'), updateOrderStatus);

   module.exports = router;