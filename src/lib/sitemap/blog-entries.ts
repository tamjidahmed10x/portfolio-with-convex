/**
 * Blog Sitemap Entries
 * Generates sitemap entries from blog data
 */

import type { SitemapEntry } from './types'
import { formatDateForSitemap } from './utils'
import { blogPosts } from '@/components/blogs'

/**
 * Author information for blog posts
 */
const BLOG_AUTHOR = {
  name: 'Tamjid Ahmed',
  publication: 'Tamjid Ahmed Portfolio',
}

/**
 * Convert a blog post to a sitemap entry
 */
interface BlogPostData {
  slug: string
  title: string
  publishedAt: string
  coverImage: string
  excerpt?: string
  tags?: string[]
}

function blogPostToSitemapEntry(post: BlogPostData): SitemapEntry {
  const entry: SitemapEntry = {
    path: `/blogs/${post.slug}`,
    lastmod: formatDateForSitemap(post.publishedAt),
    changefreq: 'monthly',
    priority: '0.8',
    images: [
      {
        loc: post.coverImage,
        title: post.title,
        caption: post.excerpt,
      },
    ],
    news: {
      publicationName: BLOG_AUTHOR.publication,
      publicationLanguage: 'en',
      publicationDate: formatDateForSitemap(post.publishedAt),
      title: post.title,
      keywords: post.tags,
    },
  }

  return entry
}

/**
 * Get all blog posts as sitemap entries
 */
export function getBlogSitemapEntries(): SitemapEntry[] {
  return blogPosts.map((post) =>
    blogPostToSitemapEntry({
      slug: post.slug,
      title: post.title,
      publishedAt: post.publishedAt,
      coverImage: post.coverImage,
      excerpt: post.excerpt,
      tags: post.tags,
    }),
  )
}

/**
 * Get featured blog posts as sitemap entries
 * Useful for prioritizing featured content
 */
export function getFeaturedBlogSitemapEntries(): SitemapEntry[] {
  return blogPosts
    .filter((post) => post.featured)
    .map((post) =>
      blogPostToSitemapEntry({
        slug: post.slug,
        title: post.title,
        publishedAt: post.publishedAt,
        coverImage: post.coverImage,
        excerpt: post.excerpt,
        tags: post.tags,
      }),
    )
}
