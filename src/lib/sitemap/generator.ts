/**
 * Sitemap XML Generator
 * Generates valid sitemap XML with support for images, videos, and news
 */

import type {
  SitemapConfig,
  SitemapEntry,
  SitemapGeneratorOptions,
} from './types'
import { SITEMAP_DEFAULTS } from './config'
import { escapeXml, buildUrl } from './utils'

/**
 * Generate XML namespaces based on config
 */
function generateNamespaces(config: SitemapConfig): string {
  const namespaces: string[] = [
    'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  ]

  if (config.includeImages) {
    namespaces.push(
      'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
    )
  }

  if (config.includeVideos) {
    namespaces.push(
      'xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"',
    )
  }

  if (config.includeNews) {
    namespaces.push(
      'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"',
    )
  }

  if (config.includeAlternates) {
    namespaces.push('xmlns:xhtml="http://www.w3.org/1999/xhtml"')
  }

  return namespaces.join('\n        ')
}

/**
 * Generate image XML for a sitemap entry
 */
function generateImageXml(
  images: SitemapEntry['images'],
  baseUrl: string,
): string {
  if (!images || images.length === 0) return ''

  return images
    .map((image) => {
      const imageUrl = image.loc.startsWith('http')
        ? image.loc
        : buildUrl(baseUrl, image.loc)

      let imageXml = `
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>`

      if (image.caption) {
        imageXml += `
      <image:caption>${escapeXml(image.caption)}</image:caption>`
      }

      if (image.title) {
        imageXml += `
      <image:title>${escapeXml(image.title)}</image:title>`
      }

      if (image.geoLocation) {
        imageXml += `
      <image:geo_location>${escapeXml(image.geoLocation)}</image:geo_location>`
      }

      if (image.license) {
        imageXml += `
      <image:license>${escapeXml(image.license)}</image:license>`
      }

      imageXml += `
    </image:image>`

      return imageXml
    })
    .join('')
}

/**
 * Generate news XML for a sitemap entry
 */
function generateNewsXml(news: SitemapEntry['news']): string {
  if (!news) return ''

  let newsXml = `
    <news:news>
      <news:publication>
        <news:name>${escapeXml(news.publicationName)}</news:name>
        <news:language>${escapeXml(news.publicationLanguage)}</news:language>
      </news:publication>
      <news:publication_date>${escapeXml(news.publicationDate)}</news:publication_date>
      <news:title>${escapeXml(news.title)}</news:title>`

  if (news.keywords && news.keywords.length > 0) {
    newsXml += `
      <news:keywords>${escapeXml(news.keywords.join(', '))}</news:keywords>`
  }

  newsXml += `
    </news:news>`

  return newsXml
}

/**
 * Generate alternate language XML
 */
function generateAlternatesXml(
  alternates: SitemapEntry['alternates'],
  baseUrl: string,
): string {
  if (!alternates || alternates.length === 0) return ''

  return alternates
    .map((alt) => {
      const href = alt.href.startsWith('http')
        ? alt.href
        : buildUrl(baseUrl, alt.href)
      return `
    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(href)}" />`
    })
    .join('')
}

/**
 * Generate a single URL entry
 */
function generateUrlEntry(entry: SitemapEntry, config: SitemapConfig): string {
  const fullUrl = buildUrl(config.baseUrl, entry.path)

  let urlXml = `
  <url>
    <loc>${escapeXml(fullUrl)}</loc>`

  if (entry.lastmod) {
    urlXml += `
    <lastmod>${entry.lastmod}</lastmod>`
  }

  const changefreq =
    entry.changefreq || config.defaultChangeFreq || SITEMAP_DEFAULTS.changeFreq
  urlXml += `
    <changefreq>${changefreq}</changefreq>`

  const priority =
    entry.priority || config.defaultPriority || SITEMAP_DEFAULTS.priority
  urlXml += `
    <priority>${priority}</priority>`

  // Add images if present
  if (config.includeImages && entry.images) {
    urlXml += generateImageXml(entry.images, config.baseUrl)
  }

  // Add news if present
  if (config.includeNews && entry.news) {
    urlXml += generateNewsXml(entry.news)
  }

  // Add alternates if present
  if (config.includeAlternates && entry.alternates) {
    urlXml += generateAlternatesXml(entry.alternates, config.baseUrl)
  }

  urlXml += `
  </url>`

  return urlXml
}

/**
 * Generate complete sitemap XML
 */
export function generateSitemapXml(options: SitemapGeneratorOptions): string {
  const { config, entries } = options

  const namespaces = generateNamespaces(config)
  const urlEntries = entries
    .map((entry) => generateUrlEntry(entry, config))
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset ${namespaces}>${urlEntries}
</urlset>`
}

/**
 * Generate sitemap index XML (for large sites with multiple sitemaps)
 */
export function generateSitemapIndexXml(
  baseUrl: string,
  sitemaps: { path: string; lastmod?: string }[],
): string {
  const sitemapEntries = sitemaps
    .map((sitemap) => {
      const fullUrl = buildUrl(baseUrl, sitemap.path)
      let entry = `
  <sitemap>
    <loc>${escapeXml(fullUrl)}</loc>`

      if (sitemap.lastmod) {
        entry += `
    <lastmod>${sitemap.lastmod}</lastmod>`
      }

      entry += `
  </sitemap>`
      return entry
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}
</sitemapindex>`
}
