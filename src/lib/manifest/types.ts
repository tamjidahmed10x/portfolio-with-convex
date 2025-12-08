/**
 * Web App Manifest Types
 * Full TypeScript types for PWA manifest generation
 * Based on W3C Web App Manifest specification
 */

export type DisplayMode =
  | 'fullscreen'
  | 'standalone'
  | 'minimal-ui'
  | 'browser'
  | 'window-controls-overlay'

export type Orientation =
  | 'any'
  | 'natural'
  | 'landscape'
  | 'landscape-primary'
  | 'landscape-secondary'
  | 'portrait'
  | 'portrait-primary'
  | 'portrait-secondary'

export type TextDirection = 'auto' | 'ltr' | 'rtl'

export interface ManifestIcon {
  /** URL of the icon */
  src: string
  /** Space-separated sizes (e.g., "192x192" or "192x192 512x512") */
  sizes: string
  /** MIME type of the icon */
  type: string
  /** Purpose of the icon */
  purpose?: 'any' | 'maskable' | 'monochrome' | 'any maskable'
}

export interface ManifestScreenshot {
  /** URL of the screenshot */
  src: string
  /** Size of the screenshot */
  sizes: string
  /** MIME type */
  type: string
  /** Form factor */
  form_factor?: 'wide' | 'narrow'
  /** Label for accessibility */
  label?: string
}

export interface ManifestShortcut {
  /** Name of the shortcut */
  name: string
  /** Short name */
  short_name?: string
  /** Description */
  description?: string
  /** URL to open */
  url: string
  /** Icons for the shortcut */
  icons?: ManifestIcon[]
}

export interface ManifestRelatedApplication {
  /** Platform identifier */
  platform:
    | 'play'
    | 'itunes'
    | 'windows'
    | 'webapp'
    | 'chromeos_play'
    | 'f-droid'
  /** URL to the application */
  url?: string
  /** Application ID */
  id?: string
}

export interface ManifestShareTarget {
  /** Action URL */
  action: string
  /** HTTP method */
  method?: 'GET' | 'POST'
  /** Encoding type */
  enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data'
  /** Parameters */
  params: {
    title?: string
    text?: string
    url?: string
    files?: {
      name: string
      accept: string | string[]
    }[]
  }
}

export interface WebAppManifest {
  /** Full name of the application */
  name: string
  /** Short name (used where space is limited) */
  short_name: string
  /** Description of the application */
  description: string
  /** Start URL when launched */
  start_url: string
  /** Scope of the application */
  scope?: string
  /** Display mode */
  display: DisplayMode
  /** Display override */
  display_override?: DisplayMode[]
  /** Background color */
  background_color: string
  /** Theme color */
  theme_color: string
  /** Text direction */
  dir?: TextDirection
  /** Language */
  lang?: string
  /** Orientation preference */
  orientation?: Orientation
  /** Icons */
  icons: ManifestIcon[]
  /** Screenshots */
  screenshots?: ManifestScreenshot[]
  /** Shortcuts */
  shortcuts?: ManifestShortcut[]
  /** Categories */
  categories?: string[]
  /** IARC rating ID */
  iarc_rating_id?: string
  /** Related applications */
  related_applications?: ManifestRelatedApplication[]
  /** Prefer related applications */
  prefer_related_applications?: boolean
  /** Share target configuration */
  share_target?: ManifestShareTarget
  /** Application ID */
  id?: string
  /** Handle links */
  handle_links?: 'auto' | 'preferred' | 'not-preferred'
  /** Launch handler */
  launch_handler?: {
    client_mode?:
      | 'auto'
      | 'navigate-new'
      | 'navigate-existing'
      | 'focus-existing'
  }
  /** Edge side panel */
  edge_side_panel?: {
    preferred_width?: number
  }
}

export interface ManifestConfig {
  /** Base URL (for absolute URLs in manifest) */
  baseUrl?: string
}
