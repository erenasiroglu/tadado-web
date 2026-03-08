'use client'

import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/i18n/routing'
import { locales, type Locale } from '@/i18n/config'

const languageNames: Record<string, string> = {
  en: 'EN',
  tr: 'TR'
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const handleLanguageChange = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    router.push(pathWithoutLocale, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-1 rounded-full bg-zinc-800 p-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLanguageChange(loc)}
          className={`
            px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200
            ${locale === loc 
              ? 'bg-zinc-600 text-zinc-50 shadow-sm' 
              : 'text-zinc-400 hover:text-zinc-300'
            }
          `}
        >
          {languageNames[loc]}
        </button>
      ))}
    </div>
  )
}
