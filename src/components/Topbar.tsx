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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
      <div className="relative inline-flex max-w-full flex-col items-center">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`
          inline-flex w-fit max-w-full items-center gap-4 sm:gap-6 px-4 py-2 sm:px-6 sm:py-2.5
          rounded-full border border-white/[0.14] shadow-[0_4px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(99,102,241,0.12)]
          ring-1 ring-indigo-400/15 transition-all duration-300
          ${isScrolled
            ? 'bg-zinc-950/75 backdrop-blur-2xl'
            : 'bg-zinc-950/55 backdrop-blur-xl'
          }
        `}
      >
        <Link
          href={`/${locale}`}
          className="text-[0.95rem] font-bold tracking-tight text-white transition-colors hover:text-indigo-200 sm:text-base"
        >
          Tadado
        </Link>

        <div className="hidden h-4 w-px shrink-0 bg-white/15 md:block" aria-hidden />

        <div className="hidden md:flex items-center">
          <Link
            href={`/${locale}/blog`}
            className="text-sm font-medium text-zinc-200 transition-colors hover:text-white"
          >
            {t('blog')}
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-3.5">
          <LanguageSwitcher />

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-500 transition-colors hover:text-zinc-200"
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
              className="absolute top-full left-1/2 z-10 mt-2 w-[min(100vw-2rem,16rem)] -translate-x-1/2 p-3 rounded-2xl border border-white/[0.08] bg-zinc-950/55 shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:hidden"
            >
            <div className="flex flex-col gap-0.5">
              <Link
                href={`/${locale}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-zinc-50"
              >
                {t('home')}
              </Link>
              <Link
                href={`/${locale}/blog`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-zinc-50"
              >
                {t('blog')}
              </Link>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
