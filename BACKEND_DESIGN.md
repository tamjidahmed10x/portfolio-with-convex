# 🚀 Portfolio Backend Design Document

## Overview

এই document এ পুরো portfolio website এর backend design করা হয়েছে। সব data Convex backend থেকে dynamically fetch হবে এবং admin panel থেকে manage করা যাবে।

---

## 📊 Table Structure Analysis

### Singleton vs Collection

| Data Type        | Pattern            | Reason                          |
| ---------------- | ------------------ | ------------------------------- |
| Profile Info     | **Singleton**      | Only 1 profile ever             |
| Contact Info     | **Singleton**      | Only 1 contact set              |
| Nav Links        | **Embedded Array** | Fixed structure, rarely changes |
| Highlights/Stats | **Embedded Array** | Small fixed set                 |
| Experiences      | **Collection**     | Multiple items, CRUD needed     |
| Skills           | **Collection**     | Multiple items, CRUD needed     |
| Projects         | **Collection**     | Multiple items, CRUD needed     |
| Blogs            | **Collection**     | Multiple items, full CMS        |

### Optimized Design: 8 Tables (Instead of 12)

```
✅ Merged Singletons:
   profile + contact + navLinks + highlights + siteSettings → siteConfig

✅ Collection Tables (Keep Separate):
   1. siteConfig      (singleton - all config)
   2. experiences     (collection)
   3. skillCategories (collection)
   4. skills          (collection)
   5. projects        (collection)
   6. blogs           (collection)
   7. blogComments    (collection)
   8. contactMessages (collection)
```

---

## 📊 Database Schema Design

### 1. `siteConfig` Table (Singleton - All Site Configuration)

```typescript
// convex/schema.ts
siteConfig: defineTable({
  // ═══════════════════════════════════════
  // PROFILE SECTION
  // ═══════════════════════════════════════
  name: v.string(), // "Tamjid Ahmed"
  title: v.string(), // "Frontend Engineer"
  tagline: v.string(), // "Available for work"
  bio: v.string(), // Main bio/description

  // Profile Image
  profileImageId: v.optional(v.id('_storage')),
  profileImageUrl: v.optional(v.string()),

  // Resume
  resumeFileId: v.optional(v.id('_storage')),
  resumeUrl: v.optional(v.string()),

  // Personal Details
  age: v.number(),
  careerStartDate: v.string(), // ISO date "2021-12-01"
  presentAddress: v.string(),
  permanentAddress: v.string(),

  // Availability
  isAvailableForWork: v.boolean(),
  availabilityNote: v.optional(v.string()),

  // ═══════════════════════════════════════
  // CONTACT SECTION
  // ═══════════════════════════════════════
  email: v.string(),
  phone: v.string(),
  isPhonePublic: v.boolean(),
  location: v.string(), // "Dhaka, Bangladesh"
  responseTime: v.optional(v.string()), // "24 hours"

  // Social Links
  githubUrl: v.optional(v.string()),
  linkedinUrl: v.optional(v.string()),
  twitterUrl: v.optional(v.string()),

  // ═══════════════════════════════════════
  // NAVIGATION LINKS (Embedded Array)
  // ═══════════════════════════════════════
  navLinks: v.array(
    v.object({
      id: v.string(), // unique id for React keys
      label: v.string(), // "Home"
      href: v.string(), // "/#home"
      iconName: v.string(), // "Home" (Lucide icon)
      isExternal: v.boolean(),
      order: v.number(),
      isVisible: v.boolean(),
    }),
  ),

  // ═══════════════════════════════════════
  // HIGHLIGHTS/STATS (Embedded Array)
  // ═══════════════════════════════════════
  highlights: v.array(
    v.object({
      id: v.string(),
      label: v.string(), // "Lines of Code"
      value: v.string(), // "100K+"
      iconName: v.string(), // "Code2"
      gradientFrom: v.string(), // "blue-500"
      gradientTo: v.string(), // "cyan-500"
      section: v.union(
        // Which section to show
        v.literal('about'),
        v.literal('projects'),
        v.literal('hero'),
      ),
      order: v.number(),
      isVisible: v.boolean(),
    }),
  ),

  // ═══════════════════════════════════════
  // SEO & META
  // ═══════════════════════════════════════
  siteName: v.optional(v.string()),
  seoTitle: v.optional(v.string()),
  seoDescription: v.optional(v.string()),
  seoKeywords: v.optional(v.array(v.string())),
  ogImage: v.optional(v.string()),

  // Meta
  updatedAt: v.number(),
})
```

### 2. `experiences` Table (Work Experience)

```typescript
experiences: defineTable({
  company: v.string(),
  position: v.string(),
  location: v.string(),
  locationType: v.union(
    v.literal('Remote'),
    v.literal('On-site'),
    v.literal('Hybrid'),
  ),

  startDate: v.string(),
  endDate: v.optional(v.string()), // null = currently working

  // Styling
  gradientFrom: v.string(),
  gradientTo: v.string(),

  // Details
  description: v.optional(v.string()),
  responsibilities: v.optional(v.array(v.string())),

  order: v.number(),
  isVisible: v.boolean(),

  createdAt: v.number(),
  updatedAt: v.number(),
})
```

### 3. `skillCategories` Table

```typescript
skillCategories: defineTable({
  name: v.string(), // "Frontend"
  iconName: v.string(), // "Layout" (Lucide icon)
  iconColor: v.string(), // "text-blue-500"

  order: v.number(),
  isVisible: v.boolean(),

  createdAt: v.number(),
  updatedAt: v.number(),
})
```

### 4. `skills` Table (Tech Stack)

