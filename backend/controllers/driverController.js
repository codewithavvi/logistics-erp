const Driver = require('../models/Driver');
   const Vehicle = require('../models/Vehicle');

   // Create driver
   exports.createDriver = async (req, res) => {
     const { name, licenseNumber } = req.body;
     try {
       const driver = await Driver.create({ name, licenseNumber });
       res.status(201).json(driver);
     } catch (error) {
       res.status(500).json({ message: 'Server error', error: error.message });
     }
   };

   // Assign driver to vehicle
   exports.assignDriver = async (req, res) => {
     const { driverId, vehicleId } = req.body;
     try {
       const driver = await Driver.findById(driverId);
       if (!driver) return res.status(404).json({ message: 'Driver not found' });

       const vehicle = await Vehicle.findOne({ vehicleId });
       if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

       driver.vehicle = vehicle._id;
       driver.status = 'Assigned';
       vehicle.driver = driver._id;
       vehicle.status = 'In Transit';

       await driver.save();
       await vehicle.save();

       res.json({ driver, vehicle });
     } catch (error) {
       res.status(500).json({ message: 'Server error', error: error.message });
     }
   };

   // Get all drivers
   exports.getDrivers = async (req, res) => {
     try {
       const drivers = await Driver.find().populate('vehicle');
       res.json(drivers);
     } catch (error) {
       res.status(500).json({ message: 'Server error', error: error.message });
     }
   };