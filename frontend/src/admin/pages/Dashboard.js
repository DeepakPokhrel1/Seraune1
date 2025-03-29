import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminInfo, setAdminInfo] = useState({ username: '' });
  const [credentials, setCredentials] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [updateSuccess, setUpdateSuccess] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        // Fetch admin info
        const response = await axios.get('http://localhost:8000/api/admin/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setAdminInfo(response.data);
        setCredentials(prev => ({
          ...prev,
          newUsername: response.data.username
        }));
        
        // Fetch message stats
        const messagesResponse = await axios.get('http://localhost:8000/api/messages', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setMessageCount(messagesResponse.data.length);
        setUnreadCount(messagesResponse.data.filter(msg => !msg.read).length);
        
        setLoading(false);
      } catch (err) {
        console.error('Authentication error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        } else {
          setError('Failed to load admin information');
          setLoading(false);
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateCredentials = async (e) => {
    e.preventDefault();
    setError('');
    setUpdateSuccess('');
    
    // Validate passwords match
    if (credentials.newPassword !== credentials.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(
        'http://localhost:8000/api/admin/update-credentials',
        {
          currentPassword: credentials.currentPassword,
          newUsername: credentials.newUsername,
          newPassword: credentials.newPassword || undefined // Only send if not empty
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUpdateSuccess('Credentials updated successfully!');
      setAdminInfo(prev => ({
        ...prev,
        username: credentials.newUsername
      }));
      
      // Clear password fields
      setCredentials(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      // If the token was updated, store the new one
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
      }
    } catch (err) {
      console.error('Update error:', err);
      setError(err.response?.data?.message || 'Failed to update credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navigateToMessages = () => {
    navigate('/admin/messages');
  };

  if (loading) {
    return (
      <div className="admin-container loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Seraune</h2>
        </div>
        <ul className="admin-menu">
          <li className="menu-item active">
            <span className="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </span>
            <span>Dashboard</span>
          </li>
          <li className="menu-item" onClick={navigateToMessages}>
            <span className="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </span>
            <span>Messages</span>
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
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
      
      <div className="admin-content">
        <div className="admin-header">
          <h1>Seraune Dashboard</h1>
          <div className="admin-user">
            <span>Welcome, {adminInfo.username}</span>
          </div>
        </div>
        
        <div className="dashboard-cards">
          <div className="dashboard-card" onClick={navigateToMessages}>
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className="card-content">
              <h3>Total Messages</h3>
              <p className="card-number">{messageCount}</p>
            </div>
          </div>
          
          <div className="dashboard-card" onClick={navigateToMessages}>
            <div className="card-icon unread">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="card-content">
              <h3>Unread Messages</h3>
              <p className="card-number">{unreadCount}</p>
            </div>
          </div>
        </div>
        
        <div className="admin-settings">
          <h2>Account Settings</h2>
          
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
          
          {updateSuccess && (
            <div className="success-message">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p>{updateSuccess}</p>
            </div>
          )}
          
          <form className="settings-form" onSubmit={handleUpdateCredentials}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={credentials.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter your current password"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="newUsername">Username</label>
              <input
                type="text"
                id="newUsername"
                name="newUsername"
                value={credentials.newUsername}
                onChange={handleInputChange}
                placeholder="Enter new username"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="newPassword">New Password (leave blank to keep current)</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={credentials.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
              />
            </div>
            
            <button type="submit" className="submit-btn">
              Update Credentials
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;