```typescript
skills: defineTable({
  name: v.string(),
  iconName: v.string(), // "SiReact" (icon-pack name)
  iconColor: v.string(), // "#61DAFB"

  category: v.string(), // References skillCategories.name

  proficiencyLevel: v.optional(
    v.union(
      v.literal('Beginner'),
      v.literal('Intermediate'),
      v.literal('Advanced'),
      v.literal('Expert'),
    ),
  ),

  yearsOfExperience: v.optional(v.number()),

  order: v.number(),
  isVisible: v.boolean(),

  createdAt: v.number(),
  updatedAt: v.number(),
})
```

### 5. `projects` Table

```typescript
projects: defineTable({
  title: v.string(),
  description: v.string(),

  // Images
  imageId: v.optional(v.id('_storage')),
  imageUrl: v.optional(v.string()),

  // Links
  liveUrl: v.optional(v.string()),
  githubUrl: v.optional(v.string()),

  // Category
  category: v.string(),
  categoryIcon: v.string(),
  categoryColor: v.string(),

  // Tech Stack (inline for display)
  techStack: v.array(
    v.object({
      name: v.string(),
      iconName: v.string(),
      iconColor: v.string(),
    }),
  ),

  // Highlights/Features
  highlights: v.array(v.string()),

  order: v.number(),
  isFeatured: v.boolean(),
  isVisible: v.boolean(),

  createdAt: v.number(),
  updatedAt: v.number(),
})
```

### 6. `blogs` Table

```typescript
blogs: defineTable({
  title: v.string(),
  slug: v.string(),
  excerpt: v.string(),
  content: v.string(), // Markdown content

  // Cover Image
  coverImageId: v.optional(v.id('_storage')),
  coverImageUrl: v.optional(v.string()),

  // Category
  category: v.string(),
  categoryIcon: v.string(),
  categoryColor: v.string(),

  // Meta
  readTime: v.string(),
  publishedAt: v.string(),
  publishedAtTimestamp: v.number(),

  // Author (inline since single author)
  authorName: v.string(),
  authorAvatar: v.optional(v.string()),

  // Engagement
  views: v.number(),
  likes: v.number(),

  // Tags
  tags: v.array(v.string()),

  // Status
  status: v.union(
    v.literal('draft'),
    v.literal('published'),
    v.literal('archived'),
  ),
  isFeatured: v.boolean(),

  // SEO
  metaTitle: v.optional(v.string()),
  metaDescription: v.optional(v.string()),

  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_slug', ['slug'])
  .index('by_status', ['status'])
  .index('by_category', ['category'])
```

### 7. `blogComments` Table

```typescript
blogComments: defineTable({
  blogId: v.id('blogs'),

  authorName: v.string(),
  authorEmail: v.string(),
  content: v.string(),

  parentCommentId: v.optional(v.id('blogComments')), // Reply support
  isApproved: v.boolean(),

  createdAt: v.number(),
}).index('by_blog', ['blogId'])
```

### 8. `contactMessages` Table (Form Submissions)

```typescript
contactMessages: defineTable({
  name: v.string(),
  email: v.string(),
  subject: v.string(),
  message: v.string(),

  status: v.union(
    v.literal('unread'),
    v.literal('read'),
    v.literal('replied'),
    v.literal('archived'),
  ),

  notes: v.optional(v.string()), // Admin notes
  repliedAt: v.optional(v.number()),

  createdAt: v.number(),
}).index('by_status', ['status'])
```

---

## 🔧 Convex Functions Design

### Site Config Functions (Singleton Pattern)

```typescript
// convex/siteConfig.ts

// Get all site config (singleton - only one record)
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('siteConfig').first()
  },
})

// Get specific sections
export const getProfile = query({
  args: {},
  handler: async (ctx) => {
    const config = await ctx.db.query('siteConfig').first()
    if (!config) return null

    return {
      name: config.name,
      title: config.title,
      tagline: config.tagline,
      bio: config.bio,
      profileImageUrl: config.profileImageUrl,
      resumeUrl: config.resumeUrl,
      age: config.age,
      careerStartDate: config.careerStartDate,
      presentAddress: config.presentAddress,
      permanentAddress: config.permanentAddress,
      isAvailableForWork: config.isAvailableForWork,
      availabilityNote: config.availabilityNote,
    }
  },
})

export const getContact = query({
  args: {},
  handler: async (ctx) => {
    const config = await ctx.db.query('siteConfig').first()
    if (!config) return null

    return {
      email: config.email,
      phone: config.phone,
      isPhonePublic: config.isPhonePublic,
      location: config.location,
      responseTime: config.responseTime,
      githubUrl: config.githubUrl,
      linkedinUrl: config.linkedinUrl,
      twitterUrl: config.twitterUrl,
    }
  },
})

export const getNavLinks = query({
  args: {},
  handler: async (ctx) => {
    const config = await ctx.db.query('siteConfig').first()
    if (!config) return []

    return config.navLinks
      .filter((link) => link.isVisible)
      .sort((a, b) => a.order - b.order)
  },
})

export const getHighlights = query({
  args: {
    section: v.union(
      v.literal('about'),
      v.literal('projects'),
      v.literal('hero'),
    ),
  },
  handler: async (ctx, args) => {
    const config = await ctx.db.query('siteConfig').first()
    if (!config) return []

    return config.highlights
      .filter((h) => h.section === args.section && h.isVisible)
      .sort((a, b) => a.order - b.order)
  },
})

// Update site config (upsert pattern)
export const update = mutation({
  args: {
    // All optional for partial updates
    name: v.optional(v.string()),
    title: v.optional(v.string()),
    bio: v.optional(v.string()),
    // ... other fields
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query('siteConfig').first()

    if (!existing) {
      // Create with defaults + provided values
      return await ctx.db.insert('siteConfig', {
        name: args.name || 'Your Name',
        title: args.title || 'Your Title',
        // ... defaults
        navLinks: [],
        highlights: [],
        updatedAt: Date.now(),
      })
    }

    return await ctx.db.patch(existing._id, {
      ...args,
      updatedAt: Date.now(),
    })
  },
})

// Update navigation links
export const updateNavLinks = mutation({
  args: {
    navLinks: v.array(
      v.object({
        id: v.string(),
        label: v.string(),
        href: v.string(),
        iconName: v.string(),
        isExternal: v.boolean(),
        order: v.number(),
        isVisible: v.boolean(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const config = await ctx.db.query('siteConfig').first()
    if (!config) throw new Error('Site config not found')

    return await ctx.db.patch(config._id, {
      navLinks: args.navLinks,
      updatedAt: Date.now(),
    })
  },
})

// Update highlights
export const updateHighlights = mutation({
  args: {
    highlights: v.array(
      v.object({
        id: v.string(),
        label: v.string(),
        value: v.string(),
        iconName: v.string(),
        gradientFrom: v.string(),
        gradientTo: v.string(),
        section: v.string(),
        order: v.number(),
        isVisible: v.boolean(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const config = await ctx.db.query('siteConfig').first()
    if (!config) throw new Error('Site config not found')

    return await ctx.db.patch(config._id, {
      highlights: args.highlights,
      updatedAt: Date.now(),
    })
  },
})
```

