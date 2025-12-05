import { createFileRoute } from '@tanstack/react-router'
import BlogsSection from '@/components/home/blogs-section'

const BlogsPage = () => {
  return (
    <div className="mt-16">
      <BlogsSection />
    </div>
  )
}

export const Route = createFileRoute('/blogs')({ component: BlogsPage })
