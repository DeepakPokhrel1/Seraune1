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
    message: 'Use /api/messages or /api/admin to access the API endpoints'
  });
});

// Set up both API routes and direct routes to handle both patterns
// Original API routes for admin functionality
app.use('/api/admin', require('./routes/adminRoutes'));

// API routes for messages
app.use('/api/messages', require('./routes/messageRoutes'));

// Direct route for the contact form
app.post('/messages/contact', (req, res) => {
  // Forward this request to the message controller
  const { createMessage } = require('./controllers/messageController');
  createMessage(req, res);
});

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
