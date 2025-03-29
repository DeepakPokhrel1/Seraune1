import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Services.css';

const Services = () => {
  // State to keep track of active service for mobile view
  const [activeService, setActiveService] = useState('web-development');

  // Service data
  const services = [
    {
      id: 'web-development',
      title: 'Website Development',
      shortDesc: 'Custom websites that convert visitors into customers',
      description: 'Our web development team creates beautiful, functional websites that are designed to engage your audience and drive conversions. From simple landing pages to complex e-commerce platforms, we build solutions that perfectly match your business needs.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        'Custom website design and development',
        'E-commerce solutions',
        'Responsive design for all devices',
        'Content management systems',
        'Website maintenance and support',
        'Performance optimization'
      ]
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      shortDesc: 'Strategic campaigns to boost your online presence',
      description: 'Our data-driven digital marketing strategies help you reach your target audience, increase brand awareness, and generate qualified leads. We develop customized marketing plans that align with your business goals and deliver measurable results.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      features: [
        'Search engine optimization (SEO)',
        'Pay-per-click (PPC) advertising',
        'Social media marketing',
        'Email marketing campaigns',
        'Content marketing strategy',
        'Analytics and reporting'
      ]
    },
    {
      id: 'cloud-solutions',
      title: 'IT & Cloud Solutions',
      shortDesc: 'Secure, scalable infrastructure for your business',
      description: 'Our IT and cloud solutions provide the technology infrastructure your business needs to operate efficiently and securely. We help you leverage cloud technology to reduce costs, increase flexibility, and improve collaboration across your organization.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      features: [
        'Cloud hosting and infrastructure',
        'Data backup and recovery',
        'IT security solutions',
        'Network management',
        'Business process automation',
        'Cloud migration services'
      ]
    },
    {
      id: 'software-development',
      title: 'Software Development',
      shortDesc: 'Custom software tailored to your specific needs',
      description: 'We develop custom software solutions designed to address your specific business challenges. Our experienced development team creates scalable, secure applications that streamline your operations and give you a competitive edge.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      features: [
        'Custom application development',
        'Mobile app development',
        'API development and integration',
        'CRM and ERP solutions',
        'Database design and management',
        'Software maintenance and support'
      ]
    },
    {
      id: 'branding',
      title: 'Branding & Growth',
      shortDesc: 'Establish a strong market presence and identity',
      description: 'Our branding and growth services help you establish a compelling brand identity and develop strategies for sustainable business growth. We work with you to define your unique value proposition and communicate it effectively to your target audience.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      features: [
        'Brand identity development',
        'Logo and visual design',
        'Brand messaging and positioning',
        'Market research and analysis',
        'Growth strategy development',
        'Brand guidelines and assets'
      ]
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Our <span className="gradient-text">Services</span></h1>
            <p className="hero-subtitle">Comprehensive digital solutions to help your business thrive in today's competitive landscape</p>
          </div>
        </div>
        <div className="hero-shape"></div>
        <div className="hero-background">
          <div className="hero-blob"></div>
          <div className="hero-grid"></div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="services-overview">
        <div className="container">
          <div className="overview-header">
            <div className="section-tag">What We Offer</div>
            <h2>Digital Solutions for Every Business Need</h2>
            <p className="overview-subtitle">From website development to comprehensive digital marketing, we provide all the services your business needs to succeed online.</p>
          </div>
          
          <div className="services-grid">
            {services.map((service) => (
              <div className="service-card" key={service.id}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.shortDesc}</p>
                <a href={`#${service.id}`} className="learn-more">
                  Learn More <span className="arrow">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="detailed-services">
        <div className="container">
          <div className="services-header">
            <div className="section-tag">Our Services</div>
            <h2>How We Can <span className="gradient-text">Help You</span></h2>
            <p className="services-subtitle">Explore our comprehensive range of services designed to help your business grow</p>
          </div>
          
          <div className="service-tabs-container">
            <div className="service-tabs">
              {services.map((service) => (
                <button 
                  key={service.id}
                  className={`service-tab ${activeService === service.id ? 'active' : ''}`}
                  onClick={() => setActiveService(service.id)}
                >
                  {service.title}
                </button>
              ))}
            </div>
            
            <div className="service-content">
              {services.map((service) => (
                <div 
                  id={service.id} 
                  key={service.id} 
                  className={`service-detail ${activeService === service.id ? 'active' : ''}`}
                >
                  <div className="service-detail-grid">
                    <div className="service-detail-content">
                      <div className="service-detail-icon">{service.icon}</div>
                      <h3>{service.title}</h3>
                      <p className="service-description">{service.description}</p>
                      
                      <div className="service-features">
                        <h4>What's Included</h4>
                        <ul className="features-list">
                          {service.features.map((feature, index) => (
                            <li key={index} className="feature-item">
                              <span className="feature-icon">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Link to="/contact" className="service-cta">
                        Get Started
                      </Link>
                    </div>
                    <div className="service-detail-visual">
                      <div className="visual-element">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="process-header">
            <div className="section-tag">Our Process</div>
            <h2>How We Work</h2>
            <p className="process-subtitle">Our proven approach to delivering successful projects</p>
          </div>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Discovery</h3>
                <p>We begin by understanding your business goals, target audience, and specific requirements through in-depth consultations.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Strategy</h3>
                <p>Based on our findings, we develop a comprehensive strategy tailored to your specific needs and goals.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Creation</h3>
                <p>Our team of experts brings your project to life, focusing on quality, usability, and performance.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3>Launch</h3>
                <p>We carefully deploy your solution, ensuring a smooth transition and providing thorough documentation and training.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">05</div>
              <div className="step-content">
                <h3>Optimization</h3>
                <p>We continuously monitor performance and make data-driven improvements to maximize your ROI.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="container">
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              Seraune completely transformed our online presence. Their team took the time to understand our business goals and delivered a website and digital marketing strategy that has significantly increased our leads and sales. What impressed us most was their attention to detail and commitment to our success.
            </p>
            <div className="client-info">
              <div className="client-image"></div>
              <div className="client-details">
                <h4>Jennifer Martinez</h4>
                <p>CEO, Evergreen Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-header">
            <div className="section-tag">FAQ</div>
            <h2>Frequently Asked Questions</h2>
            <p className="faq-subtitle">Answers to common questions about our services</p>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How long does it typically take to complete a website?</h3>
              <p>The timeline varies depending on the complexity of the project. A simple website can be completed in 4-6 weeks, while more complex projects may take 8-12 weeks or longer. We'll provide a detailed timeline during our initial consultation.</p>
            </div>
            
            <div className="faq-item">
              <h3>Do you offer ongoing maintenance and support?</h3>
              <p>Yes, we offer various maintenance and support packages to ensure your digital assets remain secure, up-to-date, and performing optimally. Our support team is available to address any issues that may arise.</p>
            </div>
            
            <div className="faq-item">
              <h3>How do you measure the success of digital marketing campaigns?</h3>
              <p>We establish clear KPIs at the beginning of each campaign and provide regular reports on metrics such as traffic, conversions, engagement, and ROI. We use data analytics tools to track performance and make data-driven adjustments.</p>
            </div>
            
            <div className="faq-item">
              <h3>Can you work with businesses in any industry?</h3>
              <p>Yes, we have experience working with clients across diverse industries. Our approach involves understanding the unique aspects of your industry and tailoring our solutions to meet your specific needs and challenges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Contact us today to discuss how we can help your business grow</p>
            <Link to="/contact" className="cta-button">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;