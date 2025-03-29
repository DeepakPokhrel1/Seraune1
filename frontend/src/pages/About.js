import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

const About = () => {
  return (
    <div className="modern-about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>About <span className="gradient-text">Seraune</span></h1>
            <p className="hero-subtitle">We create digital solutions that help small businesses thrive in a competitive marketplace.</p>
          </div>
        </div>
        <div className="hero-shape"></div>
        <div className="hero-background">
          <div className="hero-blob"></div>
          <div className="hero-grid"></div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <div className="section-tag">Our Story</div>
              <h2>How We Started</h2>
              <p>Founded in 2018, Seraune began with a clear mission: to bring enterprise-quality digital solutions to small businesses at affordable prices.</p>
              <p>Our founders, with backgrounds spanning technology consulting and small business operations, noticed that smaller companies were often forced to choose between overpriced enterprise solutions or underwhelming template-based options that didn't meet their needs.</p>
              <p>We set out to bridge this gap by building a team of specialists who could deliver tailored, high-impact digital solutions specifically designed for the challenges and budgets of small businesses.</p>
              
              <div className="stats-container">
                <div className="stat-item">
                  <span className="stat-number">250+</span>
                  <span className="stat-label">Clients Served</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Client Satisfaction</span>
                </div>
              </div>
            </div>
            <div className="story-visual">
              <div className="visual-element">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
                <div className="shape shape-5"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-content glass-card">
              <div className="section-tag">Our Mission</div>
              <h2>Why We Exist</h2>
              <p>We believe that small businesses deserve the same quality of digital tools as large corporations. Our mission is to democratize access to powerful technology solutions by making them affordable, accessible, and tailored to the specific needs of each business we serve.</p>
            </div>
            
            <div className="values-content">
              <div className="section-tag">Our Values</div>
              <h2>What Guides Us</h2>
              
              <div className="values-grid">
                <div className="value-card">
                  <div className="value-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3>Integrity</h3>
                  <p>We believe in complete transparency in all client relationships. We'll never recommend solutions you don't need.</p>
                </div>
                
                <div className="value-card">
                  <div className="value-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3>Innovation</h3>
                  <p>We continuously explore new technologies and approaches to ensure our clients receive cutting-edge solutions.</p>
                </div>
                
                <div className="value-card">
                  <div className="value-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3>Partnership</h3>
                  <p>We see ourselves not as vendors but as partners in your success, with a vested interest in your growth.</p>
                </div>
                
                <div className="value-card">
                  <div className="value-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3>Results-Focused</h3>
                  <p>We measure our success by the tangible business outcomes our clients achieve through our solutions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="approach-section">
        <div className="container">
          <div className="approach-header">
            <div className="section-tag">Our Approach</div>
            <h2>How We Work With You</h2>
            <p className="approach-subtitle">A proven process that delivers results</p>
          </div>
          
          <div className="approach-steps">
            <div className="approach-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Understand</h3>
                <p>We begin by thoroughly understanding your business goals, challenges, and target audience through in-depth consultations.</p>
              </div>
            </div>
            
            <div className="approach-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Strategize</h3>
                <p>Based on our findings, we develop a comprehensive digital strategy tailored to your specific needs and objectives.</p>
              </div>
            </div>
            
            <div className="approach-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Create</h3>
                <p>Our expert team designs and develops your digital solutions with a focus on quality, usability, and performance.</p>
              </div>
            </div>
            
            <div className="approach-step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3>Optimize</h3>
                <p>We measure results and continuously refine your digital assets to ensure they deliver maximum impact and ROI.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="team-header">
            <div className="section-tag">Our Team</div>
            <h2>The People Behind <span className="gradient-text">Seraune</span></h2>
            <p className="team-subtitle">A diverse group of experts dedicated to your success</p>
          </div>
          
          <div className="team-grid">
            {[
              {
                name: "Michael Chen",
                role: "Founder & CEO",
                bio: "Former tech consultant passionate about helping small businesses leverage technology effectively."
              },
              {
                name: "Elena Rodriguez",
                role: "Creative Director",
                bio: "Award-winning designer with 12+ years of experience creating memorable digital experiences."
              },
              {
                name: "James Wilson",
                role: "Head of Development",
                bio: "Full-stack developer specializing in creating robust, scalable solutions."
              },
              {
                name: "Aisha Patel",
                role: "Digital Strategy Director",
                bio: "Marketing strategist combining data analysis with creative thinking to drive results."
              }
            ].map((member, index) => (
              <div className="team-card" key={index}>
                <div className="member-image"></div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="container">
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              Working with Seraune has transformed our business. Not only did they create a website that perfectly represents our brand, but they also implemented digital marketing strategies that have increased our online leads by over 70%. Their team takes the time to understand our business goals and consistently delivers solutions that exceed our expectations.
            </p>
            <div className="client-info">
              <div className="client-image"></div>
              <div className="client-details">
                <h4>Thomas Bradley</h4>
                <p>Founder, Coastal Brewing Co.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Digital Presence?</h2>
            <p>Let's talk about how we can help your business thrive online.</p>
            <Link to="/contact" className="cta-button">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;