import React from "react";
import './App.css'; // Make sure to import your CSS

const Footer = () => {
  return (
    <footer className="footer">
  <div className="container">
    <div className="footer-left">
      <p>&copy; 2025 Your Company Name. All Rights Reserved.</p>
    </div>
    <div className="footer-right">
      <ul className="footer-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </div>
</footer>

  );
};

export default Footer;
