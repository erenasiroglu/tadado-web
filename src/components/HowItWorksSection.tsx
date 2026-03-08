'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const steps = ['step1', 'step2', 'step3'] as const

export function HowItWorksSection() {
  const t = useTranslations('howItWorks')

  return (
    <section className="relative py-24 md:py-32 px-6 bg-zinc-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-zinc-50 text-center mb-16"
        >
          {t('headline')}
        </motion.h2>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex flex-col items-center text-center">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-lg mb-4">
                  {i + 1}
                </span>
                <h3 className="text-xl font-semibold text-zinc-50 mb-2">
                  {t(`${step}.title`)}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {t(`${step}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
