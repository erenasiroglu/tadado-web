import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { homeScreenGradientBackgroundImage } from '@/lib/home-screen-gradient'
import { poppinsBlackItalic } from '@/lib/fonts'
import { MeetTadoAccentShapes } from '@/components/MeetTadoAccentShapes'

/** Örnek kart baloncukları — dil bölümündeki blob mantığı, koyu zemine uyumlu cam. */
const CARD_BLOB_RADIUS = [
  '63% 37% 58% 42% / 48% 52% 48% 52%',
  '55% 45% 62% 38% / 48% 52% 52% 48%'
] as const

/** Sol: üstte başlık + maskot · Sağ: üstte örnek kartlar, altta açıklama · BG Hero ile aynı + farklı aksan şekilleri. */
export async function MeetTado() {
  const t = await getTranslations('meetTado')

  return (
    <section
      id="meet-tado"
      aria-labelledby="meet-tado-heading"
      className="relative overflow-x-clip overflow-y-visible py-12 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pb-[max(3rem,env(safe-area-inset-bottom,0px))] pt-12 sm:py-16 sm:pl-6 sm:pr-6 md:py-20 md:pb-24 lg:py-28"
    >
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundImage: homeScreenGradientBackgroundImage() }}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
        <MeetTadoAccentShapes />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/[0.12] via-transparent to-black/[0.08]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl lg:max-w-7xl">
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0 xl:gap-x-16">
          <div className="mx-auto flex w-full max-w-[min(100%,17.5rem)] flex-col items-center gap-5 text-center sm:max-w-[19rem] sm:gap-6 md:max-w-[21rem] lg:mx-0 lg:max-w-[min(100%,24rem)] lg:items-start lg:gap-6 lg:text-left xl:max-w-[26.5rem]">
            <h2
              id="meet-tado-heading"
              className={`${poppinsBlackItalic.className} w-full whitespace-pre-line text-[clamp(1.65rem,calc(1.1rem_+_3.4vw),3rem)] leading-[1.06] tracking-[-0.03em] text-white drop-shadow-[0_4px_36px_rgba(0,0,0,0.28)]`}
            >
              {t('title')}
            </h2>
            <Image
              src="/tado-mascot.png"
              alt={t('mascotAlt')}
              width={334}
              height={501}
              className="h-auto w-full shrink-0 object-contain drop-shadow-[0_28px_70px_rgba(0,0,0,0.45)]"
              sizes="(max-width: 1024px) 85vw, min(420px, 28vw)"
            />
          </div>

          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="mx-auto grid w-full max-w-xl grid-cols-2 gap-4 sm:max-w-none sm:gap-5 md:gap-6 lg:mx-0 lg:max-w-none">
              <div
                className="animate-float relative w-full -rotate-2 drop-shadow-[0_22px_44px_-12px_rgba(0,0,0,0.55)] transition duration-300 hover:-translate-y-0.5"
                style={{
                  borderRadius: CARD_BLOB_RADIUS[0],
                  animationDelay: '0.35s'
                }}
              >
                <div className="relative aspect-[1370/2041] w-full overflow-hidden border-2 border-white/45 bg-white/[0.14] shadow-[0_16px_44px_-18px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-white/15 backdrop-blur-md [border-radius:inherit]">
                  <Image
                    src="/eiffel-tower.png"
                    alt={t('cardEiffelAlt')}
                    fill
                    className="object-cover object-top saturate-[1.05]"
                    sizes="(max-width: 1024px) 44vw, 240px"
                  />
                </div>
              </div>
              <div
                className="animate-float relative w-full rotate-2 drop-shadow-[0_22px_44px_-12px_rgba(0,0,0,0.55)] transition duration-300 hover:-translate-y-0.5"
                style={{
                  borderRadius: CARD_BLOB_RADIUS[1],
                  animationDelay: '0.85s'
                }}
              >
                <div className="relative aspect-[1692/2279] w-full overflow-hidden border-2 border-white/45 bg-white/[0.14] shadow-[0_16px_44px_-18px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-white/15 backdrop-blur-md [border-radius:inherit]">
                  <Image
                    src="/basketball-card.png"
                    alt={t('cardBasketballAlt')}
                    fill
                    className="object-cover object-top saturate-[1.05]"
                    sizes="(max-width: 1024px) 44vw, 260px"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 text-left">
              <p className="text-pretty text-[1.0625rem] leading-relaxed text-white/92 sm:text-lg">{t('lead')}</p>
              <p className="text-pretty text-[0.9375rem] leading-relaxed text-white/78 sm:text-base">{t('body')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
