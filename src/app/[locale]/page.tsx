import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Hero } from '@/components/Hero'
import { GameplaySection } from '@/components/GameplaySection'
import { HowItWorksSection } from '@/components/HowItWorksSection'
import { GameMomentsSection } from '@/components/GameMomentsSection'
import { TadadoUltraSection } from '@/components/TadadoUltraSection'
import { AIFeatureSection } from '@/components/AIFeatureSection'
import { SocialSection } from '@/components/SocialSection'
import { FinalCTASection } from '@/components/FinalCTASection'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description')
    }
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950">
      <Hero />
      <GameplaySection />
      <HowItWorksSection />
      <GameMomentsSection />
      <TadadoUltraSection />
      <AIFeatureSection />
      <SocialSection />
      <FinalCTASection />
    </main>
  )
}
