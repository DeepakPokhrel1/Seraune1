const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage
} = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

// Public route - accessible without authentication
router.post('/', createMessage);

// Protected routes - require admin authentication
router.get('/', protect, getMessages);
router.get('/:id', protect, getMessage);
router.patch('/:id', protect, updateMessage);
router.delete('/:id', protect, deleteMessage);

module.exports = router;