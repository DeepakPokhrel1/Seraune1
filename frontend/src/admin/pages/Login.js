import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/admin/login', {
        username,
        password
      });

      // Store the token in localStorage
      localStorage.setItem('adminToken', response.data.token);
      
      // Redirect to admin messages page instead of dashboard
      navigate('/admin/messages');
    } catch (err) {
      // Handle login error
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="background-shape"></div>
      
      <div className="login-card">
        <div className="login-header">
          <h2>Seraune Admin Portal</h2>
          <p>Enter your credentials to access the Seraune admin dashboard</p>
        </div>
        
        <div className="login-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="error-message">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={isLoading ? 'loading' : ''}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
      
      <div className="login-footer">
        © {new Date().getFullYear()} Seraune Admin Portal. All rights reserved.
      </div>
    </div>
  );
};

export default Login;