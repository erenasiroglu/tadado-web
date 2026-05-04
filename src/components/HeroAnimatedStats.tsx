'use client'

import { useEffect, useRef, useState } from 'react'

/** Binlik hedefler — metinlerle uyumlu (10K+, 250K+, 5K+) */
const TARGETS_K = [10, 250, 5] as const

const DURATION_MS = 1650

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

type Props = {
  labels: readonly [string, string, string]
  finals: readonly [string, string, string]
}

export function HeroAnimatedStats({ labels, finals }: Props) {
  const [thousands, setThousands] = useState<[number, number, number]>(() => [0, 0, 0])
  const [finished, setFinished] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setThousands([...TARGETS_K])
      setFinished(true)
      return
    }

    const start = performance.now()

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION_MS)
      const e = easeOutCubic(p)
      setThousands(TARGETS_K.map((target) => Math.round(e * target)) as [number, number, number])
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setFinished(true)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const statClass =
    'text-[1.05rem] font-black tabular-nums leading-none tracking-tight text-white min-[400px]:text-[1.15rem] sm:text-2xl md:text-3xl lg:text-4xl'

  const labelClass =
    'mt-1 text-[0.62rem] leading-snug text-white/85 sm:mt-1.5 sm:text-xs md:text-sm'

  const cell = (i: 0 | 1 | 2) => (
    <div className="min-w-0">
      <p className={statClass}>{finished ? finals[i] : `${thousands[i]}K+`}</p>
      <p className={labelClass}>{labels[i]}</p>
    </div>
  )

  return (
    <div className="grid grid-cols-3 gap-x-1.5 gap-y-1 text-center sm:flex sm:flex-wrap sm:items-stretch sm:justify-start sm:gap-x-4 sm:gap-y-2 sm:text-left md:gap-x-6">
      {cell(0)}
      <div className="hidden h-12 w-px self-center bg-white/25 sm:block sm:h-14" aria-hidden />
      {cell(1)}
      <div className="hidden h-12 w-px self-center bg-white/25 sm:block sm:h-14" aria-hidden />
      {cell(2)}
    </div>
  )
}
