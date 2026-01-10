import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog'
import { BlogCard } from '@/components/BlogCard'
import type { Locale } from '@/i18n/config'

type Props = {
  params: Promise<{ locale: string }>
}

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

  if (locale !== 'en' && locale !== 'tr') {
    notFound()
  }

  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'blog' })
  const posts = getBlogPosts(locale as Locale)

  return (
    <main className="relative min-h-screen pt-32 pb-16 px-6">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-emerald-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-indigo-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('backHome')}
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
            {t('heading')}
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl">
            {t('subtitle')}
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 rounded-3xl bg-white border border-zinc-200 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2">
              {t('empty.title')}
            </h2>
            <p className="text-zinc-500 text-center max-w-sm">
              {t('empty.description')}
            </p>
          </div>
        ) : (
          <section className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={`${post.slug}-${post.locale}`} post={post} locale={locale} />
            ))}
          </section>
        )}
      </div>
    </main>
  )
}
