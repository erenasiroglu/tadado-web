'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Loader2, X } from 'lucide-react'
import { landing, landingOrbs } from '@/lib/landing-ui'

type PreviewCard = { word: string; taboo: string[] }
type ChipItem = { label: string; icon: string; previewKey: string }
type ChipGroup = { title: string; chips: ChipItem[] }
type TryExample = { label: string; icon: string; text: string; previewKey: string }
type HowStep = { title: string; desc: string }

type CardVariant = 'burgundy' | 'amethyst'

const PREVIEW_HINTS: { re: RegExp; key: string }[] = [
  { re: /\bmemes?\b|caps|viral|mizah|komik|internet/i, key: 'memes' },
  { re: /90|doksan|retro|nostalji|nostalgic|sitcom/i, key: 'retro' },
  { re: /office|ofis|kurum|corporate|iş|meeting|monday|mesai|toplantı|terfi|patron|workplace/i, key: 'office' },
  { re: /tv|dizi|reality|show|netflix|episode|replik|kuşak|senaryo|karakter|bölüm/i, key: 'tv' },
  { re: /futbol|football|basket|spor|sport|goal|maç|soccer/i, key: 'sport' },
  { re: /yemek|food|mutfak|lezzet|eat|brunch|umami/i, key: 'food' },
  { re: /absürt|absurd|kaos|chaos|random|rubber|komedi|roast|pun\b|improv|kelime oyunu|wordplay|güldür/i, key: 'absurd' },
  { re: /romant|love|aşk|couple|meet-cute/i, key: 'romance' },
  { re: /korku|horror|scary|ürperti|campfire|jump/i, key: 'horror' }
]

/** Matches in-app card typography: first letter up, rest down (per word). */
function toTitleCaseWord(s: string) {
  if (!s) return s
  return s.charAt(0).toLocaleUpperCase() + s.slice(1).toLocaleLowerCase()
}

function appendThemeWord(current: string, word: string) {
  const w = word.trim()
  if (!w) return current
  const base = current.trim()
  if (!base) return w
  const parts = base.split(/\s*,\s*/).filter(Boolean)
  if (parts.some((p) => p.toLowerCase() === w.toLowerCase())) return base
  return `${base}, ${w}`
}

function inferPreviewKey(text: string) {
  const trimmed = text.trim()
  if (trimmed.length < 2) return null
  for (const { re, key } of PREVIEW_HINTS) {
    if (re.test(trimmed)) return key
  }
  return null
}

function accentSlice(
  headline: string,
  accent: string,
  locale: string
): { before: string; mid: string; after: string } | null {
  if (!accent) return null
  const loc = locale === 'tr' ? 'tr' : 'en'
  const h = headline.toLocaleLowerCase(loc)
  const a = accent.toLocaleLowerCase(loc)
  const idx = h.indexOf(a)
  if (idx === -1) return null
  return {
    before: headline.slice(0, idx),
    mid: headline.slice(idx, idx + accent.length),
    after: headline.slice(idx + accent.length)
  }
}

