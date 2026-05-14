'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { PRODUCT_HUNT_URL, PRODUCT_HUNT_BADGE_SRC } from '@/lib/constants'

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  return (
    <footer className="relative border-t border-zinc-200/90 bg-gradient-to-b from-zinc-50 via-white to-zinc-50/90 px-[max(var(--space-container),env(safe-area-inset-left,0px))] pr-[max(var(--space-container),env(safe-area-inset-right,0px))] pb-[calc(var(--space-9)+env(safe-area-inset-bottom,0px))] pt-[var(--space-9)]">
      <div className="mx-auto max-w-4xl">
        <Reveal as="div" y={20} className="flex flex-col items-center gap-[var(--space-4)] border-b border-zinc-200/80 pb-[var(--space-7)] sm:flex-row sm:items-center sm:justify-between sm:gap-[var(--space-6)]">
          <div className="flex flex-wrap items-center justify-center gap-x-[var(--space-4)] gap-y-[var(--space-2)] sm:justify-start">
            <span className="inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-pill)] border border-zinc-200 bg-white px-[var(--space-3)] py-[var(--space-1)] shadow-[var(--shadow-soft)]">
              <Stars />
              <span className="text-[length:var(--text-sm)] font-[var(--weight-bold)] tabular-nums tracking-[-0.01em] text-zinc-900">
                {t('ratingLabel')}
              </span>
            </span>
            <span className="text-[length:var(--text-sm)] font-[var(--weight-medium)] text-zinc-600">
              {t('lovedBy')}
            </span>
          </div>

          <a
            href={PRODUCT_HUNT_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('phLabel')}
            className="inline-flex shrink-0 items-center outline-none rounded-[var(--radius-sm)] transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#DA552F]/60"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PRODUCT_HUNT_BADGE_SRC}
              alt={t('phLabel')}
              width={180}
              height={40}
              className="h-[40px] w-auto"
            />
          </a>
        </Reveal>

        <Reveal as="div" y={16} delay={0.1} className="mt-[var(--space-7)] flex flex-col items-center justify-between gap-[var(--space-6)] md:flex-row md:gap-[var(--space-5)]">
          <div className="flex flex-col items-center gap-[var(--space-2)] md:items-start">
            <Link
              href={`/${locale}`}
              className="text-[length:var(--text-lg)] font-[var(--weight-bold)] tracking-[-0.02em] text-zinc-900 transition-colors hover:text-[#3F3EDD]"
            >
              Tadado
            </Link>
            <p className="max-w-sm text-center text-[length:var(--text-sm)] leading-[var(--leading-snug)] text-zinc-500 md:text-left">
              {t('copyright')}
            </p>
            <a
              href={`mailto:${t('contactEmail')}`}
              className="text-[length:var(--text-sm)] font-[var(--weight-medium)] text-zinc-500 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
            >
              {t('contactEmail')}
            </a>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-[var(--space-7)] gap-y-[var(--space-3)]" aria-label="Footer">
            <Link
              href={`/${locale}/support`}
              className="text-[length:var(--text-sm)] font-[var(--weight-medium)] text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
            >
              {t('support')}
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="text-[length:var(--text-sm)] font-[var(--weight-medium)] text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
            >
              {t('privacy')}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-[length:var(--text-sm)] font-[var(--weight-medium)] text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
            >
              {t('terms')}
            </Link>
          </nav>
        </Reveal>
      </div>
    </footer>
  )
}

function Stars() {
  return (
    <span className="inline-flex shrink-0 items-center" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-3 w-3 fill-amber-400 drop-shadow-[0_1px_2px_rgba(251,191,36,0.35)]"
        >
          <path d="M10 1.5l2.6 5.3 5.8.85-4.2 4.1 1 5.8L10 14.9l-5.2 2.75 1-5.8-4.2-4.1 5.8-.85L10 1.5z" />
        </svg>
      ))}
    </span>
  )
}
