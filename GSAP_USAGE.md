# GSAP Integration Guide - Tadado Web

## Installed Packages

```bash
npm install gsap @gsap/react
```

## Components Created

### 1. Hero Animations

#### `HeroTitle` - Staggered Word Reveal
Animates headline words with 3D rotation effect.

```tsx
import { HeroTitle } from '@/components/gsap/HeroTitle'

<HeroTitle text="AI Word Guessing Game" />
```

**Features:**
- Word-by-word stagger animation
- 3D rotation from bottom
- Power3 easing for smooth entrance
- Automatic text splitting

#### `HeroButton` - Floating CTA Button
Button with magnetic hover and floating animation.

```tsx
import { HeroButton } from '@/components/gsap/HeroButton'

<HeroButton href="https://apps.apple.com/...">
  Download Now
</HeroButton>
```

**Features:**
- Entry animation with bounce
- Floating effect on hover
- Scale up on hover
- Smooth transitions

### 2. Scroll-Based Animations

#### `ScrollReveal` - Single Element Reveal
Reveals element on scroll into viewport.

```tsx
import { ScrollReveal } from '@/components/gsap/ScrollReveal'

<ScrollReveal direction="up" delay={0} duration={0.8}>
  <h2>Features Section</h2>
  <p>Content here...</p>
</ScrollReveal>
```

**Props:**
- `direction`: `'up' | 'down' | 'left' | 'right'` (default: `'up'`)
- `delay`: number in seconds
- `duration`: animation duration
- `className`: additional CSS classes

**Trigger Points:**
- Start: when element top hits 85% viewport
- End: when element top hits 60% viewport

#### `ScrollRevealStagger` - Multiple Children Reveal
Staggers animation of all children on scroll.

```tsx
import { ScrollRevealStagger } from '@/components/gsap/ScrollRevealStagger'

<ScrollRevealStagger 
  direction="left" 
  staggerAmount={0.15}
  className="grid grid-cols-3 gap-4"
>
  <FeatureCard />
  <FeatureCard />
  <FeatureCard />
</ScrollRevealStagger>
```

**Props:**
- `direction`: `'up' | 'down' | 'left' | 'right'`
- `staggerAmount`: delay between items (default: 0.15s)
- `duration`: animation duration
- `className`: container classes
- `itemClassName`: applied to each child wrapper

### 3. Interactive Cards

#### `GameCard` - 3D Hover Effect
Adds magnetic 3D tilt and hover effects to cards.

```tsx
import { GameCard } from '@/components/gsap/GameCard'

<GameCard className="w-full">
  <div className="card-content">
    <img src="/card.png" alt="Card" />
  </div>
</GameCard>
```

**Features:**
- 3D perspective on hover
- Mouse position-based tilt
- Scale and lift effect
- Enhanced shadow on hover

## Usage Patterns

### Hero Section (Already Integrated)

```tsx
// In Hero.tsx - server component
import { HeroTitle } from '@/components/gsap/HeroTitle'
import { HeroButton } from '@/components/gsap/HeroButton'

export async function Hero() {
  const t = await getTranslations('hero')
  
  return (
    <section>
      <HeroTitle text={t('title')} />
      
      <HeroButton href={appStoreUrl}>
        <AppleIcon />
        {t('appStoreCta')}
      </HeroButton>
    </section>
  )
}
```

### Feature Section with Scroll Reveal

```tsx
import { ScrollRevealStagger } from '@/components/gsap/ScrollRevealStagger'

export function Features() {
  return (
    <section>
      <ScrollRevealStagger 
        direction="up"
        staggerAmount={0.2}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Feature icon="🎯" title="Unlimited Decks" />
        <Feature icon="🤖" title="AI Generated" />
        <Feature icon="⚡" title="Fast & Fun" />
      </ScrollRevealStagger>
    </section>
  )
}
```

### Card Gallery with Hover Effects

```tsx
import { GameCard } from '@/components/gsap/GameCard'
import { ScrollRevealStagger } from '@/components/gsap/ScrollRevealStagger'

export function CardGallery() {
  return (
    <ScrollRevealStagger 
      direction="up"
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {cards.map(card => (
        <GameCard key={card.id} className="w-full">
          <img src={card.image} alt={card.title} />
        </GameCard>
      ))}
    </ScrollRevealStagger>
  )
}
```

## Best Practices (Based on GSAP Skills)

### ✅ DO

1. **Use `useGSAP` hook** instead of `useEffect` for React components
2. **Always pass `scope`** to limit selectors to component
3. **Register plugins** before use: `gsap.registerPlugin(useGSAP, ScrollTrigger)`
4. **Use transform properties** (`x`, `y`, `scale`, `rotation`) instead of CSS top/left
5. **Respect reduced motion**:
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const duration = prefersReducedMotion ? 0 : 0.8
```

6. **Call `ScrollTrigger.refresh()`** after layout changes (images load, etc.)

### ❌ DON'T

1. **Don't animate without scope** - always use `{ scope: ref }` in useGSAP
2. **Don't forget cleanup** - useGSAP handles this automatically
3. **Don't use GSAP for simple hovers** - CSS transitions are better for basic states
4. **Don't animate layout properties** (`width`, `height`, `top`, `left`) when transforms work
5. **Don't put ScrollTrigger on child tweens** - only on top-level tweens or timelines
6. **Don't run GSAP during SSR** - use client components (`'use client'`)

## Where We're Using GSAP

### Hero Section ✅
- Headline word-by-word reveal
- CTA button floating + hover
- Strategic impact on first screen

### Scroll Reveals (Available)
- Feature cards cascade
- Section reveals
- Testimonial animations

### Game Cards (Available)
- 3D hover tilt effect
- Magnetic interaction
- Enhanced shadows

## Where We're NOT Using GSAP

Following best practices, we keep these simple with CSS/Tailwind:

- Navbar transitions
- Dropdown menus
- Modal animations
- Basic button hovers
- Loading states
- Toggle switches

## Performance Tips

From the GSAP performance skill:

1. **Prefer transforms**: `x`, `y`, `scale`, `rotation` are GPU-accelerated
2. **Use `will-change`** sparingly and only during animation
3. **Batch DOM reads/writes**: GSAP handles this internally
4. **Use `autoAlpha`** instead of `opacity` for fade effects
5. **Avoid animating layout properties** that trigger reflow

## Easing Reference

Common eases to use:

```tsx
// Smooth, natural
ease: "power2.out"

// Playful, bouncy
ease: "back.out(1.7)"

// Energetic
ease: "power3.inOut"

// Gentle
ease: "power1.out"

// Linear (for scroll-scrub)
ease: "none"
```

## Debugging

Enable markers during development:

```tsx
scrollTrigger: {
  trigger: element,
  start: "top 80%",
  end: "top 50%",
  markers: true  // Remove in production!
}
```

## Next Steps

1. Add scroll reveals to feature sections
2. Apply GameCard to card galleries
3. Consider timeline for multi-step sequences
4. Add `gsap.matchMedia()` for reduced motion support

## Resources

- [GSAP Docs](https://gsap.com/docs/v3/)
- [ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [useGSAP Hook](https://gsap.com/resources/React/)
