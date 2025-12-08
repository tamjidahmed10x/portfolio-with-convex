/**
 * Dynamic Robots.txt Route
 * Serves robots.txt at /robots.txt
 *
 * Features:
 * - Fully dynamic URL generation from request origin
 * - SEO optimized with proper crawler directives
 * - Bot-specific rules for better crawl efficiency
 * - Security-focused path blocking
 */

import { createFileRoute } from '@tanstack/react-router'
import {
  generateRobotsTxt,
  getOriginFromRequest,
  ROBOTS_HEADERS,
} from '@/lib/sitemap'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Get origin dynamically - 100% dynamic, no hardcoded URLs
        const baseUrl = getOriginFromRequest(request)

        // Generate comprehensive robots.txt
        const robotsTxt = generateRobotsTxt({
          baseUrl,
          sitemapPath: '/sitemap.xml',
          crawlDelay: 1,
          // Security & performance - block sensitive paths
          disallowPaths: [
            '/api/', // API endpoints
            '/_serverFn/', // TanStack server functions
            '/_convex/', // Convex internal routes
            '/admin/', // Admin routes (if any)
            '/*.json$', // Block direct JSON access
            '/private/', // Private routes
          ],
          // Explicitly allow important content paths
          allowPaths: [
            '/', // Home
            '/blogs/', // Blog listing
            '/blogs/*', // Individual blog posts
            '/manifest.json', // PWA manifest (good for SEO)
          ],
          // Block query parameters that create duplicate content
          disallowQueryParams: [
            'mode',
            'palette',
            'ref',
            'utm_*',
            'fbclid',
            'gclid',
          ],
        })

        return new Response(robotsTxt, {
          headers: ROBOTS_HEADERS,
        })
      },
    },
  },
})
