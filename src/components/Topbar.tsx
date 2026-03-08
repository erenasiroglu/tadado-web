'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Topbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`
          flex items-center justify-between gap-8 px-6 py-3
          rounded-full border transition-all duration-300
          ${isScrolled 
            ? 'bg-zinc-900/90 border-zinc-800 shadow-lg shadow-black/20 backdrop-blur-xl' 
            : 'bg-zinc-900/70 border-zinc-800 backdrop-blur-md'
          }
        `}
      >
        <Link 
          href={`/${locale}`} 
          className="flex items-center gap-2 font-bold text-lg text-zinc-50 hover:text-indigo-400 transition-colors"
        >
          <span>Tadado</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link 
            href={`/${locale}`}
            className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
          >
            {t('home')}
          </Link>
          <Link 
            href={`/${locale}/blog`}
            className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
          >
            {t('blog')}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 p-4 rounded-2xl bg-zinc-900/95 border border-zinc-800 shadow-xl shadow-black/20 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              <Link 
                href={`/${locale}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-sm text-zinc-300 hover:text-zinc-50 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                {t('home')}
              </Link>
              <Link 
                href={`/${locale}/blog`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-sm text-zinc-300 hover:text-zinc-50 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                {t('blog')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
