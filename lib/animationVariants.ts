import type { Variants } from 'framer-motion'

const easeOut = [0.21, 0.47, 0.32, 0.98] as const
const easeSmooth = [0.4, 0, 0.2, 1] as const

function v(fn: (delay: number) => Record<string, unknown>): Variants['visible'] {
  return fn as unknown as Variants['visible']
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: v((delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: easeOut },
  })),
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: v((delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay, ease: easeOut },
  })),
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: v((delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay, ease: easeOut },
  })),
}

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: v((delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: easeOut },
  })),
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: easeSmooth },
  },
}

export const reducedMotionVariants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0 },
    visible: v((delay = 0) => ({
      opacity: 1,
      transition: { duration: 0.3, delay },
    })),
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: v((delay = 0) => ({
      opacity: 1,
      transition: { duration: 0.3, delay },
    })),
  },
}
