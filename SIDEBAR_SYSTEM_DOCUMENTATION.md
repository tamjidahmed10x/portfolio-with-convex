# 🗂️ Sidebar System - Complete Documentation

> **Purpose**: এই documentation LLM models এবং developers দের জন্য তৈরি করা হয়েছে যাতে তারা এই portfolio project এর sidebar system সম্পূর্ণভাবে বুঝতে পারে এবং নতুন sidebars তৈরি করতে পারে।

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Two Types of Sidebars](#two-types-of-sidebars)
3. [Architecture Pattern](#architecture-pattern)
4. [DashboardSidebar Component](#dashboardsidebar-component)
5. [BlogSidebar Component](#blogsidebar-component)
6. [Sheet Component (Mobile Menus)](#sheet-component-mobile-menus)
7. [State Management](#state-management)
8. [Responsive Design Strategy](#responsive-design-strategy)
9. [Animation System](#animation-system)
10. [Common Patterns & Techniques](#common-patterns--techniques)
11. [File Reference](#file-reference)
12. [How to Create a New Sidebar](#how-to-create-a-new-sidebar)
13. [LLM Instructions](#llm-instructions)

---

## 🔍 System Overview

এই project এ দুই ধরনের sidebar আছে:

| Sidebar            | Location          | Purpose                 |
| ------------------ | ----------------- | ----------------------- |
| `DashboardSidebar` | `/dashboard` page | Admin panel navigation  |
| `BlogSidebar`      | `/blogs` page     | Blog filtering & search |

### Key Features (Both Sidebars):

- ✅ **Collapsible** - Expanded (full) vs Collapsed (icons only)
- ✅ **Responsive** - Different behavior on Desktop vs Mobile
- ✅ **Animated** - Smooth width transitions with motion/react
- ✅ **Fixed Position** - Stays in place while content scrolls
- ✅ **Main Content Adapts** - `margin-left` animates with sidebar width

---

## 🏗️ Two Types of Sidebars

### 1. DashboardSidebar - Navigation Focused

```
┌──────────────────────────────────────────────────────────────┐
│  EXPANDED (280px)              │  COLLAPSED (72px)           │
├──────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐   │  ┌──────────┐              │
│  │ [Logo] Dashboard    [◀] │   │  │  [Icon]  │              │
│  └─────────────────────────┘   │  │  [▶]     │              │
│  ┌─────────────────────────┐   │  │  ────    │              │
│  │ 🔧 Site Configurations  │   │  │  [🔧]    │  ← Icons     │
│  │ 📝 Blogs                │   │  │  [📝]    │    Only      │
│  │ 📞 Contacts             │   │  │  [📞]    │              │
│  │ 📷 Medias               │   │  │  [📷]    │              │
│  └─────────────────────────┘   │  └──────────┘              │
│  ┌─────────────────────────┐   │                            │
│  │ ← Back to Home          │   │  (No bottom content)       │
│  └─────────────────────────┘   │                            │
└──────────────────────────────────────────────────────────────┘
```

### 2. BlogSidebar - Filtering Focused

```
┌──────────────────────────────────────────────────────────────┐
│  EXPANDED (320px)              │  COLLAPSED (72px)           │
├──────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐   │  ┌──────────┐              │
│  │ 🔍 Filters          [◀] │   │  │  [▶]     │              │
│  └─────────────────────────┘   │  │  ────    │              │
│  ┌─────────────────────────┐   │  │  [📚]    │  ← Category  │
│  │ 🔎 Search Articles      │   │  │  [⚛️]    │    Icons     │
│  │ [________________]      │   │  │  [📘]    │              │
│  └─────────────────────────┘   │  │  [🎨]    │              │
│  ┌─────────────────────────┐   │  │  ────    │              │
│  │ Sort By [Newest ▼]      │   │  │  [🔍]    │              │
│  └─────────────────────────┘   │  │  [🏷️]    │              │
│  ┌─────────────────────────┐   │  └──────────┘              │
│  │ 📂 Categories       [▼] │   │                            │
│  │ • All Posts             │   │                            │
│  │ • React                 │   │                            │
│  │ • TypeScript            │   │                            │
│  └─────────────────────────┘   │                            │
│  ┌─────────────────────────┐   │                            │
│  │ 🏷️ Popular Tags     [▼] │   │                            │
│  │ [JS] [React] [Perf]     │   │                            │
│  └─────────────────────────┘   │                            │
│  ┌─────────────────────────┐   │                            │
│  │ ✨ Blog Stats           │   │                            │
│  │ Posts: 12  Tags: 24     │   │                            │
│  └─────────────────────────┘   │                            │
└──────────────────────────────────────────────────────────────┘
```

---

## 🏛️ Architecture Pattern

### Component Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    Parent Page Component                         │
│  (routes/dashboard/index.tsx or components/blogs/blog-landing)  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  State Management:                                               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ const [isCollapsed, setIsCollapsed] = useState(false)     │  │
│  │ const [isMobileOpen, setIsMobileOpen] = useState(false)   │  │
│  │ const [activeSection, setActiveSection] = useState(...)   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Render:                                                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ <Sidebar                                                  │  │
│  │   isCollapsed={isCollapsed}                               │  │
│  │   onToggleCollapse={() => setIsCollapsed(!isCollapsed)}   │  │
│  │   isMobileOpen={isMobileOpen}                             │  │
│  │   onMobileClose={() => setIsMobileOpen(false)}            │  │
│  │   activeSection={activeSection}                           │  │
│  │   onSectionChange={setActiveSection}                      │  │
│  │ />                                                        │  │
│  │                                                           │  │
│  │ <motion.main                                              │  │
│  │   animate={{ marginLeft: isCollapsed ? 72 : 280 }}        │  │
│  │ >                                                         │  │
│  │   {/* Content */}                                         │  │
│  │ </motion.main>                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Parent State   │───▶│    Sidebar      │───▶│  DOM Updates    │
│                 │    │                 │    │                 │
│ • isCollapsed   │    │ • Read props    │    │ • Width animate │
│ • isMobileOpen  │    │ • Render UI     │    │ • Opacity fade  │
│ • activeSection │    │ • Handle clicks │    │ • Transform     │
└─────────────────┘    └────────┬────────┘    └─────────────────┘
         ▲                      │
         │                      │
         └──────────────────────┘
              Callbacks (onToggleCollapse, onMobileClose, etc.)
```

---

## 📦 DashboardSidebar Component

### Location: `src/components/dashboard/sidebar/index.tsx`

### Props Interface:

```typescript
export type DashboardSidebarLink = {
  label: string // Display text
  href: string // URL (usually '#' for SPA)
  icon: ReactNode // Lucide/Tabler icon element
  section?: string // Section identifier for active state
  onClick?: () => void // Optional click handler
}

type DashboardSidebarProps = {
  links: DashboardSidebarLink[] // Navigation items
  activeSection?: string // Currently selected section
  onSectionChange?: (section: string) => void // Section change callback
  logo?: ReactNode // Logo for expanded view
  logoCollapsed?: ReactNode // Logo for collapsed view (icon only)
  bottomContent?: ReactNode // Content at sidebar bottom
  isMobileOpen?: boolean // Mobile drawer state
  onMobileClose?: () => void // Close mobile drawer
  isCollapsed?: boolean // Desktop collapsed state
  onToggleCollapse?: () => void // Toggle collapse
}
```

### Usage Example:

```tsx
// routes/dashboard/index.tsx
const [activeSection, setActiveSection] = useState('site-configurations')
const [isCollapsed, setIsCollapsed] = useState(false)
const [isMobileOpen, setIsMobileOpen] = useState(false)

const links: DashboardSidebarLink[] = [
  {
    label: 'Site Configurations',
    href: '#',
    icon: <IconSettings className="h-5 w-5" />,
    section: 'site-configurations',
  },
  {
    label: 'Blogs',
    href: '#',
    icon: <IconArticle className="h-5 w-5" />,
    section: 'blogs',
  },
  // ... more links
]

return (
  <>
    <DashboardSidebar
      links={links}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      isCollapsed={isCollapsed}
      onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      isMobileOpen={isMobileOpen}
      onMobileClose={() => setIsMobileOpen(false)}
      logo={<Logo />}
      logoCollapsed={<LogoIcon />}
      bottomContent={<BackToHomeLink />}
    />

    <motion.main
      animate={{ marginLeft: isCollapsed ? 72 : 280 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Content */}
    </motion.main>
  </>
)
```

### Internal Structure:

```tsx
// Sidebar has THREE main parts:

// 1. collapsedContent - Icon-only view (72px)
const collapsedContent = (
  <div className="flex h-full flex-col items-center gap-3 py-5">
    {logoCollapsed}
    <ExpandButton onClick={onToggleCollapse} />
    <Divider />
    {links.map((link) => (
      <IconButton key={link.section} {...link} />
    ))}
  </div>
)

// 2. sidebarContent - Full view (280px)
const sidebarContent = (
  <div className="flex h-full flex-col">
    <Header logo={logo} onCollapse={onToggleCollapse} />
    <ScrollableNav links={links} activeSection={activeSection} />
    {bottomContent && <Footer>{bottomContent}</Footer>}
  </div>
)

// 3. Return statement - Combines Desktop + Mobile
return (
  <>
    {/* Desktop - Fixed sidebar with animated width */}
    <motion.aside animate={{ width: isCollapsed ? 72 : 280 }}>
      <AnimatedContent content={collapsedContent} visible={isCollapsed} />
      <AnimatedContent content={sidebarContent} visible={!isCollapsed} />
    </motion.aside>

    {/* Mobile - Overlay + Slide-in drawer */}
    <AnimatePresence>
      {isMobileOpen && (
        <>
          <Overlay onClick={onMobileClose} />
          <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }}>
            {sidebarContent}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  </>
)
```

---

## 📰 BlogSidebar Component

### Location: `src/components/blogs/blog-sidebar.tsx`

### Props Interface:

```typescript
export type SortOption = 'newest' | 'oldest' | 'popular' | 'trending'
export type Category =
  | 'all'
  | 'react'
  | 'typescript'
  | 'css'
  | 'nextjs'
  | 'backend'
  | 'mobile'
  | 'database'

type BlogSidebarProps = {
  // Filter states (controlled from parent)
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: Category
  onCategoryChange: (category: Category) => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  selectedTags: string[]
  onTagToggle: (tag: string) => void

  // Visibility states
  isMobileOpen?: boolean
  onMobileClose?: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}
```

### Usage Example:

```tsx
// components/blogs/blog-landing-page.tsx
const [searchQuery, setSearchQuery] = useState('')
const [selectedCategory, setSelectedCategory] = useState<Category>('all')
const [sortBy, setSortBy] = useState<SortOption>('newest')
const [selectedTags, setSelectedTags] = useState<string[]>([])
const [isMobileOpen, setIsMobileOpen] = useState(false)
const [isCollapsed, setIsCollapsed] = useState(false)

const handleTagToggle = useCallback((tag: string) => {
  setSelectedTags((prev) =>
    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
  )
}, [])

return (
  <>
    <BlogSidebar
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
      sortBy={sortBy}
      onSortChange={setSortBy}
      selectedTags={selectedTags}
      onTagToggle={handleTagToggle}
      isMobileOpen={isMobileOpen}
      onMobileClose={() => setIsMobileOpen(false)}
      isCollapsed={isCollapsed}
      onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
    />

    <motion.main
      animate={{ marginLeft: isCollapsed ? 72 : 320 }}
      transition={{ type: 'spring', stiffness: 2000, damping: 150 }}
    >
      {/* Blog content */}
    </motion.main>
  </>
)
```

### Unique Features:

1. **Collapsible Accordions** - Categories and Tags sections expand/collapse:

```tsx
const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true)
const [isTagsExpanded, setIsTagsExpanded] = useState(true)

<motion.button onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}>
  <ChevronDown animate={{ rotate: isCategoriesExpanded ? 180 : 0 }} />
</motion.button>
<AnimatePresence>
  {isCategoriesExpanded && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
    >
      {/* Content */}
    </motion.div>
  )}
</AnimatePresence>
```

2. **Sort Dropdown**:

```tsx
const [isSortOpen, setIsSortOpen] = useState(false)

<motion.button onClick={() => setIsSortOpen(!isSortOpen)}>
  {currentSort?.label} <ChevronDown />
</motion.button>
<AnimatePresence>
  {isSortOpen && (
    <motion.div className="dropdown">
      {sortOptions.map(option => (
        <button onClick={() => { onSortChange(option.id); setIsSortOpen(false) }}>
          {option.label}
        </button>
      ))}
    </motion.div>
  )}
</AnimatePresence>
```

3. **Clear Filters Button** - Only shows when filters are active:

```tsx
{
  ;(searchQuery || selectedCategory !== 'all' || selectedTags.length > 0) && (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={clearAllFilters}
    >
      Clear All Filters
    </motion.button>
  )
}
```

---

## 📱 Sheet Component (Mobile Menus)

### Location: `src/components/ui/sheet.tsx`

এটি Radix UI Dialog এর উপর ভিত্তি করে তৈরি। Header এর mobile menu এই component use করে।

### Available Sides:

```tsx
type Side = 'top' | 'right' | 'bottom' | 'left'
```

### Usage:

```tsx
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

;<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetTrigger asChild>
    <Button>Open Menu</Button>
  </SheetTrigger>

  <SheetContent side="right" hideClose={true}>
    <SheetHeader>
      <SheetTitle>Menu</SheetTitle>
    </SheetHeader>

    {/* Content */}

    <SheetClose asChild>
      <Button>Close</Button>
    </SheetClose>
  </SheetContent>
</Sheet>
```

### Animation Classes (built-in):

```css
/* Right side */
data-[state=closed]:slide-out-to-right
data-[state=open]:slide-in-from-right

/* Left side */
data-[state=closed]:slide-out-to-left
data-[state=open]:slide-in-from-left

/* Top side */
data-[state=closed]:slide-out-to-top
data-[state=open]:slide-in-from-top

/* Bottom side */
data-[state=closed]:slide-out-to-bottom
data-[state=open]:slide-in-from-bottom
```

### When to use Sheet vs Custom Mobile Sidebar:

| Use Sheet         | Use Custom Sidebar     |
| ----------------- | ---------------------- |
| Simple menus      | Complex filter UIs     |
| Quick actions     | Need collapse feature  |
| Header navigation | Same UI desktop/mobile |
| One-off drawers   | Reusable component     |

---

## 🔄 State Management

### Desktop vs Mobile State

```typescript
// Desktop collapsed state - sidebar shrinks to icons
const [isCollapsed, setIsCollapsed] = useState(false)

// Mobile open state - sidebar shows as overlay
const [isMobileOpen, setIsMobileOpen] = useState(false)
```

### Why Two Separate States?

```
Desktop (lg:block):
┌─────────────────────────────────────────────────────────────┐
│ isCollapsed=false         │ isCollapsed=true              │
│ ┌────────────┬──────────┐ │ ┌──────┬──────────────────────┐│
│ │   280px    │  main    │ │ │ 72px │       main           ││
│ │  sidebar   │ content  │ │ │ icons│      content         ││
│ └────────────┴──────────┘ │ └──────┴──────────────────────┘│
└─────────────────────────────────────────────────────────────┘

Mobile (lg:hidden):
┌─────────────────────────────────────────────────────────────┐
│ isMobileOpen=false        │ isMobileOpen=true             │
│ ┌──────────────────────┐  │ ┌────────────┬───────────────┐│
│ │      main content    │  │ │  overlay   │   sidebar     ││
│ │   (full width)       │  │ │  (black)   │  (slide-in)   ││
│ └──────────────────────┘  │ └────────────┴───────────────┘│
│ [☰] button to open        │  [✕] button to close          │
└─────────────────────────────────────────────────────────────┘
```

### State Synchronization Pattern:

```typescript
// Parent manages ALL state
function ParentPage() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('default')

  return (
    <>
      <Sidebar
        // Pass state down as props
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        activeSection={activeSection}
        // Pass callbacks for state updates
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        onMobileClose={() => setIsMobileOpen(false)}
        onSectionChange={setActiveSection}
      />

      {/* Mobile header with menu button */}
      <div className="lg:hidden">
        <button onClick={() => setIsMobileOpen(true)}>
          <Menu />
        </button>
      </div>

      <main>...</main>
    </>
  )
}
```

---

## 📐 Responsive Design Strategy

### Breakpoint System:

```
Mobile:  0px    - 1023px  → Sidebar hidden, overlay drawer
Desktop: 1024px+          → Fixed sidebar, collapsible
```

### CSS Media Query Pattern:

```tsx
// In sidebar component
<motion.aside
  className="
    fixed left-0 top-0 z-30
    hidden lg:block          // Only show on desktop
    h-screen
    overflow-hidden
    border-r
  "
  animate={{ width: isCollapsed ? 72 : 280 }}
>
  {/* Desktop sidebar content */}
</motion.aside>

// Mobile sidebar (separate, uses AnimatePresence)
<AnimatePresence>
  {isMobileOpen && (
    <>
      <motion.div className="lg:hidden">  {/* Overlay */}
      <motion.aside className="lg:hidden"> {/* Drawer */}
    </>
  )}
</AnimatePresence>
```

### Main Content Margin Adjustment:

```tsx
<motion.main
  animate={{ marginLeft: isCollapsed ? 72 : 280 }}
  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
>
  {/* CRITICAL: Override margin on mobile */}
  <style>{`
    @media (max-width: 1023px) {
      main { margin-left: 0 !important; }
    }
  `}</style>

  {/* Content */}
</motion.main>
```

### Mobile Header Pattern:

```tsx
{
  /* Only shows on mobile */
}
;<div className="lg:hidden flex items-center justify-between p-4 border-b">
  <button onClick={() => setIsMobileOpen(true)}>
    <Menu className="h-6 w-6" />
  </button>
  <Logo />
  <div className="w-10" /> {/* Spacer for centering */}
</div>
```

---

## ✨ Animation System

### Width Transition (Desktop Collapse):

```tsx
<motion.aside
  initial={false}  // Don't animate on mount
  animate={{ width: isCollapsed ? 72 : 280 }}
  transition={{
    type: 'spring',
    stiffness: 400,  // Higher = faster
    damping: 30,     // Higher = less bounce
  }}
>
```

### Content Fade (Collapsed ↔ Expanded):

```tsx
{
  /* Both contents are ALWAYS rendered */
}
{
  /* Just opacity and pointerEvents change */
}

{
  /* Collapsed content */
}
;<motion.div
  initial={false}
  animate={{
    opacity: isCollapsed ? 1 : 0,
    scale: isCollapsed ? 1 : 0.8,
    pointerEvents: isCollapsed ? 'auto' : 'none',
  }}
  transition={{ duration: 0.2 }}
  className="absolute inset-0" // Stack on top
>
  {collapsedContent}
</motion.div>

{
  /* Expanded content */
}
;<motion.div
  initial={false}
  animate={{
    opacity: isCollapsed ? 0 : 1,
    scale: isCollapsed ? 0.95 : 1,
    pointerEvents: isCollapsed ? 'none' : 'auto',
  }}
  transition={{ duration: 0.2 }}
>
  {sidebarContent}
</motion.div>
```

### Mobile Slide-in:

```tsx
<AnimatePresence>
  {isMobileOpen && (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onMobileClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.aside
        initial={{ x: '-100%' }} // Start off-screen left
        animate={{ x: 0 }} // Slide to visible
        exit={{ x: '-100%' }} // Slide back out
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
        }}
        className="fixed inset-y-0 left-0 w-72"
      >
        {sidebarContent}
      </motion.aside>
    </>
  )}
</AnimatePresence>
```

### Active Item Indicator:

```tsx
<motion.button className={cn(isSelected && 'bg-neutral-800')}>
  {link.label}
  {isSelected && (
    <motion.div
      layoutId="dashboardSidebarIndicator" // Shared layout animation
      className="absolute right-3 size-2 rounded-full bg-white"
      initial={false}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
    />
  )}
</motion.button>
```

### Hover & Tap Animations:

```tsx
<motion.button
  whileHover={{ scale: 1.02, x: 2 }}   // Slight grow + shift right
  whileTap={{ scale: 0.98 }}            // Slight shrink on click
>
```

---

## 🔧 Common Patterns & Techniques

### 1. Icon-Only Collapsed View

```tsx
// Collapsed view shows only icons with tooltips
{
  links.map((link) => (
    <motion.button
      key={link.section}
      onClick={() => onSectionChange(link.section)}
      className={cn(
        'size-10 rounded-xl flex items-center justify-center',
        isSelected ? 'bg-primary text-white' : 'text-muted hover:bg-muted',
      )}
      whileHover={{ scale: 1.1 }}
      title={link.label} // Tooltip on hover
    >
      {link.icon}
    </motion.button>
  ))
}
```

### 2. Scrollable Content Area

```tsx
<div className="flex h-full flex-col">
  {/* Fixed header */}
  <div className="border-b p-4">Header</div>

  {/* Scrollable middle */}
  <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
    {/* Content */}
  </div>

  {/* Fixed footer */}
  <div className="border-t p-4">Footer</div>
</div>
```

### 3. Backdrop Blur Effect

```tsx
<motion.aside
  className="
    bg-neutral-50/95       // Semi-transparent background
    backdrop-blur-xl       // Blur content behind
    border-r
  "
>
```

### 4. Z-Index Layering

```
z-20: Desktop sidebar
z-30: Dashboard sidebar (above header)
z-40: Mobile overlay (backdrop)
z-50: Mobile drawer (on top of overlay)
```

---

## 📁 File Reference

| File                                         | Purpose                                  |
| -------------------------------------------- | ---------------------------------------- |
| `src/components/dashboard/sidebar/index.tsx` | Dashboard navigation sidebar             |
| `src/components/blogs/blog-sidebar.tsx`      | Blog filter/search sidebar               |
| `src/components/ui/sheet.tsx`                | Radix-based drawer component             |
| `src/routes/dashboard/index.tsx`             | Dashboard page (uses DashboardSidebar)   |
| `src/components/blogs/blog-landing-page.tsx` | Blogs page (uses BlogSidebar)            |
| `src/components/Header.tsx`                  | Main header (uses Sheet for mobile menu) |

---

## 🛠️ How to Create a New Sidebar

### Step 1: Define Props Interface

```typescript
// src/components/my-feature/my-sidebar.tsx

type MyLink = {
  label: string
  icon: ReactNode
  id: string
}

type MySidebarProps = {
  links: MyLink[]
  activeId?: string
  onSelect?: (id: string) => void

  // Standard sidebar props
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  isMobileOpen?: boolean
  onMobileClose?: () => void
}
```

### Step 2: Create Collapsed Content

```tsx
const collapsedContent = (
  <div className="flex h-full flex-col items-center gap-3 py-5">
    {/* Expand button */}
    <motion.button
      onClick={onToggleCollapse}
      className="size-10 rounded-xl bg-gradient-theme text-white"
      whileHover={{ scale: 1.05 }}
    >
      <PanelLeft className="size-5" />
    </motion.button>

    <div className="my-2 h-px w-8 bg-slate-200 dark:bg-slate-700" />

    {/* Icon buttons */}
    {links.map((link) => (
      <motion.button
        key={link.id}
        onClick={() => onSelect?.(link.id)}
        className={cn('size-10', activeId === link.id && 'bg-primary')}
        title={link.label}
      >
        {link.icon}
      </motion.button>
    ))}
  </div>
)
```

### Step 3: Create Full Content

```tsx
const sidebarContent = (
  <div className="flex h-full flex-col">
    {/* Header */}
    <div className="flex items-center justify-between border-b p-4">
      <span className="font-bold">My Sidebar</span>
      <motion.button onClick={onToggleCollapse}>
        <PanelLeftClose className="size-5" />
      </motion.button>
    </div>

    {/* Scrollable content */}
    <div className="flex-1 overflow-y-auto p-4">
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <motion.button
            key={link.id}
            onClick={() => onSelect?.(link.id)}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5',
              activeId === link.id ? 'bg-primary text-white' : 'hover:bg-muted',
            )}
            whileHover={{ scale: 1.01, x: 2 }}
          >
            {link.icon}
            <span>{link.label}</span>
          </motion.button>
        ))}
      </nav>
    </div>
  </div>
)
```

### Step 4: Combine Desktop + Mobile

```tsx
return (
  <>
    {/* Desktop */}
    <motion.aside
      className="fixed left-0 top-16 z-20 hidden h-[calc(100vh-4rem)] lg:block"
      animate={{ width: isCollapsed ? 72 : 280 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <motion.div
        animate={{
          opacity: isCollapsed ? 1 : 0,
          pointerEvents: isCollapsed ? 'auto' : 'none',
        }}
        className="absolute inset-0"
      >
        {collapsedContent}
      </motion.div>

      <motion.div
        animate={{
          opacity: isCollapsed ? 0 : 1,
          pointerEvents: isCollapsed ? 'none' : 'auto',
        }}
      >
        {sidebarContent}
      </motion.div>
    </motion.aside>

    {/* Mobile */}
    <AnimatePresence>
      {isMobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
          >
            {sidebarContent}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  </>
)
```

### Step 5: Use in Parent Page

```tsx
// routes/my-feature/index.tsx

function MyFeaturePage() {
  const [activeId, setActiveId] = useState('item-1')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div>
      <MySidebar
        links={myLinks}
        activeId={activeId}
        onSelect={setActiveId}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />

      <motion.main
        animate={{ marginLeft: isCollapsed ? 72 : 280 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <style>{`
          @media (max-width: 1023px) {
            main { margin-left: 0 !important; }
          }
        `}</style>

        {/* Mobile header */}
        <div className="lg:hidden p-4 border-b">
          <button onClick={() => setIsMobileOpen(true)}>
            <Menu className="size-6" />
          </button>
        </div>

        {/* Content */}
        {renderContent(activeId)}
      </motion.main>
    </div>
  )
}
```

---

## 🤖 LLM Instructions

### DO:

1. ✅ Copy the existing sidebar pattern (DashboardSidebar or BlogSidebar)
2. ✅ Use `motion/react` for all animations
3. ✅ Maintain TWO separate states: `isCollapsed` (desktop) and `isMobileOpen` (mobile)
4. ✅ Use `AnimatePresence` for mobile overlay/drawer
5. ✅ Add `lg:hidden` for mobile-only elements and `hidden lg:block` for desktop-only
6. ✅ Use `pointerEvents: 'none'` when content is hidden (prevents click-through)
7. ✅ Add media query override in main content: `main { margin-left: 0 !important; }`
8. ✅ Use spring animations for smooth width transitions

### DON'T:

1. ❌ Use CSS transitions for width changes (use motion.animate)
2. ❌ Combine mobile and desktop state into one
3. ❌ Forget the overlay backdrop for mobile
4. ❌ Use `display: none` for collapsed content (use opacity + pointerEvents)
5. ❌ Forget to handle z-index layering
6. ❌ Use hardcoded pixel values without variables

### Quick Reference - Key Dimensions:

```
Dashboard Sidebar:
- Expanded width: 280px
- Collapsed width: 72px

Blog Sidebar:
- Expanded width: 320px
- Collapsed width: 72px

Mobile Drawer:
- Width: 288px (w-72) or 320px (w-80)

Breakpoint:
- Desktop: lg (1024px+)
- Mobile: < 1024px
```

### Animation Values:

```typescript
// Width transition
transition={{ type: 'spring', stiffness: 400, damping: 30 }}

// Content fade
transition={{ duration: 0.2 }}

// Mobile slide
transition={{ type: 'spring', damping: 25, stiffness: 300 }}

// Hover effects
whileHover={{ scale: 1.02, x: 2 }}
whileTap={{ scale: 0.98 }}

// Active indicator
transition={{ type: 'spring', stiffness: 500, damping: 30 }}
```

---

## 📝 Summary

এই sidebar system:

- **Dual-state** - Desktop collapse + Mobile drawer
- **Animated** - Spring-based smooth transitions
- **Responsive** - Automatic behavior change at lg breakpoint
- **Reusable** - Props-driven configuration
- **Accessible** - Keyboard navigable, proper ARIA

Architecture highlights:

- Parent page controls ALL state
- Sidebar is a "dumb" component (props in, callbacks out)
- Both collapsed and expanded content always rendered (just visibility toggled)
- Mobile uses overlay + slide-in pattern
- Main content margin syncs with sidebar width
