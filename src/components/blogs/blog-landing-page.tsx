import { DotPattern } from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'
import { ArrowUp, BookOpen, Menu, Newspaper, Sparkles, Filter } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BlogCard } from './blog-card'
import { blogPosts } from './blog-data'
import { BlogSidebar, type Category, type SortOption } from './blog-sidebar'

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
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <style>{`
          @media (max-width: 1023px) {
            main { margin-left: 0 !important; }
          }
        `}</style>

        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 lg:hidden border-b border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-16 z-10">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu className="size-5" />
            <span className="text-sm font-medium">Filters</span>
          </button>
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-theme-primary" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Blog</span>
          </div>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>

        {/* Content Area */}
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
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
                        <Sparkles className="size-5 text-theme-accent" />
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
                    <BookOpen className="size-5 text-theme-primary" />
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
                    className="group flex items-center gap-2 rounded-xl bg-gradient-theme px-6 py-3 font-bold text-white shadow-theme transition-shadow hover:shadow-theme-hover"
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
            className="fixed bottom-6 right-6 z-20 rounded-full bg-gradient-theme p-3 text-white shadow-theme transition-shadow hover:shadow-theme-hover"
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
