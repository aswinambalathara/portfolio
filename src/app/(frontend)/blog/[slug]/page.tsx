import { notFound } from 'next/navigation'

import { RichText } from '@/components/rich-text'
import { getSiteSettings } from '@/lib/cms/globals'
import { getPostBySlug } from '@/lib/cms/posts'
import { formatDate } from '@/lib/format'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

// FR-80: returns 404 while the blog flag is off. FR-82: only published posts are returned.
async function loadPost(slug: string) {
  const settings = await getSiteSettings()
  return settings.flags?.blogEnabled ? getPostBySlug(slug) : null
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) return {}
  return buildMetadata({
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    image: post.seo?.image,
    path: `/blog/${post.slug}`,
    type: 'article',
  })
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) notFound()

  return (
    <article className="container-page pt-16 pb-20 md:pt-24">
      <h1 className="max-w-[24ch]">{post.title}</h1>
      {post.publishedAt && (
        <p className="mt-3 tabular text-sm text-muted-foreground">{formatDate(post.publishedAt)}</p>
      )}
      <RichText data={post.content} className="mt-10 max-w-[70ch]" />
    </article>
  )
}
