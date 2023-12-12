import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Header from './Header';
import HomePage from './HomePage';
import Login from './Login';
import LikedNames from './LikedNames';
import ListOfNames from './ListOfNames';
import Support from './Support';
import Register from './Register';
import Logout from './Logout';


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
          <Route path="/support" element={<Support />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
