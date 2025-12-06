/**
 * Dynamic Sitemap Generator
 * Generates sitemap.xml at runtime
 * Access at: /api/sitemap.xml
 */

import { createFileRoute } from '@tanstack/react-router'
import { blogPosts } from '@/components/blogs'
import { SITE_URL } from '@/lib/seo'

// Generate sitemap XML
function generateSitemap(): string {
  const today = new Date().toISOString().split('T')[0]

  // Static pages
  const staticPages = [
    { url: '/', changefreq: 'weekly', priority: '1.0', lastmod: today },
    { url: '/blogs', changefreq: 'daily', priority: '0.9', lastmod: today },
  ]

  // Dynamic blog pages from blogPosts data
  const blogPages = blogPosts.map((post) => ({
    url: `/blogs/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: formatDateForSitemap(post.publishedAt),
  }))

  const allPages = [...staticPages, ...blogPages]

  const urlEntries = allPages
    .map(
      (page) => `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urlEntries}
</urlset>`
}

// Convert date string like "Dec 1, 2024" to "2024-12-01"
function formatDateForSitemap(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    return date.toISOString().split('T')[0]
  } catch {
    return new Date().toISOString().split('T')[0]
  }
}

export const Route = createFileRoute('/api/sitemap')({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap()

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            'X-Robots-Tag': 'noindex',
          },
        })
      },
    },
  },
})
