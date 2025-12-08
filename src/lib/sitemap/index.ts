/**
 * Sitemap Module
 * Central export for all sitemap functionality
 */

// Types
export type {
  ChangeFrequency,
  Priority,
  SitemapEntry,
  SitemapConfig,
  SitemapImage,
  SitemapVideo,
  SitemapNews,
  SitemapGeneratorOptions,
} from './types'

// Configuration
export {
  SITEMAP_DEFAULTS,
  SITEMAP_HEADERS,
  ROBOTS_HEADERS,
  getStaticPages,
} from './config'

// Utilities
export {
  getOriginFromRequest,
  formatDateForSitemap,
  getTodayISO,
  escapeXml,
  normalizePath,
  buildUrl,
} from './utils'

// Generators
export { generateSitemapXml, generateSitemapIndexXml } from './generator'

// Blog entries
export {
  getBlogSitemapEntries,
  getFeaturedBlogSitemapEntries,
} from './blog-entries'

// Robots.txt
export { generateRobotsTxt, type RobotsConfig } from './robots'
