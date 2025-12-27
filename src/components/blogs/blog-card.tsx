import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { BorderBeam } from '@/components/magicui/border-beam'
import {
  Calendar,
  Clock,
  Eye,
  ArrowRight,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
} from 'lucide-react'
import { useState } from 'react'
import { ThemeLink } from '@/components/theme-link'
import type { BlogPost } from './blog-data'

type BlogCardProps = {
  post: BlogPost
  index: number
  variant?: 'default' | 'featured' | 'compact'
}

const cardColors = [
  {
    gradient: 'from-theme-primary/20 via-theme-secondary/10 to-theme-primary/5',
    border: 'hover:border-theme-primary/60',
    glow: 'group-hover:shadow-theme',
    button: 'bg-gradient-theme',
    accent: 'var(--theme-primary)',
    accentTo: 'var(--theme-secondary)',
  },
  {
    gradient:
      'from-theme-secondary/20 via-theme-accent/10 to-theme-secondary/5',
    border: 'hover:border-theme-secondary/60',
    glow: 'group-hover:shadow-theme',
    button: 'bg-gradient-theme-accent',
    accent: 'var(--theme-secondary)',
    accentTo: 'var(--theme-accent)',
  },
  {
    gradient: 'from-theme-primary/20 via-theme-secondary/10 to-theme-primary/5',
    border: 'hover:border-theme-primary/60',
    glow: 'group-hover:shadow-theme',
    button: 'bg-gradient-theme',
    accent: 'var(--theme-primary)',
    accentTo: 'var(--theme-secondary)',
  },
  {
    gradient: 'from-theme-accent/20 via-theme-primary/10 to-theme-accent/5',
    border: 'hover:border-theme-accent/60',
    glow: 'group-hover:shadow-theme',
    button: 'bg-gradient-theme-accent',
    accent: 'var(--theme-accent)',
    accentTo: 'var(--theme-primary)',
  },
  {
    gradient:
      'from-theme-secondary/20 via-theme-primary/10 to-theme-secondary/5',
    border: 'hover:border-theme-secondary/60',
    glow: 'group-hover:shadow-theme',
    button: 'bg-gradient-theme',
    accent: 'var(--theme-secondary)',
    accentTo: 'var(--theme-primary)',
  },
  {
    gradient: 'from-theme-primary/20 via-theme-accent/10 to-theme-primary/5',
    border: 'hover:border-theme-primary/60',
    glow: 'group-hover:shadow-theme',
    button: 'bg-gradient-theme-accent',
    accent: 'var(--theme-primary)',
    accentTo: 'var(--theme-accent)',
  },
]

