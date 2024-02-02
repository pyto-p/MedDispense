// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logoimg from '../assets/logo.png';
import '../styles/NavBar.css';

function NavBar() {
  return (
    <div className="head">
      <Link to="/">
        <img src={logoimg} className="logo" alt="Logo" />
      </Link>
      <h1 className="title">MedDispense</h1>
      {/* Other components */}
    </div>
  );
}

export default NavBar;
