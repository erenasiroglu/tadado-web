'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/i18n/routing'
import { locales, type Locale } from '@/i18n/config'

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
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const handleLanguageChange = useCallback(
    (newLocale: Locale) => {
      const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
      router.push(pathWithoutLocale, { locale: newLocale })
      setOpen(false)
    },
    [locale, pathname, router]
  )

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return
      setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const current = localeMeta[locale]

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        id={`${listId}-trigger`}
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-label={`${t('languageGroup')}: ${t(current.labelKey)}`}
        onClick={() => setOpen((v) => !v)}
        className={`
          flex items-center gap-1.5 rounded-full border border-white/35 bg-white/[0.18] py-1.5 pl-2.5 pr-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-md backdrop-saturate-150
          transition-all duration-200 hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70
          ${open ? 'bg-white/25 ring-1 ring-white/45' : ''}
        `}
      >
        <span className="text-[1.125rem] leading-none" aria-hidden>
          {current.flag}
        </span>
        <svg
          className={`size-4 shrink-0 text-white/90 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open ? (
        <div
          id={listId}
          role="listbox"
          aria-label={t('languageGroup')}
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[60] flex min-w-[11.5rem] flex-col overflow-hidden rounded-2xl border border-white/30 bg-zinc-950/65 py-1 shadow-[0_20px_48px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.12)_inset] backdrop-blur-2xl backdrop-saturate-150"
        >
          {locales.map((loc) => {
            const { flag, labelKey } = localeMeta[loc]
            const selected = locale === loc
            return (
              <button
                key={loc}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => handleLanguageChange(loc)}
                className={`
                  flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm font-medium transition-colors
                  ${selected
                    ? 'bg-white/20 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]'
                    : 'text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.25)] hover:bg-white/12 hover:text-white'
                  }
                `}
              >
                <span className="text-base leading-none" aria-hidden>
                  {flag}
                </span>
                <span>{t(labelKey)}</span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