export const BlogCard = ({
  post,
  index,
  variant = 'default',
}: BlogCardProps) => {
  const CategoryIcon = post.categoryIcon
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const colors = cardColors[index % cardColors.length]

  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative col-span-full lg:col-span-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Featured Glow */}
        <motion.div
          className="absolute -inset-2 rounded-3xl bg-linear-to-br from-theme-primary/30 via-theme-secondary/20 to-theme-accent/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          animate={isHovered ? { scale: [1, 1.02, 1] } : { scale: 1 }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />

        <div className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white/95 shadow-xl backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-800/90 lg:flex-row">
          {/* Featured Badge */}
          <div className="absolute left-4 top-4 z-10">
            <motion.div
              className="flex items-center gap-1.5 rounded-full bg-gradient-theme px-3 py-1.5 text-xs font-bold text-white shadow-lg"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⭐ Featured
            </motion.div>
          </div>

          {/* Image */}
          <div className="relative h-64 overflow-hidden lg:h-auto lg:w-1/2">
            <motion.img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent lg:bg-linear-to-r" />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-center gap-4 p-6 lg:p-8">
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-3">
              <div
                className={cn(
                  'flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold dark:bg-slate-700',
                  post.categoryColor,
                )}
              >
                <CategoryIcon className="size-3.5" />
                {post.category}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar className="size-3.5" />
                {post.publishedAt}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="size-3.5" />
                {post.readTime}
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-slate-900 transition-colors group-hover:text-theme-primary dark:text-white dark:group-hover:text-theme-primary-light lg:text-3xl">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 lg:text-base">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-2 flex items-center justify-between">
              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="size-10 rounded-full border-2 border-white shadow-md dark:border-slate-700"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {post.author.name}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Eye className="size-3" /> {post.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="size-3" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="size-3" /> {post.comments}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <ThemeLink to="/blogs/$slug" params={{ slug: post.slug }}>
                <motion.button
                  className="group/btn flex items-center gap-2 rounded-xl bg-gradient-theme px-5 py-3 text-sm font-bold text-white shadow-theme transition-shadow hover:shadow-theme-hover"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Read Article
                  <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                </motion.button>
              </ThemeLink>
            </div>
          </div>

          <BorderBeam
            size={400}
            duration={15}
            colorFrom="var(--theme-primary)"
            colorTo="var(--theme-secondary)"
          />
        </div>
      </motion.article>
    )
  }

  if (variant === 'compact') {
    return (
      <ThemeLink to="/blogs/$slug" params={{ slug: post.slug }}>
        <motion.article
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="group flex gap-4 rounded-xl border border-slate-200/60 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:border-theme-primary/40 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/80"
        >
          <div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            <div
              className={cn(
                'flex w-fit items-center gap-1 text-xs font-semibold',
                post.categoryColor,
              )}
            >
              <CategoryIcon className="size-3" />
              {post.category}
            </div>
            <h3 className="line-clamp-2 text-sm font-bold text-slate-900 transition-colors group-hover:text-theme-primary dark:text-white">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="size-3" />
              {post.readTime}
            </div>
          </div>
        </motion.article>
      </ThemeLink>
    )
  }

  // Default variant
  return (
    <motion.article
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <motion.div
        className={cn(
          'absolute -inset-1 rounded-2xl bg-linear-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100',
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
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover"
            animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

          {/* Top Actions */}
          <div className="absolute right-3 top-3 flex items-center gap-2">
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                setIsBookmarked(!isBookmarked)
              }}
              className={cn(
                'rounded-lg p-2 backdrop-blur-sm transition-colors',
                isBookmarked
                  ? 'bg-theme-primary text-white'
                  : 'bg-black/30 text-white hover:bg-black/50',
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bookmark
                className={cn('size-4', isBookmarked && 'fill-current')}
              />
            </motion.button>
            <motion.button
              onClick={(e) => e.stopPropagation()}
              className="rounded-lg bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="size-4" />
            </motion.button>
          </div>

          {/* Category Badge */}
          <motion.div
            className="absolute left-3 top-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 + 0.1 }}
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

          {/* Bottom Info */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="size-7 rounded-full border-2 border-white/50"
              />
              <span className="text-xs font-medium text-white/90">
                {post.author.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <Clock className="size-3" />
              {post.readTime}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="size-3.5" />
            <span>{post.publishedAt}</span>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-theme-primary dark:text-white dark:group-hover:text-theme-primary-light">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
            {/* Stats */}
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsLiked(!isLiked)
                }}
                className={cn(
                  'flex items-center gap-1 transition-colors',
                  isLiked ? 'text-red-500' : 'hover:text-red-500',
                )}
              >
                <Heart className={cn('size-4', isLiked && 'fill-current')} />
                {post.likes + (isLiked ? 1 : 0)}
              </button>
              <span className="flex items-center gap-1">
                <MessageCircle className="size-4" />
                {post.comments}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="size-4" />
                {post.views.toLocaleString()}
              </span>
            </div>

            {/* Read More */}
            <ThemeLink to="/blogs/$slug" params={{ slug: post.slug }}>
              <motion.button
                className={cn(
                  'group/btn flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-white shadow-md transition-shadow hover:shadow-lg',
                  colors.button,
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Read
                <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
              </motion.button>
            </ThemeLink>
          </div>
        </div>

        {/* Border Beam */}
        <BorderBeam
          size={200}
          duration={15}
          delay={index * 2}
          colorFrom={colors.accent}
          colorTo={colors.accentTo}
        />
      </div>
    </motion.article>
  )
}