### Experience Functions

```typescript
// convex/experiences.ts

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('experiences')
      .filter((q) => q.eq(q.field('isVisible'), true))
      .collect()
      .then((exps) => exps.sort((a, b) => a.order - b.order))
  },
})

export const add = mutation({
  args: {
    company: v.string(),
    position: v.string(),
    location: v.string(),
    locationType: v.union(
      v.literal('Remote'),
      v.literal('On-site'),
      v.literal('Hybrid'),
    ),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    gradientFrom: v.string(),
    gradientTo: v.string(),
  },
  handler: async (ctx, args) => {
    const experiences = await ctx.db.query('experiences').collect()
    return await ctx.db.insert('experiences', {
      ...args,
      order: experiences.length,
      isVisible: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
  },
})

export const update = mutation({
  args: {
    id: v.id('experiences'),
    company: v.optional(v.string()),
    position: v.optional(v.string()),
    // ... other optional fields
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args
    return await ctx.db.patch(id, { ...data, updatedAt: Date.now() })
  },
})

export const remove = mutation({
  args: { id: v.id('experiences') },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id)
  },
})
```

### Skills Functions

```typescript
// convex/skills.ts

export const listByCategory = query({
  args: {},
  handler: async (ctx) => {
    const skills = await ctx.db
      .query('skills')
      .filter((q) => q.eq(q.field('isVisible'), true))
      .collect()

    const categories = await ctx.db
      .query('skillCategories')
      .filter((q) => q.eq(q.field('isVisible'), true))
      .collect()

    // Group skills by category
    return categories
      .sort((a, b) => a.order - b.order)
      .map((category) => ({
        ...category,
        skills: skills
          .filter((skill) => skill.category === category.name)
          .sort((a, b) => a.order - b.order),
      }))
  },
})

export const add = mutation({
  args: {
    name: v.string(),
    iconName: v.string(),
    iconColor: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const existingSkills = await ctx.db
      .query('skills')
      .filter((q) => q.eq(q.field('category'), args.category))
      .collect()

    return await ctx.db.insert('skills', {
      ...args,
      order: existingSkills.length,
      isVisible: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
  },
})
```

### Projects Functions

```typescript
// convex/projects.ts

export const listFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('projects')
      .filter((q) =>
        q.and(
          q.eq(q.field('isVisible'), true),
          q.eq(q.field('isFeatured'), true),
        ),
      )
      .collect()
      .then((projects) => projects.sort((a, b) => a.order - b.order))
  },
})

export const list = query({
  args: {
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query('projects')
      .filter((q) => q.eq(q.field('isVisible'), true))

    let projects = await query.collect()

    if (args.category) {
      projects = projects.filter((p) => p.category === args.category)
    }

    projects = projects.sort((a, b) => a.order - b.order)

    if (args.limit) {
      projects = projects.slice(0, args.limit)
    }

    return projects
  },
})

export const getById = query({
  args: { id: v.id('projects') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const add = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    category: v.string(),
    categoryIcon: v.string(),
    categoryColor: v.string(),
    techStack: v.array(
      v.object({
        name: v.string(),
        iconName: v.string(),
        iconColor: v.string(),
      }),
    ),
    highlights: v.array(v.string()),
    isFeatured: v.boolean(),
  },
  handler: async (ctx, args) => {
    const projects = await ctx.db.query('projects').collect()

    return await ctx.db.insert('projects', {
      ...args,
      techStackIds: [],
      order: projects.length,
      isVisible: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
  },
})
```

### Blog Functions

