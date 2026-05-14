'use client'

import { useRef, type ReactNode, Children } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface ScrollRevealStaggerProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  staggerAmount?: number
  duration?: number
  className?: string
  itemClassName?: string
}

export function ScrollRevealStagger({
  children,
  direction = 'up',
  staggerAmount = 0.15,
  duration = 0.7,
  className = '',
  itemClassName = ''
}: ScrollRevealStaggerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const items = containerRef.current?.querySelectorAll('.stagger-item')
      if (!items || items.length === 0) return

      const directionMap = {
        up: { y: 50, x: 0 },
        down: { y: -50, x: 0 },
        left: { y: 0, x: 50 },
        right: { y: 0, x: -50 }
      }

      const { x, y } = directionMap[direction]

      gsap.from(items, {
        opacity: 0,
        y,
        x,
        duration,
        ease: 'power2.out',
        stagger: staggerAmount,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none'
        }
      })
    },
    { scope: containerRef }
  )

  const childArray = Children.toArray(children)

  return (
    <div ref={containerRef} className={className}>
      {childArray.map((child, index) => (
        <div key={index} className={`stagger-item ${itemClassName}`}>
          {child}
        </div>
      ))}
    </div>
  )
}
