import React, { useState } from 'react';
import './Register.css'; // You can create a CSS file for styling
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/api/register', {
        username,
        password,
        firstName,
        lastName,
        email,
      });
  
      if (response.status === 201) {
        // Registration successful
        setRegistrationMessage('Registrering vellykket');
        // You can redirect or update application state here
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data?.message || 'Internal server error');
      setRegistrationMessage(error.response?.data?.message || 'Internal server error');
    }
  
    // Clear form fields if needed
    setUsername('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setEmail('');
  };
  

  return (
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
  );
}

export default Register;
