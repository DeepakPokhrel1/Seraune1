const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { createInitialAdmin } = require('./controllers/adminController');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Create initial admin user
(async () => {
  try {
    console.log("Creating initial admin...");
    await createInitialAdmin();
    
    // Verify admin exists
    const Admin = require('./models/Admin');
    const admin = await Admin.findOne();
    console.log('Admin check:', admin ? `Admin ${admin.username} exists` : 'No admin found');
  } catch (error) {
    console.error('Admin setup error:', error);
  }
})();

// Create express app
const app = express();

// Middleware
app.use(cors({
  origin: 'https://seraune1-frontend1.onrender.com',
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    status: 'API is running',
    message: 'Use /messages or /admin to access the API endpoints'
  });
});

// Routes - removed the /api prefix to match frontend expectations
app.use('/messages', require('./routes/messageRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
