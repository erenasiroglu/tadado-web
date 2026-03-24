'use client'

import { useCallback, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { landing, landingOrbs } from '@/lib/landing-ui'

function appendThemeWord(current: string, word: string) {
  const w = word.trim()
  if (!w) return current
  const base = current.trim()
  if (!base) return w
  const parts = base.split(/\s*,\s*/).filter(Boolean)
  if (parts.some((p) => p.toLowerCase() === w.toLowerCase())) return base
  return `${base}, ${w}`
}

export function AIFeatureSection() {
  const t = useTranslations('aiFeature')
  const demoCards = t.raw('demoCards') as string[]
  const [prompt, setPrompt] = useState('')
  const [chipTapped, setChipTapped] = useState(false)

  const canGenerate = prompt.trim().length > 0 || chipTapped
  const appStoreUrl = t('appStoreUrl')

  const onChipClick = useCallback((word: string) => {
    setChipTapped(true)
    setPrompt((prev) => appendThemeWord(prev, word))
  }, [])

  return (
    <section className={`${landing.section} border-t border-zinc-800/70 overflow-x-clip overflow-y-visible`}>
      <div className="absolute inset-0 bg-zinc-950">
        <div className={landingOrbs.sectionCenter} />
        <div className={landingOrbs.sectionCorner} />
        <div className={landing.subtleGrid} />
      </div>

      <div className={landing.innerWide}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="mb-3 flex justify-center"
        >
          <span className={landing.badge}>{t('badge')}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.04 }}
          className={`${landing.title} drop-shadow-[0_0_28px_rgba(99,102,241,0.12)]`}
        >
          {t('headline')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className={`${landing.lead} mt-2`}
        >
          {t('subheadline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="relative mx-auto mt-8 max-w-2xl"
        >
          <div className={`${landing.card} px-5 pb-6 pt-6 sm:px-6 sm:pb-8 sm:pt-7 md:px-8`}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-5"
            >
              <label htmlFor="ai-deck-theme" className="sr-only">
                {t('inputLabel')}
              </label>
              <textarea
                id="ai-deck-theme"
                name="theme"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t('promptPlaceholder')}
                rows={3}
                className="min-h-[5.5rem] w-full resize-y rounded-xl border border-indigo-500/25 bg-zinc-950/80 px-4 py-3.5 font-mono text-sm text-zinc-100 shadow-inner shadow-black/20 ring-1 ring-indigo-500/10 placeholder:text-zinc-500 focus:border-indigo-400/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 sm:min-h-[6rem] sm:text-[15px]"
              />
            </motion.div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
              {demoCards.map((card, i) => (
                <motion.button
                  key={card}
                  type="button"
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10px' }}
                  transition={{ duration: 0.3, delay: 0.12 + i * 0.04 }}
                  onClick={() => onChipClick(card)}
                  className="rounded-lg border border-indigo-500/20 bg-indigo-500/[0.06] px-3 py-2 text-sm font-medium text-zinc-200 shadow-sm shadow-indigo-500/5 transition-colors hover:border-indigo-400/35 hover:bg-indigo-500/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
                >
                  {card}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            {canGenerate ? (
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                {t('generateCta')}
              </a>
            ) : (
              <span
                aria-disabled
                className="inline-flex cursor-not-allowed items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/60 px-6 py-3 text-sm font-semibold text-zinc-500"
              >
                {t('generateCta')}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
