# 🎨 Theme Switcher System - Complete Documentation

> **Purpose**: এই documentation টি LLM models এবং developers দের জন্য তৈরি করা হয়েছে যাতে তারা এই portfolio project এর theme system সম্পূর্ণভাবে বুঝতে পারে এবং future এ modifications করতে পারে।

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Core Components](#core-components)
4. [Data Flow](#data-flow)
5. [URL-Based State Management](#url-based-state-management)
6. [CSS Variable System](#css-variable-system)
7. [Transition Strategy](#transition-strategy)
8. [Common Shortcomings & Solutions](#common-shortcomings--solutions)
9. [File Reference](#file-reference)
10. [How to Extend](#how-to-extend)
11. [LLM Instructions](#llm-instructions)

---

## 🔍 System Overview

এই theme system দুইটি independent concept কে combine করে:

1. **Theme Mode**: `light` | `dark` - Controls the base light/dark appearance
2. **Theme Palette**: 11টি different color schemes (mahogany, ocean, forest, etc.)

### Key Features:

- ✅ URL-based state persistence (shareable themed links)
- ✅ No localStorage dependency
- ✅ SSR-compatible (TanStack Router Start)
- ✅ Smooth mode transitions with overlay
- ✅ No flash on initial load
- ✅ Theme persists across navigation

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         URL Search Params                           │
│                     ?mode=dark&palette=ocean                        │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    __root.tsx (Route Definition)                    │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  validateSearch() - Validates mode & palette params         │    │
│  │  search.middlewares: retainSearchParams(['mode','palette']) │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                 │                                   │
│                                 ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  parseThemeFromSearch() → initialTheme                      │    │
│  │  <html className={initialTheme.mode}>                       │    │
│  └────────────────────────────────────────────────────────────┘    │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    ThemeProvider (Context)                          │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  State: { mode, palette }                                   │    │
│  │  Effects:                                                   │    │
│  │    - Sync from URL search params                           │    │
│  │    - Apply to DOM (classList, data-theme-palette)          │    │
│  │    - Handle mode transition overlay                        │    │
│  │  Actions:                                                   │    │
│  │    - setMode() → updates URL via navigate()                │    │
│  │    - setPalette() → updates URL via navigate()             │    │
│  │    - toggleMode() → toggle between light/dark              │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                 │                                   │
│                                 ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  ThemeTransitionOverlay                                     │    │
│  │  - Shows during mode transitions                           │    │
│  │  - Prevents staggered color changes                        │    │
│  └────────────────────────────────────────────────────────────┘    │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         DOM Application                             │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  <html class="light|dark" data-theme-palette="mahogany">    │    │
│  │                                                             │    │
│  │  CSS reads:                                                 │    │
│  │    .dark { ... }                                           │    │
│  │    [data-theme-palette='mahogany'] { --theme-primary: ... }│    │
│  └────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Core Components

### 1. Theme Context (`src/contexts/theme-context.tsx`)

এটি theme system এর brain:

```typescript
// Types
export type ThemeMode = 'light' | 'dark'
export type ThemePalette =
  | 'default'
  | 'mahogany'
  | 'olive'
  | 'fire'
  | 'crimson'
  | 'forest'
  | 'wine'
  | 'midnight'
  | 'rose'
  | 'ocean'
  | 'earth'

// Theme Config
export interface ThemeConfig {
  mode: ThemeMode
  palette: ThemePalette
}

// Context provides:
interface ThemeContextType {
  theme: ThemeConfig
  setMode: (mode: ThemeMode) => void
  setPalette: (palette: ThemePalette) => void
  toggleMode: () => void
}
```

#### Key Functions:

**`parseThemeFromSearch()`** - URL params থেকে theme parse করে:

```typescript
export const parseThemeFromSearch = (
  search: Record<string, unknown>,
): ThemeConfig => {
  const mode = isValidMode(search.mode) ? search.mode : DEFAULT_MODE
  const palette = isValidPalette(search.palette)
    ? search.palette
    : DEFAULT_PALETTE
  return { mode, palette }
}
```

**`isValidMode()` / `isValidPalette()`** - Type guards for validation:

```typescript
export const isValidMode = (mode: unknown): mode is ThemeMode => {
  return typeof mode === 'string' && VALID_MODES.includes(mode as ThemeMode)
}
```

### 2. Theme Switcher UI (`src/components/theme-switcher.tsx`)

দুইটি variants আছে:

| Component              | Use Case                   | Location             |
| ---------------------- | -------------------------- | -------------------- |
| `ThemeSwitcher`        | Desktop - Right side sheet | Header (Desktop)     |
| `ThemeSwitcherCompact` | Mobile - Bottom sheet      | Header (Mobile menu) |

Features:

- Tab-based UI (Colors / Mode tabs)
- Color preview dots
- Animated transitions (motion/react)
- Quick toggle button at footer

### 3. Theme Link (`src/components/theme-link.tsx`)

**Problem**: Normal `<Link>` navigation loses theme search params.

**Solution**: `ThemeLink` wrapper preserves `mode` and `palette`:

```typescript
export const ThemeLink = (props: any) => {
  const currentSearch = useSearch({ strict: false })

  // Extract theme params
  const themeParams: Record<string, unknown> = {}
  if (currentSearch.mode) themeParams.mode = currentSearch.mode
  if (currentSearch.palette) themeParams.palette = currentSearch.palette

  // Merge with existing search
  const mergedSearch = (prev) => ({ ...themeParams, ...searchProp })

  return <Link {...restProps} search={mergedSearch} />
}
```

### 4. Root Route (`src/routes/__root.tsx`)

Route configuration for theme:

```typescript
export const Route = createRootRouteWithContext<MyRouterContext>()({
  // Validate search params
  validateSearch: (search): ThemeSearchParams => {
    return {
      mode: isValidMode(search.mode) ? search.mode : undefined,
      palette: isValidPalette(search.palette) ? search.palette : undefined,
    }
  },

  // CRITICAL: Retain theme params across ALL navigations
  search: {
    middlewares: [retainSearchParams(['mode', 'palette'])],
  },

  shellComponent: RootDocument,
})
```

---

## 🔄 Data Flow

### Initial Load Flow:

```
1. User visits: /blogs?mode=dark&palette=ocean
                    │
                    ▼
2. __root.tsx validateSearch()
   - Validates mode='dark' ✓
   - Validates palette='ocean' ✓
                    │
                    ▼
3. RootDocument component
   - parseThemeFromSearch() → { mode: 'dark', palette: 'ocean' }
   - <html className="dark">  ← Applied immediately (SSR)
                    │
                    ▼
4. ThemeProvider hydrates
   - Reads from useSearch()
   - Sets internal state
   - useEffect applies data-theme-palette="ocean"
```

### Theme Change Flow:

```
1. User clicks "Forest" palette
                    │
                    ▼
2. ThemeSwitcher calls setPalette('forest')
                    │
                    ▼
3. ThemeProvider.setPalette():
   - setTheme({ ...prev, palette: 'forest' })
   - updateThemeInUrl(mode, 'forest')
     └─> navigate({ search: { ...prev, palette: 'forest' }, replace: true })
                    │
                    ▼
4. URL changes: /blogs?mode=dark&palette=forest
                    │
                    ▼
5. useEffect in ThemeProvider:
   - document.documentElement.setAttribute('data-theme-palette', 'forest')
                    │
                    ▼
6. CSS re-evaluates [data-theme-palette='forest'] rules
```

### Mode Change Flow (with Overlay):

```
1. User clicks "Dark" mode
                    │
                    ▼
2. ThemeProvider.setMode('dark'):
   - Detects mode IS changing (prevModeRef.current !== 'dark')
   - setIsTransitioning(true)  ← Shows overlay
   - root.classList.add('theme-switching')  ← Disables all CSS transitions
                    │
                    ▼
3. requestAnimationFrame():
   - root.classList.remove('light')
   - root.classList.add('dark')
   - setTimeout: remove 'theme-switching' (50ms)
   - setTimeout: setIsTransitioning(false) (300ms)
                    │
                    ▼
4. ThemeTransitionOverlay fades out
```

---

## 🔗 URL-Based State Management

### Why URL Instead of localStorage?

| Approach         | Pros                                  | Cons                                       |
| ---------------- | ------------------------------------- | ------------------------------------------ |
| **localStorage** | Persists across sessions              | Can't share themed links, SSR flash issues |
| **URL params**   | Shareable, SSR-friendly, bookmarkable | Longer URLs                                |

### URL Behavior:

**Default values are NOT in URL** (clean URLs):

```
/ (light mode, mahogany palette - defaults)
/?mode=dark (dark mode, mahogany palette)
/?palette=ocean (light mode, ocean palette)
/?mode=dark&palette=ocean (dark mode, ocean palette)
```

**Implementation** (`updateThemeInUrl`):

```typescript
const updateThemeInUrl = (newMode, newPalette) => {
  navigate({
    to: '.',
    search: (prev) => {
      const newSearch = { ...prev }

      // Only add if NOT default
      if (newMode !== DEFAULT_MODE) {
        newSearch.mode = newMode
      } else {
        delete newSearch.mode
      }

      if (newPalette !== DEFAULT_PALETTE) {
        newSearch.palette = newPalette
      } else {
        delete newSearch.palette
      }

      return newSearch
    },
    replace: true, // Don't add to history
  })
}
```

### Param Retention Across Navigation:

TanStack Router's `retainSearchParams` middleware ensures theme params persist:

```typescript
search: {
  middlewares: [retainSearchParams(['mode', 'palette'])],
}
```

---

## 🎨 CSS Variable System

### Structure (`src/styles.css`):

```css
/* 1. Base Variables (applies to both modes) */
:root {
  --theme-primary: oklch(0.485 0.175 22);  /* Mahogany default */
  --theme-secondary: ...;
  --theme-accent: ...;
  --theme-shadow: ...;
}

/* 2. Dark Mode Base (lighter colors for visibility) */
.dark {
  --theme-primary: oklch(0.62 0.19 22);  /* Brighter version */
  ...
}

/* 3. Palette Overrides (Light Mode) */
[data-theme-palette='ocean'] {
  --theme-primary: oklch(0.56 0.08 230);
  --theme-secondary: oklch(0.68 0.07 220);
  --theme-accent: oklch(0.76 0.06 215);
}

/* 4. Palette Overrides (Dark Mode) - BOTH selectors needed */
.dark [data-theme-palette='ocean'],
.dark[data-theme-palette='ocean'] {
  --theme-primary: oklch(0.72 0.1 230);  /* Lighter for dark bg */
  ...
}
```

### Why Two Dark Mode Selectors?

```css
/* When palette is on child element */
.dark [data-theme-palette='ocean'] {
}

/* When palette is on same element as .dark (the <html>) */
.dark[data-theme-palette='ocean'] {
}
```

This handles both cases:

- `<html class="dark" data-theme-palette="ocean">` (current implementation)
- `<html class="dark"><body data-theme-palette="ocean">` (alternative)

### Utility Classes:

```css
/* Background */
.bg-theme-primary {
  background-color: var(--theme-primary);
}
.bg-theme-primary\/10 {
  background-color: oklch(from var(--theme-primary) l c h / 0.1);
}

/* Text */
.text-theme-primary {
  color: var(--theme-primary);
}
.text-gradient-theme {
  background: linear-gradient(...);
  -webkit-background-clip: text;
}

/* Gradients */
.bg-gradient-theme {
  background: linear-gradient(
    to right,
    var(--theme-primary),
    var(--theme-secondary)
  );
}

/* Shadows */
.shadow-theme {
  box-shadow: var(--shadow-theme);
}
```

---

## ⚡ Transition Strategy

### The Problem:

Standard CSS transitions cause "staggered" color changes - different elements transition at different speeds, creating a messy effect.

### The Solution:

**1. Disable ALL transitions during mode change:**

```css
html.theme-switching,
html.theme-switching * {
  transition: none !important;
}
```

**2. Show overlay during transition:**

```typescript
const ThemeTransitionOverlay = ({ isActive, mode }) => (
  <div style={{
    position: 'fixed',
    inset: 0,
    zIndex: 99999,
    pointerEvents: 'none',
    backgroundColor: mode === 'dark' ? '#0f172a' : '#ffffff',
    opacity: isActive ? 0.6 : 0,
    transition: `opacity ${TRANSITION_DURATION / 2}ms ease-in-out`,
  }} />
)
```

**3. Only interactive elements have hover transitions:**

```css
a,
button,
[role='button'],
input,
select,
textarea {
  transition-property: background-color, border-color, color, ...;
  transition-duration: 150ms;
}
```

### Timeline:

```
0ms   → User clicks mode button
0ms   → setIsTransitioning(true), add 'theme-switching' class
~16ms → requestAnimationFrame fires
~16ms → classList changes (light → dark)
50ms  → Remove 'theme-switching' (re-enable transitions)
300ms → setIsTransitioning(false) (hide overlay)
```

---

## ⚠️ Common Shortcomings & Solutions

### 1. Flash of Incorrect Theme on Load

**Problem**: SSR renders with default theme, then hydrates with correct theme causing a flash.

**Solution Applied**:

```typescript
// __root.tsx
<html lang="en" className={initialTheme.mode}>
```

Theme mode is applied at SSR time via `className` on `<html>`, so initial render is correct.

### 2. Theme Lost on Navigation

**Problem**: Navigating to `/blogs` from `/?mode=dark` loses the dark mode.

**Solution Applied**:

```typescript
// __root.tsx
search: {
  middlewares: [retainSearchParams(['mode', 'palette'])],
}
```

Plus `ThemeLink` component for internal links.

### 3. Staggered Transition Effect

**Problem**: Different elements transition at different rates during mode change.

**Solution Applied**:

- `theme-switching` class disables all transitions
- Overlay masks the instant change
- Only overlay animates (fade in/out)

### 4. Invalid URL Params

**Problem**: User manually enters `?mode=invalid&palette=foo`

**Solution Applied**:

```typescript
validateSearch: (search) => ({
  mode: isValidMode(search.mode) ? search.mode : undefined,
  palette: isValidPalette(search.palette) ? search.palette : undefined,
})
```

Invalid values fall back to defaults.

### 5. Dark Mode Colors Too Dark

**Problem**: Same color values in dark mode appear too muted.

**Solution Applied**:
Each palette has TWO sets of values - one for light mode (normal) and one for dark mode (lighter):

```css
[data-theme-palette='ocean'] {
  --theme-primary: oklch(0.56 0.08 230); /* Light mode */
}
.dark[data-theme-palette='ocean'] {
  --theme-primary: oklch(0.72 0.1 230); /* Dark mode - brighter */
}
```

### 6. Mobile vs Desktop UX

**Problem**: Desktop dropdown doesn't work well on mobile.

**Solution Applied**:
Two separate components:

- `ThemeSwitcher` - Desktop: Right-side sheet drawer
- `ThemeSwitcherCompact` - Mobile: Bottom sheet with separate mode/palette buttons

---

## 📁 File Reference

| File                                | Purpose                                         |
| ----------------------------------- | ----------------------------------------------- |
| `src/contexts/theme-context.tsx`    | ThemeProvider, useTheme hook, types, validation |
| `src/components/theme-switcher.tsx` | UI components for theme selection               |
| `src/components/theme-link.tsx`     | Link wrapper preserving theme params            |
| `src/routes/__root.tsx`             | Route config, search param handling             |
| `src/styles.css`                    | CSS variables, palette definitions, utilities   |
| `src/contexts/index.ts`             | Re-exports for cleaner imports                  |

---

## 🔧 How to Extend

### Adding a New Palette

1. **Add type** (`theme-context.tsx`):

```typescript
export type ThemePalette =
  | 'default'
  | 'mahogany'
  | ...
  | 'newpalette'  // Add here
```

2. **Add to valid list** (`theme-context.tsx`):

```typescript
const VALID_PALETTES: ThemePalette[] = [
  'default',
  'mahogany',
  ...,
  'newpalette',  // Add here
]
```

3. **Add palette info** (`theme-context.tsx`):

```typescript
export const themePalettes: ThemePaletteInfo[] = [
  ...,
  {
    id: 'newpalette',
    name: 'New Palette',
    description: 'Description here',
    preview: {
      primary: '#hexcolor',
      secondary: '#hexcolor',
      accent: '#hexcolor',
    },
  },
]
```

4. **Add CSS variables** (`styles.css`):

```css
/* Light mode */
[data-theme-palette='newpalette'] {
  --theme-primary: oklch(...);
  --theme-secondary: oklch(...);
  --theme-accent: oklch(...);
  --theme-shadow: oklch(... / 0.25);
}

/* Dark mode */
.dark [data-theme-palette='newpalette'],
.dark[data-theme-palette='newpalette'] {
  --theme-primary: oklch(...); /* Brighter */
  --theme-secondary: oklch(...);
  --theme-accent: oklch(...);
  --theme-shadow: oklch(... / 0.3);
}
```

### Changing Default Theme

```typescript
// theme-context.tsx
export const DEFAULT_MODE: ThemeMode = 'light' // Change to 'dark' if needed
export const DEFAULT_PALETTE: ThemePalette = 'mahogany' // Change to any valid palette
```

---

## 🤖 LLM Instructions

যখন এই codebase এ কাজ করবেন:

### DO:

1. ✅ Theme-related colors এর জন্য `text-theme-primary`, `bg-theme-primary`, etc. use করুন
2. ✅ Navigation links এ `ThemeLink` use করুন, regular `Link` না
3. ✅ New palettes add করতে উপরের 4টি step follow করুন
4. ✅ Dark mode এ colors brighter করুন (higher L value in oklch)
5. ✅ Mode change এ transitions disable হয় overlay দিয়ে

### DON'T:

1. ❌ localStorage দিয়ে theme store করবেন না
2. ❌ Hardcoded colors use করবেন না (যেমন `text-emerald-500`)
3. ❌ `document.documentElement.className` directly modify করবেন না (ThemeProvider করবে)
4. ❌ Global color transitions add করবেন না

### Quick Reference - Utility Classes:

```css
/* Text */
text-theme-primary
text-theme-secondary
text-theme-accent
text-gradient-theme

/* Background */
bg-theme-primary
bg-theme-primary/10  (10% opacity)
bg-gradient-theme

/* Border */
border-theme-primary
border-theme-primary/20

/* Shadow */
shadow-theme
shadow-theme-lg
hover:shadow-theme-hover

/* Ring */
ring-theme-primary
ring-theme-primary/20
```

### Testing Theme:

URLs for testing:

```
http://localhost:5173/                          # Default (light, mahogany)
http://localhost:5173/?mode=dark                # Dark mode
http://localhost:5173/?palette=ocean            # Ocean palette
http://localhost:5173/?mode=dark&palette=forest # Dark + Forest
http://localhost:5173/blogs?mode=dark           # Theme persists on navigation
```

---

## 📝 Summary

এই theme system:

- **URL-based** - No localStorage, shareable links
- **SSR-safe** - No flash of incorrect theme
- **Smooth** - Overlay-based mode transitions
- **Extensible** - Easy to add new palettes
- **Maintainable** - CSS variables for all colors

Architecture highlights:

- TanStack Router handles URL state + param retention
- React Context provides theme state + actions
- CSS custom properties enable runtime theming
- Separate light/dark values per palette for optimal contrast
