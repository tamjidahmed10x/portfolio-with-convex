/**
 * Sitemap Configuration
 * Default settings and static page definitions
 */

import type { SitemapEntry, ChangeFrequency, Priority } from './types'

/**
 * Default sitemap settings
 */
export const SITEMAP_DEFAULTS = {
  changeFreq: 'weekly' as ChangeFrequency,
  priority: '0.5' as Priority,
} as const

/**
 * Static pages configuration
 * These are pages that don't change based on data
 */
export function getStaticPages(today: string): SitemapEntry[] {
  return [
    {
      path: '/',
      changefreq: 'weekly',
      priority: '1.0',
      lastmod: today,
    },
    {
      path: '/blogs',
      changefreq: 'daily',
      priority: '0.9',
      lastmod: today,
    },
  ]
}

/**
 * Response headers for sitemap
 */
export const SITEMAP_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control':
    'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
  'X-Robots-Tag': 'noindex',
  'X-Content-Type-Options': 'nosniff',
} as const

/**
 * Response headers for robots.txt
 */
export const ROBOTS_HEADERS = {
  'Content-Type': 'text/plain; charset=utf-8',
  'Cache-Control': 'public, max-age=86400, s-maxage=86400',
} as const