```typescript
// convex/blogs.ts

export const listPublished = query({
  args: {
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
    page: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const pageSize = args.limit || 12
    const page = args.page || 1

    let blogs = await ctx.db
      .query('blogs')
      .withIndex('by_status', (q) => q.eq('status', 'published'))
      .order('desc')
      .collect()

    if (args.category) {
      blogs = blogs.filter((b) => b.category === args.category)
    }

    const total = blogs.length
    const totalPages = Math.ceil(total / pageSize)
    const start = (page - 1) * pageSize
    const items = blogs.slice(start, start + pageSize)

    return {
      items,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    }
  },
})

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('blogs')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .first()
  },
})

export const getFeatured = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const blogs = await ctx.db
      .query('blogs')
      .filter((q) =>
        q.and(
          q.eq(q.field('status'), 'published'),
          q.eq(q.field('isFeatured'), true),
        ),
      )
      .order('desc')
      .collect()

    return args.limit ? blogs.slice(0, args.limit) : blogs
  },
})

export const incrementViews = mutation({
  args: { id: v.id('blogs') },
  handler: async (ctx, args) => {
    const blog = await ctx.db.get(args.id)
    if (!blog) throw new Error('Blog not found')

    return await ctx.db.patch(args.id, {
      views: blog.views + 1,
    })
  },
})

export const toggleLike = mutation({
  args: { id: v.id('blogs') },
  handler: async (ctx, args) => {
    const blog = await ctx.db.get(args.id)
    if (!blog) throw new Error('Blog not found')

    // In real app, track user likes to prevent multiple likes
    return await ctx.db.patch(args.id, {
      likes: blog.likes + 1,
    })
  },
})

// Admin functions
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.string(),
    categoryIcon: v.string(),
    categoryColor: v.string(),
    readTime: v.string(),
    tags: v.array(v.string()),
    coverImageUrl: v.optional(v.string()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Check slug uniqueness
    const existing = await ctx.db
      .query('blogs')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .first()

    if (existing) {
      throw new Error('Slug already exists')
    }

    return await ctx.db.insert('blogs', {
      ...args,
      authorName: 'Tamjid Ahmed',
      publishedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      publishedAtTimestamp: Date.now(),
      views: 0,
      likes: 0,
      status: 'draft',
      isFeatured: args.isFeatured || false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
  },
})

export const publish = mutation({
  args: { id: v.id('blogs') },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      status: 'published',
      publishedAtTimestamp: Date.now(),
      publishedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      updatedAt: Date.now(),
    })
  },
})
```

### Contact Functions

```typescript
// convex/contact.ts

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('contact').first()
  },
})

export const submitMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('contactMessages', {
      ...args,
      status: 'unread',
      createdAt: Date.now(),
    })
  },
})

// Admin functions
export const listMessages = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let messages = await ctx.db.query('contactMessages').order('desc').collect()

    if (args.status) {
      messages = messages.filter((m) => m.status === args.status)
    }

    return messages
  },
})

export const markAsRead = mutation({
  args: { id: v.id('contactMessages') },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { status: 'read' })
  },
})
```

### Highlights/Stats Functions

```typescript
// convex/highlights.ts

export const listBySection = query({
  args: {
    section: v.union(
      v.literal('about'),
      v.literal('projects'),
      v.literal('hero'),
    ),
  },
  handler: async (ctx, args) => {
    const highlights = await ctx.db
      .query('highlights')
      .filter((q) =>
        q.and(
          q.eq(q.field('section'), args.section),
          q.eq(q.field('isVisible'), true),
        ),
      )
      .collect()

    return highlights.sort((a, b) => a.order - b.order)
  },
})
```

### Navigation Functions

```typescript
// convex/navigation.ts

export const list = query({
  args: {},
  handler: async (ctx) => {
    const links = await ctx.db
      .query('navLinks')
      .filter((q) => q.eq(q.field('isVisible'), true))
      .collect()

    return links.sort((a, b) => a.order - b.order)
  },
})
```

---

## 📁 Complete Schema File

