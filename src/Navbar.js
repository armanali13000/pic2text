import React from 'react';
import './App.css';
import logo from './logo.png'; // Place your logo in the same folder or adjust path

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-content">
          {/* Logo and Brand Name */}
          <div className="navbar-brand">
            <img src={logo} alt="Logo" className="navbar-logo" />
            <h1 className="navbar-title">Pic2Text</h1>
          </div>

          {/* Navigation Links */}
          <div className="navbar-links">
            <a href="" className="navbar-link">HOME</a>
            <a href="#about" className="navbar-link">ABOUT</a>
            <a href="#contact" className="navbar-link">CONTACT</a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
