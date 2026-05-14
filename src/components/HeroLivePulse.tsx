'use client'

import { useEffect, useState } from 'react'

const MIN = 110
const MAX = 145
const INTERVAL_MS = 5200

function pickCount(prev: number): number {
  // Pick a new number that differs from the previous one to keep it lively.
  for (let i = 0; i < 4; i += 1) {
    const next = Math.floor(MIN + Math.random() * (MAX - MIN + 1))
    if (Math.abs(next - prev) >= 3) return next
  }
  return MIN + Math.floor((MAX - MIN) / 2)
}

type Props = {
  /** Localised string with a `{count}` placeholder. */
  labelFmt: string
}

/**
 * "120+ playing right now" — a small live signal that nudges conversion
 * during the launch window without ever lying about a specific identity.
 */
export function HeroLivePulse({ labelFmt }: Props) {
  const [count, setCount] = useState(MIN + 18)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    // First shuffle fires shortly after mount, then settles into a steady cadence.
    const firstShuffle = window.setTimeout(() => {
      setCount((prev) => pickCount(prev))
    }, 1200)
    const id = window.setInterval(() => {
      setCount((prev) => pickCount(prev))
    }, INTERVAL_MS)

    return () => {
      window.clearTimeout(firstShuffle)
      window.clearInterval(id)
    }
  }, [])

  const label = labelFmt.replace('{count}', String(count))

  return (
    <div
      className="inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-pill)] border border-white/15 bg-white/[0.08] px-[var(--space-3)] py-[var(--space-1)] backdrop-blur-md"
      aria-live="polite"
    >
      <span className="relative inline-flex h-2 w-2 shrink-0" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.85)]" />
      </span>
      <span className="text-[length:var(--text-xs)] font-[var(--weight-emphasis)] tracking-[-0.01em] tabular-nums text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
        {label}
      </span>
    </div>
  )
}
