const mongoose = require('mongoose');

   const vehicleSchema = new mongoose.Schema({
     vehicleId: { type: String, required: true, unique: true },
     type: { type: String, required: true },
     capacity: { type: Number, required: true },
     status: { type: String, enum: ['Available', 'In Transit', 'Maintenance'], default: 'Available' },
     driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
     createdAt: { type: Date, default: Date.now }
   });

   module.exports = mongoose.model('Vehicle', vehicleSchema);