/** Flat pill stack like `hero_card_1.png` (maroon + magenta) */
function BurgundyGameCard({
  word,
  taboo
}: {
  word: string
  taboo: string[]
}) {
  const locale = useLocale()
  const main = word.toUpperCase()
  const forbiddenLabel = locale === 'tr' ? 'Yasaklı' : 'Forbidden'
  return (
    <div
      className="rounded-[2rem] bg-[#4A0E2E] p-3 sm:p-4"
      role="img"
      aria-label={`${word}. ${forbiddenLabel}: ${taboo.join(', ')}`}
    >
      <div className="mx-auto flex w-full max-w-full flex-col gap-2">
        <div className="rounded-full bg-[#5c1538] px-4 py-3 text-center">
          <span className="text-[0.95rem] font-bold tracking-wide text-[#FFF9E1] sm:text-base">
            {main}
          </span>
        </div>
        {taboo.map((w) => (
          <div
            key={w}
            className="rounded-full bg-[#D82B4E] px-4 py-2.5 text-center"
          >
            <span className="text-sm font-bold text-[#FFF9E1]">
              {toTitleCaseWord(w)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Purple + amber pills like `hero_card_2.png` */
function AmethystGameCard({
  word,
  taboo
}: {
  word: string
  taboo: string[]
}) {
  const locale = useLocale()
  const main = word.toUpperCase()
  const purple = '#4B157D'
  const amber = '#FFB84C'
  const forbiddenLabel = locale === 'tr' ? 'Yasaklı' : 'Forbidden'
  return (
    <div
      className="rounded-[2rem] p-3 sm:p-4"
      style={{ backgroundColor: purple }}
      role="img"
      aria-label={`${word}. ${forbiddenLabel}: ${taboo.join(', ')}`}
    >
      <div className="mx-auto flex w-full max-w-full flex-col gap-2">
        <div
          className="rounded-full px-4 py-3 text-center"
          style={{ backgroundColor: amber }}
        >
          <span
            className="text-base font-bold tracking-wide sm:text-lg"
            style={{ color: purple }}
          >
            {main}
          </span>
        </div>
        {taboo.map((w) => (
          <div
            key={w}
            className="rounded-full px-3 py-2 text-center"
            style={{ backgroundColor: amber }}
          >
            <span className="text-sm font-bold" style={{ color: purple }}>
              {toTitleCaseWord(w)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GameCardPreview({
  variant,
  word,
  taboo
}: {
  variant: CardVariant
  word: string
  taboo: string[]
}) {
  if (variant === 'burgundy') {
    return <BurgundyGameCard word={word} taboo={taboo} />
  }
  return <AmethystGameCard word={word} taboo={taboo} />
}

function HowItWorksModal({
  open,
  onClose,
  title,
  closeLabel,
  steps
}: {
  open: boolean
  onClose: () => void
  title: string
  closeLabel: string
  steps: HowStep[]
}) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-how-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className={`${landing.card} relative max-h-[min(90vh,640px)] w-full max-w-md overflow-y-auto p-6`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
              aria-label={closeLabel}
            >
              <X className="h-5 w-5" />
            </button>
            <h3
              id="ai-how-title"
              className="pr-10 text-lg font-semibold tracking-tight text-zinc-50"
            >
              {title}
            </h3>
            <ol className="mt-6 space-y-5">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-indigo-500/35 bg-indigo-500/15 text-xs font-bold text-indigo-200">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-zinc-100">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function AIFeatureSection() {
  const t = useTranslations('aiFeature')
  const locale = useLocale()
  const reduceMotion = useReducedMotion()

  const chipGroups = t.raw('chipGroups') as ChipGroup[]
  const tryExamples = t.raw('tryExamples') as TryExample[]
  const placeholders = t.raw('placeholders') as string[]
  const howSteps = t.raw('howItWorksSteps') as HowStep[]
  const previewSets = t.raw('previewSets') as Record<string, PreviewCard[]>

  const [prompt, setPrompt] = useState('')
  const [chipTapped, setChipTapped] = useState(false)
  const [previewKey, setPreviewKey] = useState('fallback')
  const [phIndex, setPhIndex] = useState(0)
  const [focused, setFocused] = useState(false)
  const [howOpen, setHowOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const canGenerate = prompt.trim().length > 0 || chipTapped
  const appStoreUrl = t('appStoreUrl')

  const cards = useMemo(() => {
    const set = previewSets[previewKey] ?? previewSets.fallback
    return Array.isArray(set) ? set.slice(0, 3) : []
  }, [previewKey, previewSets])

  const flatChips = useMemo(() => {
    if (!chipGroups?.length) return []
    const seen = new Set<string>()
    const out: ChipItem[] = []
    for (const g of chipGroups) {
      for (const c of g.chips) {
        const k = c.label.toLowerCase()
        if (seen.has(k)) continue
        seen.add(k)
        out.push(c)
      }
    }
    return out
  }, [chipGroups])

  useEffect(() => {
    if (!placeholders?.length) return
    const id = window.setInterval(() => {
      setPhIndex((i) => (i + 1) % placeholders.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [placeholders])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const inferred = inferPreviewKey(prompt)
      if (inferred && previewSets[inferred]) setPreviewKey(inferred)
      else if (!prompt.trim()) setPreviewKey('fallback')
    }, 480)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [prompt, previewSets])

  const onChipClick = useCallback((chip: ChipItem) => {
    setChipTapped(true)
    setPrompt((prev) => appendThemeWord(prev, chip.label))
    if (previewSets[chip.previewKey]) setPreviewKey(chip.previewKey)
  }, [previewSets])

  const onTryExample = useCallback((ex: TryExample) => {
    setChipTapped(true)
    setPrompt(ex.text)
    if (previewSets[ex.previewKey]) setPreviewKey(ex.previewKey)
  }, [previewSets])

  const handleGenerate = useCallback(() => {
    if (!canGenerate || loading) return
    setLoading(true)
    window.setTimeout(() => {
      window.open(appStoreUrl, '_blank', 'noopener,noreferrer')
      setLoading(false)
    }, 1900)
  }, [appStoreUrl, canGenerate, loading])

  const headline = t('headline')
  const accent = t('headlineAccent')
  const accentParts = accentSlice(headline, accent, locale)

  const cardVariant = (i: number): CardVariant =>
    i % 2 === 0 ? 'burgundy' : 'amethyst'

  return (
    <section
      id="deck-studio"
      className={`${landing.section} relative scroll-mt-24 border-t border-zinc-800/70 py-16 md:py-24`}
    >
      <div className="pointer-events-none absolute inset-0 bg-zinc-950">
        <div className={landingOrbs.sectionCenter} />
        <div className={landingOrbs.sectionCorner} />
        <div className={landing.subtleGrid} />
      </div>

      <div className={`${landing.innerWide} relative z-10`}>
        <div className="mx-auto flex min-h-0 flex-col justify-center pb-3 md:pb-4">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              className={landing.badge}
            >
              {t('badge')}
            </motion.span>
     
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.04 }}
            className="text-center text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl md:text-5xl md:leading-[1.1]"
          >
            {accentParts ? (
              <>
                {accentParts.before}
                <span className={landing.titleGradient}>{accentParts.mid}</span>
                {accentParts.after}
              </>
            ) : (
              headline
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            {t('subheadline')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mx-auto mt-8 w-full max-w-2xl"
          >
            <label htmlFor="ai-deck-theme" className="sr-only">
              {t('inputLabel')}
            </label>
            <motion.div
              animate={
                reduceMotion
                  ? {}
                  : focused
                    ? {
                        boxShadow: [
                          '0 0 0 1px rgba(99,102,241,0.45), 0 0 28px -8px rgba(99,102,241,0.35)',
                          '0 0 0 1px rgba(167,139,250,0.4), 0 0 32px -6px rgba(139,92,246,0.3)',
                          '0 0 0 1px rgba(99,102,241,0.45), 0 0 28px -8px rgba(99,102,241,0.35)'
                        ]
                      }
                    : {
                        boxShadow:
                          '0 0 0 1px rgba(99,102,241,0.22), 0 12px 40px -20px rgba(0,0,0,0.55)'
                      }
              }
              transition={
                focused && !reduceMotion
                  ? {
                      type: 'tween',
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
                  : { type: 'tween', duration: 0.25 }
              }
              className="rounded-2xl border border-indigo-500/25 bg-zinc-950/70 p-1 ring-1 ring-inset ring-white/[0.05]"
            >
              <textarea
                id="ai-deck-theme"
                name="theme"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={placeholders[phIndex] ?? ''}
                rows={5}
                className="min-h-[8.5rem] w-full resize-y rounded-xl bg-zinc-950/90 px-4 py-4 font-mono text-base leading-relaxed text-zinc-100 placeholder:text-zinc-500 focus:outline-none sm:min-h-[9.5rem] sm:px-5 sm:py-5 sm:text-[17px]"
              />
            </motion.div>

            <p className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              {t('tryExamplesTitle')}
            </p>
            <div className="relative mt-2">
              <div
                className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain px-4 pb-1 pt-0.5 [scrollbar-width:thin] sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {tryExamples.map((ex) => (
                  <button
                    key={ex.label}
                    type="button"
                    onClick={() => onTryExample(ex)}
                    className="inline-flex shrink-0 snap-center items-center gap-1.5 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.06] px-3.5 py-2.5 text-sm font-medium text-zinc-100 transition hover:border-indigo-400/35 hover:bg-indigo-500/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
                  >
                    <span className="text-base leading-none" aria-hidden>
                      {ex.icon}
                    </span>
                    {ex.label}
                  </button>
                ))}
                {flatChips.map((chip) => (
                  <motion.button
                    key={chip.label}
                    type="button"
                    whileHover={reduceMotion ? {} : { scale: 1.03 }}
                    whileTap={reduceMotion ? {} : { scale: 0.98 }}
                    onClick={() => onChipClick(chip)}
                    className="inline-flex shrink-0 snap-center items-center gap-1.5 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.06] px-3.5 py-2.5 text-sm font-medium text-zinc-100 transition hover:border-indigo-400/35 hover:bg-indigo-500/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
                  >
                    <span className="text-base leading-none" aria-hidden>
                      {chip.icon}
                    </span>
                    {chip.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              {canGenerate ? (
                <motion.button
                  type="button"
                  disabled={loading}
                  onClick={handleGenerate}
                  whileHover={reduceMotion ? {} : { scale: 1.02 }}
                  whileTap={reduceMotion ? {} : { scale: 0.98 }}
                  className="inline-flex min-h-[3rem] min-w-[11rem] items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-[15px] font-semibold text-zinc-950 shadow-lg shadow-indigo-500/20 transition hover:bg-zinc-100 hover:shadow-xl hover:shadow-indigo-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden />
                      {t('loadingCta')}
                    </>
                  ) : (
                    t('generateCta')
                  )}
                </motion.button>
              ) : (
                <span
                  aria-disabled
                  className="inline-flex min-h-[3rem] min-w-[11rem] cursor-not-allowed items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/50 px-8 py-3.5 text-[15px] font-semibold text-zinc-500"
                >
                  {t('generateCta')}
                </span>
              )}
            </div>
          </motion.div>
        </div>

        <div className="mx-auto mt-8 max-w-6xl md:mt-10">
          <p className="text-center text-base font-semibold tracking-tight text-zinc-100 sm:text-lg">
            {t('previewTitle')}
          </p>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm leading-relaxed text-zinc-400 sm:text-base">
            {t('previewHint')}
          </p>
          <div className="relative mt-5">
            <div
              className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-3 pt-1 [scrollbar-width:thin] sm:-mx-6 sm:gap-5 sm:px-6 lg:justify-center lg:gap-6 lg:px-0"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <AnimatePresence mode="popLayout">
                {cards.map((card, i) => (
                  <motion.div
                    key={`${previewKey}-${card.word}-${i}`}
                    layout
                    initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    exit={{ opacity: 0, filter: 'blur(6px)', y: -6 }}
                    transition={{
                      duration: reduceMotion ? 0.12 : 0.35,
                      delay: reduceMotion ? 0 : i * 0.06
                    }}
                    className={`w-[min(76vw,210px)] shrink-0 snap-center sm:w-[200px] lg:w-[228px] lg:snap-normal ${i % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}
                  >
                    <GameCardPreview
                      variant={cardVariant(i)}
                      word={card.word}
                      taboo={card.taboo}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <HowItWorksModal
        open={howOpen}
        onClose={() => setHowOpen(false)}
        title={t('howItWorksTitle')}
        closeLabel={t('howItWorksClose')}
        steps={howSteps}
      />
    </section>
  )
}
