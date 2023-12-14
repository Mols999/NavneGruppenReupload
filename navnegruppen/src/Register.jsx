import React, { useState, useEffect } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/session', {
          credentials: 'include',
        });
        const data = await response.json();
        console.log('User data from session:', data);
  
        if (data.loggedIn) {
          
        }
      } finally {
    
        setSessionLoaded(true);
      }
    };
  
    checkSession();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
        firstName,
        lastName,
        email,
      });

      if (response.status === 201) {
        navigate('/listofnames');
      } else {
        setRegistrationMessage('Registration failed');
      }
    } catch (error) {
      setRegistrationMessage(error.response.data.message || 'Registration failed');
    }
  };

  return (
    <div className="register-box"> 
      <div className="register-container">
        <h2>Opret konto</h2>
        {registrationMessage && <p>{registrationMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Brugernavn:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Adgangskode:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Fornavn:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Efternavn:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Opret konto</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
