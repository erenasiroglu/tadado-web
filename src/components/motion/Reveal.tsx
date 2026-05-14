'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'

type RevealTag = 'div' | 'section' | 'article' | 'header' | 'footer' | 'ul' | 'li' | 'p' | 'h2' | 'h3'

type Props = {
  children: React.ReactNode
  /** Delay in seconds before the reveal starts. */
  delay?: number
  /** Initial translateY in pixels (set to 0 for fade-only). */
  y?: number
  /** Animation duration in seconds. */
  duration?: number
  /** Viewport fraction visible before triggering (0–1). */
  amount?: number
  /** Wrap once or replay every entry. */
  once?: boolean
  className?: string
  as?: RevealTag
}

/**
 * Subtle viewport reveal: fades + lifts content as it scrolls into view.
 * Respects `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.7,
  amount = 0.25,
  once = true,
  className,
  as = 'div'
}: Props) {
  const reduce = useReducedMotion()
  const Component = motion[as] as typeof motion.div

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
    >
      {children}
    </Component>
  )
}
