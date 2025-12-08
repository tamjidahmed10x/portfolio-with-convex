/**
 * Sitemap Types
 * All TypeScript types for sitemap generation
 */

export type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

export type Priority =
  | '0.0'
  | '0.1'
  | '0.2'
  | '0.3'
  | '0.4'
  | '0.5'
  | '0.6'
  | '0.7'
  | '0.8'
  | '0.9'
  | '1.0'

export interface SitemapImage {
  /** URL of the image */
  loc: string
  /** Optional caption */
  caption?: string
  /** Optional title */
  title?: string
  /** Optional geo location */
  geoLocation?: string
  /** Optional license URL */
  license?: string
}

export interface SitemapVideo {
  /** URL of the video thumbnail */
  thumbnailLoc: string
  /** Title of the video */
  title: string
  /** Description of the video */
  description: string
  /** URL of the video content */
  contentLoc?: string
  /** URL of the video player */
  playerLoc?: string
  /** Duration in seconds */
  duration?: number
  /** Publication date */
  publicationDate?: string
}

export interface SitemapNews {
  /** Publication name */
  publicationName: string
  /** Publication language (e.g., 'en', 'bn') */
  publicationLanguage: string
  /** Publication date */
  publicationDate: string
  /** Title of the news article */
  title: string
  /** Keywords for the news article */
  keywords?: string[]
}

export interface SitemapEntry {
  /** URL path (without base URL) */
  path: string
  /** Last modification date (ISO 8601) */
  lastmod?: string
  /** Change frequency hint for crawlers */
  changefreq?: ChangeFrequency
  /** Priority relative to other URLs (0.0 to 1.0) */
  priority?: Priority
  /** Images associated with this URL */
  images?: SitemapImage[]
  /** Videos associated with this URL */
  videos?: SitemapVideo[]
  /** News article information */
  news?: SitemapNews
  /** Alternate language versions */
  alternates?: {
    hreflang: string
    href: string
  }[]
}

export interface SitemapConfig {
  /** Base URL of the site */
  baseUrl: string
  /** Default change frequency */
  defaultChangeFreq?: ChangeFrequency
  /** Default priority */
  defaultPriority?: Priority
  /** Include image sitemap namespace */
  includeImages?: boolean
  /** Include video sitemap namespace */
  includeVideos?: boolean
  /** Include news sitemap namespace */
  includeNews?: boolean
  /** Include xhtml namespace for alternates */
  includeAlternates?: boolean
}

export interface SitemapGeneratorOptions {
  /** Sitemap configuration */
  config: SitemapConfig
  /** Sitemap entries */
  entries: SitemapEntry[]
}
