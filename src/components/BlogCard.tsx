import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'

type BlogCardProps = {
  post: BlogPost
  locale: string
  readArticleLabel: string
  minReadBadge: string
  teamName: string
}

export function BlogCard({ post, locale, readArticleLabel, minReadBadge, teamName }: BlogCardProps) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const tagLine = post.tags.slice(0, 2).join(', ')

  return (
    <article className="group flex h-full min-h-0">
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="flex h-full min-h-0 w-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6 outline-none transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        <header className="mb-4">
          <time dateTime={post.publishedAt} className="text-sm text-zinc-500">
            {publishedDate}
          </time>
          <h2 className="mt-2 text-xl font-bold leading-snug text-zinc-50 transition-colors group-hover:text-indigo-400">
            {post.title}
          </h2>
        </header>

        <p className="mb-4 line-clamp-2 flex-1 leading-relaxed text-zinc-400">{post.description}</p>

        <div className="mb-4 flex min-w-0 items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 sm:h-14 sm:w-14">
            <Image
              src="/tadado_team.png"
              alt=""
              width={112}
              height={112}
              quality={92}
              className="h-full w-full object-contain object-left"
            />
          </div>
          <span className="min-w-0 text-sm font-medium leading-snug text-zinc-300">{teamName}</span>
        </div>

        <footer className="mt-auto flex flex-col gap-3 border-t border-zinc-800 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 text-sm text-zinc-500">
            <span className="shrink-0">{minReadBadge}</span>
            {tagLine ? (
              <>
                <span className="shrink-0 text-zinc-600" aria-hidden>
                  •
                </span>
                <span className="min-w-0 truncate">{tagLine}</span>
              </>
            ) : null}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 self-end text-sm font-medium text-indigo-400 transition-transform group-hover:translate-x-1 sm:self-auto">
            {readArticleLabel}
            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </footer>
      </Link>
    </article>
  )
}
