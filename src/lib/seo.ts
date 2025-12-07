/**
 * SEO Utility for TanStack Start
 * Provides reusable meta tags for Open Graph, Twitter Cards, and basic SEO
 */

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  siteName?: string
  locale?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  twitterHandle?: string
  twitterCardType?: 'summary' | 'summary_large_image' | 'player' | 'app'
  noIndex?: boolean
  canonical?: string
}

// Default site configuration
export const DEFAULT_SEO: SEOConfig = {
  title: 'Tamjid Ahmed | Full Stack Developer',
  description:
    'Full Stack Developer specializing in React, TypeScript, Node.js, and modern web technologies. Building scalable and beautiful web applications.',
  siteName: 'Tamjid Ahmed Portfolio',
  locale: 'en_US',
  type: 'website',
  twitterHandle: '@tamjid_ahmed',
  twitterCardType: 'summary_large_image',
  keywords: [
    'Full Stack Developer',
    'React Developer',
    'TypeScript',
    'Node.js',
    'Web Development',
    'Portfolio',
    'Tamjid Ahmed',
  ],
}

// Base URL for the site (used for absolute URLs)
export const SITE_URL = 'https://portfolio.tamjid10x.workers.dev'

/**
 * Generate complete SEO meta tags for TanStack Start head() function
 */
export function generateSEOMeta(config: Partial<SEOConfig> = {}) {
  const seo = { ...DEFAULT_SEO, ...config }

  // Build absolute URL for image
  const imageUrl = seo.image
    ? seo.image.startsWith('http')
      ? seo.image
      : `${SITE_URL}${seo.image.startsWith('/') ? '' : '/'}${seo.image}`
    : `${SITE_URL}/tamjid-ahmed.webp`

  // Build canonical URL
  const canonicalUrl = seo.canonical
    ? seo.canonical.startsWith('http')
      ? seo.canonical
      : `${SITE_URL}${seo.canonical.startsWith('/') ? '' : '/'}${seo.canonical}`
    : seo.url
      ? `${SITE_URL}${seo.url.startsWith('/') ? '' : '/'}${seo.url}`
      : SITE_URL

  // Build full title
  const fullTitle =
    seo.title === DEFAULT_SEO.title
      ? seo.title
      : `${seo.title} | ${seo.siteName || DEFAULT_SEO.siteName}`

  const meta: Array<Record<string, string>> = [
    // Basic meta tags
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { title: fullTitle },
    { name: 'description', content: seo.description },

    // Keywords
    ...(seo.keywords && seo.keywords.length > 0
      ? [{ name: 'keywords', content: seo.keywords.join(', ') }]
      : []),

    // Author
    ...(seo.author ? [{ name: 'author', content: seo.author }] : []),

    // Robots
    ...(seo.noIndex ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),

    // Theme color
    { name: 'theme-color', content: '#10b981' },
    { name: 'msapplication-TileColor', content: '#10b981' },

    // Open Graph tags
    { property: 'og:type', content: seo.type || 'website' },
    {
      property: 'og:site_name',
      content: seo.siteName || DEFAULT_SEO.siteName!,
    },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: seo.description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:alt', content: fullTitle },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: seo.locale || 'en_US' },

    // Article specific OG tags
    ...(seo.type === 'article'
      ? [
          ...(seo.publishedTime
            ? [
                {
                  property: 'article:published_time',
                  content: seo.publishedTime,
                },
              ]
            : []),
          ...(seo.modifiedTime
            ? [{ property: 'article:modified_time', content: seo.modifiedTime }]
            : []),
          ...(seo.author
            ? [{ property: 'article:author', content: seo.author }]
            : []),
          ...(seo.section
            ? [{ property: 'article:section', content: seo.section }]
            : []),
          ...(seo.tags
            ? seo.tags.map((tag) => ({ property: 'article:tag', content: tag }))
            : []),
        ]
      : []),

    // Twitter Card tags
    {
      name: 'twitter:card',
      content: seo.twitterCardType || 'summary_large_image',
    },
    ...(seo.twitterHandle
      ? [
          { name: 'twitter:site', content: seo.twitterHandle },
          { name: 'twitter:creator', content: seo.twitterHandle },
        ]
      : []),
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: seo.description },
    { name: 'twitter:image', content: imageUrl },
    { name: 'twitter:image:alt', content: fullTitle },
  ]

  const links: Array<Record<string, string>> = [
    // Canonical URL
    { rel: 'canonical', href: canonicalUrl },

    // Favicons
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/logo192.png' },
    { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/logo512.png' },
    { rel: 'apple-touch-icon', sizes: '192x192', href: '/logo192.png' },

    // Manifest
    { rel: 'manifest', href: '/manifest.json' },
  ]

  return { meta, links }
}

/**
 * Generate SEO for blog posts
 */
export function generateBlogSEO(post: {
  title: string
  excerpt: string
  coverImage: string
  slug: string
  publishedAt: string
  author: { name: string }
  category: string
  tags: string[]
}) {
  return generateSEOMeta({
    title: post.title,
    description: post.excerpt,
    image: post.coverImage,
    url: `/blogs/${post.slug}`,
    type: 'article',
    author: post.author.name,
    publishedTime: new Date(post.publishedAt).toISOString(),
    section: post.category,
    tags: post.tags,
  })
}

/**
 * Generate SEO for blog listing page
 */
export function generateBlogListingSEO() {
  return generateSEOMeta({
    title: 'Blog',
    description:
      'Explore articles on React, TypeScript, Next.js, and modern web development. Tips, tutorials, and insights from a full-stack developer.',
    url: '/blogs',
    keywords: [
      'Web Development Blog',
      'React Tutorials',
      'TypeScript Guide',
      'Frontend Development',
      'Programming Articles',
    ],
  })
}

/**
 * Generate SEO for home page
 */
export function generateHomeSEO() {
  return generateSEOMeta({
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    url: '/',
  })
}
