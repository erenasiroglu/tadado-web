'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { APP_STORE_URL } from '@/lib/constants'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-violet-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/5 via-violet-500/5 to-transparent rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #a78bfa 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-24 left-[10%] w-20 h-28 md:w-28 md:h-36 lg:w-32 lg:h-40 xl:w-36 xl:h-44 rotate-[-12deg] animate-float opacity-30 md:opacity-60"
        >
          <Image src="/hero_card_1.png" alt="" fill className="object-contain drop-shadow-xl" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-32 right-[12%] w-16 h-24 md:w-24 md:h-32 lg:w-28 lg:h-36 xl:w-32 xl:h-40 rotate-[8deg] animate-float delay-200 opacity-30 md:opacity-60"
        >
          <Image src="/hero_card_2.png" alt="" fill className="object-contain drop-shadow-xl" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="hidden md:block absolute bottom-32 left-[15%] w-16 h-24 md:w-20 md:h-28 lg:w-24 lg:h-32 xl:w-28 xl:h-36 rotate-[15deg] animate-float delay-300 opacity-30 md:opacity-60"
        >
          <Image src="/hero_card_3.png" alt="" fill className="object-contain drop-shadow-xl" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="hidden md:block absolute bottom-40 right-[8%] w-20 h-28 md:w-24 md:h-32 lg:w-28 lg:h-36 xl:w-32 xl:h-40 rotate-[-8deg] animate-float delay-100 opacity-30 md:opacity-60"
        >
          <Image src="/hero_card_4.png" alt="" fill className="object-contain drop-shadow-xl" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-sm font-medium text-indigo-300 backdrop-blur-sm">
            {t('badge')}
          </span>
          <span className="text-xs text-zinc-500">{t('badgePrice')}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
        >
          <span className="text-zinc-50">{t('title')}</span>
          <br />
          <span className="text-indigo-400">{t('titleHighlight')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 space-y-4"
        >
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-zinc-900 font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-white/10"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            {t('cta')}
          </a>

          <p className="text-sm text-zinc-500 max-w-md mx-auto">
            {t('launchNote')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
