import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { email, password });

      if (response.status === 200) {
        // Login successful
        setLoginMessage('Login successful');
        // You can redirect or update application state here
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || 'Internal server error');
      setLoginMessage(error.response?.data?.message || 'Internal server error');
    }

    // Clear form fields if needed
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {loginMessage && <p>{loginMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>

        {/* Add a "Create Account" button that links to the registration page */}
        <Link to="/register">Oprette konto</Link>
      </form>
    </div>
  );
}

export default Login;
