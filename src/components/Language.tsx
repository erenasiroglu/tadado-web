import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import type { Locale } from '@/i18n/config'
import { poppinsBlackItalic } from '@/lib/fonts'

const FLAG_ASSETS = [
  { src: '/england-flag.png', labelKey: 'langEn' as const, locale: 'en' as const satisfies Locale },
  { src: '/french-flag.png', labelKey: 'langFr' as const, locale: 'fr' as const satisfies Locale },
  { src: '/deutschland-flag.png', labelKey: 'langDe' as const, locale: 'de' as const satisfies Locale },
  { src: '/espana-flag.png', labelKey: 'langEs' as const, locale: 'es' as const satisfies Locale },
  { src: '/turkish-flag.png', labelKey: 'langTr' as const, locale: 'tr' as const satisfies Locale }
] as const

/** Hero’daki people baloncuğu ile aynı mantık — hafif varyasyon */
const BLOB_RADIUS = [
  '63% 37% 58% 42% / 48% 52% 48% 52%',
  '58% 42% 55% 45% / 52% 48% 50% 50%',
  '55% 45% 62% 38% / 48% 52% 52% 48%',
  '60% 40% 48% 52% / 50% 50% 48% 52%',
  '57% 43% 58% 42% / 52% 48% 50% 50%'
] as const

export async function Language() {
  const t = await getTranslations('languageShowcase')

  return (
    <section
      className="relative overflow-x-clip bg-gradient-to-b from-[#DDDDE9] to-[#CECED8] py-16 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pb-[max(3rem,env(safe-area-inset-bottom,0px))] pt-16 sm:px-6 sm:py-20 md:py-28"
      aria-labelledby="language-showcase-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.55)_0%,transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="language-showcase-heading"
            className={`${poppinsBlackItalic.className} text-[clamp(1.75rem,5vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-zinc-900 whitespace-pre-line`}
          >
            {t('title')}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-zinc-600 md:mt-6 md:text-lg md:leading-relaxed">
            {t('subtitle')}
          </p>
        </header>

        <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 place-items-stretch gap-x-6 gap-y-10 sm:mt-16 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-12 md:mt-20 md:grid-cols-5 md:gap-x-5 md:gap-y-10">
          {FLAG_ASSETS.map(({ src, labelKey, locale }, i) => (
            <li key={src} className="flex w-full max-w-[10rem] justify-center sm:max-w-[11rem]">
              <Link
                href="/"
                locale={locale}
                aria-label={t(labelKey)}
                className="flex min-h-[48px] w-full flex-col items-center justify-center rounded-2xl py-2 outline-none transition active:opacity-90 hover:opacity-95 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-[#3F3EDD]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#DDDDE9] sm:min-h-0 sm:py-0"
              >
                <div
                  className={`group relative aspect-square w-full max-w-[7.75rem] cursor-pointer drop-shadow-[0_16px_36px_-8px_rgba(15,23,42,0.28)] transition duration-300 hover:-translate-y-1 hover:drop-shadow-[0_22px_44px_-10px_rgba(15,23,42,0.32)] sm:max-w-[8.5rem] md:max-w-[9.25rem] ${i % 2 === 0 ? '-rotate-2' : 'rotate-2'} animate-float`}
                  style={{
                    borderRadius: BLOB_RADIUS[i],
                    animationDelay: `${0.65 + i * 0.12}s`
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden border-2 border-white/60 bg-white/45 shadow-[0_12px_36px_-10px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.75)] ring-1 ring-zinc-900/10 [border-radius:inherit]">
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-contain object-center p-2.5 saturate-[1.06] contrast-[1.03] transition duration-300 group-hover:saturate-[1.1] sm:p-3"
                      sizes="(max-width: 768px) 33vw, 148px"
                    />
                  </div>
                </div>
                <span className="mt-3.5 text-center text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500 md:text-[0.7rem]">
                  {t(labelKey)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
