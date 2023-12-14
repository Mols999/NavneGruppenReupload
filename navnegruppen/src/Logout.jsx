import React from 'react';

function Logout() {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include', 
      });

      if (response.ok) {
        console.log('Logout successful');
         navigate('/listofnames');  

      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <h2></h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
