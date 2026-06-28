'use client'

import { motion, useTransform } from 'framer-motion'

export default function ProgressStepCard({ number, title, desc, industryNote, index, total, sectionProgress }) {
  const start = index / total
  const end = (index + 1) / total
  const cardProgress = useTransform(sectionProgress, [start, end], [0, 1])

  return (
    <div className="progress-step-card">
      <div className="progress-step-left">
        <span className="progress-step-num">{number}</span>
        <div className="progress-step-bar-track">
          <motion.div
            className="progress-step-bar-fill"
            style={{ scaleY: cardProgress, originY: 1 }}
          />
        </div>
      </div>
      <div className="progress-step-body">
        <h3 className="progress-step-title">{title}</h3>
        <p className="progress-step-desc">{desc}</p>
        {industryNote && (
          <div className="progress-step-note">
            <span className="progress-step-note-arrow">↳</span>
            <span>{industryNote}</span>
          </div>
        )}
      </div>
    </div>
  )
}
