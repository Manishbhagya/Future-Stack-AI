'use client'

import { useState, useRef, useLayoutEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function IconShield({ color, size = '55%' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

function IconDoc({ color, size = '55%' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="13" y2="16" />
    </svg>
  )
}

function IconHalf({ color, size = '55%' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} style={{ width: size, height: size }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3 A9 9 0 0 1 12 21 Z" fill={color} />
    </svg>
  )
}

function IconEdit({ color, size = '55%' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <path d="M4 20h4l10-10-4-4L4 16v4z" />
      <path d="M14 6l4 4" />
    </svg>
  )
}

function IconBrain({ color, size = '55%' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-2 5.5A3 3 0 0 0 6 18a3 3 0 0 0 3 3 1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
      <path d="M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 2 5.5A3 3 0 0 1 18 18a3 3 0 0 1-3 3 1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
    </svg>
  )
}

function IconChart({ color, size = '55%' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
      <line x1="6" y1="20" x2="6" y2="12" />
      <line x1="12" y1="20" x2="12" y2="6" />
      <line x1="18" y1="20" x2="18" y2="14" />
    </svg>
  )
}

const DEFAULT_ICONS = [IconShield, IconDoc, IconHalf, IconEdit, IconBrain, IconChart]

const DEFAULT_ITEMS = [
  { title: 'Secure Client Messaging', description: 'A private, encrypted space for clients to securely share files and track their plan\'s progress.' },
  { title: 'Transparent Planning', description: 'Visualizing the full lifecycle of the trust, mapping out grantor roles, successor triggers, and final distribution methods in one unified view.' },
  { title: 'Full Oversight', description: 'See every moving part of your practice in one clear view.' },
  { title: 'Automated Drafting', description: 'Instantly generate wills, trusts, and ancillary documents from your structured intake data.' },
  { title: 'Smart Client Interview', description: 'Capture details your way — manually enter data or extract insights from uploaded notes.' },
  { title: 'Automated Client Intake', description: 'View your entire practice from a single dashboard with real-time matter updates.' },
]

function CenterPlaceholder({ width, height, accent, gradId }) {
  return (
    <svg viewBox="0 0 600 460" preserveAspectRatio="xMidYMid slice" style={{ width, height, borderRadius: 18, display: 'block' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A2818" />
          <stop offset="100%" stopColor="#0E1A13" />
        </linearGradient>
      </defs>
      <rect width="600" height="460" rx={22} fill={`url(#${gradId})`} />
      <rect x="40" y="40" width="520" height="46" rx={10} fill="#2A3A28" opacity={0.6} />
      <rect x="56" y="56" width="160" height="14" rx={4} fill="#6A7A66" />
      <rect x="40" y="110" width="250" height="120" rx={12} fill="#2A3A28" opacity={0.5} />
      <rect x="310" y="110" width="250" height="120" rx={12} fill={accent} opacity={0.5} />
      <rect x="40" y="250" width="520" height="60" rx={10} fill="#2A3A28" opacity={0.5} />
      <rect x="40" y="324" width="520" height="60" rx={10} fill="#2A3A28" opacity={0.5} />
      <rect x="40" y="398" width="240" height="20" rx={6} fill="#6A7A66" />
    </svg>
  )
}

const PLACEHOLDER_ACCENTS = ['#D4A853', '#C5A84A', '#E5C16A', '#D4A853', '#C5A84A', '#E5C16A']

function useIsCompact(ref, breakpoint) {
  const [isCompact, setIsCompact] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return

    let last = null
    const update = () => {
      const w = el.getBoundingClientRect().width
      if (w <= 0) return
      const next = w < breakpoint
      if (next !== last) {
        last = next
        setIsCompact(next)
      }
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, breakpoint])

  return isCompact
}

function SideLabel({ side, labelWidth, activePos, activeIndex, activeItem, LabelText }) {
  if (!activeItem) return null
  return (
    <motion.div
      key={`${activeIndex}-${side}`}
      initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: activePos.y, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      style={{
        position: 'absolute',
        top: '50%',
        [side]: 0,
        width: labelWidth,
        textAlign: side === 'left' ? 'right' : 'left',
        pointerEvents: 'none',
        paddingLeft: side === 'right' ? 12 : 0,
        paddingRight: side === 'left' ? 12 : 0,
      }}
    >
      {LabelText}
    </motion.div>
  )
}

function BottomLabel({ activeIndex, activeItem, LabelText }) {
  if (!activeItem) return null
  return (
    <motion.div
      key={activeIndex}
      initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      style={{ width: '100%', maxWidth: 360, textAlign: 'center', padding: '0 16px' }}
    >
      {LabelText}
    </motion.div>
  )
}

export default function FeatureWheel({
  style = {},
  heading = 'Total Control. Zero Chaos.',
  subheading = 'We handle the heavy lifting of organization and tracking to keep your firm running smoothly.',
  items = DEFAULT_ITEMS,
  radius = 200,
  iconSize = 56,
  centerWidth = 360,
  centerHeight = 300,
  labelWidth = 240,
  breakpoint = 500,
  headingColor = '#E8EDE5',
  bodyColor = '#E8EDE5',
  mutedColor = '#8A9A86',
  activeBg = 'linear-gradient(160deg, #1E2E1E 0%, #2A3A28 50%, #1E2E1E 100%)',
  inactiveBg = '#182418',
  ringTint = 'rgba(42, 58, 40, 0.45)',
}) {
  const safeItems = items && items.length > 0 ? items : []
  const [activeIndex, setActiveIndex] = useState(0)
  const safeIndex = Math.min(activeIndex, Math.max(safeItems.length - 1, 0))

  const containerRef = useRef(null)
  const isCompact = useIsCompact(containerRef, breakpoint)

  const reactId = useId()
  const idSafe = reactId.replace(/[^a-zA-Z0-9]/g, '')

  const eff = isCompact
    ? {
        radius: Math.min(radius, 130),
        iconSize: Math.min(iconSize, 44),
        centerWidth: Math.min(centerWidth, 220),
        centerHeight: Math.min(centerHeight, 180),
        headingSize: 28,
        subSize: 14,
        titleSize: 17,
        descSize: 13,
      }
    : { radius, iconSize, centerWidth, centerHeight, headingSize: 44, subSize: 15, titleSize: 18, descSize: 13.5 }

  const startAngle = -135

  const getPosition = (index, total) => {
    const step = 360 / Math.max(total, 1)
    const angleDeg = startAngle + step * index
    const rad = (angleDeg * Math.PI) / 180
    return { x: Math.cos(rad) * eff.radius, y: Math.sin(rad) * eff.radius, angleDeg }
  }

  const activePos = safeItems.length > 0 ? getPosition(safeIndex, safeItems.length) : { x: 0, y: 0, angleDeg: 0 }
  const activeItem = safeItems[safeIndex]
  const labelOnRight = activePos.x >= 0
  const spring = { type: 'spring' as const, stiffness: 220, damping: 30, mass: 0.9 }
  const wheelSize = eff.radius * 2 + eff.iconSize * 2 + 16

  const LabelText = (
    <>
      <div style={{ fontSize: eff.titleSize, fontWeight: 600, color: bodyColor, marginBottom: 8, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
        {activeItem ? activeItem.title : ''}
      </div>
      <div style={{ fontSize: eff.descSize, lineHeight: 1.55, color: mutedColor, fontWeight: 400 }}>
        {activeItem ? activeItem.description : ''}
      </div>
    </>
  )

  const Wheel = (
    <div style={{ position: 'relative', width: wheelSize, height: wheelSize, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{
        position: 'absolute',
        width: eff.radius * 2 + 24,
        height: eff.radius * 2 + 24,
        borderRadius: '50%',
        background: `radial-gradient(circle at 50% 35%, ${ringTint} 0%, rgba(255,255,255,0) 72%)`,
        border: '1px solid rgba(42,58,40,0.15)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', width: eff.centerWidth, height: eff.centerHeight, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence initial={false}>
          {activeItem && (
            <motion.div
              key={safeIndex}
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.985, filter: 'blur(8px)' }}
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <CenterPlaceholder
                width={eff.centerWidth}
                height={eff.centerHeight}
                accent={PLACEHOLDER_ACCENTS[safeIndex % PLACEHOLDER_ACCENTS.length]}
                gradId={`fw-grad-${idSafe}-${safeIndex}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {safeItems.map((item, i) => {
        const pos = getPosition(i, safeItems.length)
        const isActive = i === safeIndex
        const platformRotate = pos.angleDeg + 90
        const DefaultIcon = DEFAULT_ICONS[i % DEFAULT_ICONS.length]
        const iconColor = isActive ? '#E8EDE5' : '#6A7A66'
        const iconOpacity = isActive ? 1 : 0.5
        const activate = () => setActiveIndex(i)

        return (
          <motion.div
            key={i}
            onMouseEnter={isCompact ? undefined : activate}
            onClick={activate}
            onFocus={activate}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate() } }}
            tabIndex={0}
            role="button"
            aria-label={item.title}
            aria-pressed={isActive}
            animate={{ x: pos.x, y: pos.y, scale: isActive ? 1.12 : 1, zIndex: isActive ? 10 : 2 }}
            transition={spring}
            style={{
              position: 'absolute',
              width: eff.iconSize,
              height: eff.iconSize,
              cursor: 'pointer',
              outline: 'none',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: eff.iconSize * 1.55,
                    height: eff.iconSize * 1.55,
                    marginLeft: -(eff.iconSize * 1.55) / 2,
                    marginTop: -(eff.iconSize * 1.55) / 2,
                    borderRadius: 22,
                    background: 'linear-gradient(160deg, rgba(30,46,30,0.98) 0%, rgba(24,36,24,0.95) 100%)',
                    transform: `rotateZ(${platformRotate}deg)`,
                    transformStyle: 'preserve-3d',
                    pointerEvents: 'none',
                    zIndex: -1,
                    border: '1px solid rgba(212,168,83,0.15)',
                  }}
                />
              )}
            </AnimatePresence>
            <motion.div
              animate={{
                background: isActive ? activeBg : inactiveBg,
                boxShadow: isActive
                  ? '0 14px 24px -8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(212,168,83,0.1)'
                  : '0 1px 2px rgba(0,0,0,0.15), inset 0 1px 0 rgba(212,168,83,0.05)',
                borderColor: isActive ? 'rgba(212,168,83,0.25)' : 'rgba(42,58,40,0.3)',
              }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderStyle: 'solid',
                borderWidth: 1,
              }}
            >
              <motion.div
                animate={{ opacity: iconOpacity }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', pointerEvents: 'none' }}
              >
                <DefaultIcon color={iconColor} />
              </motion.div>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'transparent',
        overflow: 'visible',
        userSelect: 'none',
      }}
    >
      <div style={{ textAlign: 'center', paddingTop: isCompact ? 16 : 24, maxWidth: 560, paddingLeft: 16, paddingRight: 16 }}>
        <h2 style={{ fontSize: eff.headingSize, lineHeight: 1.1, fontWeight: 600, color: headingColor, margin: 0, letterSpacing: '-0.02em' }}>
          {heading}
        </h2>
        <p style={{ fontSize: eff.subSize, lineHeight: 1.55, color: mutedColor, marginTop: 12, marginBottom: 0, fontWeight: 400 }}>
          {subheading}
        </p>
      </div>
      {isCompact ? (
        <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 16, paddingTop: 16, paddingBottom: 24, overflow: 'visible' }}>
          {Wheel}
          <AnimatePresence mode="wait" initial={false}>
            <BottomLabel activeIndex={safeIndex} activeItem={activeItem} LabelText={LabelText} />
          </AnimatePresence>
        </div>
      ) : (
        <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible', minWidth: 0 }}>
          <div style={{ width: labelWidth, height: wheelSize, position: 'relative', flexShrink: 1, minWidth: 0 }}>
            <AnimatePresence initial={false}>
              {!labelOnRight && (
                <SideLabel
                  side="left"
                  labelWidth={labelWidth}
                  activePos={activePos}
                  activeIndex={safeIndex}
                  activeItem={activeItem}
                  LabelText={LabelText}
                />
              )}
            </AnimatePresence>
          </div>
          {Wheel}
          <div style={{ width: labelWidth, height: wheelSize, position: 'relative', flexShrink: 1, minWidth: 0 }}>
            <AnimatePresence initial={false}>
              {labelOnRight && (
                <SideLabel
                  side="right"
                  labelWidth={labelWidth}
                  activePos={activePos}
                  activeIndex={safeIndex}
                  activeItem={activeItem}
                  LabelText={LabelText}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}
