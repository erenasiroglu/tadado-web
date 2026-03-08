'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function GameMomentsSection() {
  const t = useTranslations('gameMoments')
  const moments = t.raw('moments') as string[]

  return (
    <section className="relative py-24 md:py-32 px-6 bg-zinc-950">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-zinc-50 text-center mb-8"
        >
          {t('headline')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-lg text-zinc-400 text-center mb-10"
        >
          {t('p1')}
        </motion.p>

        <ul className="space-y-4 mb-10">
          {moments.map((moment, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
              className="flex items-center gap-3 text-zinc-300"
            >
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-indigo-400" />
              {moment}
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-lg text-zinc-400 text-center font-medium"
        >
          {t('p2')}
        </motion.p>
      </div>
    </section>
  )
}
