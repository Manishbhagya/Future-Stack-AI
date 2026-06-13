# Industry Use Case Selector — Design Doc

## Overview
Replace generic service cards and process steps with industry-tabbed content for SaaS, Agency, and Enterprise. A shared pill selector drives context-aware descriptions in both sections.

## Data Changes

### `services` array — add `industries` map

```js
const services = [
  {
    slug: 'ai-chatbots',
    icon: '🤖',
    title: 'AI Chatbots',
    industries: {
      saas: {
        desc: 'AI-powered support that resolves 60% of tickets instantly, cutting response time from hours to seconds.',
        result: '60% faster support',
      },
      agency: {
        desc: 'White-label chatbots that handle client onboarding, FAQs, and lead qualification around the clock.',
        result: '2x lead conversion',
      },
      enterprise: {
        desc: 'Enterprise-grade conversational AI with SSO, audit logs, and custom knowledge base integration.',
        result: '99.9% uptime',
      },
    },
  },
  {
    slug: 'machine-learning',
    icon: '📊',
    title: 'Machine Learning',
    industries: {
      saas: {
        desc: 'Predictive models that analyze user behavior to reduce churn and surface personalized recommendations.',
        result: '40% churn reduction',
      },
      agency: {
        desc: 'Automated reporting and forecasting models that turn raw client data into actionable dashboards.',
        result: '10x report speed',
      },
      enterprise: {
        desc: 'Custom ML pipelines with real-time inference, A/B testing, and compliance-ready model governance.',
        result: '3x revenue uplift',
      },
    },
  },
  {
    slug: 'web-development',
    icon: '💻',
    title: 'Web Development',
    industries: {
      saas: {
        desc: 'Blazing-fast Next.js apps with instant auth, real-time data, and seamless third-party integrations.',
        result: '0.8s load time',
      },
      agency: {
        desc: 'Multi-tenant site builders and CMS platforms that let agencies ship client sites in days, not weeks.',
        result: '3x faster delivery',
      },
      enterprise: {
        desc: 'Enterprise portals with Role-Based Access Control, SOC 2 compliance, and CI/CD pipelines.',
        result: '5x team efficiency',
      },
    },
  },
]
```

### `processSteps` array — add `industryNote` per step

```js
const processSteps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    desc: 'We learn about your business, goals, and challenges to define a clear roadmap for success.',
    industryNote: {
      saas: 'We map user onboarding funnels and identify where AI reduces churn.',
      agency: 'We audit your delivery pipeline to find automation gaps.',
      enterprise: 'We assess legacy systems and design a phased migration plan.',
    },
  },
  {
    number: '02',
    title: 'Design & Development',
    desc: 'Our team builds your solution using modern architectures with regular progress updates.',
    industryNote: {
      saas: 'We build with a micro-frontend architecture so your team can ship independently.',
      agency: 'We create reusable component libraries that speed up your next client project.',
      enterprise: 'We follow strict code review, security scanning, and compliance checkpoints.',
    },
  },
  {
    number: '03',
    title: 'Deploy & Scale',
    desc: 'We launch, monitor, and optimize — ensuring your system grows with your business.',
    industryNote: {
      saas: 'Auto-scaling infrastructure with zero-downtime deploys and usage-based billing fits.',
      enterprise: 'Gradual rollout with feature flags, canary deploys, and dedicated SLAs.',
      agency: 'White-glove handoff with documentation, training, and post-launch support.',
    },
  },
]
```

## Component Changes

### New `UseCaseTabs` component
- Renders pill tabs: `[SaaS] [Agency] [Enterprise]`
- Manages `activeIndustry` state
- Exposes it via a callback prop `onChange` OR stores it in a shared parent

### Services section
- Replace `services.map` with industry-aware cards
- Each card reads `services[i].industries[activeIndustry]` for description + result stat
- Show a small result badge on each card (e.g. "60% faster support")
- Smooth fade transition on industry tab switch

### Process section
- Replace hardcoded process steps with `processSteps` array mapping
- Each step renders `industryNote[activeIndustry]` below the main description
- Note is styled as a subtle callout with accent color, italic text, thin divider

### Shared state
- `activeIndustry` state lives in `Home()` component (the parent)
- Passed as prop to both `ServicesSection` and `ProcessSection`
- Changing the tab updates both sections simultaneously

## CSS Additions
- `.use-case-tabs` — pill container, horizontal row, centered
- `.use-case-tab` — pill button with active/focus states
- `.service-result-badge` — small stat chip on each card
- `.process-industry-note` — subtle callout text with divider arrow

## Transition Behavior
- `AnimatePresence mode="wait"` on card content when industry tab changes
- Duration 0.25s, subtle fade + Y offset
- Tabs themselves get a smooth background color transition via CSS

## No-Change Zones
- LogoGarden, Integration grid, Pricing, Testimonials, Solutions, FAQ, CTA — untouched
