const jwt = require('jsonwebtoken');
   const User = require('../models/User');

   // Register user
   exports.register = async (req, res) => {
     const { username, email, password, role } = req.body;
     try {
       const userExists = await User.findOne({ email });
       if (userExists) return res.status(400).json({ message: 'User already exists' });

       const user = await User.create({ username, email, password, role });
       const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

       res.status(201).json({ token, user: { id: user._id, username, email, role } });
     } catch (error) {
       res.status(500).json({ message: 'Server error', error: error.message });
     }
   };

   // Login user
   exports.login = async (req, res) => {
     const { email, password } = req.body;
     try {
       const user = await User.findOne({ email });
       if (!user) return res.status(400).json({ message: 'Invalid credentials' });

       const isMatch = await user.matchPassword(password);
       if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

       const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

       res.json({ token, user: { id: user._id, username: user.username, email, role: user.role } });
     } catch (error) {
       res.status(500).json({ message: 'Server error', error: error.message });
     }
   };