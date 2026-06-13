'use client'

import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import ProgressStepCard from './ProgressStepCard'

export default function ProgressStepsSection({ steps, activeIndustry }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <div ref={sectionRef} className="process-steps">
      {steps.map((step, i) => (
        <ProgressStepCard
          key={step.number}
          number={step.number}
          title={step.title}
          desc={step.desc}
          industryNote={step.industryNote[activeIndustry]}
          index={i}
          total={steps.length}
          sectionProgress={scrollYProgress}
        />
      ))}
    </div>
  )
}
