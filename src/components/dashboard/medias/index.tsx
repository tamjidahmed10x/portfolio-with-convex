import React from 'react'
import {
  IconUpload,
  IconTrash,
  IconDownload,
  IconPhoto,
} from '@tabler/icons-react'

const demoMedia = [
  {
    id: 1,
    name: 'profile-photo.jpg',
    type: 'Image',
    size: '2.4 MB',
    uploadDate: '2025-12-01',
    url: '/placeholder-image.jpg',
  },
  {
    id: 2,
    name: 'project-banner.png',
    type: 'Image',
    size: '1.8 MB',
    uploadDate: '2025-11-28',
    url: '/placeholder-image.jpg',
  },
  {
    id: 3,
    name: 'demo-video.mp4',
    type: 'Video',
    size: '12.5 MB',
    uploadDate: '2025-11-25',
    url: '/placeholder-video.mp4',
  },
  {
    id: 4,
    name: 'resume.pdf',
    type: 'Document',
    size: '245 KB',
    uploadDate: '2025-11-20',
    url: '/resume.pdf',
  },
  {
    id: 5,
    name: 'logo.svg',
    type: 'Image',
    size: '45 KB',
    uploadDate: '2025-11-15',
    url: '/logo.svg',
  },
  {
    id: 6,
    name: 'background.jpg',
    type: 'Image',
    size: '3.2 MB',
    uploadDate: '2025-11-10',
    url: '/placeholder-image.jpg',
  },
]

export function Medias() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Media Library
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Manage your images, videos, and other media files.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
          <IconUpload className="w-4 h-4" />
          Upload New
        </button>
      </div>

      {/* Storage Stats */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Storage Used
          </span>
          <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            20.2 MB / 100 MB
          </span>
        </div>
        <div className="w-full h-2 bg-white dark:bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
            style={{ width: '20%' }}
          ></div>
        </div>
      </div>

      {/* File Type Filter */}
      <div className="flex gap-2">
        {['All', 'Images', 'Videos', 'Documents'].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoMedia.map((media) => (
          <div
            key={media.id}
            className="group relative p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all"
          >
            {/* Preview */}
            <div className="aspect-video bg-neutral-100 dark:bg-neutral-900 rounded-md mb-3 flex items-center justify-center">
              <IconPhoto className="w-12 h-12 text-neutral-400" />
            </div>

            {/* Info */}
            <div className="space-y-2">
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                {media.name}
              </h3>
              <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
                <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded text-xs">
                  {media.type}
                </span>
                <span>{media.size}</span>
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-500">
                {media.uploadDate}
              </div>
            </div>

            {/* Actions */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-white dark:bg-neutral-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md shadow-md transition-colors">
                <IconDownload className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </button>
              <button className="p-2 bg-white dark:bg-neutral-900 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md shadow-md transition-colors">
                <IconTrash className="w-4 h-4 text-red-600 dark:text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Medias
