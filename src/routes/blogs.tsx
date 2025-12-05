import { createFileRoute } from '@tanstack/react-router'
import { BlogLandingPage } from '@/components/blogs'

const BlogsPage = () => {
  return (
    <div className="mt-16 min-h-screen">
      <BlogLandingPage />
    </div>
  )
}

export const Route = createFileRoute('/blogs')({
  component: BlogsPage,
  ssr: true,
})
