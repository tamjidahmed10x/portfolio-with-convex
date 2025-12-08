/**
 * Sitemap Utilities
 * Helper functions for sitemap generation
 */

/**
 * Extract origin URL from request
 * Dynamically determines the origin from request - no hardcoded fallback!
 */
export function getOriginFromRequest(request: Request): string {
  // Try to get origin from request URL (most reliable)
  try {
    const url = new URL(request.url)
    if (url.origin && url.origin !== 'null') {
      return url.origin
    }
  } catch {
    // Continue to fallback methods
  }

  // Try X-Forwarded-Host header (common in proxies/CDNs like Cloudflare)
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https'
  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`
  }

  // Try CF-Connecting-IP approach with Host (Cloudflare Workers)
  const cfHost = request.headers.get('host')
  if (cfHost) {
    // Determine protocol - localhost is http, everything else https
    const isLocalhost =
      cfHost.includes('localhost') || cfHost.includes('127.0.0.1')
    const proto = isLocalhost ? 'http' : 'https'
    return `${proto}://${cfHost}`
  }

  // Try Origin header (for CORS requests)
  const originHeader = request.headers.get('origin')
  if (originHeader) {
    return originHeader
  }

  // Try Referer header as last resort
  const referer = request.headers.get('referer')
  if (referer) {
    try {
      const refererUrl = new URL(referer)
      return refererUrl.origin
    } catch {
      // Invalid referer URL
    }
  }

  // This should never happen in a real request, but handle gracefully
  // Default to https with a placeholder that will be obvious if seen
  throw new Error('Could not determine origin from request')
}

/**
 * Format date to ISO 8601 format for sitemap
 * Accepts various date formats and returns YYYY-MM-DD
 */
export function formatDateForSitemap(dateInput: string | Date): string {
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return getTodayISO()
    }

    return date.toISOString().split('T')[0]
  } catch {
    return getTodayISO()
  }
}

/**
 * Get today's date in ISO format
 */
export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0]
}

/**
 * Escape special XML characters
 */
export function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Normalize URL path
 * Ensures path starts with / and doesn't have trailing slash (except root)
 */
export function normalizePath(path: string): string {
  // Ensure starts with /
  let normalized = path.startsWith('/') ? path : `/${path}`

  // Remove trailing slash except for root
  if (normalized !== '/' && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1)
  }

  return normalized
}

/**
 * Build full URL from base and path
 */
export function buildUrl(baseUrl: string, path: string): string {
  const normalizedPath = normalizePath(path)
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  return `${base}${normalizedPath}`
}
