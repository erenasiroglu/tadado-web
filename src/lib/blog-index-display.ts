import type { BlogPost } from '@/lib/blog'

/** Liste kartı: yalnızca başlık veya yalnızca özet çevrilebilir; boş alanlar yazıdan gelir. */
export type BlogIndexCardMessages = Record<string, { title?: string; description?: string }>

export function getBlogIndexCardCopy(
  post: BlogPost,
  indexCards: BlogIndexCardMessages | undefined
): { title: string; description: string } {
  const entry = indexCards?.[post.slug]
  if (!entry) {
    return { title: post.title, description: post.description }
  }
  const title = entry.title?.trim() || post.title
  const description = entry.description?.trim() || post.description
  return { title, description }
}
