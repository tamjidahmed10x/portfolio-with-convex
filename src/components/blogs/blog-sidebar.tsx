import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Flame,
  TrendingUp,
  BookOpen,
  Code2,
  Palette,
  Database,
  Server,
  Smartphone,
  X,
  ChevronDown,
  Tag,
  Sparkles,
  Layers,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react'
import { useState } from 'react'

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
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: Category
  onCategoryChange: (category: Category) => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  isMobileOpen?: boolean
  onMobileClose?: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

const categories: {
  id: Category
  label: string
  icon: React.ElementType
  color: string
}[] = [
  { id: 'all', label: 'All Posts', icon: BookOpen, color: 'text-emerald-500' },
  { id: 'react', label: 'React', icon: Code2, color: 'text-cyan-500' },
  {
    id: 'typescript',
    label: 'TypeScript',
    icon: Code2,
    color: 'text-blue-500',
  },
  { id: 'css', label: 'CSS & Design', icon: Palette, color: 'text-pink-500' },
  {
    id: 'nextjs',
    label: 'Next.js',
    icon: TrendingUp,
    color: 'text-slate-700 dark:text-slate-300',
  },
  { id: 'backend', label: 'Backend', icon: Server, color: 'text-green-500' },
  {
    id: 'mobile',
    label: 'Mobile Dev',
    icon: Smartphone,
    color: 'text-orange-500',
  },
  {
    id: 'database',
    label: 'Database',
    icon: Database,
    color: 'text-amber-500',
  },
]

const sortOptions: {
  id: SortOption
  label: string
  icon: React.ElementType
}[] = [
  { id: 'newest', label: 'Newest First', icon: SortDesc },
  { id: 'oldest', label: 'Oldest First', icon: SortAsc },
  { id: 'popular', label: 'Most Popular', icon: Flame },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
]

const popularTags = [
  'JavaScript',
  'React Hooks',
  'Performance',
  'Tutorial',
  'Best Practices',
  'UI/UX',
  'Animation',
  'API',
  'Authentication',
  'Testing',
  'DevOps',
  'Career',
]

