const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const orderRoutes = require('./order');
const warehouseRoutes = require('./warehouse');
const vehicleRoutes = require('./vehicle');
const driverRoutes = require('./driver');
const { getAnalytics } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use('/auth', authRoutes);
router.use('/orders', orderRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/drivers', driverRoutes);
router.get('/analytics', protect, authorize('Admin', 'Manager'), getAnalytics);

router.get('/test', protect, authorize('Admin', 'Manager'), (req, res) => {
  res.json({ message: 'Protected API is working', user: req.user });
});

module.exports = router;