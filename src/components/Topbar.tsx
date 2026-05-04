'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

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
          rounded-full border border-white/45 shadow-[0_8px_40px_-8px_rgba(63,62,221,0.14),0_2px_12px_-4px_rgba(15,23,42,0.06)]
          ring-1 ring-inset ring-white/25 transition-all duration-300 ease-out
          backdrop-saturate-150 supports-[backdrop-filter]:bg-white/[0.22]
          ${isScrolled
            ? 'bg-white/[0.34] shadow-[0_12px_48px_-12px_rgba(63,62,221,0.18),0_0_0_1px_rgba(255,255,255,0.55)_inset] backdrop-blur-2xl md:backdrop-blur-3xl'
            : 'bg-white/[0.26] backdrop-blur-xl md:backdrop-blur-2xl'
          }
        `}
      >
        <Link
          href={`/${locale}`}
          className="text-[0.95rem] font-bold tracking-tight text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.35),0_0_24px_rgba(0,0,0,0.12)] transition-colors hover:text-violet-100 sm:text-base"
        >
          Tadado
        </Link>

        <div className="hidden h-4 w-px shrink-0 bg-gradient-to-b from-transparent via-white/50 to-transparent md:block" aria-hidden />

        <div className="hidden md:flex items-center">
          <Link
            href={`/${locale}/blog`}
            className="text-sm font-medium text-white/95 [text-shadow:0_1px_3px_rgba(0,0,0,0.35)] transition-colors hover:text-white"
          >
            {t('blog')}
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden rounded-full p-2 text-white/95 [text-shadow:0_1px_3px_rgba(0,0,0,0.35)] transition-colors hover:bg-white/20 hover:text-white"
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
        </motion.nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-1/2 z-10 mt-2 w-[min(100vw-2rem,16rem)] -translate-x-1/2 rounded-2xl border border-white/25 bg-zinc-950/55 p-3 shadow-[0_20px_56px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.12)_inset] backdrop-blur-2xl backdrop-saturate-150 md:hidden"
            >
            <div className="flex flex-col gap-0.5">
              <Link
                href={`/${locale}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] transition-colors hover:bg-white/15 hover:text-white"
              >
                {t('home')}
              </Link>
              <Link
                href={`/${locale}/blog`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] transition-colors hover:bg-white/15 hover:text-white"
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
