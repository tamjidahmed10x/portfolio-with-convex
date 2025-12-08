/**
 * Dynamic Sitemap Route
 * Serves sitemap.xml at /sitemap.xml
 *
 * Features:
 * - Dynamic URL generation from request origin
 * - SEO-optimized XML with image and news support
 * - Easily extensible for Convex integration
 */

import { createFileRoute } from '@tanstack/react-router'
import {
  generateSitemapXml,
  getOriginFromRequest,
  getTodayISO,
  getStaticPages,
  getBlogSitemapEntries,
  SITEMAP_HEADERS,
  type SitemapConfig,
} from '@/lib/sitemap'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Get origin dynamically from request
        const baseUrl = getOriginFromRequest(request)
        const today = getTodayISO()

        // Configure sitemap with dynamic base URL
        const config: SitemapConfig = {
          baseUrl,
          defaultChangeFreq: 'weekly',
          defaultPriority: '0.5',
          includeImages: true,
          includeNews: true,
          includeAlternates: false,
        }

        // Gather all entries
        const staticEntries = getStaticPages(today)
        const blogEntries = getBlogSitemapEntries()

        // Generate sitemap XML
        const sitemap = generateSitemapXml({
          config,
          entries: [...staticEntries, ...blogEntries],
        })

        return new Response(sitemap, {
          headers: SITEMAP_HEADERS,
        })
      },
    },
  },
})
