'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Layers, MessageCircle, Trophy } from 'lucide-react'
import { landing, landingOrbs } from '@/lib/landing-ui'

const steps = [
  { key: 'step1' as const, icon: Layers },
  { key: 'step2' as const, icon: MessageCircle },
  { key: 'step3' as const, icon: Trophy }
] as const

export function HowItWorksSection() {
  const t = useTranslations('howItWorks')

  return (
    <section className={`${landing.section} border-t border-zinc-800/70 overflow-hidden`}>
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
          className={landing.title}
        >
          {t('headline')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className={`${landing.lead} mb-14 sm:mb-16`}
        >
          {t('subheadline')}
        </motion.p>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {steps.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: 0.08 + i * 0.06 }}
            >
              <div className={`${landing.card} ${landing.cardHover} flex h-full flex-col items-center p-6 text-center md:p-8`}>
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/[0.1] text-indigo-300 shadow-[0_0_20px_-6px_rgba(99,102,241,0.45)]">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="mb-2 text-lg font-semibold text-zinc-50">{t(`${key}.title`)}</h3>
                <p className="text-sm leading-relaxed text-zinc-400 md:text-[15px]">{t(`${key}.desc`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
