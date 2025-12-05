import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { BlogSidebar, type SortOption, type Category } from './blog-sidebar'
import { BlogCard } from './blog-card'
import { blogPosts } from './blog-data'
import {
  PenTool,
  BookOpen,
  Sparkles,
  Menu,
  LayoutGrid,
  List,
  Newspaper,
  ArrowUp,
} from 'lucide-react'
import { useState, useMemo, useCallback, useEffect } from 'react'

// Map categories for filtering
const categoryMap: Record<Category, string[]> = {
  all: [],
  react: ['React'],
  typescript: ['TypeScript'],
  css: ['CSS'],
  nextjs: ['Next.js'],
  backend: ['Backend'],
  mobile: ['Mobile'],
  database: ['Database'],
}

type ViewMode = 'grid' | 'list'

export const BlogLandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )
  }, [])

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let posts = [...blogPosts]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryTerms = categoryMap[selectedCategory]
      posts = posts.filter((post) =>
        categoryTerms.some(
          (term) => post.category.toLowerCase() === term.toLowerCase(),
        ),
      )
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      posts = posts.filter((post) =>
        selectedTags.some((tag) =>
          post.tags.some((postTag) =>
            postTag.toLowerCase().includes(tag.toLowerCase()),
          ),
        ),
      )
    }

    // Sort posts
    switch (sortBy) {
      case 'oldest':
        posts.sort(
          (a, b) =>
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime(),
        )
        break
      case 'popular':
        posts.sort((a, b) => b.views - a.views)
        break
      case 'trending':
        posts.sort((a, b) => b.likes - a.likes)
        break
      case 'newest':
      default:
        posts.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime(),
        )
    }

    return posts
  }, [searchQuery, selectedCategory, sortBy, selectedTags])

  // Get featured post and regular posts
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter(
    (post) =>
      !post.featured ||
      searchQuery ||
      selectedCategory !== 'all' ||
      selectedTags.length > 0,
  )

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Pattern */}
      <DotPattern
        className="fixed inset-0 z-0 text-slate-300/40 dark:text-foreground/10 [mask-image:radial-gradient(1500px_circle_at_center,white,transparent)]"
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1.2}
      />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="pointer-events-none fixed -left-60 top-1/4 size-[500px] rounded-full bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-transparent blur-3xl"
        animate={{ x: [0, 40, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none fixed -right-60 bottom-1/4 size-[500px] rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-transparent blur-3xl"
        animate={{ x: [0, -40, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, delay: 7 }}
      />
      <motion.div
        className="pointer-events-none fixed left-1/3 top-1/2 size-[400px] rounded-full bg-gradient-to-br from-teal-500/15 via-emerald-500/10 to-transparent blur-3xl"
        animate={{ y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, delay: 3 }}
      />

      {/* Sidebar */}
      <BlogSidebar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content - With left margin for fixed sidebar */}
      <motion.main
        className="relative z-10 min-h-screen"
        initial={{ marginLeft: isSidebarCollapsed ? 72 : 320 }}
        animate={{ marginLeft: isSidebarCollapsed ? 72 : 320 }}
        transition={{ type: 'spring', stiffness: 2000, damping: 150 }}
      >
        <style>{`
          @media (max-width: 1023px) {
            main { margin-left: 0 !important; }
          }
        `}</style>
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 lg:hidden"
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="size-5" />
            </motion.button>

            {/* Page Title */}
            <div className="flex items-center gap-3">
              <motion.div
                className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 px-4 py-2 shadow-lg backdrop-blur-sm sm:flex"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <PenTool className="size-4 text-emerald-500" />
                </motion.div>
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-xs font-bold text-transparent dark:from-emerald-400 dark:to-teal-400">
                  Blog
                </span>
              </motion.div>

              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                  Insights & Articles
                </h1>
                <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
                  {filteredPosts.length} article
                  {filteredPosts.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800 sm:flex">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'rounded-lg p-2 transition-colors',
                    viewMode === 'grid'
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700',
                  )}
                  whileTap={{ scale: 0.95 }}
                >
                  <LayoutGrid className="size-4" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'rounded-lg p-2 transition-colors',
                    viewMode === 'list'
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700',
                  )}
                  whileTap={{ scale: 0.95 }}
                >
                  <List className="size-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filteredPosts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <motion.div
                  className="mb-6 rounded-full bg-slate-100 p-6 dark:bg-slate-800"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Newspaper className="size-12 text-slate-400" />
                </motion.div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  No articles found
                </h3>
                <p className="max-w-md text-slate-500 dark:text-slate-400">
                  Try adjusting your search or filter criteria to find what
                  you're looking for.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Featured Post - Only show when no filters active */}
                {featuredPost &&
                  !searchQuery &&
                  selectedCategory === 'all' &&
                  selectedTags.length === 0 && (
                    <section>
                      <div className="mb-6 flex items-center gap-2">
                        <Sparkles className="size-5 text-amber-500" />
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                          Featured Article
                        </h2>
                      </div>
                      <BlogCard
                        post={featuredPost}
                        index={0}
                        variant="featured"
                      />
                    </section>
                  )}

                {/* All Posts */}
                <section>
                  <div className="mb-6 flex items-center gap-2">
                    <BookOpen className="size-5 text-emerald-500" />
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {searchQuery ||
                      selectedCategory !== 'all' ||
                      selectedTags.length > 0
                        ? 'Search Results'
                        : 'All Articles'}
                    </h2>
                  </div>

                  <div
                    className={cn(
                      'gap-6',
                      viewMode === 'grid'
                        ? 'grid sm:grid-cols-2 xl:grid-cols-3'
                        : 'flex flex-col',
                    )}
                  >
                    {regularPosts.map((post, index) => (
                      <BlogCard
                        key={post.id}
                        post={post}
                        index={index}
                        variant={viewMode === 'list' ? 'compact' : 'default'}
                      />
                    ))}
                  </div>
                </section>

                {/* Load More */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center pt-8"
                >
                  <motion.button
                    className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-500/25 transition-shadow hover:shadow-emerald-500/40"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Load More Articles
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ↓
                    </motion.div>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 p-3 text-white shadow-xl shadow-emerald-500/25 transition-shadow hover:shadow-emerald-500/40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
