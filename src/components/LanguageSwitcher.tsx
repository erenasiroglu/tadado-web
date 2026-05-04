'use client'

import { useCallback } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/i18n/routing'
import { locales, type Locale } from '@/i18n/config'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'

type NavLanguageLabelKey = 'languageEn' | 'languageTr' | 'languageDe' | 'languageFr' | 'languageEs'

const localeMeta: Record<Locale, { flag: string; labelKey: NavLanguageLabelKey }> = {
  en: { flag: '🇺🇸', labelKey: 'languageEn' },
  tr: { flag: '🇹🇷', labelKey: 'languageTr' },
  de: { flag: '🇩🇪', labelKey: 'languageDe' },
  fr: { flag: '🇫🇷', labelKey: 'languageFr' },
  es: { flag: '🇪🇸', labelKey: 'languageEs' }
}

export function LanguageSwitcher() {
  const t = useTranslations('nav')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  const handleLanguageChange = useCallback(
    (newLocale: Locale) => {
      const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
      router.push(pathWithoutLocale, { locale: newLocale })
    },
    [locale, pathname, router]
  )

  const current = localeMeta[locale]

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            aria-label={`${t('languageGroup')}: ${t(current.labelKey)}`}
            className="h-9 rounded-full px-2.5"
          >
            <span className="text-[1.05rem] leading-none" aria-hidden>
              {current.flag}
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="left-auto right-0 w-48 !rounded-xl p-1 group-data-[viewport=false]/navigation-menu:!rounded-xl">
            <ul className="grid gap-1">
              {locales.map((loc) => {
                const { flag, labelKey } = localeMeta[loc]
                const selected = locale === loc
                return (
                  <li key={loc}>
                    <button
                      type="button"
                      aria-current={selected ? 'true' : undefined}
                      onClick={() => handleLanguageChange(loc)}
                      className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="text-base leading-none" aria-hidden>
                        {flag}
                      </span>
                      <span className={selected ? 'font-semibold' : 'font-medium'}>{t(labelKey)}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
