# AI Assistant Prompt for Portfolio Project

## Project Overview

React portfolio website with TanStack Router, Convex backend, Motion animations, and Tailwind CSS.

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Routing:** TanStack Router (file-based)
- **Backend:** Convex (realtime database)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animation:** Motion (framer-motion)

## Key Directories

```
src/
├── routes/          # Pages (TanStack file-based routing)
├── components/      # UI components
│   ├── ui/          # Base UI (button, sheet, etc.)
│   ├── home/        # Homepage sections
│   ├── blogs/       # Blog components
│   ├── dashboard/   # Admin dashboard
│   └── magicui/     # Animated effects
├── hooks/           # Custom React hooks
├── lib/             # Utilities
└── contexts/        # React contexts
convex/              # Backend functions & schema
```

## Important Patterns

### 1. Animation (Mobile Optimized)

```tsx
const prefersReducedMotion = useReducedMotion()

// Pattern A: Remove on mobile
{!prefersReducedMotion && <HeavyAnimation />}

// Pattern B: Static fallback
animate={prefersReducedMotion ? { opacity: 0.5 } : { opacity: [0.3, 0.7, 0.3] }}
```

### 2. Theme System

- CSS variables: `--theme-primary`, `--theme-secondary`, `--theme-accent`
- Classes: `text-theme-primary`, `bg-theme-primary`, `bg-gradient-theme`
- Dark mode: `dark:` prefix

### 3. Component Style

```tsx
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

;<div className={cn('base-classes', conditional && 'extra', className)} />
```

### 4. Convex Backend

```tsx
// Query
const data = useQuery(api.module.queryName, { args })

// Mutation
const mutate = useMutation(api.module.mutationName)
await mutate({ args })
```

## Coding Rules

1. Use `@/` path alias for imports
2. Use `cn()` for conditional classNames
3. Use `useReducedMotion()` for animations
4. Prefer `motion/react` over `framer-motion`
5. Use Tailwind classes, avoid inline styles
6. Keep components small and focused

## File Naming

- Components: `PascalCase.tsx`
- Hooks: `use-kebab-case.ts`
- Utils: `kebab-case.ts`
- Routes: `lowercase.tsx` or `$param.tsx`

## Quick Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
npx convex dev    # Start Convex backend
```
