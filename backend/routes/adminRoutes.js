const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Register new admin
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if username already exists
    const existingUsername = await Admin.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    // Check if email already exists
    const existingEmail = await Admin.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    // Create new admin
    const admin = new Admin({ username, email, password });
    await admin.save();
    
    // Return success with token
    res.status(201).json({ 
      message: 'Admin registered successfully',
      admin: { username: admin.username, email: admin.email },
      token: admin._id // Simple token for demo purposes
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    console.log('Login attempt:', username, password, admin);
    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    // Return token for authentication
    res.json({ 
      message: 'Login successful', 
      admin: { username: admin.username, email: admin.email },
      token: admin._id // Simple token for demo purposes
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get admin profile (protected route)
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Find admin by token (which is the _id for our simple implementation)
    const admin = await Admin.findById(token);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    res.json({ 
      admin: { username: admin.username, email: admin.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;