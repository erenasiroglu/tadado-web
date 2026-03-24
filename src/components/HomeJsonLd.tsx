import { APP_STORE_URLS } from '@/lib/constants'

type Props = {
  locale: string
  name: string
  description: string
  featureList: string[]
}

export function HomeJsonLd({ locale, name, description, featureList }: Props) {
  const appStoreUrl = APP_STORE_URLS[locale as keyof typeof APP_STORE_URLS] ?? APP_STORE_URLS.en
  const pageUrl = `https://tadado.app/${locale}`
  const features = Array.isArray(featureList)
    ? featureList.filter((item) => typeof item === 'string' && item.trim().length > 0)
    : []

  const mobileApp = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name,
    description,
    ...(features.length > 0 ? { featureList: features } : {}),
    url: pageUrl,
    applicationCategory: 'GameApplication',
    operatingSystem: 'iOS',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    downloadUrl: appStoreUrl,
    author: {
      '@type': 'Organization',
      name: 'Tadado',
      url: 'https://tadado.app'
    }
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tadado',
    url: 'https://tadado.app',
    inLanguage: locale === 'tr' ? 'tr' : 'en',
    publisher: {
      '@type': 'Organization',
      name: 'Tadado',
      url: 'https://tadado.app'
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mobileApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  )
}
