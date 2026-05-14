/**
 * GSAP Integration Examples for Tadado Web
 * 
 * This file contains practical examples of how to use GSAP components
 * Copy and adapt these patterns to your sections.
 */

// ============================================
// Example 1: Features Section with Scroll Reveal
// ============================================

import { ScrollRevealStagger } from '@/components/gsap'

export function FeaturesSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        
        <ScrollRevealStagger 
          direction="up"
          staggerAmount={0.2}
          duration={0.8}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <FeatureCard 
            icon="🎯"
            title="Unlimited Decks"
            description="Create infinite custom decks"
          />
          <FeatureCard 
            icon="🤖"
            title="AI Powered"
            description="Smart card generation"
          />
          <FeatureCard 
            icon="⚡"
            title="Fast & Fun"
            description="Instant gameplay"
          />
        </ScrollRevealStagger>
      </div>
    </section>
  )
}

// ============================================
// Example 2: Card Gallery with 3D Hover
// ============================================

import { GameCard, ScrollRevealStagger } from '@/components/gsap'

export function CardGallery() {
  const cards = [
    { id: 1, image: '/card1.png', title: 'Paris' },
    { id: 2, image: '/card2.png', title: 'Basketball' },
    { id: 3, image: '/card3.png', title: 'Cinema' },
    { id: 4, image: '/card4.png', title: 'Music' },
  ]

  return (
    <section className="py-24 bg-zinc-900">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Beautiful Cards
        </h2>
        
        <ScrollRevealStagger
          direction="up"
          staggerAmount={0.15}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {cards.map(card => (
            <GameCard key={card.id} className="aspect-[3/4]">
              <div className="relative w-full h-full overflow-hidden rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </GameCard>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  )
}
```

---

## Example 3: Testimonials with Side Reveal {#example-3}

```tsx
import { ScrollReveal, ScrollRevealStagger } from '@/components/gsap'

export function Testimonials() {
  const testimonials = [
    { id: 1, text: "Best game ever!", author: "John" },
    { id: 2, text: "So much fun!", author: "Sarah" },
    { id: 3, text: "Love the AI decks", author: "Mike" },
  ]

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            What Players Say
          </h2>
          <p className="text-lg text-white/70">
            Join thousands of happy players
          </p>
        </ScrollReveal>

        <ScrollRevealStagger
          direction="left"
          staggerAmount={0.2}
          className="space-y-6 max-w-2xl mx-auto"
        >
          {testimonials.map(testimonial => (
            <div 
              key={testimonial.id}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <p className="text-lg mb-2">{testimonial.text}</p>
              <p className="text-sm text-white/60">— {testimonial.author}</p>
            </div>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  )
}
```

---

## Example 4: Stats Section with Cascade {#example-4}

```tsx
import { ScrollRevealStagger } from '@/components/gsap'

export function StatsSection() {
  const stats = [
    { label: 'Active Players', value: '50K+' },
    { label: 'Games Played', value: '1M+' },
    { label: 'Custom Decks', value: '100K+' },
    { label: 'AI Generations', value: '5M+' },
  ]

  return (
    <section className="py-24 bg-zinc-900">
      <div className="container mx-auto">
        <ScrollRevealStagger
          direction="up"
          staggerAmount={0.15}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  )
}
```

---

## Example 5: Hero CTA with Custom Animation {#example-5}

```tsx
import { HeroButton } from '@/components/gsap'

export function CTASection() {
  return (
    <section className="py-32 text-center">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold mb-6">
          Ready to Play?
        </h2>
        <p className="text-xl text-white/70 mb-12">
          Download now and start your first game
        </p>
        
        <div className="flex justify-center gap-4">
          <HeroButton href="https://apps.apple.com/...">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </HeroButton>
        </div>
      </div>
    </section>
  )
}

// ============================================
// Example 6: Mixed Direction Reveals
// ============================================

export function AboutSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <img 
              src="/screenshot.png" 
              alt="App screenshot"
              className="rounded-2xl shadow-2xl"
            />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <h2 className="text-4xl font-bold mb-6">
              Play with Friends
            </h2>
            <p className="text-lg text-white/70 mb-6">
              Create custom decks, challenge your friends, and enjoy 
              unlimited fun with AI-generated cards.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Unlimited custom decks</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>AI-powered generation</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Multiplayer support</span>
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// ============================================
// Example 7: Accessibility - Respecting prefers-reduced-motion
// ============================================

'use client'

import { useEffect, useState } from 'react'
import { ScrollReveal } from '@/components/gsap'

export function AccessibleSection() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = () => setReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // If user prefers reduced motion, use instant duration
  const duration = reducedMotion ? 0 : 0.8

  return (
    <ScrollReveal direction="up" duration={duration}>
      <div className="p-8 rounded-2xl bg-white/5">
        <h3 className="text-2xl font-bold mb-4">Accessible Design</h3>
        <p>This respects user motion preferences</p>
      </div>
    </ScrollReveal>
  )
}

// ============================================
// Usage Tips
// ============================================

/**
 * PERFORMANCE TIPS:
 * 
 * 1. Use transforms (x, y, scale, rotation) instead of layout properties
 * 2. Limit stagger children to reasonable numbers (< 50 items)
 * 3. Don't animate on scroll if element is always visible
 * 4. Use once: true for one-time animations
 * 
 * BEST PRACTICES:
 * 
 * 1. Hero section: HeroTitle + HeroButton
 * 2. Feature grids: ScrollRevealStagger with direction="up"
 * 3. Testimonials: ScrollRevealStagger with direction="left/right"
 * 4. Cards: GameCard for interactive hover effects
 * 5. Mixed layouts: ScrollReveal with different directions
 * 
 * WHERE NOT TO USE GSAP:
 * 
 * - Navigation menus → CSS transitions
 * - Dropdowns → CSS transitions  
 * - Modals → Tailwind animate classes
 * - Loading states → CSS animations
 * - Simple hovers → CSS :hover
 */
