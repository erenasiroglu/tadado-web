'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { landing, landingOrbs } from '@/lib/landing-ui'

const flowSteps = ['step1', 'step2', 'step3'] as const

export function AIFeatureSection() {
  const t = useTranslations('aiFeature')
  const demoCards = t.raw('demoCards') as string[]

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
          className="mb-6 flex justify-center"
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
          className={landing.lead}
        >
          {t('subheadline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="relative mx-auto mt-14 max-w-2xl pt-10 sm:pt-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.2 }}
            className="pointer-events-none absolute right-2 top-0 z-20 flex max-w-[calc(100vw-2rem)] -translate-y-1/2 flex-col items-end gap-2 animate-float sm:right-4 sm:flex-row sm:items-center sm:gap-3 md:right-5"
          >
            {/* Balon maskot kutusunun dışında: dar parent yüzünden metin kesilmiyor */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="relative order-1 max-w-[min(100%,18rem)] rounded-lg border border-zinc-200 bg-white px-3 py-2 text-left text-xs font-semibold leading-snug text-zinc-900 shadow-md sm:order-none sm:max-w-[14rem] sm:text-sm"
            >
              {t('tadoHint')}
              <span
                className="absolute left-1/2 top-full -mt-px -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-white sm:hidden"
                aria-hidden
              />
              <span
                className="absolute left-full top-1/2 hidden h-0 w-0 -translate-y-1/2 border-y-[6px] border-l-[6px] border-y-transparent border-l-white sm:block"
                aria-hidden
              />
            </motion.div>
            <div className="relative order-2 h-[6.5rem] w-[5.25rem] shrink-0 sm:order-none md:h-28 md:w-28">
              <Image
                src="/tado.png"
                alt="Tado"
                fill
                className="object-contain object-bottom drop-shadow-[0_12px_28px_rgba(99,102,241,0.35)]"
                priority
              />
            </div>
          </motion.div>

          <div className={`${landing.card} px-5 pb-6 pt-12 sm:px-6 sm:pb-8 sm:pt-14 md:px-8`}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mb-6"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-400/90">Tado AI</p>
              <div className="flex rounded-xl border border-indigo-500/25 bg-zinc-950/80 px-4 py-3.5 shadow-inner shadow-black/20 ring-1 ring-indigo-500/10 sm:py-4">
                <span className="mr-2 text-indigo-400/70">›</span>
                <span className="text-left font-mono text-sm text-zinc-400 sm:text-[15px]">{t('promptPlaceholder')}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.75, repeat: Infinity }}
                  className="ml-1 mt-0.5 h-4 w-px bg-indigo-400"
                />
              </div>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
              {demoCards.map((card, i) => (
                <motion.span
                  key={card}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10px' }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                  className="rounded-lg border border-indigo-500/20 bg-indigo-500/[0.06] px-3 py-2 text-sm font-medium text-zinc-200 shadow-sm shadow-indigo-500/5"
                >
                  {card}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="mt-14 grid grid-cols-3 gap-3 sm:gap-8"
        >
          {flowSteps.map((step, i) => (
            <div key={step} className="flex flex-col items-center text-center">
              <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full border border-indigo-500/35 bg-indigo-500/10 text-xs font-semibold text-indigo-300 shadow-[0_0_16px_-4px_rgba(99,102,241,0.5)]">
                {i + 1}
              </span>
              <p className="text-xs font-medium text-zinc-300 sm:text-sm">{t(`flow.${step}`)}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
