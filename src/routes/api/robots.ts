/**
 * Dynamic Robots.txt Generator
 * Generates robots.txt at runtime
 * Access at: /api/robots
 */

import { createFileRoute } from '@tanstack/react-router'
import { SITE_URL } from '@/lib/seo'

// Generate robots.txt content
function generateRobotsTxt(): string {
  return `# https://www.robotstxt.org/robotstxt.html
# Generated dynamically by TanStack Start

User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/api/sitemap

# Crawl-delay for politeness
Crawl-delay: 1

# Block sensitive paths
Disallow: /api/
Disallow: /_serverFn/
Disallow: /_convex/

# Block query parameters that shouldn't be indexed
Disallow: /*?mode=
Disallow: /*?palette=

# Allow important pages explicitly
Allow: /blogs/
Allow: /blogs/*
`
}

export const Route = createFileRoute('/api/robots')({
  server: {
    handlers: {
      GET: async () => {
        const robotsTxt = generateRobotsTxt()

        return new Response(robotsTxt, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
          },
        })
      },
    },
  },
})
