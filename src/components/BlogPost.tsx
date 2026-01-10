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
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
            {post.author.name.charAt(0)}
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
