'use client'

import { createContext, useContext } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

const ChildVariantContext = createContext<Variants | undefined>(undefined)

type StaggerTag = 'div' | 'section' | 'ul' | 'ol' | 'header'

type Props = {
  children: React.ReactNode
  /** Delay between each child reveal in seconds. */
  stagger?: number
  /** Delay applied before the first child reveal. */
  delayChildren?: number
  /** Viewport fraction visible before triggering (0–1). */
  amount?: number
  /** Per-child initial translateY in pixels. */
  y?: number
  /** Per-child reveal duration in seconds. */
  duration?: number
  /** Wrap once or replay every entry. */
  once?: boolean
  className?: string
  as?: StaggerTag
}

/**
 * Container that staggers `<RevealItem>` children as they enter the viewport.
 * Children inherit the `hidden` / `show` variant names from the parent context.
 */
export function RevealStagger({
  children,
  stagger = 0.08,
  delayChildren = 0.05,
  amount = 0.2,
  y = 24,
  duration = 0.6,
  once = true,
  className,
  as = 'div'
}: Props) {
  const reduce = useReducedMotion()
  const Component = motion[as] as typeof motion.div

  const parent: Variants = {
    hidden: {},
    show: {
      transition: reduce
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: stagger, delayChildren }
    }
  }

  const child: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={parent}
      className={className}
    >
      <ChildVariantContext.Provider value={child}>{children}</ChildVariantContext.Provider>
    </Component>
  )
}

type RevealItemTag = 'div' | 'li' | 'article' | 'p' | 'h2' | 'h3' | 'span'

type RevealItemProps = {
  children: React.ReactNode
  className?: string
  as?: RevealItemTag
}

/**
 * Child of `<RevealStagger>` — inherits the parent's stagger schedule.
 */
export function RevealItem({ children, className, as = 'div' }: RevealItemProps) {
  const variants = useContext(ChildVariantContext)
  const Component = motion[as] as typeof motion.div
  return (
    <Component variants={variants} className={className}>
      {children}
    </Component>
  )
}
