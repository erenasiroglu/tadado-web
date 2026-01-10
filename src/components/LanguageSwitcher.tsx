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
    <div className="flex items-center gap-1 rounded-full bg-zinc-100 p-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLanguageChange(loc)}
          className={`
            px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200
            ${locale === loc 
              ? 'bg-white text-zinc-900 shadow-sm' 
              : 'text-zinc-500 hover:text-zinc-700'
            }
          `}
        >
          {languageNames[loc]}
        </button>
      ))}
    </div>
  )
}
