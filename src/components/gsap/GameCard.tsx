'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

interface GameCardProps {
  children: ReactNode
  className?: string
}

export function GameCard({ children, className = '' }: GameCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.set(cardRef.current, {
        transformStyle: 'preserve-3d',
        transformPerspective: 1000
      })
    },
    { scope: cardRef }
  )

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.03,
      y: -8,
      rotationY: 2,
      rotationX: -2,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.65)',
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    gsap.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      boxShadow: '0 22px 44px -12px rgba(0, 0, 0, 0.55)',
      duration: 0.5,
      ease: 'power2.out'
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </div>
  )
}
