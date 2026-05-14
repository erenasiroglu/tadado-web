import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { APP_STORE_URLS, PRODUCT_HUNT_URL } from '@/lib/constants'
import { locales, type Locale } from '@/i18n/config'
import { Topbar } from '@/components/Topbar'
import { Footer } from '@/components/Footer'
import { ProductHuntBanner } from '@/components/ProductHuntBanner'
import { MobileStickyCta } from '@/components/MobileStickyCta'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tadado',
    url: 'https://tadado.app',
    logo: 'https://tadado.app/tadado_launch.png',
    description:
      'Tadado is an AI party guessing game for iPhone: describe words without forbidden hints, play themed decks with friends, and keep game night fresh with AI-generated cards.',
    sameAs: [APP_STORE_URLS.en, APP_STORE_URLS.tr, PRODUCT_HUNT_URL],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'privacy@tadado.app'
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@tadado.app'
      }
    ],
    keywords: 'word game, mobile game, party game, AI game, word guessing game, mobile word games, party games, interactive word game'
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  const organizationSchema = createOrganizationSchema()

  return (
    <NextIntlClientProvider messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <ProductHuntBanner />
      <Topbar />
      {children}
      <Footer />
      <MobileStickyCta />
    </NextIntlClientProvider>
  )
}
