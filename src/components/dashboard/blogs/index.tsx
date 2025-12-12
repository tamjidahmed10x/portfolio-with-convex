import React from 'react'
import { IconEdit, IconTrash, IconEye, IconPlus } from '@tabler/icons-react'

const demoBlogs = [
  {
    id: 1,
    title: 'Getting Started with React 19',
    excerpt: 'Learn about the new features and improvements in React 19...',
    date: '2025-12-01',
    status: 'Published',
    views: 1234,
  },
  {
    id: 2,
    title: 'Building Scalable APIs with Node.js',
    excerpt:
      'Best practices for creating robust and scalable backend services...',
    date: '2025-11-28',
    status: 'Published',
    views: 892,
  },
  {
    id: 3,
    title: 'TypeScript Tips and Tricks',
    excerpt: 'Advanced TypeScript patterns that will make your code better...',
    date: '2025-11-25',
    status: 'Draft',
    views: 0,
  },
  {
    id: 4,
    title: 'Understanding CSS Grid Layout',
    excerpt:
      'A comprehensive guide to mastering CSS Grid for modern layouts...',
    date: '2025-11-20',
    status: 'Published',
    views: 2156,
  },
]

export function DashboardBlogs() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Blogs
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Manage your blog posts and articles.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
          <IconPlus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            4
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            Total Posts
          </div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            3
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">
            Published
          </div>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
            1
          </div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">
            Drafts
          </div>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            4.2K
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300">
            Total Views
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {demoBlogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">
                        {blog.title}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        {blog.excerpt}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                    {blog.date}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        blog.status === 'Published'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-1">
                      <IconEye className="w-4 h-4" />
                      {blog.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-colors">
                        <IconEdit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </button>
                      <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-colors">
                        <IconTrash className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardBlogs
