import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import { Topbar } from '@/components/Topbar'
import { Footer } from '@/components/Footer'

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
    logo: 'https://tadado.app/logo.png',
    description: 'Tadado is a modern word game mobile app that revolutionizes party games with AI-powered cards, personalized categories, and engaging gameplay.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'privacy@tadado.app'
    },
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
      <Topbar />
      {children}
      <Footer />
    </NextIntlClientProvider>
  )
}
