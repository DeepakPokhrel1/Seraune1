const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin user
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: admin._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d' }
    );

    res.json({ 
      token,
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error during login',
      error: error.message 
    });
  }
};

// Get admin profile
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    res.json(admin);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update admin credentials
const updateCredentials = async (req, res) => {
  try {
    const { currentPassword, newUsername, newPassword } = req.body;
    
    // Find admin user
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    
    // Check if username is already taken (if changing username)
    if (newUsername !== admin.username) {
      const existingAdmin = await Admin.findOne({ username: newUsername });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
    }
    
    // Update admin info
    admin.username = newUsername;
    
    // Only update password if provided
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(newPassword, salt);
    }
    
    await admin.save();
    
    // Generate new token with updated info
    const token = jwt.sign(
      { id: admin._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d' }
    );
    
    res.json({
      message: 'Credentials updated successfully',
      token
    });
  } catch (error) {
    console.error('Update credentials error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to create initial admin user
const createInitialAdmin = async () => {
  try {
    // Check if an admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) return;

    // Create initial admin
    const username = 'admin';
    const password = 'admin123';

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      password: hashedPassword
    });

    await admin.save();

    console.log('Initial admin created:');
    console.log('Username: admin');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error creating initial admin:', error);
  }
};

module.exports = { 
  loginAdmin,
  getAdminProfile,
  updateCredentials,
  createInitialAdmin
};