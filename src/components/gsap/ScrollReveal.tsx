'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface ScrollRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  className?: string
}

export function ScrollReveal({ 
  children, 
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = ''
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const element = elementRef.current
      if (!element) return

      const directionMap = {
        up: { y: 60, x: 0 },
        down: { y: -60, x: 0 },
        left: { y: 0, x: 60 },
        right: { y: 0, x: -60 }
      }

      const { x, y } = directionMap[direction]

      gsap.from(element, {
        opacity: 0,
        y,
        x,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'top 60%',
          toggleActions: 'play none none none'
        }
      })
    },
    { scope: elementRef }
  )

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
