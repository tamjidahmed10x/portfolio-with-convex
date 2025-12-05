import {
  Code2,
  Palette,
  TrendingUp,
  Server,
  Database,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'

export type BlogPost = {
  id: number
  title: string
  excerpt: string
  coverImage: string
  category: string
  categoryIcon: LucideIcon
  categoryColor: string
  readTime: string
  publishedAt: string
  slug: string
  author: {
    name: string
    avatar: string
  }
  views: number
  likes: number
  comments: number
  tags: string[]
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Building Scalable React Applications with TypeScript',
    excerpt:
      'Learn how to structure your React projects for scalability using TypeScript, custom hooks, and modern best practices that will make your codebase maintainable and efficient.',
    coverImage:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    category: 'React',
    categoryIcon: Code2,
    categoryColor: 'text-blue-500',
    readTime: '8 min read',
    publishedAt: 'Dec 1, 2024',
    slug: 'building-scalable-react-applications',
    author: {
      name: 'Mehedi Hasan',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    views: 2450,
    likes: 128,
    comments: 24,
    tags: ['React', 'TypeScript', 'Architecture', 'Best Practices'],
    featured: true,
  },
  {
    id: 2,
    title: 'Mastering Tailwind CSS: Advanced Tips & Tricks',
    excerpt:
      'Discover advanced Tailwind CSS techniques to build beautiful, responsive designs faster than ever before with utility-first approach.',
    coverImage:
      'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop&q=60',
    category: 'CSS',
    categoryIcon: Palette,
    categoryColor: 'text-pink-500',
    readTime: '6 min read',
    publishedAt: 'Nov 28, 2024',
    slug: 'mastering-tailwind-css',
    author: {
      name: 'Mehedi Hasan',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    views: 1820,
    likes: 96,
    comments: 18,
    tags: ['CSS', 'Tailwind', 'UI/UX', 'Design'],
  },
  {
    id: 3,
    title: 'Next.js 14: Server Components Deep Dive',
    excerpt:
      'Explore the power of React Server Components in Next.js 14 and learn how to optimize your application performance with streaming and suspense.',
    coverImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
    category: 'Next.js',
    categoryIcon: TrendingUp,
    categoryColor: 'text-slate-700 dark:text-slate-300',
    readTime: '10 min read',
    publishedAt: 'Nov 25, 2024',
    slug: 'nextjs-14-server-components',
    author: {
      name: 'Mehedi Hasan',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    views: 3200,
    likes: 215,
    comments: 42,
    tags: ['Next.js', 'React', 'Performance', 'SSR'],
  },
  {
    id: 4,
    title: 'Modern State Management with Zustand',
    excerpt:
      'A comprehensive guide to managing state in React applications using Zustand - the lightweight and powerful alternative to Redux.',
    coverImage:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60',
    category: 'React',
    categoryIcon: Code2,
    categoryColor: 'text-blue-500',
    readTime: '7 min read',
    publishedAt: 'Nov 20, 2024',
    slug: 'modern-state-management-zustand',
    author: {
      name: 'Mehedi Hasan',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    views: 1560,
    likes: 87,
    comments: 15,
    tags: ['React', 'State Management', 'Zustand', 'Tutorial'],
  },
  {
    id: 5,
    title: 'Building RESTful APIs with Node.js and Express',
    excerpt:
      'Learn to build robust and scalable REST APIs using Node.js and Express with best practices for authentication, validation, and error handling.',
    coverImage:
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
    category: 'Backend',
    categoryIcon: Server,
    categoryColor: 'text-green-500',
    readTime: '12 min read',
    publishedAt: 'Nov 15, 2024',
    slug: 'building-restful-apis-nodejs',
    author: {
      name: 'Mehedi Hasan',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    views: 2890,
    likes: 156,
    comments: 38,
    tags: ['Node.js', 'Express', 'API', 'Backend'],
  },
  {
    id: 6,
    title: 'PostgreSQL Performance Optimization Guide',
    excerpt:
      'Deep dive into PostgreSQL query optimization, indexing strategies, and performance tuning techniques for production databases.',
    coverImage:
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=60',
    category: 'Database',
    categoryIcon: Database,
    categoryColor: 'text-amber-500',
    readTime: '15 min read',
    publishedAt: 'Nov 10, 2024',
    slug: 'postgresql-performance-optimization',
    author: {
      name: 'Mehedi Hasan',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    views: 1240,
    likes: 78,
    comments: 22,
    tags: ['PostgreSQL', 'Database', 'Performance', 'SQL'],
  },
  {
    id: 7,
    title: 'React Native vs Flutter: 2024 Comparison',
    excerpt:
      'An in-depth comparison of React Native and Flutter for mobile app development - performance, ecosystem, and developer experience.',
    coverImage:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60',
    category: 'Mobile',
    categoryIcon: Smartphone,
    categoryColor: 'text-orange-500',
    readTime: '9 min read',
    publishedAt: 'Nov 5, 2024',
    slug: 'react-native-vs-flutter-2024',
    author: {
      name: 'Mehedi Hasan',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    views: 4120,
    likes: 234,
    comments: 56,
    tags: ['React Native', 'Flutter', 'Mobile', 'Comparison'],
  },
  {
    id: 8,
    title: 'Advanced TypeScript Patterns and Techniques',
    excerpt:
      'Master advanced TypeScript patterns including conditional types, mapped types, template literal types, and more.',
    coverImage:
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60',
    category: 'TypeScript',
    categoryIcon: Code2,
    categoryColor: 'text-blue-600',
    readTime: '11 min read',
    publishedAt: 'Oct 30, 2024',
    slug: 'advanced-typescript-patterns',
    author: {
      name: 'Mehedi Hasan',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    views: 2670,
    likes: 189,
    comments: 31,
    tags: ['TypeScript', 'JavaScript', 'Tutorial', 'Advanced'],
  },
  {
    id: 9,
    title: 'CSS Grid Layout: Complete Guide',
    excerpt:
      'Everything you need to know about CSS Grid - from basics to advanced layouts with practical examples and use cases.',
    coverImage:
      'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800&auto=format&fit=crop&q=60',
    category: 'CSS',
    categoryIcon: Palette,
    categoryColor: 'text-pink-500',
    readTime: '8 min read',
    publishedAt: 'Oct 25, 2024',
    slug: 'css-grid-complete-guide',
    author: {
      name: 'Mehedi Hasan',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    views: 1890,
    likes: 112,
    comments: 19,
    tags: ['CSS', 'Grid', 'Layout', 'Tutorial'],
  },
  {
    id: 10,
    title: 'Authentication with NextAuth.js',
    excerpt:
      'Implement secure authentication in your Next.js applications using NextAuth.js with various providers and custom configurations.',
    coverImage:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60',
    category: 'Next.js',
    categoryIcon: TrendingUp,
    categoryColor: 'text-slate-700 dark:text-slate-300',
    readTime: '10 min read',
    publishedAt: 'Oct 20, 2024',
    slug: 'authentication-nextauth-js',
    author: {
      name: 'Mehedi Hasan',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    views: 3450,
    likes: 201,
    comments: 45,
    tags: ['Next.js', 'Authentication', 'NextAuth', 'Security'],
  },
  {
    id: 11,
    title: 'Framer Motion Animation Guide',
    excerpt:
      'Create stunning animations in React applications using Framer Motion - from simple transitions to complex gesture-based interactions.',
    coverImage:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60',
    category: 'React',
    categoryIcon: Code2,
    categoryColor: 'text-blue-500',
    readTime: '9 min read',
    publishedAt: 'Oct 15, 2024',
    slug: 'framer-motion-animation-guide',
    author: {
      name: 'Mehedi Hasan',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    views: 2180,
    likes: 167,
    comments: 28,
    tags: ['React', 'Animation', 'Framer Motion', 'UI/UX'],
  },
  {
    id: 12,
    title: 'Docker for Frontend Developers',
    excerpt:
      'A practical guide to using Docker in frontend development - containerize your apps, set up dev environments, and deploy with confidence.',
    coverImage:
      'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&auto=format&fit=crop&q=60',
    category: 'Backend',
    categoryIcon: Server,
    categoryColor: 'text-green-500',
    readTime: '11 min read',
    publishedAt: 'Oct 10, 2024',
    slug: 'docker-frontend-developers',
    author: {
      name: 'Mehedi Hasan',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    views: 1670,
    likes: 94,
    comments: 16,
    tags: ['Docker', 'DevOps', 'Frontend', 'Deployment'],
  },
]
