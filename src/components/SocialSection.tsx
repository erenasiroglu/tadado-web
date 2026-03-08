'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function SocialSection() {
  const t = useTranslations('social')
  const useCases = t.raw('useCases') as string[]

  return (
    <section className="relative py-24 md:py-32 px-6 bg-zinc-900/50">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-zinc-50 text-center mb-10"
        >
          {t('headline')}
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {useCases.map((useCase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800/30 px-5 py-4"
            >
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-indigo-400" />
              <span className="text-zinc-300">{useCase}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-lg text-zinc-400 text-center"
        >
          {t('p1')}
        </motion.p>
      </div>
    </section>
  )
}
