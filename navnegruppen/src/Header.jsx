import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="topnav" id="myTopnav">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/likednames">Likede Navne</Link>
      <Link to="/listofnames">Liste af Navne</Link>
      <Link to="/swipe">Swipe</Link>
      <Link to="/support">Support</Link>
      <Link to="/settings">Settings</Link>
      <i className="fa fa-bars"></i>
    </div>
  );
}

export default Header;
