import React, { useEffect, useState } from 'react';
import './ListOfNames.css';

function ListOfNames() {
  const [names, setNames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('InternationalGirlNames');
  const [isLoading, setIsLoading] = useState(true); // Start with isLoading as true to show "Loading..." initially
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId'); // Consider using a more secure method for user session

  useEffect(() => {
    async function fetchNames() {
      setError(null);
      try {
        // Simulate a delay of 2 seconds before fetching data
        await new Promise((resolve) => setTimeout(resolve, 2000));
    
        const response = await fetch(`http://localhost:5000/${selectedCategory}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNames(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to load names. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    


    fetchNames();
  }, [selectedCategory]); // Re-fetch when selectedCategory changes

  const handleLike = async (nameId) => {
    try {
      const response = await fetch('http://localhost:5000/like-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, nameId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Optionally update the state to reflect the like
    } catch (error) {
      console.error("Like error:", error);
      // Handle the error in UI
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setIsLoading(true); // Set isLoading to true when changing categories to show "Loading..." again
  };

  return (
    <div className="container">
      <div className="heading">
        <h2>List of Names</h2>
        <select className="select" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="BoyNames">Boy Names</option>
          <option value="GirlNames">Girl Names</option>
          <option value="InternationalBoyNames">International Boy Names</option>
          <option value="InternationalGirlNames">International Girl Names</option>
          <option value="UnisexNames">Unisex Names</option>
        </select>
      </div>
      <div className="list-container">
        {isLoading ? (
          <p className="loader">Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <ul className="list">
            {names.map((name) => (
              <li key={name._id} className="list-item">
                <span>{name.name}</span>
                <button onClick={() => handleLike(name._id)} className="button-like">Like</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ListOfNames;
