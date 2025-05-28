const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use('/auth', authRoutes);

router.get('/test', protect, authorize('Admin', 'Manager'), (req, res) => {
  res.json({ message: 'Protected API is working', user: req.user });
});

module.exports = router;