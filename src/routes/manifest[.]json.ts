/**
 * Dynamic Manifest.json Route
 * Serves manifest.json at /manifest.json
 *
 * Features:
 * - Fully dynamic with proper base URL
 * - PWA optimized with all modern features
 * - SEO friendly with proper metadata
 * - Shortcuts, share target, and more
 */

import { createFileRoute } from '@tanstack/react-router'
import { getOriginFromRequest } from '@/lib/sitemap'
import { generateManifest, MANIFEST_HEADERS } from '@/lib/manifest'

export const Route = createFileRoute('/manifest.json')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Get origin dynamically for absolute URLs in manifest
        const baseUrl = getOriginFromRequest(request)

        // Generate manifest with proper base URL
        const manifest = generateManifest(baseUrl)

        return new Response(JSON.stringify(manifest, null, 2), {
          headers: MANIFEST_HEADERS,
        })
      },
    },
  },
})
