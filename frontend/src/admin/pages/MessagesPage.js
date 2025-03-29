import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/MessagesPage.css';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    // Fetch messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/messages', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Log the response to see its structure
        console.log('API Response:', response.data);
        
        // Handle different response formats
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else if (response.data.messages && Array.isArray(response.data.messages)) {
          setMessages(response.data.messages);
        } else if (typeof response.data === 'object') {
          // If it's an object but not an array, convert to array
          setMessages(Object.values(response.data));
        } else {
          // If we can't determine the format, set an empty array
          console.error('Unexpected response format:', response.data);
          setMessages([]);
          setError('Received data in an unexpected format.');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to fetch messages. Please try again.');
        setLoading(false);
        setMessages([]); // Ensure messages is an array
        
        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      }
    };

    fetchMessages();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navigateToDashboard = () => {
    navigate('/admin/dashboard');
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="admin-container loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <ul className="admin-menu">
          <li className="menu-item" onClick={navigateToDashboard}>
            <span className="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </span>
            <span>Dashboard</span>
          </li>
          <li className="menu-item active">
            <span className="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </span>
            <span>Messages</span>
          </li>
        </ul>
        <div className="admin-logout">
          <button onClick={handleLogout} className="logout-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div className="admin-content messages-content">
        <header className="admin-header">
          <h1>Messages</h1>
          <div className="header-actions">
            <span className="message-count-badge">
              {messages.length} Total Messages • {messages.filter(msg => !msg.read).length} Unread
            </span>
          </div>
        </header>

        {error && (
          <div className="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>{error}</p>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="no-messages">
            <div className="no-data-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <h3>No Messages Found</h3>
            <p>Your inbox is empty. Messages from your contact form will appear here.</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((message, index) => (
              <div 
                key={message._id || index} 
                className={`message-card ${!message.read ? 'unread' : ''}`}
              >
                <div className="message-header">
                  <div className="message-info">
                    <h3>{message.name || 'Unknown Sender'}</h3>
                    <span className="message-date">
                      {message.createdAt ? formatDate(message.createdAt) : 'Date not available'}
                    </span>
                  </div>
                  <div className="message-status">
                    <span className={`status-badge ${message.read ? 'read' : 'unread'}`}>
                      {message.read ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </div>
                
                <div className="message-contact">
                  <div className="contact-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>{message.email || 'N/A'}</span>
                  </div>
                  
                  {message.phone && (
                    <div className="contact-item">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>{message.phone}</span>
                    </div>
                  )}
                </div>
                
                <div className="message-content">
                  <p>{message.message || message.content || 'No message content'}</p>
                </div>
                
                <div className="message-actions">
                  <button 
                    className={`action-btn ${message.read ? 'mark-unread-btn' : 'mark-read-btn'}`}
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem('adminToken');
                        await axios.patch(
                          `http://localhost:8000/api/messages/${message._id}`,
                          { read: !message.read },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`
                            }
                          }
                        );
                        
                        // Update local state
                        setMessages(messages.map((msg, i) => 
                          i === index ? {...msg, read: !msg.read} : msg
                        ));
                      } catch (err) {
                        console.error('Error updating message:', err);
                      }
                    }}
                  >
                    {message.read ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
                        </svg>
                        Mark as Unread
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        Mark as Read
                      </>
                    )}
                  </button>
                  
                  <button 
                    className="action-btn delete-btn"
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to delete this message?')) {
                        try {
                          const token = localStorage.getItem('adminToken');
                          
                          if (message._id) {
                            await axios.delete(
                              `http://localhost:8000/api/messages/${message._id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`
                                }
                              }
                            );
                          }
                          
                          // Remove from local state
                          setMessages(messages.filter((_, i) => i !== index));
                        } catch (err) {
                          console.error('Error deleting message:', err);
                        }
                      }
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;