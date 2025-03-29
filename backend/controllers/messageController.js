const Message = require('../models/Message');

// @desc    Create a new message from contact form
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
  try {
    console.log('Received form submission:', req.body);
    
    const { name, email, phone, message } = req.body;
    
    console.log('Extracted data:', { name, email, phone, message });

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Validation failed - missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    // Create new message
    console.log('Creating message in database...');
    const newMessage = await Message.create({
      name,
      email,
      phone,
      message
    });
    
    console.log('Message created successfully:', newMessage);

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: newMessage
    });
  } catch (error) {
    console.error('Create message error details:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      console.log('Validation error details:', messages);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    // Handle MongoDB error codes
    if (error.code) {
      console.log('MongoDB error code:', error.code);
    }
    
    // Log stack trace
    console.error('Full error stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private (Admin only)
const getMessages = async (req, res) => {
  try {
    console.log('Fetching all messages...');
    // Get all messages sorted by newest first
    const messages = await Message.find().sort({ createdAt: -1 });
    
    console.log(`Found ${messages.length} messages`);
    res.status(200).json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not retrieve messages.'
    });
  }
};

// @desc    Get a single message by ID
// @route   GET /api/messages/:id
// @access  Private (Admin only)
const getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    res.status(200).json(message);
  } catch (error) {
    console.error('Get message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not retrieve message.'
    });
  }
};

// @desc    Update message (mark as read/unread)
// @route   PATCH /api/messages/:id
// @access  Private (Admin only)
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { read } = req.body;
    
    console.log(`Updating message ${id}, setting read: ${read}`);
    
    // Find and update the message
    const message = await Message.findByIdAndUpdate(
      id,
      { read },
      { new: true, runValidators: true }
    );
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    console.log('Message updated successfully');
    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Update message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not update message.'
    });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private (Admin only)
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`Deleting message ${id}`);
    
    // Find and delete the message
    const message = await Message.findByIdAndDelete(id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    console.log('Message deleted successfully');
    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not delete message.'
    });
  }
};

module.exports = {
  createMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage
};