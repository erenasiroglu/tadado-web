/**
 * Tadado design tokens — semantic Tailwind class compositions.
 *
 * Source of truth for the underlying values is `src/app/globals.css`
 * (CSS custom properties under `:root`). These exports stitch the tokens
 * into ready-to-use class strings so every component shares one math.
 */

/** Typography — fluid type scale × leading × tracking × weight. */
export const text = {
  hero:
    'text-[length:var(--text-hero)] leading-[var(--leading-display)] tracking-[var(--tracking-display)] font-[var(--weight-display)]',
  display:
    'text-[length:var(--text-display)] leading-[var(--leading-display)] tracking-[var(--tracking-display)] font-[var(--weight-display)]',
  h1:
    'text-[length:var(--text-4xl)] leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] font-[var(--weight-bold)]',
  h2:
    'text-[length:var(--text-3xl)] leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] font-[var(--weight-bold)]',
  h3:
    'text-[length:var(--text-2xl)] leading-[var(--leading-heading)] tracking-[var(--tracking-heading)] font-[var(--weight-emphasis)]',
  lead:
    'text-[length:var(--text-lg)] leading-[var(--leading-snug)] font-[var(--weight-body)]',
  body:
    'text-[length:var(--text-base)] leading-[var(--leading-body)] font-[var(--weight-body)]',
  bodyMd:
    'text-[length:var(--text-md)] leading-[var(--leading-body)] font-[var(--weight-body)]',
  caption:
    'text-[length:var(--text-sm)] leading-[var(--leading-snug)] font-[var(--weight-medium)]',
  micro:
    'text-[length:var(--text-xs)] leading-[var(--leading-snug)] font-[var(--weight-medium)]',
  overline:
    'text-[length:var(--text-2xs)] leading-[var(--leading-snug)] uppercase tracking-[var(--tracking-caps)] font-[var(--weight-emphasis)]'
} as const

/** Spacing rhythm — vertical margin/padding utilities anchored to the scale. */
export const space = {
  textToText: 'mt-[var(--space-3)]',
  blockToBlock: 'mt-[var(--space-5)]',
  blockGroup: 'mt-[var(--space-6)]',
  subSection: 'mt-[var(--space-7)]',
  sectionY: 'py-[var(--space-section)]',
  sectionGap: 'mt-[var(--space-section-gap)]',
  containerX:
    'px-[max(var(--space-container),env(safe-area-inset-left,0px))] [&]:pr-[max(var(--space-container),env(safe-area-inset-right,0px))]'
} as const

/** Gap utilities for flex/grid layouts. */
export const gap = {
  tight: 'gap-[var(--space-2)]',
  cozy: 'gap-[var(--space-3)]',
  default: 'gap-[var(--space-4)]',
  loose: 'gap-[var(--space-5)]',
  spread: 'gap-[var(--space-6)]'
} as const

/** Surface tokens — radius + elevation. */
export const surface = {
  pill: 'rounded-[var(--radius-pill)]',
  sm: 'rounded-[var(--radius-sm)]',
  md: 'rounded-[var(--radius-md)]',
  lg: 'rounded-[var(--radius-lg)]',
  xl: 'rounded-[var(--radius-xl)]',
  shadowSoft: 'shadow-[var(--shadow-soft)]',
  shadowCard: 'shadow-[var(--shadow-card)]',
  shadowElevate: 'shadow-[var(--shadow-elevate)]',
  shadowGlow: 'shadow-[var(--shadow-glow)]'
} as const