export const BlogSidebar = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  selectedTags,
  onTagToggle,
  isMobileOpen = false,
  onMobileClose,
  isCollapsed = false,
  onToggleCollapse,
}: BlogSidebarProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [isTagsExpanded, setIsTagsExpanded] = useState(true)
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true)

  const currentSort = sortOptions.find((s) => s.id === sortBy)

  // Collapsed sidebar view - just icons
  const collapsedContent = (
    <div className="flex h-full flex-col items-center gap-3 py-5">
      {/* Expand Button */}
      <motion.button
        onClick={onToggleCollapse}
        className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Expand Sidebar"
      >
        <PanelLeft className="size-5" />
      </motion.button>

      <div className="my-2 h-px w-8 bg-slate-200 dark:bg-slate-700" />

      {/* Quick Category Icons */}
      {categories.slice(0, 6).map((category) => {
        const Icon = category.icon
        const isSelected = selectedCategory === category.id
        return (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              'flex size-10 items-center justify-center rounded-xl transition-all',
              isSelected
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800',
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={category.label}
          >
            <Icon className={cn('size-5', !isSelected && category.color)} />
          </motion.button>
        )
      })}

      <div className="my-2 h-px w-8 bg-slate-200 dark:bg-slate-700" />

      {/* Quick Actions */}
      <motion.button
        className="flex size-10 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Search"
      >
        <Search className="size-5" />
      </motion.button>

      <motion.button
        className="flex size-10 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Tags"
      >
        <Tag className="size-5" />
      </motion.button>
    </div>
  )

  const sidebarContent = (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header with Collapse Button */}
      <div className="flex items-center justify-between border-b border-slate-200/60 p-4 dark:border-slate-700/60">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500">
            <Filter className="size-4 text-white" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white">
            Filters
          </span>
        </motion.div>
        {onToggleCollapse && (
          <motion.button
            onClick={onToggleCollapse}
            className="flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="size-5" />
          </motion.button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 space-y-5 overflow-y-auto p-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        {/* Mobile Close Button */}
        {onMobileClose && (
          <div className="flex items-center justify-between lg:hidden">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
              <Filter className="size-5 text-emerald-500" />
              Filters
            </h2>
            <motion.button
              onClick={onMobileClose}
              className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              whileTap={{ scale: 0.95 }}
            >
              <X className="size-5" />
            </motion.button>
          </div>
        )}

        {/* Search */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Search className="size-4 text-emerald-500" />
            Search Articles
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title, content..."
              className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 pl-4 pr-10 text-sm shadow-sm backdrop-blur-sm transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-slate-700 dark:bg-slate-800/80 dark:placeholder:text-slate-500"
            />
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
              >
                <X className="size-4" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <SortDesc className="size-4 text-emerald-500" />
            Sort By
          </label>
          <div className="relative">
            <motion.button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-medium shadow-sm backdrop-blur-sm transition-all hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-800/80"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                {currentSort && (
                  <currentSort.icon className="size-4 text-emerald-500" />
                )}
                <span>{currentSort?.label}</span>
              </div>
              <motion.div
                animate={{ rotate: isSortOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="size-4 text-slate-400" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800"
                >
                  {sortOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => {
                        onSortChange(option.id)
                        setIsSortOpen(false)
                      }}
                      className={cn(
                        'flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors',
                        sortBy === option.id
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                          : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/50',
                      )}
                      whileHover={{ x: 4 }}
                    >
                      <option.icon className="size-4" />
                      {option.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Categories - Collapsible Accordion */}
        <div className="space-y-2 rounded-xl border border-slate-200/60 bg-white/50 p-3 dark:border-slate-700/60 dark:bg-slate-800/50">
          <motion.button
            onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
            className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
          >
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-emerald-500" />
              Categories
            </div>
            <motion.div
              animate={{ rotate: isCategoriesExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="size-4 text-slate-400" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isCategoriesExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="space-y-1 pt-1">
                  {categories.map((category) => {
                    const Icon = category.icon
                    const isSelected = selectedCategory === category.id

                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={cn(
                          'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                          isSelected
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                            : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50',
                        )}
                        whileHover={{ scale: 1.01, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon
                          className={cn(
                            'size-4 transition-colors',
                            isSelected ? 'text-white' : category.color,
                          )}
                        />
                        <span>{category.label}</span>
                        {isSelected && (
                          <motion.div
                            layoutId="categoryIndicator"
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
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Popular Tags - Collapsible */}
        <div className="space-y-2 rounded-xl border border-slate-200/60 bg-white/50 p-3 dark:border-slate-700/60 dark:bg-slate-800/50">
          <motion.button
            onClick={() => setIsTagsExpanded(!isTagsExpanded)}
            className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
          >
            <div className="flex items-center gap-2">
              <Tag className="size-4 text-emerald-500" />
              Popular Tags
            </div>
            <motion.div
              animate={{ rotate: isTagsExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="size-4 text-slate-400" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isTagsExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-1">
                  {popularTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag)

                    return (
                      <motion.button
                        key={tag}
                        onClick={() => onTagToggle(tag)}
                        className={cn(
                          'rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                          isSelected
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                            : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-emerald-500',
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tag}
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Clear Filters */}
        {(searchQuery ||
          selectedCategory !== 'all' ||
          selectedTags.length > 0) && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => {
              onSearchChange('')
              onCategoryChange('all')
              selectedTags.forEach((tag) => onTagToggle(tag))
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition-all hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <X className="size-4" />
            Clear All Filters
          </motion.button>
        )}

        {/* Stats Card */}
        <motion.div
          className="rounded-2xl border border-emerald-200/50 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 dark:border-emerald-800/30 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-cyan-950/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="size-5 text-emerald-500" />
            <span className="font-semibold text-emerald-700 dark:text-emerald-300">
              Blog Stats
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/60 p-3 dark:bg-slate-900/40">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                12
              </div>
              <div className="text-xs text-slate-500">Total Posts</div>
            </div>
            <div className="rounded-xl bg-white/60 p-3 dark:bg-slate-900/40">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                8
              </div>
              <div className="text-xs text-slate-500">Categories</div>
            </div>
            <div className="rounded-xl bg-white/60 p-3 dark:bg-slate-900/40">
              <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                24
              </div>
              <div className="text-xs text-slate-500">Tags</div>
            </div>
            <div className="rounded-xl bg-white/60 p-3 dark:bg-slate-900/40">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                5K+
              </div>
              <div className="text-xs text-slate-500">Total Views</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar - Animated Width */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 72 : 320,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
        className="fixed left-0 top-16 z-20 hidden h-[calc(100vh-4rem)] shrink-0 overflow-hidden border-r border-slate-200/60 bg-slate-50/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 lg:block"
      >
        {/* Collapsed Content - Always rendered, visibility toggled */}
        <motion.div
          initial={false}
          animate={{
            opacity: isCollapsed ? 1 : 0,
            scale: isCollapsed ? 1 : 0.8,
            pointerEvents: isCollapsed ? 'auto' : 'none',
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 h-full"
        >
          {collapsedContent}
        </motion.div>

        {/* Expanded Content - Always rendered, visibility toggled */}
        <motion.div
          initial={false}
          animate={{
            opacity: isCollapsed ? 0 : 1,
            scale: isCollapsed ? 0.95 : 1,
            pointerEvents: isCollapsed ? 'none' : 'auto',
          }}
          transition={{ duration: 0.2 }}
          className="h-full w-80"
        >
          {sidebarContent}
        </motion.div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-80 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
