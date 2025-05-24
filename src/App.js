import React from 'react';
import './App.css';
import Navbar from './Navbar';
import ImageToTextConverter from './ImageToTextConverter';
import About from './About';
import Contact from './Contact';
import Footer from './Footer'; 

function App() {
  return (
    <div className="App">
       <Navbar />
      <ImageToTextConverter />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
