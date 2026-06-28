import { notFound } from 'next/navigation'
import EnquiryForm from '../../../components/EnquiryForm'
import Chat from '../../../components/Chat'

const services = {
  'ai-chatbots': {
    icon: '🤖',
    title: 'AI Chatbots',
    description: 'Intelligent conversational AI for customer support and engagement',
    details: 'Custom AI chatbots tailored to your business needs. 24/7 customer support, lead generation, and seamless WhatsApp integration.',
    features: ['24/7 automated customer support', 'Smart lead qualification & generation', 'Multi-platform deployment (Web, WhatsApp, Slack)', 'Context-aware conversations', 'Analytics & performance dashboard'],
  },
  'machine-learning': {
    icon: '📊',
    title: 'Machine Learning Solutions',
    description: 'Custom ML models for predictions and pattern recognition',
    details: 'From predictive analytics to computer vision, we build custom ML models that drive business value.',
    features: ['Predictive analytics & forecasting', 'Computer vision solutions', 'Natural language processing', 'Custom model training & deployment', 'Model monitoring & retuning'],
  },
  'web-development': {
    icon: '💻',
    title: 'Web Development',
    description: 'Modern, responsive web applications built with latest technologies',
    details: 'Full-stack web development using Next.js, React, Node.js, and modern frameworks. Responsive, performant, and scalable.',
    features: ['Single-page & multi-page applications', 'API design & development', 'Responsive & accessible UI', 'Performance optimization', 'Ongoing maintenance & support'],
  },
  'data-analytics': {
    icon: '📈',
    title: 'Data Analytics',
    description: 'Transform data into actionable insights for business growth',
    details: 'Comprehensive data analytics solutions including dashboards, reporting, and business intelligence.',
    features: ['Custom dashboard development', 'Real-time data visualization', 'Business intelligence reports', 'Data pipeline engineering', 'Predictive modeling'],
  },
  'cloud-solutions': {
    icon: '☁️',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure for your business needs',
    details: 'Cloud architecture, migration, and management on AWS, GCP, and Azure. Scalable, secure, and cost-effective.',
    features: ['Cloud architecture design', 'Migration & modernization', 'Infrastructure as Code', 'Security & compliance', 'Cost optimization'],
  },
  'ai-automation': {
    icon: '⚙️',
    title: 'AI Automation',
    description: 'Automate business processes with intelligent automation',
    details: 'Workflow automation, RPA, and AI-powered process optimization to streamline your operations.',
    features: ['Workflow automation design', 'Robotic process automation', 'AI-powered document processing', 'Process mining & analysis', 'Integration with existing tools'],
  },
}

export default async function ServicePage({ params }) {
  const { slug } = await params
  const service = services[slug]
  if (!service) notFound()

  if (slug === 'ai-chatbots') {
    return (
      <div className="service-detail">
        <div className="service-detail-header">
          <span className="service-icon-large">{service.icon}</span>
          <h1>{service.title}</h1>
          <p className="service-detail-desc">{service.description}</p>
        </div>
        <div className="service-detail-body">
          <p>{service.details}</p>
        </div>
        <div className="service-features">
          <h3>Key Capabilities</h3>
          <ul>
            {service.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div className="chat-section">
          <h2>Try it now</h2>
          <p className="chat-section-desc">Ask questions about our AI chatbot service or anything else.</p>
          <Chat />
        </div>
        <div className="service-enquiry-section">
          <h2>Interested in this service?</h2>
          <EnquiryForm serviceSlug={slug} serviceTitle={service.title} />
        </div>
      </div>
    )
  }

  return (
    <div className="service-detail">
      <div className="service-detail-header">
        <span className="service-icon-large">{service.icon}</span>
        <h1>{service.title}</h1>
        <p className="service-detail-desc">{service.description}</p>
      </div>
      <div className="service-detail-body">
        <p>{service.details}</p>
      </div>
      <div className="service-features">
        <h3>Key Capabilities</h3>
        <ul>
          {service.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
      <div className="service-enquiry-section">
        <h2>Interested in this service?</h2>
        <EnquiryForm serviceSlug={slug} serviceTitle={service.title} />
      </div>
    </div>
  )
}
