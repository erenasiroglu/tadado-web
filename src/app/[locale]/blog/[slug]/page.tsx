import { setRequestLocale } from 'next-intl/server'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPost, getBlogPostsForIndex, type BlogPost } from '@/lib/blog'
import { BlogPostContent } from '@/components/BlogPost'
import { BlogCard } from '@/components/BlogCard'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { getBlogContentLocale } from '@/i18n/blog-locale'
import { getBlogIndexCardCopy, type BlogIndexCardMessages } from '@/lib/blog-index-display'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params

  const contentLocale = getBlogContentLocale(locale)
  const post = getBlogPost(slug, contentLocale)

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

function createArticleSchema(post: ReturnType<typeof getBlogPost>, pageLocale: string) {
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
      '@id': `https://tadado.app/${pageLocale}/blog/${post.slug}`
    },
    keywords: allKeywords,
    articleSection: 'Word Games',
    about: {
      '@type': 'Thing',
      name: 'Word Games'
    }
  }
}

function getFaqItems(contentLocale: 'en' | 'tr') {
  if (contentLocale === 'tr') {
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

function rankRelatedPosts(currentSlug: string, currentTags: string[], posts: BlogPost[]) {
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

  const typedLocale = locale as Locale
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'blog' })
  const messages = await getMessages()
  const indexCards = (messages.blog as { indexCards?: BlogIndexCardMessages } | undefined)?.indexCards
  const contentLocale = getBlogContentLocale(typedLocale)
  const post = getBlogPost(slug, contentLocale)

  if (!post) {
    notFound()
  }

  const schema = createArticleSchema(post, locale)
  const faqItems = getFaqItems(contentLocale)
  const faqSchema = createFaqSchema(faqItems)
  const relatedPosts = rankRelatedPosts(post.slug, post.tags, getBlogPostsForIndex(contentLocale))

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

      <main className="relative min-h-screen bg-gradient-to-b from-[#f8f8fc] via-white to-[#ececf4] px-6 pb-20 pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute left-1/4 top-0 h-[480px] w-[480px] -translate-x-1/3 rounded-full bg-gradient-to-br from-[#3F3EDD]/10 to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 rounded-full bg-gradient-to-tl from-[#6366f1]/10 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-zinc-500">
              <li>
                <Link href={`/${locale}`} className="font-medium transition-colors hover:text-[#3F3EDD]">
                  {t('breadcrumb.home')}
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="font-medium transition-colors hover:text-[#3F3EDD]">
                  {t('breadcrumb.blog')}
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="truncate font-medium text-zinc-800" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          <BlogPostContent
            post={post}
            locale={locale}
            updatedLabel={t('article.updated')}
            minReadLabel={t('card.minRead', { count: post.readingTime })}
            tagsHeading={t('article.tags')}
          />

          <section className="mt-12 rounded-2xl border border-zinc-200/90 bg-white/70 p-6 shadow-[0_12px_40px_-20px_rgba(63,62,221,0.12)] backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">
              {t('faqTitle')}
            </h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-4">
                  <h3 className="text-base font-semibold text-zinc-900">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {relatedPosts.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-zinc-900">
                {t('relatedTitle')}
              </h2>
              <div className="grid auto-rows-fr gap-5 sm:gap-6 md:grid-cols-2">
                {relatedPosts.map((related) => {
                  const { title: displayTitle, description: displayDescription } = getBlogIndexCardCopy(
                    related,
                    indexCards
                  )
                  return (
                    <BlogCard
                      key={`${related.slug}-${related.locale}`}
                      post={related}
                      locale={locale}
                      readArticleLabel={t('card.readArticle')}
                      minReadBadge={t('card.minRead', { count: related.readingTime })}
                      teamName={t('card.teamName')}
                      displayTitle={displayTitle}
                      displayDescription={displayDescription}
                    />
                  )
                })}
              </div>
            </section>
          )}

          <div className="mt-12 border-t border-zinc-200/90 pt-8">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#3F3EDD] transition-colors hover:text-[#2f2eb8]"
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
