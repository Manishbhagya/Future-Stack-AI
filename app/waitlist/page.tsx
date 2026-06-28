'use client'

import FadeIn from '../../components/FadeIn'
import MultiStepWaitlistFormWrapper from '../../components/MultiStepWaitlistFormWrapper'

export default function WaitlistPage() {
  return (
    <section className="waitlist-section">
      <div className="waitlist-card" style={{ maxWidth: 520, margin: '0 auto' }}>
        <FadeIn>
          <MultiStepWaitlistFormWrapper />
        </FadeIn>
      </div>
    </section>
  )
}
