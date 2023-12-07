import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import Header from './Header';
import HomePage from './HomePage';
import Login from './Login';
import LikedNames from './LikedNames';
import ListOfNames from './ListOfNames';
import Swipe from './Swipe';
import Support from './Support';
import Settings from './Settings';
import Register from './Register';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes> 
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/likednames" element={<LikedNames />} />
          <Route path="/listofnames" element={<ListOfNames />} />
          <Route path="/swipe" element={<Swipe />} />
          <Route path="/support" element={<Support />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
