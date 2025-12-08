/**
 * Robots.txt Generator
 * Generates dynamic, SEO-optimized robots.txt
 */

export interface RobotsConfig {
  /** Base URL of the site */
  baseUrl: string
  /** Sitemap path */
  sitemapPath?: string
  /** Crawl delay in seconds (for polite bots) */
  crawlDelay?: number
  /** Disallowed paths */
  disallowPaths?: string[]
  /** Allowed paths (explicit) */
  allowPaths?: string[]
  /** Disallowed query parameters */
  disallowQueryParams?: string[]
  /** Enable bot-specific rules */
  enableBotSpecificRules?: boolean
}

const DEFAULT_DISALLOW_PATHS = [
  '/api/',
  '/_serverFn/',
  '/_convex/',
  '/admin/',
  '/private/',
]

const DEFAULT_ALLOW_PATHS = ['/', '/blogs/', '/blogs/*', '/manifest.json']

const DEFAULT_DISALLOW_QUERY_PARAMS = [
  'mode',
  'palette',
  'ref',
  'utm_*',
  'fbclid',
  'gclid',
]

/**
 * Generate bot-specific rules for better crawl efficiency
 */
function generateBotSpecificRules(): string {
  return `
# ===========================================
# Bot-Specific Rules for Optimal Crawling
# ===========================================

# Google (Main crawler)
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Google Images
User-agent: Googlebot-Image
Allow: /
Allow: /*.webp$
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.jpeg$

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# DuckDuckGo
User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1

# Yandex
User-agent: Yandex
Allow: /
Crawl-delay: 2

# Baidu
User-agent: Baiduspider
Allow: /
Crawl-delay: 2

# Facebook
User-agent: facebookexternalhit
Allow: /

# Twitter
User-agent: Twitterbot
Allow: /

# LinkedIn
User-agent: LinkedInBot
Allow: /

# Slack
User-agent: Slackbot
Allow: /

# Discord
User-agent: Discordbot
Allow: /

# ===========================================
# Block Bad Bots & Scrapers
# ===========================================

# AI Training Bots (Optional - comment out if you want to allow)
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

# Aggressive scrapers
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: BLEXBot
Disallow: /
`
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(config: RobotsConfig): string {
  const {
    baseUrl,
    sitemapPath = '/sitemap.xml',
    crawlDelay = 1,
    disallowPaths = DEFAULT_DISALLOW_PATHS,
    allowPaths = DEFAULT_ALLOW_PATHS,
    disallowQueryParams = DEFAULT_DISALLOW_QUERY_PARAMS,
    enableBotSpecificRules = true,
  } = config

  // Build sitemap URL
  const sitemapUrl = sitemapPath.startsWith('http')
    ? sitemapPath
    : `${baseUrl}${sitemapPath.startsWith('/') ? '' : '/'}${sitemapPath}`

  // Build rules
  const lines: string[] = [
    '# ===========================================',
    '# Robots.txt - Generated Dynamically',
    '# https://www.robotstxt.org/robotstxt.html',
    '# ===========================================',
    '',
    '# Sitemap Location',
    `Sitemap: ${sitemapUrl}`,
    '',
    '# ===========================================',
    '# Default Rules (All Crawlers)',
    '# ===========================================',
    '',
    'User-agent: *',
  ]

  // Allow paths first (more specific)
  if (allowPaths.length > 0) {
    allowPaths.forEach((path) => {
      lines.push(`Allow: ${path}`)
    })
  }

  // Disallow paths
  if (disallowPaths.length > 0) {
    disallowPaths.forEach((path) => {
      lines.push(`Disallow: ${path}`)
    })
  }

  // Disallow query parameters
  if (disallowQueryParams.length > 0) {
    disallowQueryParams.forEach((param) => {
      lines.push(`Disallow: /*?${param}=`)
      lines.push(`Disallow: /*&${param}=`)
    })
  }

  // Crawl delay
  if (crawlDelay > 0) {
    lines.push(`Crawl-delay: ${crawlDelay}`)
  }

  lines.push('')

  // Add bot-specific rules
  if (enableBotSpecificRules) {
    lines.push(generateBotSpecificRules())
  }

  // Footer
  lines.push('')
  lines.push('# ===========================================')
  lines.push(`# Last Generated: ${new Date().toISOString()}`)
  lines.push('# ===========================================')

  return lines.join('\n')
}
