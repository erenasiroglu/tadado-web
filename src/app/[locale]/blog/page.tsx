import { setRequestLocale } from 'next-intl/server'
import { getMessages, getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { getBlogPostsForIndex } from '@/lib/blog'
import { BlogCard } from '@/components/BlogCard'
import { getBlogContentLocale } from '@/i18n/blog-locale'
import { getBlogIndexCardCopy, type BlogIndexCardMessages } from '@/lib/blog-index-display'

type Props = {
  params: Promise<{ locale: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
      locale
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description')
    },
    alternates: {
      canonical: `/${locale}/blog`
    }
  }
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params

  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'blog' })
  const messages = await getMessages()
  const indexCards = (messages.blog as { indexCards?: BlogIndexCardMessages } | undefined)?.indexCards
  const contentLocale = getBlogContentLocale(locale)
  const posts = getBlogPostsForIndex(contentLocale)

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#f8f8fc] via-white to-[#ececf4] px-6 pb-20 pt-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/4 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#3F3EDD]/12 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] translate-x-1/4 rounded-full bg-gradient-to-tl from-[#6366f1]/10 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <Link
          href={`/${locale}`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-[#3F3EDD]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('backHome')}
        </Link>

        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
            {t('heading')}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-600">
            {t('subtitle')}
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-200/90 bg-white/70 px-8 py-16 shadow-[0_20px_50px_-24px_rgba(63,62,221,0.15)] backdrop-blur-sm">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3F3EDD]/10">
              <svg className="h-8 w-8 text-[#3F3EDD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-zinc-900">
              {t('empty.title')}
            </h2>
            <p className="max-w-sm text-center text-zinc-600">
              {t('empty.description')}
            </p>
          </div>
        ) : (
          <section className="grid auto-rows-fr gap-5 sm:gap-6 md:grid-cols-2">
            {posts.map((post) => {
              const { title: displayTitle, description: displayDescription } = getBlogIndexCardCopy(
                post,
                indexCards
              )
              return (
                <BlogCard
                  key={`${post.slug}-${post.locale}`}
                  post={post}
                  locale={locale}
                  readArticleLabel={t('card.readArticle')}
                  minReadBadge={t('card.minRead', { count: post.readingTime })}
                  teamName={t('card.teamName')}
                  displayTitle={displayTitle}
                  displayDescription={displayDescription}
                />
              )
            })}
          </section>
        )}
      </div>
    </main>
  )
}
