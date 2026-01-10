import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'

type BlogCardProps = {
  post: BlogPost
  locale: string
}

export function BlogCard({ post, locale }: BlogCardProps) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <article className="group">
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="block rounded-2xl bg-white border border-zinc-200 p-6 hover:shadow-lg hover:border-indigo-300 transition-all duration-300"
      >
        <header className="mb-4">
          <time
            dateTime={post.publishedAt}
            className="text-sm text-zinc-500"
          >
            {publishedDate}
          </time>
          <h2 className="mt-2 text-xl font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">
            {post.title}
          </h2>
        </header>

        <p className="text-zinc-600 leading-relaxed mb-4 line-clamp-2">
          {post.description}
        </p>

        <footer className="flex items-center justify-between pt-4 border-t border-zinc-100">
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <span>{post.readingTime} {locale === 'tr' ? 'dakika okuma' : 'min read'}</span>
            {post.tags.length > 0 && (
              <>
                <span>•</span>
                <span className="truncate">{post.tags.slice(0, 2).join(', ')}</span>
              </>
            )}
          </div>
          <span className="text-indigo-600 font-medium text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            {locale === 'tr' ? 'Devamını Oku' : 'Read More'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </footer>
      </Link>
    </article>
  )
}
