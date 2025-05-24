import React, { useState } from 'react';
import './App.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Simulate form submission or replace with your actual form handling logic
      const response = await fetch('https://formspree.io/f/xeogbjqb', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        setSuccessMessage('Your message has been sent successfully!');
        setFormData({
        name: '',
        email: '',
        message: '',
      });

      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <p>If you have any questions or need support, feel free to reach out to us.</p>
        
        <div className="contact-info">
          <p><strong>Email:</strong> arman.ali.13000@gmail.com</p>
          <p><strong>LinkedIN:</strong> armanali13000</p>
        </div>
        
        <form onSubmit={handleSubmit} className="contact-form" action="https://formspree.io/f/xeogbjqb" method="POST">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Enter your message"
            ></textarea>
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </section>
  );
};

export default ContactSection;
