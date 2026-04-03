import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPost, getBlogPosts } from '@/lib/blog'
import { BlogPostContent } from '@/components/BlogPost'
import { BlogCard } from '@/components/BlogCard'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamic = 'force-dynamic'

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

  const baseKeywords =
    post.locale === 'tr'
      ? ['tabu oyunu', 'kelime oyunu', 'kart oyunu', 'parti oyunu', 'Tadado']
      : ['taboo game', 'word game', 'card game', 'party game', 'Tadado']
  const allKeywords = [...baseKeywords, ...post.tags].join(', ')

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `https://tadado.app/tadado_launch.png`,
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
        url: 'https://tadado.app/tadado_launch.png'
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

function getFaqItems(locale: Locale) {
  if (locale === 'tr') {
    return [
      {
        q: 'Tadado bir tabu oyunu mu?',
        a: 'Tadado, Tabu/Taboo mantığını modernleştiren bir kelime ve kart oyunu deneyimidir. Yasaklı kelimeleri kullanmadan anlatır, takımınla hızlı tahmin yaparsın.'
      },
      {
        q: 'Tadado hangi kategoriye giriyor?',
        a: 'Tadado hem kelime bilme oyunu hem de kart oyunu kategorilerinde güçlü bir deneyim sunar. Grup oyunları ve parti oyunları için uygundur.'
      },
      {
        q: 'Tadado nasıl indirilir?',
        a: 'Tadado iPhone için App Store’da yer alır. Blog içindeki indirme bağlantısından doğrudan uygulama sayfasına gidebilirsin.'
      }
    ]
  }

  return [
    {
      q: 'Is Tadado a Taboo-style game?',
      a: 'Yes. Tadado modernizes the Taboo format with AI-generated cards and fast team rounds where you describe words without forbidden terms.'
    },
    {
      q: 'What category does Tadado belong to?',
      a: 'Tadado fits both word guessing game and card party game categories, making it a strong option for friend groups and game nights.'
    },
    {
      q: 'Where can I download Tadado?',
      a: 'Tadado is available on the App Store for iPhone. Use the links in this article to open the download page directly.'
    }
  ]
}

function createFaqSchema(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  }
}

function rankRelatedPosts(currentSlug: string, currentTags: string[], posts: ReturnType<typeof getBlogPosts>) {
  const currentSet = new Set(currentTags.map((tag) => tag.toLocaleLowerCase()))

  return posts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const overlap = post.tags.reduce((score, tag) => {
        return score + (currentSet.has(tag.toLocaleLowerCase()) ? 1 : 0)
      }, 0)
      return { post, overlap }
    })
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap
      const aTs = new Date(a.post.publishedAt).getTime()
      const bTs = new Date(b.post.publishedAt).getTime()
      return bTs - aTs
    })
    .slice(0, 2)
    .map((item) => item.post)
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params

  if (locale !== 'en' && locale !== 'tr') {
    notFound()
  }

  const typedLocale = locale as Locale
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'blog' })
  const post = getBlogPost(slug, typedLocale)

  if (!post) {
    notFound()
  }

  const schema = createArticleSchema(post)
  const faqItems = getFaqItems(typedLocale)
  const faqSchema = createFaqSchema(faqItems)
  const relatedPosts = rankRelatedPosts(post.slug, post.tags, getBlogPosts(typedLocale))

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="relative min-h-screen pt-32 pb-16 px-6 bg-zinc-950">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-violet-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-zinc-500">
              <li>
                <Link href={`/${locale}`} className="hover:text-zinc-50 transition-colors">
                  {t('breadcrumb.home')}
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-zinc-50 transition-colors">
                  {t('breadcrumb.blog')}
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-zinc-50 truncate" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          <BlogPostContent post={post} locale={locale} />

          <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h2 className="text-2xl font-semibold text-zinc-50 mb-4">
              {typedLocale === 'tr' ? 'Sık Sorulan Sorular' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
                  <h3 className="text-base font-semibold text-zinc-100">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {relatedPosts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-semibold text-zinc-50 mb-6">
                {typedLocale === 'tr' ? 'Benzer Yazılar' : 'Related Posts'}
              </h2>
              <div className="grid auto-rows-fr gap-5 sm:gap-6 md:grid-cols-2">
                {relatedPosts.map((related) => (
                  <BlogCard
                    key={`${related.slug}-${related.locale}`}
                    post={related}
                    locale={locale}
                    readArticleLabel={t('card.readArticle')}
                    minReadBadge={t('card.minRead', { count: related.readingTime })}
                    teamName={t('card.teamName')}
                  />
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 pt-8 border-t border-zinc-800">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
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
