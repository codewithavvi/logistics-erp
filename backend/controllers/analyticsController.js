const Order = require('../models/Order');
   const Warehouse = require('../models/Warehouse');

   // Get basic analytics
   exports.getAnalytics = async (req, res) => {
     try {
       const totalOrders = await Order.countDocuments();
       const ordersByStatus = await Order.aggregate([
         { $group: { _id: '$status', count: { $sum: 1 } } }
       ]);
       const warehouseStock = await Warehouse.find({}, 'name currentStock capacity');

       res.json({
         totalOrders,
         ordersByStatus,
         warehouseStock
       });
     } catch (error) {
       res.status(500).json({ message: 'Server error', error: error.message });
     }
   };