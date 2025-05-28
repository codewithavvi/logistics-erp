const mongoose = require('mongoose');

   const orderSchema = new mongoose.Schema({
     orderId: { type: String, required: true, unique: true },
     customerName: { type: String, required: true },
     items: [{ name: String, quantity: Number, price: Number }],
     totalAmount: { type: Number, required: true },
     status: { 
       type: String, 
       enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
       default: 'Pending' 
     },
     warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
     driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
     createdAt: { type: Date, default: Date.now }
   });

   module.exports = mongoose.model('Order', orderSchema);