import { BorderBeam } from '@/components/magicui/border-beam'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'
import { motion, type Variants } from 'motion/react'
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  PenTool,
  TrendingUp,
  Eye,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'

type BlogPost = {
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
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Building Scalable React Applications with TypeScript',
    excerpt:
      'Learn how to structure your React projects for scalability using TypeScript, custom hooks, and modern best practices.',
    coverImage:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    category: 'React',
    categoryIcon: TrendingUp,
    categoryColor: 'text-blue-500',
    readTime: '8 min read',
    publishedAt: 'Dec 1, 2024',
    slug: 'building-scalable-react-applications',
  },
  {
    id: 2,
    title: 'Mastering Tailwind CSS: Tips & Tricks',
    excerpt:
      'Discover advanced Tailwind CSS techniques to build beautiful, responsive designs faster than ever before.',
    coverImage:
      'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop&q=60',
    category: 'CSS',
    categoryIcon: PenTool,
    categoryColor: 'text-cyan-500',
    readTime: '6 min read',
    publishedAt: 'Nov 25, 2024',
    slug: 'mastering-tailwind-css',
  },
  {
    id: 3,
    title: 'Next.js 14: Server Components Deep Dive',
    excerpt:
      'Explore the power of React Server Components in Next.js 14 and learn how to optimize your application performance.',
    coverImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
    category: 'Next.js',
    categoryIcon: BookOpen,
    categoryColor: 'text-purple-500',
    readTime: '10 min read',
    publishedAt: 'Nov 18, 2024',
    slug: 'nextjs-14-server-components',
  },
  {
    id: 4,
    title: 'Modern State Management with Zustand',
    excerpt:
      'A comprehensive guide to managing state in React applications using Zustand - the lightweight alternative to Redux.',
    coverImage:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60',
    category: 'State',
    categoryIcon: Sparkles,
    categoryColor: 'text-emerald-500',
    readTime: '7 min read',
    publishedAt: 'Nov 10, 2024',
    slug: 'modern-state-management-zustand',
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
  const CategoryIcon = post.categoryIcon
  const [isHovered, setIsHovered] = useState(false)

  const cardColors = [
    {
      gradient: 'from-blue-500/20 via-cyan-500/10 to-blue-500/5',
      border: 'hover:border-blue-300/60',
      glow: 'group-hover:shadow-blue-500/10',
      button: 'from-blue-600 to-cyan-600',
    },
    {
      gradient: 'from-cyan-500/20 via-teal-500/10 to-cyan-500/5',
      border: 'hover:border-cyan-300/60',
      glow: 'group-hover:shadow-cyan-500/10',
      button: 'from-cyan-600 to-teal-600',
    },
    {
      gradient: 'from-purple-500/20 via-violet-500/10 to-purple-500/5',
      border: 'hover:border-purple-300/60',
      glow: 'group-hover:shadow-purple-500/10',
      button: 'from-purple-600 to-violet-600',
    },
    {
      gradient: 'from-emerald-500/20 via-teal-500/10 to-emerald-500/5',
      border: 'hover:border-emerald-300/60',
      glow: 'group-hover:shadow-emerald-500/10',
      button: 'from-emerald-600 to-teal-600',
    },
  ]

  const colors = cardColors[index]

  return (
    <motion.article
      variants={itemVariants}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <motion.div
        className={cn(
          'absolute -inset-1 rounded-2xl bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100',
          colors.gradient,
        )}
        animate={isHovered ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
      />

      <div
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white/95 shadow-lg backdrop-blur-sm transition-all duration-300 dark:border-slate-700/60 dark:bg-slate-800/90',
          colors.border,
          colors.glow,
          'group-hover:shadow-xl',
        )}
      >
        {/* Image Container */}
        <div className="relative h-40 overflow-hidden sm:h-44">
          <motion.img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover"
            animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Category Badge */}
          <motion.div
            className="absolute left-3 top-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <div
              className={cn(
                'flex items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-bold shadow-md backdrop-blur-sm dark:bg-slate-900/95',
                post.categoryColor,
              )}
            >
              <CategoryIcon className="size-3.5" />
              <span>{post.category}</span>
            </div>
          </motion.div>

          {/* Read Time Badge */}
          <motion.div
            className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <Clock className="size-3" />
            {post.readTime}
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="size-3.5" />
            <span>{post.publishedAt}</span>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-base font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400 sm:text-lg">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="line-clamp-2 flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
            {post.excerpt}
          </p>

          {/* Read More Button */}
          <motion.button
            className={cn(
              'group/btn mt-auto flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-4 py-2.5 text-xs font-bold text-white shadow-md transition-shadow hover:shadow-lg',
              colors.button,
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye className="size-3.5" />
            <span>Read Article</span>
            <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-1" />
          </motion.button>
        </div>

        {/* Border Beam */}
        <BorderBeam
          size={200}
          duration={15}
          delay={index * 2}
          colorFrom={
            index === 0
              ? '#3b82f6'
              : index === 1
                ? '#06b6d4'
                : index === 2
                  ? '#8b5cf6'
                  : '#10b981'
          }
          colorTo={
            index === 0
              ? '#06b6d4'
              : index === 1
                ? '#14b8a6'
                : index === 2
                  ? '#6366f1'
                  : '#14b8a6'
          }
        />
      </div>
    </motion.article>
  )
}

const BlogsSection = () => {
  return (
    <section
      id="blogs"
      className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:py-24 lg:py-28"
    >
      {/* Background Pattern */}
      <DotPattern
        className="absolute inset-0 z-0 text-slate-300/40 dark:text-foreground/10 [mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1.2}
      />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="pointer-events-none absolute -left-40 top-1/3 size-[400px] rounded-full bg-gradient-to-br from-purple-500/15 via-violet-500/10 to-transparent blur-3xl"
        animate={{ x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute -right-40 bottom-1/3 size-[400px] rounded-full bg-gradient-to-br from-emerald-500/15 via-cyan-500/10 to-transparent blur-3xl"
        animate={{ x: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 5 }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-4 text-center">
            <motion.div
              className="mx-auto flex w-fit items-center gap-2 rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-purple-500/10 px-4 py-2 shadow-lg backdrop-blur-sm"
              whileHover={{ scale: 1.03 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <PenTool className="size-4 text-purple-500" />
              </motion.div>
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-xs font-bold text-transparent dark:from-purple-400 dark:to-violet-400">
                Latest Articles
              </span>
            </motion.div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              <span className="block">Insights &</span>
              <span className="mt-1 block bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400">
                Tech Articles
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              Sharing knowledge about web development, best practices, and
              modern technologies.
            </p>
          </motion.div>

          {/* Blog Grid - 4 Columns */}
          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
          >
            {blogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>

          {/* View All Blogs CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.div
              className="inline-flex items-center gap-3 rounded-xl border border-slate-200/60 bg-white/80 px-5 py-3 shadow-lg backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-800/80"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Want to read more?
              </span>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-3 py-1.5 text-xs font-bold text-white shadow-md transition-shadow hover:shadow-lg">
                View All Blogs
                <ArrowRight className="size-3" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default BlogsSection
