const express = require('express');
     const cors = require('cors');
     const dotenv = require('dotenv');
     const connectDB = require('./config/db');
     const apiRoutes = require('./routes/api');

     // Load environment variables
     dotenv.config();

     const app = express();

     // Middleware
     app.use(cors());
     app.use(express.json());

     // Connect to MongoDB
     connectDB();

     // Routes
     app.use('/api', apiRoutes);

     // Basic route
     app.get('/', (req, res) => {
       res.send('Logistics ERP Backend is running');
     });

     const PORT = process.env.PORT || 5000;
     app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
     });