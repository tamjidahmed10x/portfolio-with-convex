/**
 * Manifest Module
 * Central export for Web App Manifest functionality
 */

// Types
export type {
  DisplayMode,
  Orientation,
  TextDirection,
  ManifestIcon,
  ManifestScreenshot,
  ManifestShortcut,
  ManifestRelatedApplication,
  ManifestShareTarget,
  WebAppManifest,
  ManifestConfig,
} from './types'

// Generator
export {
  SITE_META,
  MANIFEST_HEADERS,
  generateManifest,
  getDefaultIcons,
  getShortcuts,
  getScreenshots,
} from './generator'
