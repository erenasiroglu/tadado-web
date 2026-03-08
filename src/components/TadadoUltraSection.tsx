'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { APP_STORE_URL } from '@/lib/constants'

export function TadadoUltraSection() {
  const t = useTranslations('tadadoUltra')
  const benefits = t.raw('benefits') as string[]

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-violet-500/20 via-indigo-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-indigo-500/15 via-violet-500/10 to-transparent rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #a78bfa 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-zinc-50 text-center mb-12"
        >
          {t('headline')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-indigo-500/20 bg-zinc-900/80 backdrop-blur-sm p-8 md:p-12 shadow-xl shadow-indigo-500/5"
        >
          <div className="text-center mb-8">
            <div className="text-4xl md:text-5xl font-bold text-indigo-400">{t('price')}</div>
            <div className="text-sm text-zinc-500 mt-1">{t('priceNote')}</div>
          </div>

          <ul className="space-y-4 mb-8">
            {benefits.map((benefit, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
                className="flex items-center gap-3 text-zinc-300"
              >
                <svg className="w-5 h-5 flex-shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {benefit}
              </motion.li>
            ))}
          </ul>

          <p className="text-center text-zinc-400 mb-8">{t('text')}</p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="text-center"
          >
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-500 text-white font-semibold transition-all duration-300 hover:bg-indigo-600 hover:scale-[1.02]"
            >
              {t('cta')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
