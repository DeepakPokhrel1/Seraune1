const router = require('express').Router();
const { 
  loginAdmin, 
  getAdminProfile, 
  updateCredentials 
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// Public route
router.post('/login', loginAdmin);

// Protected routes
router.get('/profile', protect, getAdminProfile);
router.put('/update-credentials', protect, updateCredentials);

module.exports = router;