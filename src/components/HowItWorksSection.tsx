'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { useTranslations } from 'next-intl'
import {
  motion,
  useInView,
  useReducedMotion
} from 'framer-motion'
import { landing, landingOrbs } from '@/lib/landing-ui'

type Step1Copy = { title: string; desc: string; tag: string }
type Step2Copy = { title: string; desc: string; sampleWord: string; forbidden: string[] }
type Step3Copy = { title: string; desc: string; pointsLabel: string }

/** Title case per word for forbidden row (matches in-app card). */
function toTitleCaseWord(s: string) {
  if (!s) return s
  return s.charAt(0).toLocaleUpperCase() + s.slice(1).toLocaleLowerCase()
}

function StepDeckVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="relative mx-auto flex h-[7.5rem] w-full max-w-[11rem] items-center justify-center" aria-hidden>
      <motion.div
        className="absolute h-[4.5rem] w-[3.25rem] rounded-xl bg-[#4A0E2E] shadow-lg"
        style={{ rotate: -14, x: -8 }}
        animate={
          reduceMotion
            ? {}
            : { y: [0, -4, 0], rotate: [-14, -10, -14] }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          type: 'tween'
        }}
      />
      <motion.div
        className="relative z-[1] flex h-[4.75rem] w-[3.4rem] items-center justify-center rounded-xl border border-[#FFB84C]/40 bg-[#4B157D] shadow-[0_12px_36px_-8px_rgba(99,102,241,0.45)]"
        whileHover={reduceMotion ? {} : { rotateY: 18, scale: 1.06 }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          rotateY: { type: 'spring', stiffness: 280, damping: 18 },
          scale: { type: 'spring', stiffness: 280, damping: 18 }
        }}
        style={{ transformStyle: 'preserve-3d' }}
        animate={
          reduceMotion
            ? {}
            : { y: [0, 3, 0], rotate: [6, 10, 6] }
        }
      >
        <span className="text-[10px] font-bold tracking-wider text-[#FFB84C]">TABU</span>
      </motion.div>
    </div>
  )
}

