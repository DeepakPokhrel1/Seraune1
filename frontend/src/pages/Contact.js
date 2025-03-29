import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: ''
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    
    try {
      // Send to the messages API endpoint instead of /api/contact
      const response = await fetch('http://localhost:8000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Prepare the message with the expected fields for the admin panel
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          // Include the subject and service in the message content
          message: `Subject: ${formData.subject}\nService: ${formData.service}\n\n${formData.message}`
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitSuccess(true);
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          service: ''
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setSubmitError(true);
        console.error('Form submission error:', data.message);
      }
    } catch (error) {
      setSubmitError(true);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Let's Work <span className="gradient-text">Together</span></h1>
            <p>We're excited to hear about your project. Fill out the form below and we'll get back to you within 24 hours.</p>
          </div>
        </div>
        <div className="hero-shape"></div>
      </section>
      
      {/* Main Contact Section */}
      <section className="main-contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <div className="info-card">
                <h2>Contact Information</h2>
                <p className="info-subtitle">We're here to help with any questions you have</p>
                
                <div className="info-items">
                  <div className="info-item">
                    <div className="info-icon email-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="info-content">
                      <h3>Email Us</h3>
                      <a href="mailto:hello@seraune.com">hello@seraune.com</a>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon phone-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="info-content">
                      <h3>Call Us</h3>
                      <a href="tel:+15555555555">(555) 555-5555</a>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon location-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="info-content">
                      <h3>Visit Us</h3>
                      <p>123 Tech Street<br />San Francisco, CA 94107</p>
                    </div>
                  </div>
                </div>
                
                <div className="social-links">
                  <h3>Connect With Us</h3>
                  <div className="social-icons">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="contact-form-wrapper" id="contact-form">
              <div className="form-card">
                <h2>Send Us a Message</h2>
                
                {submitSuccess && (
                  <div className="success-message">
                    <svg xmlns="http://www.w3.org/2000/svg" className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p>Thank you! Your message has been sent successfully.</p>
                  </div>
                )}
                
                {submitError && (
                  <div className="error-message">
                    <svg xmlns="http://www.w3.org/2000/svg" className="error-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p>Oops! Something went wrong. Please try again.</p>
                  </div>
                )}
                
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
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
                      placeholder="johndoe@example.com"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="service">Service Needed</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="web-development">Website Development</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="cloud-solutions">IT & Cloud Solutions</option>
                      <option value="software-development">Software Development</option>
                      <option value="branding">Branding & Growth</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or inquiry..."
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Sending Message...
                      </>
                    ) : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.9185565277915!2d-122.4000805!3d37.7808078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858085ced962db%3A0x2b904b63c587f8eb!2sSan%20Francisco%2C%20CA%2094107!5e0!3m2!1sen!2sus!4v1616179531151!5m2!1sen!2sus"
              title="Office Location"
              frameBorder="0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          
          <div className="location-card">
            <h3>Our Office</h3>
            <p className="address">
              <svg xmlns="http://www.w3.org/2000/svg" className="location-pin" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              123 Tech Street, San Francisco, CA 94107
            </p>
            <div className="office-hours">
              <h4>Hours of Operation</h4>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday - Sunday: Closed</p>
            </div>
            <a href="https://goo.gl/maps/examplelink" className="directions-button" target="_blank" rel="noopener noreferrer">
              Get Directions
            </a>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
            <p>Find answers to common questions about working with us</p>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How quickly will you respond to my inquiry?</h3>
              <p>We aim to respond to all inquiries within 24 business hours. For urgent matters, we recommend calling our office directly.</p>
            </div>
            
            <div className="faq-item">
              <h3>What information should I prepare before contacting you?</h3>
              <p>Having details about your project goals, timeline, budget expectations, and any specific requirements will help us provide you with the most accurate information during our initial consultation.</p>
            </div>
            
            <div className="faq-item">
              <h3>Do you work with clients outside of San Francisco?</h3>
              <p>Absolutely! We work with clients all over the United States and internationally. Most of our communication can be handled remotely via video calls and collaborative tools.</p>
            </div>
            
            <div className="faq-item">
              <h3>What is your typical project process?</h3>
              <p>Our process typically includes discovery, planning, design, development, testing, and launch phases. We maintain clear communication throughout and involve our clients at every critical decision point.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>Contact us today and let's bring your vision to life!</p>
            <a href="#contact-form" className="cta-button">Let's Talk</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;