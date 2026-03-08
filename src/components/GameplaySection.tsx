'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function GameplaySection() {
  const t = useTranslations('gameplay')

  const paragraphs = [t('p1'), t('p2'), t('p3'), t('p4'), t('p5'), t('p6')]

  return (
    <section className="relative py-24 md:py-32 px-6 bg-zinc-950">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-zinc-50 mb-12"
        >
          {t('headline')}
        </motion.h2>

        <div className="space-y-4 text-left">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="text-lg text-zinc-400 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-400">$1</strong>')
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
