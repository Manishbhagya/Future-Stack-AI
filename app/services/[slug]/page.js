import { notFound } from 'next/navigation'
import EnquiryForm from '@/components/EnquiryForm'

const services = {
  'ai-chatbots': {
    icon: '🤖',
    title: 'AI Chatbots',
    description: 'Intelligent conversational AI for customer support and engagement',
    details: 'Custom AI chatbots tailored to your business needs. 24/7 customer support, lead generation, and seamless WhatsApp integration.'
  },
  'machine-learning': {
    icon: '📊',
    title: 'Machine Learning Solutions',
    description: 'Custom ML models for predictions and pattern recognition',
    details: 'From predictive analytics to computer vision, we build custom ML models that drive business value.'
  },
  'web-development': {
    icon: '💻',
    title: 'Web Development',
    description: 'Modern, responsive web applications built with latest technologies',
    details: 'Full-stack web development using Next.js, React, Node.js, and modern frameworks. Responsive, performant, and scalable.'
  },
  'data-analytics': {
    icon: '📈',
    title: 'Data Analytics',
    description: 'Transform data into actionable insights for business growth',
    details: 'Comprehensive data analytics solutions including dashboards, reporting, and business intelligence.'
  },
  'cloud-solutions': {
    icon: '☁️',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure for your business needs',
    details: 'Cloud architecture, migration, and management on AWS, GCP, and Azure. Scalable, secure, and cost-effective.'
  },
  'ai-automation': {
    icon: '⚙️',
    title: 'AI Automation',
    description: 'Automate business processes with intelligent automation',
    details: 'Workflow automation, RPA, and AI-powered process optimization to streamline your operations.'
  }
}

export default function ServicePage({ params }) {
  const service = services[params.slug]
  if (!service) notFound()

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
      <div className="service-enquiry-section">
        <h2>Interested in this service?</h2>
        <EnquiryForm serviceSlug={params.slug} serviceTitle={service.title} />
      </div>
    </div>
  )
}
