const Warehouse = require('../models/Warehouse');

   // Create warehouse
   exports.createWarehouse = async (req, res) => {
     const { name, location, capacity } = req.body;
     try {
       const warehouse = await Warehouse.create({ name, location, capacity });
       res.status(201).json(warehouse);
     } catch (error) {
       res.status(500).json({ message: 'Server error', error: error.message });
     }
   };

   // Get all warehouses
   exports.getWarehouses = async (req, res) => {
     try {
       const warehouses = await Warehouse.find();
       res.json(warehouses);
     } catch (error) {
       res.status(500).json({ message: 'Server error', error: error.message });
     }
   };