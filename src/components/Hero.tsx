'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'

export function Hero() {
  const t = useTranslations('hero')
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      setStatus('success')
      setEmail('')

      setTimeout(() => {
        setIsWaitlistOpen(false)
        setStatus('idle')
      }, 2000)
    } catch (error) {
      console.error('Waitlist submission error:', error)
      setStatus('error')
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-200/40 via-purple-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-orange-200/40 via-amber-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-100/20 via-cyan-100/20 to-indigo-100/20 rounded-full blur-3xl" />
        
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-24 left-[10%] w-16 h-20 bg-white rounded-xl shadow-lg border border-zinc-200 rotate-[-12deg] animate-float"
          style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-32 right-[12%] w-14 h-18 rounded-xl rotate-[8deg] animate-float delay-200"
          style={{
            backgroundColor: '#fdc763',
            boxShadow: '0 10px 25px -5px rgba(253, 199, 99, 0.4), 0 4px 6px -2px rgba(253, 199, 99, 0.2)'
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-32 left-[15%] w-12 h-16 rounded-xl rotate-[15deg] animate-float delay-300"
          style={{
            backgroundColor: '#d4b2f2',
            boxShadow: '0 10px 25px -5px rgba(212, 178, 242, 0.4), 0 4px 6px -2px rgba(212, 178, 242, 0.2)'
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-40 right-[8%] w-14 h-18 rounded-xl rotate-[-8deg] animate-float delay-100"
          style={{
            backgroundColor: '#4b1a7a',
            boxShadow: '0 10px 25px -5px rgba(75, 26, 122, 0.4), 0 4px 6px -2px rgba(75, 26, 122, 0.3)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md shadow-indigo-500/5 border border-indigo-100 text-sm font-medium text-indigo-700">
            {t('badge')}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
        >
          <span className="text-zinc-900">{t('title')}</span>
          <br />
          <span className="text-[#6366f1]">
            {t('titleHighlight')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <a
              href="#"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-zinc-900 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-zinc-900/20"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-70">{t('ctaAppStore')}</div>
                <div className="text-sm font-bold">App Store</div>
              </div>
            </a>

            <a
              href="#"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-zinc-900 border-2 border-zinc-200 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-zinc-900/10 hover:border-zinc-300"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" fill="#4285F4"/>
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-70">{t('ctaPlayStore')}</div>
                <div className="text-sm font-bold">Play Store</div>
              </div>
            </a>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setIsWaitlistOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-base font-semibold text-zinc-700 hover:text-indigo-600 transition-colors duration-300 cursor-pointer"
            >
              {t('ctaWaitlist')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isWaitlistOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWaitlistOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-zinc-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-zinc-900">
                    {t('waitlist.title')}
                  </h2>
                  <button
                    onClick={() => setIsWaitlistOpen(false)}
                    className="p-1 text-zinc-400 hover:text-zinc-600 transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-zinc-600 mb-6">
                  {t('waitlist.description')}
                </p>

                {status === 'success' ? (
                  <div className="py-4 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-3">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-emerald-600 font-medium">
                      {t('waitlist.success')}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                        {t('waitlist.emailLabel')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('waitlist.emailPlaceholder')}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-sm text-red-600">
                        {t('waitlist.error')}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full px-6 py-3 rounded-xl bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition-colors"
                    >
                      {t('waitlist.submit')}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
