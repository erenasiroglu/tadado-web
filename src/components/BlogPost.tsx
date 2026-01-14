import type { BlogPost } from '@/lib/blog'

type BlogPostProps = {
  post: BlogPost
  locale: string
}

export function BlogPostContent({ post, locale }: BlogPostProps) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const updatedDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  return (
    <article className="prose prose-zinc max-w-none">
      <header className="mb-8 pb-8 border-b border-zinc-200">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
          <time dateTime={post.publishedAt}>{publishedDate}</time>
          {updatedDate && (
            <>
              <span>•</span>
              <time dateTime={post.updatedAt}>
                {locale === 'tr' ? 'Güncellendi' : 'Updated'}: {updatedDate}
              </time>
            </>
          )}
          <span>•</span>
          <span>{post.readingTime} {locale === 'tr' ? 'dakika okuma' : 'min read'}</span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="8" r="4" fill="#6366f1" />
              <path
                d="M5 20c0-4.418 3.582-8 8-8s8 3.582 8 8"
                stroke="#6366f1"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <div>
            <div className="font-medium text-zinc-900">{post.author.name}</div>
            <div className="text-sm text-zinc-500">{post.author.role}</div>
          </div>
        </div>
      </header>

      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.tags.length > 0 && (
        <footer className="mt-12 pt-8 border-t border-zinc-200">
          <h2 className="text-sm font-semibold text-zinc-900 mb-3 uppercase tracking-wide">
            {locale === 'tr' ? 'Etiketler' : 'Tags'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-sm hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </footer>
      )}
    </article>
  )
}
