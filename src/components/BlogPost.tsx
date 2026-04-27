import Image from 'next/image'
import type { BlogPost } from '@/lib/blog'
import { uiDateLocaleTag } from '@/i18n/blog-locale'

type BlogPostProps = {
  post: BlogPost
  locale: string
  updatedLabel: string
  minReadLabel: string
  tagsHeading: string
}

export function BlogPostContent({ post, locale, updatedLabel, minReadLabel, tagsHeading }: BlogPostProps) {
  const dateTag = uiDateLocaleTag(locale)
  const publishedDate = new Date(post.publishedAt).toLocaleDateString(dateTag, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const updatedDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString(dateTag, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  return (
    <article className="max-w-none">
      <header className="mb-8 border-b border-zinc-200/90 pb-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
          <time dateTime={post.publishedAt}>{publishedDate}</time>
          {updatedDate && (
            <>
              <span>•</span>
              <time dateTime={post.updatedAt}>
                {updatedLabel}: {updatedDate}
              </time>
            </>
          )}
          <span>•</span>
          <span>{minReadLabel}</span>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
            <Image
              src="/tadado_launch.png"
              alt={post.author.name}
              fill
              sizes="(max-width: 640px) 56px, 64px"
              quality={92}
              className="object-contain object-left"
            />
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
        <footer className="mt-12 border-t border-zinc-200/90 pt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-900">
            {tagsHeading}
          </h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 transition-colors hover:bg-[#3F3EDD]/10 hover:text-[#3F3EDD]"
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
