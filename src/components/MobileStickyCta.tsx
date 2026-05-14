'use client'

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { APP_STORE_URLS } from '@/lib/constants'

const SHOW_AT_SCROLL_Y = 560

/**
 * Mobile-only sticky CTA — surfaces the App Store install after the hero
 * leaves the viewport so the primary action is always one tap away.
 */
export function MobileStickyCta() {
  const t = useTranslations('mobileSticky')
  const locale = useLocale()
  const appStoreUrl = APP_STORE_URLS[locale as keyof typeof APP_STORE_URLS] ?? APP_STORE_URLS.en

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        setVisible(window.scrollY > SHOW_AT_SCROLL_Y)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 px-[max(var(--space-3),env(safe-area-inset-left,0px))] pr-[max(var(--space-3),env(safe-area-inset-right,0px))] pb-[max(var(--space-3),env(safe-area-inset-bottom,0px))] transition duration-300 ease-out md:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <div
        className={`pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-[var(--space-3)] rounded-[var(--radius-pill)] border border-white/15 bg-zinc-950/85 px-[var(--space-4)] py-[var(--space-2)] shadow-[var(--shadow-elevate)] backdrop-blur-xl ${
          visible ? '' : 'pointer-events-none'
        }`}
      >
        <p className="min-w-0 flex-1 truncate text-[length:var(--text-sm)] font-[var(--weight-emphasis)] tracking-[-0.01em] text-white">
          {t('cta')}
        </p>

        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('cta')}
          className="inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full bg-white text-zinc-950 shadow-[var(--shadow-soft)] transition hover:bg-zinc-100 active:scale-[0.98]"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
        </a>
      </div>
    </div>
  )
}
