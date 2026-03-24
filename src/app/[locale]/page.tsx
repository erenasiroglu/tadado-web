import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Hero } from '@/components/Hero'
import { HowItWorksSection } from '@/components/HowItWorksSection'
import { AIFeatureSection } from '@/components/AIFeatureSection'
import { HomeJsonLd } from '@/components/HomeJsonLd'

type Props = {
  params: Promise<{ locale: string }>
}

const baseUrl = 'https://tadado.app'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  const title = t('title')
  const description = t('description')
  const keywordsRaw = t('keywords')
  const keywords = keywordsRaw
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)

  return {
    title: {
      absolute: title
    },
    description,
    keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        tr: `${baseUrl}/tr`,
        'x-default': `${baseUrl}/en`
      }
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: 'Tadado',
      locale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    },
    robots: {
      index: true,
      follow: true
    }
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const tMeta = await getTranslations({ locale, namespace: 'metadata' })

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950">
      <HomeJsonLd
        locale={locale}
        name={tMeta('jsonLdApplicationName')}
        description={tMeta('description')}
        featureList={tMeta.raw('jsonLdFeatures') as string[]}
      />
      <Hero />
      <AIFeatureSection />
      <HowItWorksSection />
    </main>
  )
}
