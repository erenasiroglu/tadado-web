import { getTranslations, getLocale } from 'next-intl/server'
import Image from 'next/image'
import { APP_STORE_URLS } from '@/lib/constants'
import { homeScreenGradientBackgroundImage } from '@/lib/home-screen-gradient'
import { poppinsBlackItalic } from '@/lib/fonts'
import { heroRhythm, landing } from '@/lib/landing-ui'
import { HeroAccentShapes } from '@/components/HeroAccentShapes'

/** Köşe dekor kartları — ortak oran, hafif eğim, simetrik köşe dönüşleri */
const heroCornerCard =
  'pointer-events-none absolute animate-float opacity-90 drop-shadow-[0_22px_44px_rgba(0,0,0,0.42)]'
const heroCornerCardInner = 'relative h-full w-full brightness-[1.03] contrast-[1.04]'

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

      <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden" aria-hidden>
        {/* Üç oyun kartı: aynı oran (~3:4), hafif — sol köşeler -3°, sağ köşeler +3° */}
        <div
          className={`${heroCornerCard} left-[4%] top-20 aspect-[3/4] w-[min(38vw,10.25rem)] -rotate-3 sm:left-[5%] sm:top-[5.25rem] sm:w-44 md:w-[11.25rem] lg:top-[5.75rem] lg:w-48`}
          style={{ animationDelay: '0.85s' }}
        >
          <div className={`${heroCornerCardInner} overflow-hidden rounded-xl`}>
            <Image src="/basketball-card.png" alt="" fill className="object-contain" sizes="(max-width: 768px) 164px, 192px" />
          </div>
        </div>
        <div
          className={`${heroCornerCard} right-[4%] top-20 aspect-[3/4] w-[min(38vw,10.25rem)] rotate-3 sm:right-[5%] sm:top-[5.25rem] sm:w-44 md:w-[11.25rem] lg:top-[5.75rem] lg:w-48`}
          style={{ animationDelay: '1s' }}
        >
          <div className={`${heroCornerCardInner} overflow-hidden rounded-xl`}>
            <Image src="/midnight-fun-card.png" alt="" fill className="object-contain" sizes="(max-width: 768px) 164px, 192px" />
          </div>
        </div>
        <div
          className={`${heroCornerCard} bottom-[4.75rem] left-[4%] hidden aspect-[3/4] w-[min(38vw,10.25rem)] -rotate-3 sm:bottom-[5.25rem] sm:left-[5%] md:block md:w-44 lg:bottom-[5.75rem] lg:w-48`}
          style={{ animationDelay: '1.15s' }}
        >
          <div className={`${heroCornerCardInner} overflow-hidden rounded-xl`}>
            <Image src="/eiffel-tower.png" alt="" fill className="object-contain" sizes="(max-width: 768px) 164px, 192px" />
          </div>
        </div>
        {/* Sosyal baloncuk — kare gövde, organik border-radius */}
        <div
          className={`${heroCornerCard} bottom-14 right-[3%] h-[8.25rem] w-[8.25rem] rotate-[-5deg] sm:bottom-16 sm:right-[4%] sm:h-[9.75rem] sm:w-[9.75rem] md:bottom-[5rem] md:h-40 md:w-40 lg:bottom-[5.75rem] lg:h-44 lg:w-44`}
          style={{
            animationDelay: '1.3s',
            borderRadius: '63% 37% 58% 42% / 48% 52% 48% 52%'
          }}
        >
          <div className={`${heroCornerCardInner} h-full w-full overflow-hidden border-2 border-white/35 bg-[#2A0A3B]/40 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] ring-1 ring-white/15 [border-radius:inherit]`}>
            <Image
              src="/tadado-play-people.png"
              alt=""
              fill
              className="object-cover object-[center_62%_65%] saturate-[1.08] contrast-[1.05]"
              sizes="(max-width: 768px) 132px, 176px"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:max-w-7xl sm:px-6">
        <div
          className={`flex w-full flex-col items-center ${heroRhythm.badgeToMascot} animate-in fade-in slide-in-from-bottom-4 duration-500`}
          style={{ animationDelay: '100ms', animationFillMode: 'both' }}
        >
          <span className={`${landing.badge} normal-case tracking-wide`}>{t('badge')}</span>
          <div className="relative mx-auto h-48 w-48 shrink-0 sm:h-52 sm:w-52 md:h-60 md:w-60 lg:h-72 lg:w-72">
            <Image
              src="/tadado-mascots.png"
              alt=""
              fill
              className="object-contain object-bottom drop-shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 240px, 288px"
              priority
            />
          </div>
        </div>

        <h1
          className={`${poppinsBlackItalic.className} ${heroRhythm.mascotToTitle} mx-auto w-full max-w-[min(100%,36rem)] text-[clamp(2.125rem,6.2vw,5rem)] leading-[1.04] tracking-[-0.03em] text-white [text-shadow:0_2px_28px_rgba(42,10,59,0.9),0_1px_3px_rgba(0,0,0,0.35)] animate-in fade-in slide-in-from-bottom-5 duration-700 whitespace-pre-line sm:max-w-4xl md:max-w-5xl lg:max-w-[72rem] lg:text-[clamp(2.5rem,5.2vw,5.25rem)]`}
          style={{ animationDelay: '180ms', animationFillMode: 'both' }}
        >
          {t('title')}
        </h1>

        <p
          className={`mx-auto ${heroRhythm.titleToLead} w-full max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/95 [text-shadow:0_1px_20px_rgba(42,10,59,0.85),0_1px_2px_rgba(0,0,0,0.3)] md:max-w-3xl md:text-xl md:leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500`}
          style={{ animationDelay: '280ms', animationFillMode: 'both' }}
        >
          {t('subtitle')}
        </p>

        <div
          className={`${heroRhythm.leadToCta} flex w-full max-w-lg flex-col items-stretch justify-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center`}
          style={{ animationDelay: '360ms', animationFillMode: 'both' }}
        >
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[3rem] items-center justify-center gap-3 rounded-xl bg-white px-7 py-3.5 text-[15px] font-semibold text-zinc-950 shadow-lg shadow-black/20 transition hover:bg-zinc-100 hover:shadow-xl sm:px-8"
          >
            <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            {t('cta')}
          </a>
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex min-h-[3rem] cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-white/30 bg-white/[0.08] px-7 py-3.5 text-[15px] font-semibold text-white/95 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.35)] backdrop-blur-md [text-shadow:0_1px_2px_rgba(0,0,0,0.25)] sm:px-8"
          >
            {/* Google Play renkli üçgen — Wikimedia “Get it on Google Play” rozetindeki vektör parçaları */}
            <svg
              className="h-6 w-6 shrink-0"
              viewBox="12 11 31 30"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                fill="#5778c5"
                d="m13.426 12.37c-0.08533 0.31466-0.13018 0.64425-0.13018 0.98651v26.623c0 0.34162 0.04432 0.67233 0.13072 0.98587l14.684-14.681-14.684-13.914"
              />
              <path
                fill="#3bad49"
                d="m27.727 26.668 7.3473-7.3451-15.96-9.2534c-0.58012-0.34746-1.2572-0.54799-1.9817-0.54799-1.7734 0-3.2697 1.2068-3.7051 2.8447-5.34e-4 0.0016-5.34e-4 0.0027-5.34e-4 0.0041l14.3 14.298"
              />
              <path
                fill="#f6b60b"
                d="m41.983 23.334-0.0136-0.0093-6.8982-3.999-7.7717 6.9156 7.7987 7.7977 6.8618-3.9592c1.203-0.64945 2.0197-1.9177 2.0197-3.3802 0-1.452-0.80571-2.7139-1.9968-3.3655"
              />
              <path
                fill="#eb3131"
                d="m27.622 25.899-14.194 15.066c5.34e-4 0.0031 0.0016 0.0057 0.0021 0.0089 0.43532 1.636 1.9296 2.8406 3.703 2.8406 0.70892 0 1.3745-0.19166 1.9453-0.52812l0.04533-0.02656 15.978-9.22-7.479-8.141"
              />
            </svg>
            {t('ctaPlayStore')}
          </button>
        </div>
      </div>
    </section>
  )
}
