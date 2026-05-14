'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

interface HeroButtonProps {
  href: string
  children: React.ReactNode
}

export function HeroButton({ href, children }: HeroButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const floatTweenRef = useRef<gsap.core.Tween | null>(null)

  useGSAP(
    () => {
      floatTweenRef.current = gsap.to(buttonRef.current, {
        y: -4,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        paused: true
      })

      gsap.from(buttonRef.current, {
        opacity: 0,
        scale: 0.92,
        duration: 0.6,
        delay: 0.8,
        ease: 'back.out(1.7)'
      })
    },
    { scope: buttonRef }
  )

  const handleMouseEnter = () => {
    if (floatTweenRef.current) {
      floatTweenRef.current.play()
    }
    gsap.to(buttonRef.current, {
      scale: 1.03,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    if (floatTweenRef.current) {
      floatTweenRef.current.pause()
    }
    gsap.to(buttonRef.current, {
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  return (
    <a
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-flex min-h-[2.75rem] w-full max-w-sm touch-manipulation items-center justify-center gap-[var(--space-2)] rounded-[var(--radius-pill)] bg-white px-[var(--space-6)] text-[length:var(--text-sm)] font-[var(--weight-emphasis)] text-zinc-950 shadow-[0_14px_30px_-16px_rgba(0,0,0,0.55)] transition-colors hover:bg-zinc-100 sm:min-h-[2.85rem] sm:w-auto sm:max-w-none"
    >
      {children}
    </a>
  )
}
