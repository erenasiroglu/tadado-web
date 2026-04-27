'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  return (
    <footer className="relative border-t border-zinc-200/90 bg-gradient-to-b from-zinc-50 via-white to-zinc-50/90 px-6 py-14">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-6">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link
              href={`/${locale}`}
              className="text-lg font-bold tracking-tight text-zinc-900 transition-colors hover:text-[#3F3EDD]"
            >
              Tadado
            </Link>
            <p className="max-w-sm text-center text-sm leading-relaxed text-zinc-500 md:text-left">
              {t('copyright')}
            </p>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
            aria-label="Footer"
          >
            <Link
              href={`/${locale}/support`}
              className="text-sm font-medium text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
            >
              {t('support')}
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="text-sm font-medium text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
            >
              {t('privacy')}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-sm font-medium text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
            >
              {t('terms')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
