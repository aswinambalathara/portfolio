import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getSiteSettings } from '@/lib/cms/globals'
import { getPosts } from '@/lib/cms/posts'
import { formatDate } from '@/lib/format'
import { buildMetadata } from '@/lib/seo'

// FR-80: returns 404 while the blog flag is off. The full blog (FR-81) arrives in Phase 5.
export async function generateMetadata() {
  const settings = await getSiteSettings()
  if (!settings.flags?.blogEnabled) return {}
  return buildMetadata({ title: 'Blog', path: '/blog' })
}

export default async function BlogPage() {
  const settings = await getSiteSettings()
  if (!settings.flags?.blogEnabled) notFound()
  const posts = await getPosts()

  return (
    <div className="container-page pt-16 pb-20 md:pt-24">
      <h1>Blog</h1>
      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.id}>
            <h2 className="text-2xl">
              <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                {post.title}
              </Link>
            </h2>
            {post.publishedAt && (
              <p className="mt-1 tabular text-sm text-muted-foreground">
                {formatDate(post.publishedAt)}
              </p>
            )}
            {post.excerpt && (
              <p className="mt-2 max-w-[70ch] text-muted-foreground">{post.excerpt}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
