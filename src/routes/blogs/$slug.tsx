import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { DotPattern } from '@/components/magicui/dot-pattern'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Heart,
  Bookmark,
  Twitter,
  Linkedin,
  Link2,
  ChevronRight,
} from 'lucide-react'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { blogPosts } from '@/components/blogs'

export const Route = createFileRoute('/blogs/$slug')({
  ssr: true,
  component: BlogDetailPage,
})

function BlogDetailPage() {
  const { slug } = Route.useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug])

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
            Article Not Found
          </h1>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-bold text-white"
          >
            <ArrowLeft className="size-4" />
            Back to Blogs
          </Link>
        </div>
      </div>
    )
  }

  const CategoryIcon = post.categoryIcon

  const relatedPosts = useMemo(
    () =>
      blogPosts
        .filter((p) => p.category === post.category && p.id !== post.id)
        .slice(0, 3),
    [post.category, post.id],
  )

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <DotPattern
        className="fixed inset-0 z-0 text-slate-300/40 dark:text-foreground/10 [mask-image:radial-gradient(1500px_circle_at_center,white,transparent)]"
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1.2}
      />

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

      <main className="relative z-10">
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <motion.img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          <motion.div
            className="absolute left-4 top-20 sm:left-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/blogs"
              className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <ArrowLeft className="size-4" />
              Back to Blogs
            </Link>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
            <div className="mx-auto max-w-4xl">
              <motion.div
                className="mb-4 flex items-center gap-2 text-sm text-white/70"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/blogs" className="hover:text-white">
                  Blogs
                </Link>
                <ChevronRight className="size-4" />
                <span className="text-white">{post.category}</span>
              </motion.div>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-md">
                  <CategoryIcon className="size-4" />
                  {post.category}
                </span>
              </motion.div>

              <motion.h1
                className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {post.title}
              </motion.h1>

              <motion.div
                className="flex flex-wrap items-center gap-4 text-sm text-white/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="size-10 rounded-full border-2 border-white/30"
                  />
                  <div>
                    <div className="font-semibold text-white">
                      {post.author.name}
                    </div>
                    <div className="text-xs text-white/60">Author</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-4" />
                  {post.publishedAt}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="size-4" />
                  {post.views.toLocaleString()} views
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <motion.article
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="mb-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-lg prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 dark:prose-strong:text-white prose-code:rounded prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-emerald-600 dark:prose-code:text-emerald-400 prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-img:rounded-xl prose-img:shadow-lg">
                <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300">
                  {post.excerpt}
                </p>

                <h2>Introduction</h2>
                <p>
                  In the ever-evolving landscape of web development, staying
                  ahead of the curve requires continuous learning and
                  adaptation. This article delves deep into the core concepts
                  and practical applications that will help you master{' '}
                  {post.category} development.
                </p>

                <p>
                  Whether you're a beginner just starting your journey or an
                  experienced developer looking to refine your skills, this
                  comprehensive guide will provide valuable insights and
                  actionable techniques you can apply immediately to your
                  projects.
                </p>

                <h2>Understanding the Fundamentals</h2>
                <p>
                  Before diving into advanced topics, it's crucial to have a
                  solid foundation. Let's explore the fundamental concepts that
                  form the backbone of modern {post.category} development.
                </p>

                <p>
                  The key to writing maintainable and scalable code lies in
                  understanding these core principles:
                </p>

                <ul>
                  <li>
                    <strong>Separation of Concerns:</strong> Keep your code
                    organized by separating different functionalities into
                    distinct modules or components.
                  </li>
                  <li>
                    <strong>DRY Principle:</strong> Don't Repeat Yourself -
                    abstract common patterns into reusable utilities.
                  </li>
                  <li>
                    <strong>KISS Principle:</strong> Keep It Simple, Stupid -
                    avoid over-engineering solutions.
                  </li>
                  <li>
                    <strong>Type Safety:</strong> Leverage TypeScript to catch
                    errors early and improve code quality.
                  </li>
                </ul>

                <h2>Best Practices and Patterns</h2>
                <p>
                  Implementing industry best practices can significantly improve
                  your development workflow and the quality of your output.
                  Here's what the experts recommend:
                </p>

                <blockquote>
                  "The best code is no code at all. Every new line of code you
                  willingly bring into the world is code that has to be
                  debugged, code that has to be read and understood, code that
                  has to be supported." – Jeff Atwood
                </blockquote>

                <p>
                  Let's look at a simple example that demonstrates these
                  principles in action:
                </p>

                <pre>
                  <code>{`// Example code snippet
const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};`}</code>
                </pre>

                <h2>Advanced Techniques</h2>
                <p>
                  Once you've mastered the basics, you can start exploring more
                  advanced techniques that will take your skills to the next
                  level:
                </p>

                <ol>
                  <li>Performance optimization strategies</li>
                  <li>Advanced state management patterns</li>
                  <li>Testing best practices</li>
                  <li>Continuous integration and deployment</li>
                  <li>Monitoring and error tracking</li>
                </ol>

                <h3>Performance Optimization</h3>
                <p>
                  Performance is critical in modern web applications. Users
                  expect fast, responsive interfaces. Here are some techniques
                  to optimize your applications:
                </p>

                <ul>
                  <li>Lazy loading and code splitting</li>
                  <li>Memoization and caching strategies</li>
                  <li>
                    Optimizing renders and avoiding unnecessary re-renders
                  </li>
                  <li>Using web workers for heavy computations</li>
                </ul>

                <h2>Conclusion</h2>
                <p>
                  Mastering {post.category} development is a journey that
                  requires dedication, practice, and continuous learning. By
                  following the principles and techniques outlined in this
                  article, you'll be well on your way to becoming a proficient
                  developer.
                </p>

                <p>
                  Remember, the key to success is consistent practice and
                  staying curious. Don't be afraid to experiment, make mistakes,
                  and learn from them. Happy coding! 🚀
                </p>
              </div>

              <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={() => setIsLiked(!isLiked)}
                      className={cn(
                        'flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition-colors',
                        isLiked
                          ? 'bg-red-500/10 text-red-500'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700',
                      )}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart
                        className={cn('size-5', isLiked && 'fill-current')}
                      />
                      {post.likes + (isLiked ? 1 : 0)}
                    </motion.button>

                    <motion.button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={cn(
                        'flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition-colors',
                        isBookmarked
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700',
                      )}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bookmark
                        className={cn('size-5', isBookmarked && 'fill-current')}
                      />
                      Save
                    </motion.button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-500">
                      Share:
                    </span>
                    <motion.button
                      className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-blue-500 hover:text-white dark:bg-slate-800 dark:text-slate-400"
                      whileTap={{ scale: 0.95 }}
                    >
                      <Twitter className="size-5" />
                    </motion.button>
                    <motion.button
                      className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-blue-700 hover:text-white dark:bg-slate-800 dark:text-slate-400"
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="size-5" />
                    </motion.button>
                    <motion.button
                      className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-emerald-500 hover:text-white dark:bg-slate-800 dark:text-slate-400"
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link2 className="size-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-start gap-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="size-16 rounded-full border-2 border-emerald-500/20"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {post.author.name}
                      </h3>
                      <p className="mb-3 text-sm text-emerald-600 dark:text-emerald-400">
                        Frontend Engineer & Technical Writer
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Passionate about creating beautiful user experiences and
                        sharing knowledge with the developer community. Follow
                        along for more insights on modern web development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>

          {relatedPosts.length > 0 && (
            <motion.section
              className="mt-16 border-t border-slate-200 pt-12 dark:border-slate-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
                Related Articles
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => {
                  const RelatedIcon = relatedPost.categoryIcon
                  return (
                    <Link
                      key={relatedPost.id}
                      to="/blogs/$slug"
                      params={{ slug: relatedPost.slug }}
                      className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:border-emerald-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span
                          className={cn(
                            'absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold backdrop-blur-sm',
                            relatedPost.categoryColor,
                          )}
                        >
                          <RelatedIcon className="size-3" />
                          {relatedPost.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="mb-2 line-clamp-2 font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                          {relatedPost.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {relatedPost.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="size-3" />
                            {relatedPost.views.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </motion.section>
          )}
        </div>
      </main>
    </div>
  )
}
