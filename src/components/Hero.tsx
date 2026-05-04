import { getTranslations, getLocale } from 'next-intl/server'
import { APP_STORE_URLS } from '@/lib/constants'
import { homeScreenGradientBackgroundImage } from '@/lib/home-screen-gradient'
import { poppinsBlackItalic } from '@/lib/fonts'
import { heroRhythm } from '@/lib/landing-ui'
import { HeroAccentShapes } from '@/components/HeroAccentShapes'
import { HeroAnimatedStats } from '@/components/HeroAnimatedStats'
import { HeroDeviceShowcase } from '@/components/HeroDeviceShowcase'

export async function Hero() {
  const t = await getTranslations('hero')
  const locale = await getLocale()
  const appStoreUrl = APP_STORE_URLS[locale as keyof typeof APP_STORE_URLS] ?? APP_STORE_URLS.en

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-x-clip pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pt-[max(3.5rem,calc(env(safe-area-inset-top,0px)+3.1rem))] pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:pl-5 sm:pr-5 sm:pt-[max(3.75rem,calc(env(safe-area-inset-top,0px)+3.25rem))] md:pl-6 md:pr-6 lg:h-[100svh] lg:min-h-0 lg:max-h-[100dvh] lg:overflow-hidden lg:pb-2">
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundImage: homeScreenGradientBackgroundImage() }}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
        <HeroAccentShapes />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/[0.12] via-transparent to-black/[0.08]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col justify-center sm:max-w-7xl">
        <div className="grid min-h-0 w-full grid-cols-1 items-center gap-x-10 gap-y-4 sm:gap-y-5 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-10 xl:gap-x-14">
          <div className="min-h-0 text-center lg:max-w-xl lg:text-left xl:max-w-2xl">
            <h1
              className={`${poppinsBlackItalic.className} whitespace-pre-line text-[clamp(1.5rem,calc(1rem_+_3.2vw),3.55rem)] leading-[1.04] tracking-[-0.03em] text-white [text-shadow:0_2px_28px_rgba(42,10,59,0.92),0_1px_3px_rgba(0,0,0,0.38)] animate-in fade-in slide-in-from-bottom-5 duration-700 sm:leading-[1.03]`}
              style={{ animationDelay: '80ms', animationFillMode: 'both' }}
            >
              {t('title')}
            </h1>

            <p
              className={`${heroRhythm.titleToLead} mx-auto max-w-xl text-pretty text-base leading-snug text-white/95 [text-shadow:0_1px_16px_rgba(42,10,59,0.85),0_1px_2px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-4 duration-500 sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed lg:mx-0`}
              style={{ animationDelay: '260ms', animationFillMode: 'both' }}
            >
              {t('subtitle')}
            </p>

            <div
              className={`${heroRhythm.leadToCta} flex flex-col gap-6 sm:gap-8 md:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500`}
              style={{ animationDelay: '320ms', animationFillMode: 'both' }}
            >
              <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:gap-3 lg:justify-start">
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[2.75rem] touch-manipulation items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-zinc-950 shadow-[0_14px_30px_-16px_rgba(0,0,0,0.55)] transition hover:bg-zinc-100 active:scale-[0.99] sm:min-h-[2.85rem] sm:px-6 sm:text-[15px]"
                >
                  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  {t('appStoreCta')}
                </a>
              </div>

              <HeroAnimatedStats
                labels={[t('statUsersLabel'), t('statResponsesLabel'), t('statAiDecksLabel')]}
                finals={[t('statUsers'), t('statResponses'), t('statAiDecks')]}
              />
            </div>
          </div>

          <div
            className="min-h-0 w-full max-lg:flex max-lg:justify-center px-2 py-1 sm:px-4 lg:min-w-0 lg:px-3 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: '220ms', animationFillMode: 'both' }}
          >
            <HeroDeviceShowcase altDecks={t('phoneScreenDecks')} altGame={t('phoneScreenGame')} altAi={t('phoneScreenAi')} />
          </div>
        </div>
      </div>
    </section>
  )
}
