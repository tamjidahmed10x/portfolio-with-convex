/**
 * Web App Manifest Generator
 * Generates SEO and PWA optimized manifest.json
 */

import type {
  WebAppManifest,
  ManifestIcon,
  ManifestShortcut,
  ManifestScreenshot,
} from './types'

/**
 * Site metadata configuration
 * Centralized place for all site branding info
 */
export const SITE_META = {
  name: 'Tamjid Ahmed | Full Stack Developer',
  shortName: 'Tamjid Ahmed',
  description:
    'Full Stack Developer specializing in React, TypeScript, Node.js, and modern web technologies. Building scalable and beautiful web applications.',
  author: 'Tamjid Ahmed',
  themeColor: '#10b981', // Emerald 500
  backgroundColor: '#0f172a', // Slate 900
  language: 'en-US',
  categories: [
    'portfolio',
    'developer',
    'technology',
    'programming',
    'web development',
    'software engineering',
  ],
} as const

/**
 * Default icons for the PWA
 */
export function getDefaultIcons(baseUrl: string = ''): ManifestIcon[] {
  return [
    {
      src: `${baseUrl}/favicon.ico`,
      sizes: '64x64 32x32 24x24 16x16',
      type: 'image/x-icon',
    },
    {
      src: `${baseUrl}/logo192.png`,
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: `${baseUrl}/logo192.png`,
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: `${baseUrl}/logo512.png`,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: `${baseUrl}/logo512.png`,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ]
}

/**
 * Shortcuts for quick actions
 */
export function getShortcuts(baseUrl: string = ''): ManifestShortcut[] {
  return [
    {
      name: 'View Blog',
      short_name: 'Blog',
      description: 'Read the latest articles on web development',
      url: '/blogs',
      icons: [
        {
          src: `${baseUrl}/logo192.png`,
          sizes: '192x192',
          type: 'image/png',
        },
      ],
    },
    {
      name: 'Contact Me',
      short_name: 'Contact',
      description: 'Get in touch with Tamjid Ahmed',
      url: '/#contact',
      icons: [
        {
          src: `${baseUrl}/logo192.png`,
          sizes: '192x192',
          type: 'image/png',
        },
      ],
    },
  ]
}

/**
 * Screenshots for app store listings
 */
export function getScreenshots(baseUrl: string = ''): ManifestScreenshot[] {
  return [
    {
      src: `${baseUrl}/screenshots/desktop-home.png`,
      sizes: '1920x1080',
      type: 'image/png',
      form_factor: 'wide',
      label: 'Homepage - Desktop View',
    },
    {
      src: `${baseUrl}/screenshots/mobile-home.png`,
      sizes: '750x1334',
      type: 'image/png',
      form_factor: 'narrow',
      label: 'Homepage - Mobile View',
    },
  ]
}

/**
 * Generate complete Web App Manifest
 */
export function generateManifest(baseUrl: string = ''): WebAppManifest {
  return {
    // Identity
    name: SITE_META.name,
    short_name: SITE_META.shortName,
    description: SITE_META.description,
    id: '/',

    // URLs
    start_url: '/',
    scope: '/',

    // Display
    display: 'standalone',
    display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
    orientation: 'portrait-primary',

    // Colors
    theme_color: SITE_META.themeColor,
    background_color: SITE_META.backgroundColor,

    // Language
    lang: SITE_META.language,
    dir: 'ltr',

    // Icons
    icons: getDefaultIcons(baseUrl),

    // Shortcuts (quick actions)
    shortcuts: getShortcuts(baseUrl),

    // Categories (for app stores / SEO)
    categories: [...SITE_META.categories],

    // Share target (allow sharing to this app)
    share_target: {
      action: '/share',
      method: 'GET',
      params: {
        title: 'title',
        text: 'text',
        url: 'url',
      },
    },

    // Launch handler (how to handle when app is already open)
    launch_handler: {
      client_mode: 'focus-existing',
    },

    // Handle links (how to handle navigation)
    handle_links: 'preferred',

    // Edge browser side panel support
    edge_side_panel: {
      preferred_width: 400,
    },

    // No related native apps
    prefer_related_applications: false,
  }
}

/**
 * Response headers for manifest.json
 */
export const MANIFEST_HEADERS = {
  'Content-Type': 'application/manifest+json; charset=utf-8',
  'Cache-Control': 'public, max-age=86400, s-maxage=86400',
  'X-Content-Type-Options': 'nosniff',
} as const
