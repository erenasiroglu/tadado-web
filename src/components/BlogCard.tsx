import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'
import { uiDateLocaleTag } from '@/i18n/blog-locale'

type BlogCardProps = {
  post: BlogPost
  locale: string
  readArticleLabel: string
  minReadBadge: string
  teamName: string
  /** Liste / önizleme için UI dilinde başlık (yoksa post.title) */
  displayTitle?: string
  /** Liste / önizleme için UI dilinde açıklama (yoksa post.description) */
  displayDescription?: string
}

export function BlogCard({
  post,
  locale,
  readArticleLabel,
  minReadBadge,
  teamName,
  displayTitle,
  displayDescription
}: BlogCardProps) {
  const title = displayTitle ?? post.title
  const description = displayDescription ?? post.description
  const publishedDate = new Date(post.publishedAt).toLocaleDateString(uiDateLocaleTag(locale), {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const tagLine = post.tags.slice(0, 2).join(', ')

  return (
    <article className="group flex h-full min-h-0">
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="flex h-full min-h-0 w-full flex-col rounded-2xl border border-zinc-200/90 bg-white/75 p-6 shadow-[0_12px_40px_-16px_rgba(63,62,221,0.12),0_0_0_1px_rgba(255,255,255,0.8)_inset] outline-none ring-1 ring-zinc-900/[0.04] backdrop-blur-md transition-all duration-300 hover:border-[#3F3EDD]/35 hover:shadow-[0_20px_48px_-16px_rgba(63,62,221,0.18)] focus-visible:ring-2 focus-visible:ring-[#3F3EDD]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f8fc]"
      >
        <header className="mb-4">
          <time dateTime={post.publishedAt} className="text-sm text-zinc-500">
            {publishedDate}
          </time>
          <h2 className="mt-2 text-xl font-bold leading-snug text-zinc-900 transition-colors group-hover:text-[#3F3EDD]">
            {title}
          </h2>
        </header>

        <p className="mb-4 line-clamp-2 flex-1 leading-relaxed text-zinc-600">{description}</p>

        <div className="mb-4 flex min-w-0 items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 sm:h-14 sm:w-14">
            <Image
              src="/tadado_launch.png"
              alt=""
              width={112}
              height={112}
              quality={92}
              className="h-full w-full object-contain object-left"
            />
          </div>
          <span className="min-w-0 text-sm font-medium leading-snug text-zinc-700">{teamName}</span>
        </div>

        <footer className="mt-auto flex flex-col gap-3 border-t border-zinc-200/90 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 text-sm text-zinc-500">
            <span className="shrink-0">{minReadBadge}</span>
            {tagLine ? (
              <>
                <span className="shrink-0 text-zinc-400" aria-hidden>
                  •
                </span>
                <span className="min-w-0 truncate">{tagLine}</span>
              </>
            ) : null}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 self-end text-sm font-semibold text-[#3F3EDD] transition-transform group-hover:translate-x-1 sm:self-auto">
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
