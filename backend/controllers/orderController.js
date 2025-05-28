const Order = require('../models/Order');
   const { v4: uuidv4 } = require('uuid');

   // Create order
   exports.createOrder = async (req, res) => {
     const { customerName, items, totalAmount, warehouse, driver } = req.body;
     try {
       const order = await Order.create({
         orderId: `ORD-${uuidv4().slice(0, 8)}`,
         customerName,
         items,
         totalAmount,
         warehouse,
         driver
       });
       // Emit real-time update
       req.io.emit('orderUpdate', { orderId: order.orderId, status: order.status });
       res.status(201).json(order);
     } catch (error) {
       res.status(500).json({ message: 'Server error', error: error.message });
     }
   };

   // Get all orders
   exports.getOrders = async (req, res) => {
     try {
       const orders = await Order.find().populate('warehouse driver');
       res.json(orders);
     } catch (error) {
       res.status(500).json({ message: 'Server error', error: error.message });
     }
   };

   // Update order status
   exports.updateOrderStatus = async (req, res) => {
     const { orderId } = req.params;
     const { status } = req.body;
     try {
       const order = await Order.findOneAndUpdate(
         { orderId },
         { status },
         { new: true }
       );
       if (!order) return res.status(404).json({ message: 'Order not found' });
       // Emit real-time update
       req.io.emit('orderUpdate', { orderId, status });
       res.json(order);
     } catch (error) {
       res.status(500).json({ message: 'Server error', error: error.message });
     }
   };