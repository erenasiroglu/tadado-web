'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/i18n/routing'
import { locales, type Locale } from '@/i18n/config'

const localeMeta: Record<Locale, { flag: string; labelKey: 'languageEn' | 'languageTr' }> = {
  en: { flag: '🇺🇸', labelKey: 'languageEn' },
  tr: { flag: '🇹🇷', labelKey: 'languageTr' }
}

export function LanguageSwitcher() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const handleLanguageChange = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    router.push(pathWithoutLocale, { locale: newLocale })
  }

  return (
    <div
      className="flex items-center gap-0.5 rounded-full bg-white/[0.06] p-[3px]"
      role="group"
      aria-label={t('languageGroup')}
    >
      {locales.map((loc) => {
        const { flag, labelKey } = localeMeta[loc]
        return (
          <button
            key={loc}
            type="button"
            onClick={() => handleLanguageChange(loc)}
            aria-label={t(labelKey)}
            aria-pressed={locale === loc}
            className={`
              flex size-9 items-center justify-center rounded-full transition-colors duration-200
              ${locale === loc
                ? 'bg-white/[0.12]'
                : 'opacity-70 hover:bg-white/[0.06] hover:opacity-100'
              }
            `}
          >
            <span className="text-[1.125rem] leading-none" aria-hidden>
              {flag}
            </span>
          </button>
        )
      })}
    </div>
  )
}
