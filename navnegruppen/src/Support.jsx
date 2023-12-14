import React, { useState, useEffect } from 'react';
import './Support.css';

function Support() {
  const [ticketData, setTicketData] = useState({
    sender: '', // Update this with the user's username
    message: '',
    personalInfo: {
      email: '',
      firstName: '',
      lastName: '',
    },
  });

  const [ticketCreated, setTicketCreated] = useState(false);
  const [sessionLoaded, setSessionLoaded] = useState(false); 
  const [userData, setUserData] = useState(null); 
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/session', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          console.log('User data from session:', data); 
          if (data.loggedIn) {
          
            setUserData(data.user);
            setTicketData((prevTicketData) => ({
              ...prevTicketData,
              sender: data.user.username || '',
              personalInfo: {
                email: data.user.email || '',
                firstName: data.user.firstName || '',
                lastName: data.user.lastName || '',
              },
            }));
          }
        } else if (response.status === 401) {
          console.error('User not authenticated');
        } else {
          console.error('Session data not available. Response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
      } finally {
      
        setSessionLoaded(true);
      }
    };

    checkSession();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'message') {
      setTicketData({ ...ticketData, [e.target.name]: e.target.value });
    } else {
      setTicketData({
        ...ticketData,
        personalInfo: { ...ticketData.personalInfo, [e.target.name]: e.target.value },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting ticket data:', ticketData);

    try {
      const response = await fetch('http://localhost:5000/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      const data = await response.json();
      if (response.ok) {
        setTicketCreated(true);
        console.log('Ticket created:', data);
      } else {
        console.error('Ticket creation failed:', data.message);
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };

  return (
    <div>
    
      <div className="support-container">
      <h2>Support</h2>
        <div className="support-form">
          {sessionLoaded && userData && (
            <div>
              <p>Logged in as: {userData.username}</p>
      
            </div>
          )}
          {ticketCreated && <p className="success-message">Ticket oprettet</p>} 
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={ticketData.personalInfo.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={ticketData.personalInfo.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={ticketData.personalInfo.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Message:</label>
              <textarea
                name="message"
                value={ticketData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Submit Ticket</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Support;