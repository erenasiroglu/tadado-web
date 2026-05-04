import { getTranslations, getLocale } from 'next-intl/server'
import Image from 'next/image'
import { APP_STORE_URLS } from '@/lib/constants'
import { homeScreenGradientBackgroundImage } from '@/lib/home-screen-gradient'
import { poppinsBlackItalic } from '@/lib/fonts'
import { landing } from '@/lib/landing-ui'
import { HeroAccentShapes } from '@/components/HeroAccentShapes'

export async function Hero() {
  const t = await getTranslations('hero')
  const locale = await getLocale()
  const appStoreUrl = APP_STORE_URLS[locale as keyof typeof APP_STORE_URLS] ?? APP_STORE_URLS.en

  return (
    <section className={`${landing.section} relative flex min-h-screen items-center justify-center overflow-hidden`}>
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

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pt-24 pb-12 sm:max-w-7xl sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <h1
            className={`${poppinsBlackItalic.className} mt-1 whitespace-pre-line text-[clamp(2rem,5.6vw,4.35rem)] leading-[1.04] tracking-[-0.03em] text-white [text-shadow:0_2px_28px_rgba(42,10,59,0.9),0_1px_3px_rgba(0,0,0,0.35)] animate-in fade-in slide-in-from-bottom-5 duration-700`}
            style={{ animationDelay: '140ms', animationFillMode: 'both' }}
          >
            {t('title')}
          </h1>

          <p
            className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/95 [text-shadow:0_1px_20px_rgba(42,10,59,0.85),0_1px_2px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-4 duration-500 sm:text-lg"
            style={{ animationDelay: '260ms', animationFillMode: 'both' }}
          >
            {t('subtitle')}
          </p>

          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '320ms', animationFillMode: 'both' }}>
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:justify-start">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-zinc-950 shadow-[0_16px_34px_-18px_rgba(0,0,0,0.6)] transition hover:bg-zinc-100"
              >
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                {t('appStoreCta')}
              </a>
            </div>

            <div className="mt-8 flex items-start justify-center gap-6 px-1 py-2 sm:justify-start sm:gap-8">
              <div>
                <p className="text-4xl leading-none font-black tracking-tight text-white">{t('statUsers')}</p>
                <p className="mt-2 text-sm text-white/85">{t('statUsersLabel')}</p>
              </div>
              <div className="h-14 w-px bg-white/25" aria-hidden />
              <div>
                <p className="text-4xl leading-none font-black tracking-tight text-white">{t('statResponses')}</p>
                <p className="mt-2 text-sm text-white/85">{t('statResponsesLabel')}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative mx-auto w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: '220ms', animationFillMode: 'both' }}
        >
          <div className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-2xl bg-zinc-900/60 ring-1 ring-white/20">
              <div className="absolute inset-x-0 top-0 z-10 flex h-10 items-center gap-1.5 px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-300/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
              </div>
              <div className="relative aspect-[16/10]">
                <Image
                  src="/tadado-play-people.png"
                  alt="Friends playing together"
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 1024px) 100vw, 540px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
