import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog'
import { BlogPostContent } from '@/components/BlogPost'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return getAllBlogSlugs()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params

  if (locale !== 'en' && locale !== 'tr') {
    return {}
  }

  const post = getBlogPost(slug, locale as Locale)

  if (!post) {
    return {}
  }

  const url = `https://tadado.app/${locale}/blog/${slug}`

  return {
    title: `Tadado | ${post.title}`,
    description: post.description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: `Tadado | ${post.title}`,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      url,
      locale
    },
    twitter: {
      card: 'summary_large_image',
      title: `Tadado | ${post.title}`,
      description: post.description
    }
  }
}

function createArticleSchema(post: ReturnType<typeof getBlogPost>) {
  if (!post) return null

  const baseKeywords = ['word game', 'mobile game', 'party game', 'Tadado']
  const allKeywords = [...baseKeywords, ...post.tags].join(', ')

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `https://tadado.app/og-image.jpg`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tadado',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tadado.app/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://tadado.app/${post.locale}/blog/${post.slug}`
    },
    keywords: allKeywords,
    articleSection: 'Word Games',
    about: {
      '@type': 'Thing',
      name: 'Word Games'
    }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params

  if (locale !== 'en' && locale !== 'tr') {
    notFound()
  }

  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'blog' })
  const post = getBlogPost(slug, locale as Locale)

  if (!post) {
    notFound()
  }

  const schema = createArticleSchema(post)

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <main className="relative min-h-screen pt-32 pb-16 px-6">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-orange-100/30 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-zinc-500">
              <li>
                <Link href={`/${locale}`} className="hover:text-zinc-900 transition-colors">
                  {t('breadcrumb.home')}
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-zinc-900 transition-colors">
                  {t('breadcrumb.blog')}
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-zinc-900 truncate" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          <BlogPostContent post={post} locale={locale} />

          <div className="mt-12 pt-8 border-t border-zinc-200">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('backToBlog')}
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
