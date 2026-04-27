import { MetadataRoute } from 'next'
import { getAllBlogSlugs } from '@/lib/blog'
import { locales } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tadado.app'

  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: `${baseUrl}/${locale}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/${locale}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/${locale}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5
    }
  ])

  // Blog posts: EN slugs are available under every UI locale (content falls back via getBlogContentLocale).
  // TR-only slugs are listed only for /tr to avoid 404s on de/fr/es.
  const slugEntries = getAllBlogSlugs()
  const enSlugs = new Set(slugEntries.filter((e) => e.locale === 'en').map((e) => e.slug))
  const blogPages: MetadataRoute.Sitemap = [
    ...[...enSlugs].flatMap((slug) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7
      }))
    ),
    ...slugEntries
      .filter((e) => e.locale === 'tr' && !enSlugs.has(e.slug))
      .map(({ slug }) => ({
        url: `${baseUrl}/tr/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7
      }))
  ]

  return [...staticPages, ...blogPages]
}
