'use client'

import React from 'react'

const services = [
  {
    icon: '🤖',
    title: 'AI Chatbots',
    description: 'Intelligent conversational AI for customer support and engagement'
  },
  {
    icon: '📊',
    title: 'Machine Learning Solutions',
    description: 'Custom ML models for predictions and pattern recognition'
  },
  {
    icon: '💻',
    title: 'Web Development',
    description: 'Modern, responsive web applications built with latest technologies'
  },
  {
    icon: '📈',
    title: 'Data Analytics',
    description: 'Transform data into actionable insights for business growth'
  },
  {
    icon: '☁️',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure for your business needs'
  },
  {
    icon: '⚙️',
    title: 'AI Automation',
    description: 'Automate business processes with intelligent automation'
  }
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to Future Stack AI</h2>
          <p>Transforming businesses with cutting-edge AI and technology solutions</p>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2>Get Started</h2>
          <p>Ready to transform your business? Contact us today!</p>
          <button className="cta-button">Contact Us</button>
        </div>
      </section>
    </>
  )
}