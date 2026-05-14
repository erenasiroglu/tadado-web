import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { homeScreenGradientBackgroundImage } from '@/lib/home-screen-gradient'
import { poppinsBlackItalic } from '@/lib/fonts'
import { MeetTadoAccentShapes } from '@/components/MeetTadoAccentShapes'
import { Reveal } from '@/components/motion/Reveal'
import { RevealStagger, RevealItem } from '@/components/motion/RevealStagger'

const CARD_BLOB_RADIUS = [
  '63% 37% 58% 42% / 48% 52% 48% 52%',
  '55% 45% 62% 38% / 48% 52% 52% 48%'
] as const

export async function MeetTado() {
  const t = await getTranslations('meetTado')

  return (
    <section
      id="meet-tado"
      aria-labelledby="meet-tado-heading"
      className="relative overflow-x-clip overflow-y-visible py-[var(--space-section)] pl-[max(var(--space-container),env(safe-area-inset-left,0px))] pr-[max(var(--space-container),env(safe-area-inset-right,0px))]"
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
        <div className="grid items-start gap-[var(--space-6)] sm:gap-[var(--space-7)] lg:grid-cols-2 lg:gap-x-[var(--space-9)] lg:gap-y-0">
          <Reveal as="div" className="mx-auto flex w-full max-w-[min(100%,17.5rem)] flex-col items-center gap-[var(--space-5)] text-center sm:max-w-[19rem] md:max-w-[21rem] lg:mx-0 lg:max-w-[min(100%,24rem)] lg:items-start lg:text-left xl:max-w-[26.5rem]">
            <h2
              id="meet-tado-heading"
              className={`${poppinsBlackItalic.className} w-full whitespace-pre-line text-[length:var(--text-display)] leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-white drop-shadow-[0_4px_36px_rgba(0,0,0,0.28)]`}
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
          </Reveal>

          <div className="flex flex-col gap-[var(--space-6)] lg:gap-[var(--space-7)]">
            <RevealStagger
              as="div"
              stagger={0.12}
              y={32}
              className="mx-auto grid w-full max-w-xl grid-cols-2 gap-[var(--space-4)] sm:max-w-none sm:gap-[var(--space-5)] md:gap-[var(--space-6)] lg:mx-0 lg:max-w-none"
            >
              <RevealItem
                as="div"
                className="animate-float relative w-full -rotate-2 drop-shadow-[0_22px_44px_-12px_rgba(0,0,0,0.55)] transition duration-300 hover:-translate-y-0.5"
              >
                <div
                  className="relative aspect-[1370/2041] w-full overflow-hidden border-2 border-white/45 bg-white/[0.14] shadow-[var(--shadow-card)] ring-1 ring-white/15 backdrop-blur-md"
                  style={{ borderRadius: CARD_BLOB_RADIUS[0] }}
                >
                  <Image
                    src="/eiffel-tower.png"
                    alt={t('cardEiffelAlt')}
                    fill
                    className="object-cover object-top saturate-[1.05]"
                    sizes="(max-width: 1024px) 44vw, 240px"
                  />
                </div>
              </RevealItem>
              <RevealItem
                as="div"
                className="animate-float relative w-full rotate-2 drop-shadow-[0_22px_44px_-12px_rgba(0,0,0,0.55)] transition duration-300 hover:-translate-y-0.5"
              >
                <div
                  className="relative aspect-[1692/2279] w-full overflow-hidden border-2 border-white/45 bg-white/[0.14] shadow-[var(--shadow-card)] ring-1 ring-white/15 backdrop-blur-md"
                  style={{ borderRadius: CARD_BLOB_RADIUS[1] }}
                >
                  <Image
                    src="/basketball-card.png"
                    alt={t('cardBasketballAlt')}
                    fill
                    className="object-cover object-top saturate-[1.05]"
                    sizes="(max-width: 1024px) 44vw, 260px"
                  />
                </div>
              </RevealItem>
            </RevealStagger>

            <RevealStagger as="div" stagger={0.1} y={20} delayChildren={0.1} className="space-y-[var(--space-4)] text-left">
              <RevealItem as="p" className="text-pretty text-[length:var(--text-lg)] leading-[var(--leading-body)] font-[var(--weight-body)] text-white/92">
                {t('lead')}
              </RevealItem>
              <RevealItem as="p" className="text-pretty text-[length:var(--text-base)] leading-[var(--leading-body)] font-[var(--weight-body)] text-white/78">
                {t('body')}
              </RevealItem>
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  )
}
