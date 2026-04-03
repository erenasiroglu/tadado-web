import Image from 'next/image'
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
      <header className="mb-8 pb-8 border-b border-zinc-800">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-50 mb-4">
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

        <div className="mt-4 flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
            <Image
              src="/tadado_team.png"
              alt={post.author.name}
              fill
              sizes="(max-width: 640px) 56px, 64px"
              quality={92}
              className="object-contain object-left"
            />
          </div>
          <div>
            <div className="font-medium text-zinc-50">{post.author.name}</div>
            <div className="text-sm text-zinc-500">{post.author.role}</div>
          </div>
        </div>
      </header>

      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.tags.length > 0 && (
        <footer className="mt-12 pt-8 border-t border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-50 mb-3 uppercase tracking-wide">
            {locale === 'tr' ? 'Etiketler' : 'Tags'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
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
