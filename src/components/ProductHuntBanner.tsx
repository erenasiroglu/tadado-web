'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { useTranslations } from 'next-intl'
import {
  PRODUCT_HUNT_URL,
  PRODUCT_HUNT_BADGE_SRC,
  PRODUCT_HUNT_LAUNCH_DATE,
  PRODUCT_HUNT_BANNER_ENABLED
} from '@/lib/constants'

const STORAGE_KEY = `ph-banner-dismissed-${PRODUCT_HUNT_LAUNCH_DATE}`
const BANNER_H = '40px'

function subscribeToStorage(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function readDismissedClient() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

/** SSR: pretend dismissed so the banner never renders on the server — no hydration mismatch. */
function readDismissedServer() {
  return true
}

export function ProductHuntBanner() {
  const t = useTranslations('productHunt')
  const dismissed = useSyncExternalStore(subscribeToStorage, readDismissedClient, readDismissedServer)
  const visible = PRODUCT_HUNT_BANNER_ENABLED && !dismissed

  useEffect(() => {
    document.documentElement.style.setProperty('--ph-banner-h', visible ? BANNER_H : '0px')
  }, [visible])

  if (!visible) return null

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
      window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY, newValue: '1' }))
    } catch {
      // No-op on private storage.
    }
  }

  return (
    <div
      role="region"
      aria-label="Product Hunt launch"
      className="fixed inset-x-0 top-0 z-[60] h-[var(--ph-banner-h)] animate-in fade-in slide-in-from-top-2 duration-500"
    >
      <div className="relative flex h-full w-full items-center border-b border-white/[0.08] bg-zinc-950/75 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-zinc-950/55">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent"
          aria-hidden
        />

        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center gap-[var(--space-2)] px-[max(var(--space-3),env(safe-area-inset-left,0px))] pr-[max(var(--space-2),env(safe-area-inset-right,0px))]">
          <a
            href={PRODUCT_HUNT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 flex-1 items-center gap-[var(--space-2)] py-[var(--space-1)] outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-white/25"
          >
            <ProductHuntGlyph className="hidden h-[18px] w-[18px] shrink-0 text-white/45 sm:block" />

            <span className="min-w-0 truncate text-[length:var(--text-xs)] font-[var(--weight-medium)] tracking-[-0.01em] text-white/90 sm:text-[length:var(--text-sm)]">
              <span className="font-[var(--weight-bold)] text-white">{t('live')}</span>
              <span className="hidden text-white/50 md:inline"> — {t('subline')}</span>
            </span>
          </a>

          <a
            href={PRODUCT_HUNT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center justify-center sm:inline-flex"
            aria-label={t('badgeAlt')}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PRODUCT_HUNT_BADGE_SRC}
              alt=""
              width={156}
              height={34}
              className="h-[22px] w-auto opacity-90 transition hover:opacity-100"
            />
          </a>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label={t('dismiss')}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/45 outline-none transition hover:bg-white/[0.08] hover:text-white/90 focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

/** Minimal PH mark — monochrome, no orange pulse. */
function ProductHuntGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="currentColor" aria-hidden>
      <path d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0Zm2.5 22.5h-5V30h-3.75V10h8.75c3.452 0 6.25 2.798 6.25 6.25s-2.798 6.25-6.25 6.25Zm0-8.75h-5v5h5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5Z" />
    </svg>
  )
}
