'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { APP_STORE_URLS } from '@/lib/constants'
import { landing, landingOrbs } from '@/lib/landing-ui'

export function TadadoUltraSection() {
  const t = useTranslations('tadadoUltra')
  const locale = useLocale()

  const appStoreUrl = APP_STORE_URLS[locale as keyof typeof APP_STORE_URLS] ?? APP_STORE_URLS.en
  const benefits = t.raw('benefits') as string[]

  return (
    <section className={`${landing.section} border-t border-zinc-800/70 overflow-hidden pb-24 md:pb-32`}>
      <div className="absolute inset-0 bg-zinc-950">
        <div className={landingOrbs.sectionCenter} />
        <div className={landingOrbs.sectionCorner} />
        <div className={landing.subtleGrid} />
      </div>

      <div className={landing.inner}>
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
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className={`${landing.card} mt-12 overflow-hidden`}
        >
          <div className="border-b border-indigo-500/15 bg-indigo-500/[0.06] px-6 py-8 text-center sm:px-8">
            <p className={`text-4xl font-semibold tracking-tight sm:text-5xl ${landing.titleGradient}`}>{t('price')}</p>
            <p className="mt-2 text-sm text-zinc-500">{t('priceNote')}</p>
          </div>

          <ul className="divide-y divide-zinc-800/90">
            {benefits.map((benefit, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-15px' }}
                transition={{ duration: 0.25, delay: 0.05 + i * 0.03 }}
                className="flex gap-3 px-5 py-3.5 sm:px-6 sm:py-4"
              >
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-indigo-500/35 bg-indigo-500/10 shadow-[0_0_12px_-4px_rgba(99,102,241,0.4)]">
                  <svg className="h-2.5 w-2.5 text-indigo-400" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 6l2.5 2.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-left text-[15px] leading-snug text-zinc-300 sm:text-base">{benefit}</span>
              </motion.li>
            ))}
          </ul>

          <div className="border-t border-indigo-500/15 px-5 py-8 sm:px-8">
            <p className="mb-6 text-center text-sm leading-relaxed text-zinc-500 sm:text-[15px]">{t('text')}</p>
            <div className="flex flex-col items-center gap-3">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-xl bg-white px-8 py-3.5 text-[15px] font-semibold text-zinc-950 shadow-lg shadow-indigo-500/25 transition hover:bg-zinc-100 hover:shadow-xl hover:shadow-violet-500/30 sm:w-auto"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                {t('cta')}
              </a>
              <p className="max-w-xs text-center text-xs leading-relaxed text-zinc-600">{t('ctaHint')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
