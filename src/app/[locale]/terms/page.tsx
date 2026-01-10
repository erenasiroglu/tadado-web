import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })

  return {
    title: t('title'),
    description: t('description')
  }
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'terms' })

  return (
    <main className="relative min-h-screen pt-32 pb-16 px-6">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-orange-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      <article className="relative z-10 max-w-3xl mx-auto">
        <Link 
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('backHome')}
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
          {t('heading')}
        </h1>
        
        <p className="text-zinc-500 mb-12">
          {t('lastUpdated')}: January 10, 2026
        </p>

        <div className="prose prose-zinc max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">{t('sections.acceptance.title')}</h2>
            <p className="text-zinc-600 leading-relaxed">{t('sections.acceptance.content')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">{t('sections.license.title')}</h2>
            <p className="text-zinc-600 leading-relaxed">{t('sections.license.content')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">{t('sections.userConduct.title')}</h2>
            <p className="text-zinc-600 leading-relaxed">{t('sections.userConduct.content')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">{t('sections.intellectual.title')}</h2>
            <p className="text-zinc-600 leading-relaxed">{t('sections.intellectual.content')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">{t('sections.disclaimer.title')}</h2>
            <p className="text-zinc-600 leading-relaxed">{t('sections.disclaimer.content')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">{t('sections.inAppPurchases.title')}</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">{t('sections.inAppPurchases.content')}</p>
            <p className="text-zinc-600 leading-relaxed">
              {t('sections.inAppPurchases.guidelines')}{' '}
              <a
                href="https://developer.apple.com/app-store/in-app-purchases/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 underline"
              >
                {t('sections.inAppPurchases.linkText')}
              </a>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">{t('sections.changes.title')}</h2>
            <p className="text-zinc-600 leading-relaxed">{t('sections.changes.content')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">{t('sections.contact.title')}</h2>
            <p className="text-zinc-600 leading-relaxed">{t('sections.contact.content')}</p>
          </section>
        </div>
      </article>
    </main>
  )
}
