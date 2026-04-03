import { getTranslations, getLocale } from 'next-intl/server'
import Image from 'next/image'
import { APP_STORE_URLS } from '@/lib/constants'
import { heroRhythm, landing, landingOrbs } from '@/lib/landing-ui'

export async function Hero() {
  const t = await getTranslations('hero')
  const locale = await getLocale()

  const appStoreUrl = APP_STORE_URLS[locale as keyof typeof APP_STORE_URLS] ?? APP_STORE_URLS.en

  return (
    <section className={`${landing.section} flex min-h-screen items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 bg-zinc-950">
        <div className={landingOrbs.heroPrimary} />
        <div className={landingOrbs.heroSecondary} />
        <div className={landing.subtleGrid} />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-[10%] top-24 h-28 w-20 rotate-[-12deg] animate-float opacity-30 md:h-36 md:w-28 md:opacity-50 lg:h-40 lg:w-32"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="relative h-full w-full">
            <Image src="/hero_card_1.png" alt="" fill className="object-contain drop-shadow-xl" />
          </div>
        </div>
        <div
          className="absolute right-[12%] top-32 h-24 w-16 rotate-[8deg] animate-float opacity-30 md:h-32 md:w-24 md:opacity-50 lg:h-36 lg:w-28"
          style={{ animationDelay: '1s' }}
        >
          <div className="relative h-full w-full">
            <Image src="/hero_card_2.png" alt="" fill className="object-contain drop-shadow-xl" />
          </div>
        </div>
        <div
          className="absolute bottom-32 left-[15%] hidden h-28 w-20 rotate-[15deg] animate-float opacity-30 md:block md:h-32 md:w-24 md:opacity-50 lg:h-36 lg:w-28"
          style={{ animationDelay: '1.2s' }}
        >
          <div className="relative h-full w-full">
            <Image src="/hero_card_3.png" alt="" fill className="object-contain drop-shadow-xl" />
          </div>
        </div>
        <div
          className="absolute bottom-40 right-[8%] hidden h-32 w-24 rotate-[-8deg] animate-float opacity-30 md:block md:h-36 md:w-28 md:opacity-50 lg:h-40 lg:w-32"
          style={{ animationDelay: '1.4s' }}
        >
          <div className="relative h-full w-full">
            <Image src="/hero_card_4.png" alt="" fill className="object-contain drop-shadow-xl" />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <div
          className={`flex w-full flex-col items-center ${heroRhythm.badgeToMascot} animate-in fade-in slide-in-from-bottom-4 duration-500`}
          style={{ animationDelay: '100ms', animationFillMode: 'both' }}
        >
          <span className={`${landing.badge} normal-case tracking-wide`}>{t('badge')}</span>
          <div className="relative mx-auto h-48 w-48 shrink-0 sm:h-52 sm:w-52 md:h-60 md:w-60 lg:h-72 lg:w-72">
            <Image
              src="/tadado_launch.png"
              alt=""
              fill
              className="object-contain object-bottom drop-shadow-lg"
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 240px, 288px"
              priority
            />
          </div>
        </div>

        <h1
          className={`${heroRhythm.mascotToTitle} w-full text-5xl font-semibold tracking-tight text-zinc-50 md:text-7xl lg:text-8xl animate-in fade-in slide-in-from-bottom-5 duration-700`}
          style={{ animationDelay: '180ms', animationFillMode: 'both' }}
        >
          <span className="block">{t('title')}</span>
          <span className={`mt-1 block ${landing.titleGradient}`}>{t('titleHighlight')}</span>
        </h1>

        <p
          className={`mx-auto ${heroRhythm.titleToLead} w-full max-w-xl text-balance text-lg leading-relaxed text-zinc-400 md:text-xl animate-in fade-in slide-in-from-bottom-4 duration-500`}
          style={{ animationDelay: '280ms', animationFillMode: 'both' }}
        >
          {t('subtitle')}
        </p>

        <div
          className={`${heroRhythm.leadToCta} flex w-full justify-center animate-in fade-in slide-in-from-bottom-4 duration-500`}
          style={{ animationDelay: '360ms', animationFillMode: 'both' }}
        >
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-3.5 text-[15px] font-semibold text-zinc-950 shadow-lg shadow-indigo-500/25 transition hover:bg-zinc-100 hover:shadow-xl hover:shadow-indigo-500/35"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
