const Vehicle = require('../models/Vehicle');

   // Create vehicle
   exports.createVehicle = async (req, res) => {
     const { vehicleId, type, capacity } = req.body;
     try {
       const vehicle = await Vehicle.create({ vehicleId, type, capacity });
       res.status(201).json(vehicle);
     } catch (error) {
       res.status(500).json({ message: 'Server error', error: error.message });
     }
   };

   // Get all vehicles
   exports.getVehicles = async (req, res) => {
     try {
       const vehicles = await Vehicle.find().populate('driver');
       res.json(vehicles);
     } catch (error) {
       res.status(500).json({ message: 'Server error', error: error.message });
     }
   };