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
    }
  ])

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = getAllBlogSlugs().map(({ slug, locale }) => ({
    url: `${baseUrl}/${locale}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7
  }))

  return [...staticPages, ...blogPages]
}
