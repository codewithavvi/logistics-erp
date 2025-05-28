const mongoose = require('mongoose');

   const driverSchema = new mongoose.Schema({
     name: { type: String, required: true },
     licenseNumber: { type: String, required: true, unique: true },
     vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', default: null },
     status: { type: String, enum: ['Available', 'Assigned', 'On Leave'], default: 'Available' },
     createdAt: { type: Date, default: Date.now }
   });

   module.exports = mongoose.model('Driver', driverSchema);