function StepTabooVisual({
  reduceMotion,
  word,
  forbidden
}: {
  reduceMotion: boolean
  word: string
  forbidden: string[]
}) {
  const purple = '#4C1D7D'
  const amber = '#FBB941'
  const mainWord = word.toUpperCase()

  return (
    <div
      className="mx-auto w-full max-w-[15rem] rounded-[2.25rem] p-4 shadow-[0_16px_40px_-12px_rgba(76,29,125,0.55)]"
      style={{ backgroundColor: purple }}
      aria-hidden
    >
      <div className="flex flex-col gap-3">
        <div
          className="flex w-full items-center justify-center rounded-full py-3"
          style={{ backgroundColor: amber }}
        >
          <span
            className="text-[0.8rem] font-bold uppercase tracking-wide sm:text-[0.85rem]"
            style={{ color: purple }}
          >
            {mainWord}
          </span>
        </div>
        {forbidden.map((w, i) => (
          <motion.div
            key={w}
            className="flex w-full items-center justify-center rounded-full py-2.5"
            style={{ backgroundColor: amber }}
            animate={
              reduceMotion
                ? {}
                : { opacity: [0.88, 1, 0.88] }
            }
            transition={{
              type: 'tween',
              duration: 2.4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut'
            }}
          >
            <span
              className="text-[0.7rem] font-bold sm:text-[0.75rem]"
              style={{ color: purple }}
            >
              {toTitleCaseWord(w)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function StepScoreVisual({
  reduceMotion,
  pointsLabel
}: {
  reduceMotion: boolean
  pointsLabel: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-24px' })
  const [score, setScore] = useState(0)
  const displayScore = reduceMotion ? 24 : score

  useEffect(() => {
    if (reduceMotion || !inView) return
    let v = 0
    const id = window.setInterval(() => {
      v = Math.min(24, v + 3)
      setScore(v)
      if (v >= 24) window.clearInterval(id)
    }, 70)
    return () => window.clearInterval(id)
  }, [inView, reduceMotion])

  return (
    <div
      ref={ref}
      className="mx-auto flex h-[7.5rem] w-full max-w-[11rem] flex-col items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.08] shadow-[0_0_32px_-10px_rgba(52,211,153,0.35)]"
      aria-hidden
    >
      <motion.span
        className="text-4xl font-bold tabular-nums text-emerald-300"
        animate={reduceMotion ? {} : { scale: [1, 1.08, 1] }}
        transition={{
          type: 'tween',
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 1.2,
          ease: 'easeInOut'
        }}
      >
        +{displayScore}
      </motion.span>
      <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-emerald-400/80">
        {pointsLabel}
      </span>
    </div>
  )
}

const stepKeys = ['step1', 'step2', 'step3'] as const

export function HowItWorksSection() {
  const t = useTranslations('howItWorks')
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [progressPhase, setProgressPhase] = useState(0)
  const progressActive = reduceMotion ? 3 : progressPhase

  const s1 = t.raw('step1') as Step1Copy
  const s2 = t.raw('step2') as Step2Copy
  const s3 = t.raw('step3') as Step3Copy

  const stepCopy: Record<(typeof stepKeys)[number], Step1Copy | Step2Copy | Step3Copy> = {
    step1: s1,
    step2: s2,
    step3: s3
  }

  useEffect(() => {
    if (!sectionInView || reduceMotion) return
    const a = window.setTimeout(() => setProgressPhase(1), 400)
    const b = window.setTimeout(() => setProgressPhase(2), 900)
    const c = window.setTimeout(() => setProgressPhase(3), 1350)
    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
      window.clearTimeout(c)
    }
  }, [sectionInView, reduceMotion])

  const renderVisual = useCallback(
    (key: (typeof stepKeys)[number]) => {
      if (key === 'step1') {
        return <StepDeckVisual reduceMotion={!!reduceMotion} />
      }
      if (key === 'step2') {
        return (
          <StepTabooVisual
            reduceMotion={!!reduceMotion}
            word={s2.sampleWord}
            forbidden={Array.isArray(s2.forbidden) ? s2.forbidden : []}
          />
        )
      }
      return (
        <StepScoreVisual
          reduceMotion={!!reduceMotion}
          pointsLabel={s3.pointsLabel}
        />
      )
    },
    [reduceMotion, s2.forbidden, s2.sampleWord, s3.pointsLabel]
  )

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.14, delayChildren: 0.06 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 380, damping: 26 }
    }
  }

  return (
    <section
      ref={sectionRef}
      className={`${landing.section} relative overflow-hidden border-t border-zinc-800/70`}
    >
      <div className="pointer-events-none absolute inset-0 bg-zinc-950">
        <div className={landingOrbs.sectionCenter} />
        <div className={landingOrbs.sectionCorner} />
        <div className={landing.subtleGrid} />
        <div
          className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_center,rgba(167,139,250,0.4)_0.5px,transparent_0.5px)] [background-size:32px_32px]"
          aria-hidden
        />
      </div>

      <div className={`${landing.innerWide} relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="mb-5 flex flex-col items-center gap-3"
        >
          <span
            className={`${landing.badge} border-indigo-400/35 shadow-[0_0_36px_-6px_rgba(129,140,248,0.55)]`}
          >
            {t('badge')}
          </span>
          <div className="flex gap-2" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-8 rounded-full transition-all duration-500 ${
                  progressActive > i
                    ? 'bg-gradient-to-r from-indigo-400 to-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.5)]'
                    : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.04 }}
          className="text-center text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl md:text-[2.35rem] md:leading-tight"
        >
          {t('headline')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className={`${landing.lead} mb-10 mt-3 sm:mb-12`}
        >
          {t('subheadline')}
        </motion.p>

        <motion.div
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 pl-4 pr-4 pt-1 [scrollbar-width:thin] md:mx-0 md:grid md:snap-none md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:pt-0"
          style={{ WebkitOverflowScrolling: 'touch' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {stepKeys.map((key, i) => {
            const copy = stepCopy[key]
            const isCenter = i === 1
            return (
              <motion.article
                key={key}
                variants={cardVariants}
                whileHover={
                  reduceMotion
                    ? {}
                    : {
                        scale: isCenter ? 1.04 : 1.035,
                        boxShadow:
                          '0 0 48px -12px rgba(129, 140, 248, 0.45), 0 24px 48px -24px rgba(0,0,0,0.5)'
                      }
                }
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className={`relative flex min-w-[min(88vw,340px)] shrink-0 snap-center flex-col rounded-2xl border border-indigo-500/20 bg-zinc-900/50 p-6 shadow-[0_16px_48px_-28px_rgba(0,0,0,0.55)] ring-1 ring-inset ring-white/[0.04] backdrop-blur-sm md:min-w-0 ${
                  isCenter
                    ? 'md:scale-[1.06] md:shadow-[0_20px_56px_-20px_rgba(99,102,241,0.35)]'
                    : ''
                }`}
              >
                <span
                  className="mb-4 bg-gradient-to-br from-indigo-200 via-violet-300 to-fuchsia-400 bg-clip-text text-5xl font-bold leading-none tabular-nums text-transparent sm:text-6xl"
                  aria-hidden
                >
                  {i + 1}
                </span>

                <div className="mb-5 flex min-h-[7.5rem] items-center justify-center">
                  {renderVisual(key)}
                </div>

                {key === 'step1' && (
                  <p className="mb-3 flex items-center justify-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-300/90">
                    <span aria-hidden>✨</span>
                    {s1.tag}
                  </p>
                )}

                <h3 className="mb-2 text-center text-lg font-semibold text-zinc-50 md:text-xl">
                  {copy.title}
                </h3>
                <p className="text-center text-sm leading-relaxed text-zinc-400 md:text-[15px]">
                  {copy.desc}
                </p>
              </motion.article>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-10 flex justify-center sm:mt-12"
        >
          <a
            href="#deck-studio"
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/35 bg-indigo-500/[0.12] px-6 py-3 text-sm font-semibold text-indigo-100 shadow-[0_0_28px_-8px_rgba(99,102,241,0.4)] transition hover:border-indigo-400/50 hover:bg-indigo-500/[0.18] hover:shadow-[0_0_36px_-6px_rgba(139,92,246,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            {t('cta')}
            <span aria-hidden className="text-indigo-300">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
