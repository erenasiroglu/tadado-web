import { getTranslations, getLocale } from 'next-intl/server'
import Image from 'next/image'
import { APP_STORE_URLS } from '@/lib/constants'
import { poppinsBlackItalic } from '@/lib/fonts'
import { heroRhythm, landing } from '@/lib/landing-ui'

export async function Hero() {
  const t = await getTranslations('hero')
  const locale = await getLocale()

  const appStoreUrl = APP_STORE_URLS[locale as keyof typeof APP_STORE_URLS] ?? APP_STORE_URLS.en

  return (
    <section className={`${landing.section} relative flex min-h-screen items-center justify-center overflow-hidden`}>
      {/* Base gradient — fotoğraf yüklenene kadar / kenarlarda yedek */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-b from-[#3F3EDD] to-[#1B1A85]"
        aria-hidden
      />

      {/* Hafif üst derinlik — düz gradient üzerinde tipografi için */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/[0.12] via-transparent to-black/[0.08]"
        aria-hidden
      />

      {/* Arka plan şekilleri: mesh ışık, ızgara, halkalar — modern, düşük kontrast, CTA odaklı */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
        aria-hidden
      >
        {/* Yumuşak ışık blob’ları */}
        <div
          className="animate-hero-mesh absolute -left-[18%] top-[5%] h-[min(92vw,560px)] w-[min(92vw,560px)] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.42)_0%,rgba(99,102,241,0.12)_45%,transparent_70%)] blur-3xl sm:-left-[10%]"
        />
        <div
          className="animate-hero-mesh-slow absolute -right-[12%] top-[28%] h-[min(78vw,480px)] w-[min(78vw,480px)] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.38)_0%,rgba(63,62,221,0.1)_48%,transparent_72%)] blur-3xl"
        />
        <div
          className="animate-hero-mesh absolute bottom-[-8%] left-[20%] h-[min(65vw,420px)] w-[min(65vw,420px)] rounded-full bg-[radial-gradient(circle,rgba(196,181,253,0.22)_0%,transparent_65%)] blur-3xl [animation-delay:-11s]"
        />

        {/* İnce konsantrik halkalar — merkezde hafif “sahne” */}
        <div className="absolute left-1/2 top-[42%] h-[min(120vw,900px)] w-[min(120vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.055]" />
        <div className="absolute left-1/2 top-[42%] h-[min(95vw,720px)] w-[min(95vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
        <div className="absolute left-1/2 top-[42%] h-[min(72vw,540px)] w-[min(72vw,540px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]" />

        {/* Çok yavaş dönen ince halka parçası (üst yarı görünür) */}
        <div className="absolute left-1/2 top-[42%] h-[min(88vw,640px)] w-[min(88vw,640px)] -translate-x-1/2 -translate-y-1/2">
          <div
            className="animate-hero-orbit absolute inset-0 rounded-full border-t border-r border-white/[0.07] border-b-transparent border-l-transparent"
            style={{ borderWidth: '1px' }}
          />
        </div>

        {/* Köşe “cam” paneller — premium his, düşük opaklık */}
        <div className="absolute -left-16 top-[18%] hidden h-52 w-36 rotate-[14deg] rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-transparent shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] backdrop-blur-[1px] md:block lg:h-60 lg:w-44" />
        <div className="absolute -right-12 top-[22%] hidden h-44 w-32 -rotate-[12deg] rounded-[1.75rem] border border-white/[0.07] bg-gradient-to-bl from-white/[0.05] to-transparent shadow-[0_20px_50px_-18px_rgba(0,0,0,0.3)] backdrop-blur-[1px] md:block lg:h-52 lg:w-40" />
        <div className="absolute bottom-[12%] left-[8%] hidden h-24 w-[11rem] rotate-[-8deg] rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-[1px] lg:block" />
      </div>

      {/* Dekor kartlar + sağ altta sosyal “baloncuk” */}
      <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
        <div
          className="absolute left-[4%] top-20 h-40 w-28 rotate-[-14deg] animate-float opacity-80 drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] sm:left-[6%] sm:h-48 sm:w-36 sm:opacity-90 md:top-24 md:h-56 md:w-40 md:opacity-95 lg:h-64 lg:w-44"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="relative h-full w-full brightness-105 contrast-105">
            <Image src="/basketball-card.png" alt="" fill className="object-contain" />
          </div>
        </div>
        <div
          className="absolute right-[4%] top-28 h-36 w-24 rotate-[10deg] animate-float opacity-80 drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] sm:right-[6%] sm:h-44 sm:w-32 sm:opacity-90 md:top-32 md:h-52 md:w-36 md:opacity-95 lg:h-60 lg:w-40"
          style={{ animationDelay: '1s' }}
        >
          <div className="relative h-full w-full brightness-105 contrast-105">
            <Image src="/midnight-fun-card.png" alt="" fill className="object-contain" />
          </div>
        </div>
        <div
          className="absolute bottom-24 left-[6%] hidden h-40 w-28 rotate-[12deg] animate-float opacity-80 drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] sm:bottom-28 md:block md:h-48 md:w-36 md:opacity-95 lg:bottom-32 lg:h-56 lg:w-40"
          style={{ animationDelay: '1.2s' }}
        >
          <div className="relative h-full w-full brightness-105 contrast-105">
            <Image src="/eiffel-tower.png" alt="" fill className="object-contain" />
          </div>
        </div>
        <div
          className="absolute bottom-16 right-[3%] h-28 w-28 rotate-[-6deg] animate-float opacity-90 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] sm:bottom-20 sm:h-32 sm:w-32 sm:right-[4%] md:bottom-24 md:h-40 md:w-40 md:rotate-[-4deg] lg:bottom-28 lg:h-44 lg:w-44"
          style={{
            animationDelay: '1.35s',
            borderRadius: '63% 37% 58% 42% / 48% 52% 48% 52%'
          }}
        >
          <div className="relative h-full w-full overflow-hidden border-2 border-white/35 bg-[#1B1A85]/40 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] ring-1 ring-white/15 [border-radius:inherit]">
            <Image
              src="/tadado-play-people.png"
              alt=""
              fill
              className="object-cover object-[center_62%_65%] saturate-[1.08] contrast-[1.05]"
              sizes="(max-width: 768px) 112px, 176px"
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
              src="/tadado-mascot.png"
              alt=""
              fill
              className="object-contain object-bottom drop-shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 240px, 288px"
              priority
            />
          </div>
        </div>

        <h1
          className={`${poppinsBlackItalic.className} ${heroRhythm.mascotToTitle} mx-auto w-full max-w-[min(100%,36rem)] text-[clamp(2.125rem,6.2vw,5rem)] leading-[1.04] tracking-[-0.03em] text-white [text-shadow:0_2px_28px_rgba(27,26,133,0.9),0_1px_3px_rgba(0,0,0,0.35)] animate-in fade-in slide-in-from-bottom-5 duration-700 whitespace-pre-line sm:max-w-4xl md:max-w-5xl lg:max-w-[72rem] lg:text-[clamp(2.5rem,5.2vw,5.25rem)]`}
          style={{ animationDelay: '180ms', animationFillMode: 'both' }}
        >
          {t('title')}
        </h1>

        <p
          className={`mx-auto ${heroRhythm.titleToLead} w-full max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/95 [text-shadow:0_1px_20px_rgba(27,26,133,0.85),0_1px_2px_rgba(0,0,0,0.3)] md:max-w-3xl md:text-xl md:leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500`}
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
