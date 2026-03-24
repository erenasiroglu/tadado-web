'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { APP_STORE_URLS } from '@/lib/constants'
import { landing, landingOrbs } from '@/lib/landing-ui'

export function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  const appStoreUrl = APP_STORE_URLS[locale as keyof typeof APP_STORE_URLS] ?? APP_STORE_URLS.en

  return (
    <section className={`${landing.section} flex min-h-screen items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 bg-zinc-950">
        <div className={landingOrbs.heroPrimary} />
        <div className={landingOrbs.heroSecondary} />
        <div className={landing.subtleGrid} />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute left-[10%] top-24 h-28 w-20 rotate-[-12deg] animate-float opacity-30 md:h-36 md:w-28 md:opacity-50 lg:h-40 lg:w-32"
        >
          <div className="relative h-full w-full">
            <Image src="/hero_card_1.png" alt="" fill className="object-contain drop-shadow-xl" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute right-[12%] top-32 h-24 w-16 rotate-[8deg] animate-float delay-200 opacity-30 md:h-32 md:w-24 md:opacity-50 lg:h-36 lg:w-28"
        >
          <div className="relative h-full w-full">
            <Image src="/hero_card_2.png" alt="" fill className="object-contain drop-shadow-xl" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-32 left-[15%] hidden h-28 w-20 rotate-[15deg] animate-float delay-300 opacity-30 md:block md:h-32 md:w-24 md:opacity-50 lg:h-36 lg:w-28"
        >
          <div className="relative h-full w-full">
            <Image src="/hero_card_3.png" alt="" fill className="object-contain drop-shadow-xl" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-40 right-[8%] hidden h-32 w-24 rotate-[-8deg] animate-float delay-100 opacity-30 md:block md:h-36 md:w-28 md:opacity-50 lg:h-40 lg:w-32"
        >
          <div className="relative h-full w-full">
            <Image src="/hero_card_4.png" alt="" fill className="object-contain drop-shadow-xl" />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className={landing.badge}>{t('badge')}</span>
          <span className="text-sm text-zinc-500">{t('badgePrice')}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-8 text-5xl font-semibold tracking-tight text-zinc-50 md:text-7xl lg:text-8xl"
        >
          <span className="block">{t('title')}</span>
          <span className={`mt-1 block ${landing.titleGradient}`}>{t('titleHighlight')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="mt-10"
        >
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-3.5 text-[15px] font-semibold text-zinc-950 shadow-lg shadow-indigo-500/25 transition hover:bg-zinc-100 hover:shadow-xl hover:shadow-indigo-500/35"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            {t('cta')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
