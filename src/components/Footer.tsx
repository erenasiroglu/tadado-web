'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  return (
    <footer className="relative border-t border-zinc-800 bg-zinc-950 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link
              href={`/${locale}`}
              className="text-lg font-bold text-zinc-50 transition-colors hover:text-indigo-400"
            >
              Tadado
            </Link>
            <p className="text-center text-sm text-zinc-500 md:text-left">{t('copyright')}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href={`/${locale}/support`} className="text-sm text-zinc-500 transition-colors hover:text-zinc-50">
              {t('support')}
            </Link>
            <Link href={`/${locale}/privacy`} className="text-sm text-zinc-500 transition-colors hover:text-zinc-50">
              {t('privacy')}
            </Link>
            <Link href={`/${locale}/terms`} className="text-sm text-zinc-500 transition-colors hover:text-zinc-50">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