```typescript
// convex/schema.ts

import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  // ═══════════════════════════════════════════════════════════
  // SINGLETON: Site Configuration (Profile + Contact + Nav + Stats)
  // ═══════════════════════════════════════════════════════════
  siteConfig: defineTable({
    // Profile
    name: v.string(),
    title: v.string(),
    tagline: v.string(),
    bio: v.string(),
    profileImageId: v.optional(v.id('_storage')),
    profileImageUrl: v.optional(v.string()),
    resumeFileId: v.optional(v.id('_storage')),
    resumeUrl: v.optional(v.string()),
    age: v.number(),
    careerStartDate: v.string(),
    presentAddress: v.string(),
    permanentAddress: v.string(),
    isAvailableForWork: v.boolean(),
    availabilityNote: v.optional(v.string()),

    // Contact
    email: v.string(),
    phone: v.string(),
    isPhonePublic: v.boolean(),
    location: v.string(),
    responseTime: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    twitterUrl: v.optional(v.string()),

    // Navigation (embedded array)
    navLinks: v.array(
      v.object({
        id: v.string(),
        label: v.string(),
        href: v.string(),
        iconName: v.string(),
        isExternal: v.boolean(),
        order: v.number(),
        isVisible: v.boolean(),
      }),
    ),

    // Highlights/Stats (embedded array)
    highlights: v.array(
      v.object({
        id: v.string(),
        label: v.string(),
        value: v.string(),
        iconName: v.string(),
        gradientFrom: v.string(),
        gradientTo: v.string(),
        section: v.string(),
        order: v.number(),
        isVisible: v.boolean(),
      }),
    ),

    // SEO
    siteName: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),

    updatedAt: v.number(),
  }),

  // ═══════════════════════════════════════════════════════════
  // COLLECTIONS
  // ═══════════════════════════════════════════════════════════

  // Work Experiences
  experiences: defineTable({
    company: v.string(),
    position: v.string(),
    location: v.string(),
    locationType: v.union(
      v.literal('Remote'),
      v.literal('On-site'),
      v.literal('Hybrid'),
    ),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    description: v.optional(v.string()),
    responsibilities: v.optional(v.array(v.string())),
    gradientFrom: v.string(),
    gradientTo: v.string(),
    order: v.number(),
    isVisible: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  // Skill Categories
  skillCategories: defineTable({
    name: v.string(),
    iconName: v.string(),
    iconColor: v.string(),
    order: v.number(),
    isVisible: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  // Skills
  skills: defineTable({
    name: v.string(),
    iconName: v.string(),
    iconColor: v.string(),
    category: v.string(),
    proficiencyLevel: v.optional(v.string()),
    yearsOfExperience: v.optional(v.number()),
    order: v.number(),
    isVisible: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  // Projects
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    imageId: v.optional(v.id('_storage')),
    imageUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    category: v.string(),
    categoryIcon: v.string(),
    categoryColor: v.string(),
    techStack: v.array(
      v.object({
        name: v.string(),
        iconName: v.string(),
        iconColor: v.string(),
      }),
    ),
    highlights: v.array(v.string()),
    order: v.number(),
    isFeatured: v.boolean(),
    isVisible: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  // Blogs
  blogs: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImageId: v.optional(v.id('_storage')),
    coverImageUrl: v.optional(v.string()),
    category: v.string(),
    categoryIcon: v.string(),
    categoryColor: v.string(),
    readTime: v.string(),
    publishedAt: v.string(),
    publishedAtTimestamp: v.number(),
    authorName: v.string(),
    authorAvatar: v.optional(v.string()),
    views: v.number(),
    likes: v.number(),
    tags: v.array(v.string()),
    status: v.union(
      v.literal('draft'),
      v.literal('published'),
      v.literal('archived'),
    ),
    isFeatured: v.boolean(),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_slug', ['slug'])
    .index('by_status', ['status'])
    .index('by_category', ['category']),

  // Blog Comments
  blogComments: defineTable({
    blogId: v.id('blogs'),
    authorName: v.string(),
    authorEmail: v.string(),
    content: v.string(),
    parentCommentId: v.optional(v.id('blogComments')),
    isApproved: v.boolean(),
    createdAt: v.number(),
  }).index('by_blog', ['blogId']),

  // Contact Form Messages
  contactMessages: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    status: v.union(
      v.literal('unread'),
      v.literal('read'),
      v.literal('replied'),
      v.literal('archived'),
    ),
    notes: v.optional(v.string()),
    repliedAt: v.optional(v.number()),
    createdAt: v.number(),
  }).index('by_status', ['status']),
})
```

````

---

## 🎨 Frontend Integration

### Custom Hooks

```typescript
// src/hooks/use-site-config.ts
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

// Get everything
export function useSiteConfig() {
  const config = useQuery(api.siteConfig.get)
  return { config, isLoading: config === undefined }
}

// Get profile only
export function useProfile() {
  const profile = useQuery(api.siteConfig.getProfile)
  return { profile, isLoading: profile === undefined }
}

// Get contact only
export function useContact() {
  const contact = useQuery(api.siteConfig.getContact)
  return { contact, isLoading: contact === undefined }
}

// Get navigation
export function useNavLinks() {
  const navLinks = useQuery(api.siteConfig.getNavLinks)
  return { navLinks: navLinks || [], isLoading: navLinks === undefined }
}

// Get highlights by section
export function useHighlights(section: "about" | "projects" | "hero") {
  const highlights = useQuery(api.siteConfig.getHighlights, { section })
  return { highlights: highlights || [], isLoading: highlights === undefined }
}

// src/hooks/use-experiences.ts
export function useExperiences() {
  const experiences = useQuery(api.experiences.list)
  return { experiences: experiences || [], isLoading: experiences === undefined }
}

// src/hooks/use-skills.ts
export function useSkills() {
  const categories = useQuery(api.skills.listByCategory)
  return {
    categories: categories || [],
    isLoading: categories === undefined,
    totalSkills: categories?.reduce((acc, cat) => acc + cat.skills.length, 0) || 0,
  }
}

// src/hooks/use-projects.ts
export function useProjects(featured?: boolean) {
  const projects = useQuery(
    featured ? api.projects.listFeatured : api.projects.list
  )
  return { projects: projects || [], isLoading: projects === undefined }
}

// src/hooks/use-blogs.ts
export function useBlogs(options?: { category?: string; page?: number }) {
  const result = useQuery(api.blogs.listPublished, options || {})
  return {
    blogs: result?.items || [],
    pagination: result?.pagination,
    isLoading: result === undefined,
  }
}

export function useBlog(slug: string) {
  const blog = useQuery(api.blogs.getBySlug, { slug })
  return { blog, isLoading: blog === undefined }
}
````

### Component Updates Example

```tsx
// src/components/home/hero-section.tsx
import { useProfile } from '@/hooks/use-profile'
import { useHighlights } from '@/hooks/use-highlights'

