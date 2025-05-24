import React from 'react';
import './App.css';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <h2>About Image to Text Converter</h2>
        <p>
          Our Image to Text Converter uses advanced OCR (Optical Character Recognition) technology
          powered by Tesseract.js to extract text from images accurately and quickly. Whether you
          need to digitize printed documents, capture notes, or convert scanned forms, this tool
          helps you do it easily with just one click.
        </p>
        <p>
          Built using modern technologies like React and Express, this tool provides a fast and
          user-friendly experience. Upload your image, click extract, and your text will appear
          within seconds.
        </p>
      </div>
    </section>
  );
};

export default About;
