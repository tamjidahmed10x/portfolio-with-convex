import { createFileRoute, Outlet, useMatch } from '@tanstack/react-router'
import { BlogLandingPage } from '@/components/blogs'
import { generateBlogListingSEO } from '@/lib/seo'

const BlogsLayout = () => {
  // Check if we're on a child route (like /blogs/$slug)
  const slugMatch = useMatch({ from: '/blogs/$slug', shouldThrow: false })

  // If on a child route, render the Outlet (child content)
  if (slugMatch) {
    return <Outlet />
  }

  // Otherwise render the blog landing page
  return (
    <div className="min-h-screen">
      <BlogLandingPage />
    </div>
  )
}

export const Route = createFileRoute('/blogs')({
  component: BlogsLayout,
  ssr: true,
  head: () => {
    const { meta, links } = generateBlogListingSEO()
    return { meta, links }
  },
})