const HeroSection = () => {
  const { profile, isLoading: profileLoading } = useProfile()
  const { highlights, isLoading: highlightsLoading } = useHighlights('hero')

  if (profileLoading) {
    return <HeroSkeleton />
  }

  return (
    <section id="home">
      {/* Badge */}
      {profile?.isAvailableForWork && (
        <div className="badge">
          <span>Available for work</span>
        </div>
      )}

      {/* Title */}
      <h1>Hi, I'm {profile?.name}</h1>
      <p>{profile?.title}</p>

      {/* Description */}
      <p>{profile?.bio}</p>

      {/* Experience Badge */}
      <div>
        <span>Experience</span>
        <span>{calculateExperience(profile?.careerStartDate)}</span>
      </div>
    </section>
  )
}
```

---

## 🔐 Admin Panel Design (Future)

### Routes Structure

```
/admin
├── /dashboard          # Overview, stats
├── /profile            # Edit personal info
├── /experiences        # Manage work experience
├── /skills             # Manage tech stack
├── /projects           # Manage projects
├── /blogs
│   ├── /               # List all blogs
│   ├── /new            # Create new blog
│   └── /edit/:id       # Edit blog
├── /messages           # Contact form submissions
├── /settings           # Site settings
└── /navigation         # Edit nav links
```

### Authentication (Convex Auth)

```typescript
// convex/auth.ts
// Use Convex Auth or implement custom admin authentication
// For simple admin panel, can use environment variable based auth
```

---

## 📦 File Storage

Convex supports file storage for:

- Profile images
- Project screenshots
- Blog cover images
- Resume PDF

```typescript
// convex/files.ts
import { mutation } from './_generated/server'

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl()
})

export const getUrl = query({
  args: { storageId: v.id('_storage') },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId)
  },
})
```

---

## 🚀 Seed Data Script

```typescript
// convex/seed.ts
import { internalMutation } from './_generated/server'

