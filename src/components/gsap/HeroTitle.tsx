'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { poppinsBlackItalic } from '@/lib/fonts'

gsap.registerPlugin(useGSAP)

interface HeroTitleProps {
  text: string
}

export function HeroTitle({ text }: HeroTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const words = containerRef.current?.querySelectorAll('.word')
      if (!words) return

      gsap.from(words, {
        opacity: 0,
        y: 30,
        rotationX: -90,
        transformOrigin: 'center bottom',
        duration: 0.8,
        ease: 'power3.out',
        stagger: {
          amount: 0.6,
          from: 'start'
        }
      })
    },
    { scope: containerRef }
  )

  const words = text.split('\n').map((line, lineIndex) => (
    <span key={lineIndex} className="block">
      {line.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="word inline-block" style={{ whiteSpace: 'pre' }}>
          {word}
          {wordIndex < line.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  ))

  return (
    <h1
      ref={containerRef}
      className={`${poppinsBlackItalic.className} mt-[var(--space-4)] text-[length:var(--text-hero)] leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-white [text-shadow:0_2px_28px_rgba(42,10,59,0.92),0_1px_3px_rgba(0,0,0,0.38)]`}
    >
      {words}
    </h1>
  )
}
