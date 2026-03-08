import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  return (
    <footer className="relative py-12 px-6 border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link 
              href={`/${locale}`}
              className="font-bold text-lg text-zinc-50 hover:text-indigo-400 transition-colors"
            >
              Tadado
            </Link>
            <p className="text-sm text-zinc-500">
              {t('copyright')}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              href={`/${locale}/support`}
              className="text-sm text-zinc-500 hover:text-zinc-50 transition-colors"
            >
              {t('support')}
            </Link>
            <Link 
              href={`/${locale}/privacy`}
              className="text-sm text-zinc-500 hover:text-zinc-50 transition-colors"
            >
              {t('privacy')}
            </Link>
            <Link 
              href={`/${locale}/terms`}
              className="text-sm text-zinc-500 hover:text-zinc-50 transition-colors"
            >
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