export const seedInitialData = internalMutation({
  handler: async (ctx) => {
    // Check if already seeded
    const existingConfig = await ctx.db.query('siteConfig').first()
    if (existingConfig) {
      console.log('Database already seeded')
      return
    }

    // ═══════════════════════════════════════
    // Seed Site Config (Singleton)
    // ═══════════════════════════════════════
    await ctx.db.insert('siteConfig', {
      // Profile
      name: 'Tamjid Ahmed',
      title: 'Frontend Engineer',
      tagline: 'Available for work',
      bio: "I craft delightful web experiences with a focus on performance, accessibility, and polished UI details. Let's build something ambitious together.",
      profileImageUrl: '/tamjid-ahmed.webp',
      resumeUrl: '/resume.pdf',
      age: 28,
      careerStartDate: '2021-12-01',
      presentAddress: 'Mirpur 2, Dhaka',
      permanentAddress: 'Tangail, Bangladesh',
      isAvailableForWork: true,
      availabilityNote: 'Available for freelance projects',

      // Contact
      email: 'tamjidahammad10@gmail.com',
      phone: '+880 1625-910775',
      isPhonePublic: true,
      location: 'Dhaka, Bangladesh',
      responseTime: '24 hours',
      githubUrl: 'https://github.com/tamjid-ahammad',
      linkedinUrl: 'https://www.linkedin.com/in/tamjid-ahmed-b11683230/',
      twitterUrl: 'https://twitter.com/tamjid_ahammad',

      // Navigation Links
      navLinks: [
        {
          id: 'nav-1',
          label: 'Home',
          href: '/#home',
          iconName: 'Home',
          isExternal: false,
          order: 0,
          isVisible: true,
        },
        {
          id: 'nav-2',
          label: 'Skills',
          href: '/#skills',
          iconName: 'Wrench',
          isExternal: false,
          order: 1,
          isVisible: true,
        },
        {
          id: 'nav-3',
          label: 'Projects',
          href: '/#projects',
          iconName: 'FolderKanban',
          isExternal: false,
          order: 2,
          isVisible: true,
        },
        {
          id: 'nav-4',
          label: 'About',
          href: '/#aboutMe',
          iconName: 'User',
          isExternal: false,
          order: 3,
          isVisible: true,
        },
        {
          id: 'nav-5',
          label: 'Blogs',
          href: '/blogs',
          iconName: 'BookOpen',
          isExternal: true,
          order: 4,
          isVisible: true,
        },
        {
          id: 'nav-6',
          label: 'Contact',
          href: '/#contact',
          iconName: 'Mail',
          isExternal: false,
          order: 5,
          isVisible: true,
        },
      ],

      // Highlights/Stats
      highlights: [
        {
          id: 'hl-1',
          label: 'Lines of Code',
          value: '100K+',
          iconName: 'Code2',
          gradientFrom: 'blue-500',
          gradientTo: 'cyan-500',
          section: 'about',
          order: 0,
          isVisible: true,
        },
        {
          id: 'hl-2',
          label: 'Cups of Coffee',
          value: '∞',
          iconName: 'Coffee',
          gradientFrom: 'amber-500',
          gradientTo: 'orange-500',
          section: 'about',
          order: 1,
          isVisible: true,
        },
        {
          id: 'hl-3',
          label: 'Projects Shipped',
          value: '25+',
          iconName: 'Rocket',
          gradientFrom: 'emerald-500',
          gradientTo: 'teal-500',
          section: 'about',
          order: 2,
          isVisible: true,
        },
        {
          id: 'hl-4',
          label: 'Happy Clients',
          value: '15+',
          iconName: 'Heart',
          gradientFrom: 'pink-500',
          gradientTo: 'rose-500',
          section: 'about',
          order: 3,
          isVisible: true,
        },
      ],

      updatedAt: Date.now(),
    })

    // ═══════════════════════════════════════
    // Seed Experiences
    // ═══════════════════════════════════════
    const experiences = [
      {
        company: 'Digital Gregg',
        position: 'Jr. React Developer',
        location: 'New York, US',
        locationType: 'Remote' as const,
        startDate: '2021-12-01',
        endDate: '2022-06-30',
        gradientFrom: 'blue-500',
        gradientTo: 'cyan-500',
        order: 0,
      },
      {
        company: 'One Direction Companies',
        position: 'React Developer',
        location: 'Dhaka, BD',
        locationType: 'On-site' as const,
        startDate: '2022-06-01',
        endDate: '2024-03-31',
        gradientFrom: 'emerald-500',
        gradientTo: 'teal-500',
        order: 1,
      },
      {
        company: 'JustGo Technologies',
        position: 'Mid-level Frontend Engineer',
        location: 'Dhaka, BD',
        locationType: 'Hybrid' as const,
        startDate: '2024-03-01',
        endDate: undefined,
        gradientFrom: 'violet-500',
        gradientTo: 'purple-500',
        order: 2,
      },
    ]
    for (const exp of experiences) {
      await ctx.db.insert('experiences', {
        ...exp,
        isVisible: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    }

    // ═══════════════════════════════════════
    // Seed Skill Categories
    // ═══════════════════════════════════════
    const categories = [
      {
        name: 'Frontend',
        iconName: 'Layout',
        iconColor: 'text-blue-500',
        order: 0,
      },
      {
        name: 'Backend',
        iconName: 'Server',
        iconColor: 'text-green-500',
        order: 1,
      },
      {
        name: 'Databases',
        iconName: 'Database',
        iconColor: 'text-amber-500',
        order: 2,
      },
      {
        name: 'DevOps & Tools',
        iconName: 'Wrench',
        iconColor: 'text-purple-500',
        order: 3,
      },
      {
        name: 'Systems & Low-Level',
        iconName: 'Cpu',
        iconColor: 'text-rose-500',
        order: 4,
      },
    ]
    for (const cat of categories) {
      await ctx.db.insert('skillCategories', {
        ...cat,
        isVisible: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    }

    // ═══════════════════════════════════════
    // Seed Skills
    // ═══════════════════════════════════════
    const skills = [
      // Frontend
      {
        name: 'React.js',
        iconName: 'SiReact',
        iconColor: '#61DAFB',
        category: 'Frontend',
        order: 0,
      },
      {
        name: 'Next.js',
        iconName: 'SiNextdotjs',
        iconColor: '#000000',
        category: 'Frontend',
        order: 1,
      },
      {
        name: 'TypeScript',
        iconName: 'SiTypescript',
        iconColor: '#3178C6',
        category: 'Frontend',
        order: 2,
      },
      {
        name: 'Tailwind CSS',
        iconName: 'SiTailwindcss',
        iconColor: '#06B6D4',
        category: 'Frontend',
        order: 3,
      },
      {
        name: 'Shadcn/UI',
        iconName: 'SiShadcnui',
        iconColor: '#000000',
        category: 'Frontend',
        order: 4,
      },
      {
        name: 'Framer Motion',
        iconName: 'SiFramer',
        iconColor: '#0055FF',
        category: 'Frontend',
        order: 5,
      },
      // Backend
      {
        name: 'Node.js',
        iconName: 'SiNodedotjs',
        iconColor: '#339933',
        category: 'Backend',
        order: 0,
      },
      {
        name: 'Express.js',
        iconName: 'SiExpress',
        iconColor: '#000000',
        category: 'Backend',
        order: 1,
      },
      {
        name: 'tRPC',
        iconName: 'Zap',
        iconColor: '#2596BE',
        category: 'Backend',
        order: 2,
      },
      {
        name: 'Hono',
        iconName: 'Zap',
        iconColor: '#E36002',
        category: 'Backend',
        order: 3,
      },
      {
        name: 'Prisma ORM',
        iconName: 'SiPrisma',
        iconColor: '#2D3748',
        category: 'Backend',
        order: 4,
      },
      // Databases
      {
        name: 'MongoDB',
        iconName: 'SiMongodb',
        iconColor: '#47A248',
        category: 'Databases',
        order: 0,
      },
      {
        name: 'PostgreSQL',
        iconName: 'SiPostgresql',
        iconColor: '#4169E1',
        category: 'Databases',
        order: 1,
      },
      {
        name: 'SQLite',
        iconName: 'SiSqlite',
        iconColor: '#003B57',
        category: 'Databases',
        order: 2,
      },
      {
        name: 'Redis',
        iconName: 'SiRedis',
        iconColor: '#DC382D',
        category: 'Databases',
        order: 3,
      },
      {
        name: 'Convex',
        iconName: 'Database',
        iconColor: '#F3722C',
        category: 'Databases',
        order: 4,
      },
      // DevOps & Tools
      {
        name: 'Docker',
        iconName: 'SiDocker',
        iconColor: '#2496ED',
        category: 'DevOps & Tools',
        order: 0,
      },
      {
        name: 'Git',
        iconName: 'SiGit',
        iconColor: '#F05032',
        category: 'DevOps & Tools',
        order: 1,
      },
      {
        name: 'GitHub',
        iconName: 'SiGithub',
        iconColor: '#181717',
        category: 'DevOps & Tools',
        order: 2,
      },
      {
        name: 'Bun',
        iconName: 'SiBun',
        iconColor: '#000000',
        category: 'DevOps & Tools',
        order: 3,
      },
      {
        name: 'WSL / Linux',
        iconName: 'SiLinux',
        iconColor: '#FCC624',
        category: 'DevOps & Tools',
        order: 4,
      },
      {
        name: 'Playwright',
        iconName: 'TestTube2',
        iconColor: '#2EAD33',
        category: 'DevOps & Tools',
        order: 5,
      },
      // Systems
      {
        name: 'Go',
        iconName: 'SiGo',
        iconColor: '#00ADD8',
        category: 'Systems & Low-Level',
        order: 0,
      },
      {
        name: 'ESP32 / Teensy',
        iconName: 'Cpu',
        iconColor: '#E7352C',
        category: 'Systems & Low-Level',
        order: 1,
      },
      {
        name: 'Arduino',
        iconName: 'Cpu',
        iconColor: '#00979D',
        category: 'Systems & Low-Level',
        order: 2,
      },
      {
        name: 'Micro Python',
        iconName: 'Cpu',
        iconColor: '#2B2728',
        category: 'Systems & Low-Level',
        order: 3,
      },
    ]
    for (const skill of skills) {
      await ctx.db.insert('skills', {
        ...skill,
        isVisible: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    }

    // ═══════════════════════════════════════
    // Seed Projects
    // ═══════════════════════════════════════
    const projects = [
      {
        title: 'Walton Digitech',
        description:
          'A comprehensive product catalogue platform with dynamic filtering, optimized images, and fully responsive UI/UX design.',
        imageUrl: '/projects/walton-digitech.png',
        liveUrl: 'https://waltondigitech.com/',
        category: 'E-Commerce',
        categoryIcon: 'Layers',
        categoryColor: 'text-blue-500',
        techStack: [
          { name: 'React', iconName: 'SiReact', iconColor: '#61DAFB' },
          { name: 'Next.js', iconName: 'SiNextdotjs', iconColor: '#000000' },
          {
            name: 'TypeScript',
            iconName: 'SiTypescript',
            iconColor: '#3178C6',
          },
          {
            name: 'Tailwind CSS',
            iconName: 'SiTailwindcss',
            iconColor: '#06B6D4',
          },
        ],
        highlights: [
          'Product catalogue with dynamic filtering',
          'Fully responsive layout',
          'Optimized images & dynamic routing',
          'Form handling with validation',
        ],
        order: 0,
        isFeatured: true,
      },
      {
        title: 'Expotech Global',
        description:
          'Corporate landing pages with clean UI, modern animations, and SEO-optimized architecture using Next.js metadata.',
        imageUrl: '/projects/expotech-global.png',
        liveUrl: 'https://expotechglobal.com/',
        category: 'Corporate',
        categoryIcon: 'Globe',
        categoryColor: 'text-emerald-500',
        techStack: [
          { name: 'React', iconName: 'SiReact', iconColor: '#61DAFB' },
          { name: 'Next.js', iconName: 'SiNextdotjs', iconColor: '#000000' },
          {
            name: 'TypeScript',
            iconName: 'SiTypescript',
            iconColor: '#3178C6',
          },
          {
            name: 'Tailwind CSS',
            iconName: 'SiTailwindcss',
            iconColor: '#06B6D4',
          },
        ],
        highlights: [
          'Corporate landing pages with clean UI',
          'Dynamic pages & reusable components',
          'Modern animations & micro-interactions',
          'SEO optimization with Next.js metadata',
        ],
        order: 1,
        isFeatured: true,
      },
    ]
    for (const project of projects) {
      await ctx.db.insert('projects', {
        ...project,
        isVisible: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    }

    console.log('✅ Database seeded successfully!')
  },
})
```

---

## 📋 Implementation Checklist

### Phase 1: Core Schema & Functions

- [ ] Update `convex/schema.ts` with 8 tables
- [ ] Create `convex/siteConfig.ts` (singleton functions)
- [ ] Create `convex/experiences.ts`
- [ ] Create `convex/skills.ts`
- [ ] Create `convex/projects.ts`
- [ ] Create `convex/blogs.ts`
- [ ] Create `convex/contactMessages.ts`
- [ ] Create seed script and run it

### Phase 2: Frontend Integration

- [ ] Create custom hooks in `src/hooks/`
- [ ] Update `HeroSection` → use `useProfile()`
- [ ] Update `AboutMe` → use `useProfile()`, `useHighlights("about")`
- [ ] Update `ExperienceTimeline` → use `useExperiences()`
- [ ] Update `Skills` → use `useSkills()`
- [ ] Update `Projects` → use `useProjects()`
- [ ] Update `ContactMe` → use `useContact()`
- [ ] Update `Header` → use `useNavLinks()`
- [ ] Add loading skeletons

### Phase 3: Blog System

- [ ] Update blog list page → use `useBlogs()`
- [ ] Update blog detail page → use `useBlog(slug)`
- [ ] Add view/like tracking
- [ ] Add blog comments (optional)

### Phase 4: Admin Panel (Future)

- [ ] Set up admin routes
- [ ] Build dashboard
- [ ] Build CRUD interfaces

---

## 🎯 Summary: Optimized Schema

| Before (12 tables) | After (8 tables)       | Change          |
| ------------------ | ---------------------- | --------------- |
| profile            | ❌ merged → siteConfig | Singleton       |
| contact            | ❌ merged → siteConfig | Singleton       |
| navLinks           | ❌ embedded array      | Small fixed set |
| highlights         | ❌ embedded array      | Small fixed set |
| siteSettings       | ❌ merged → siteConfig | Singleton       |
| experiences        | ✅ kept                | Collection      |
| skillCategories    | ✅ kept                | Collection      |
| skills             | ✅ kept                | Collection      |
| projects           | ✅ kept                | Collection      |
| blogs              | ✅ kept                | Collection      |
| blogComments       | ✅ kept                | Collection      |
| contactMessages    | ✅ kept                | Collection      |

**Benefits:**

- ✅ Fewer tables = simpler architecture
- ✅ Single query for all config data
- ✅ No unnecessary joins/lookups
- ✅ Easier to manage singleton data
- ✅ Embedded arrays for rarely-changing data

---

## 📝 Notes

- All timestamps use `Date.now()` (Unix milliseconds)
- Images support both Convex storage and external URLs
- Indexes added for frequently queried fields
- Soft delete pattern (isVisible/status) for data safety
- Order field for drag-and-drop reordering support
