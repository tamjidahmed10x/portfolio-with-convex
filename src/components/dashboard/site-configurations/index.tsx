import React from 'react'

export function SiteConfigurations() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Site Configurations
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Manage your site settings and configurations here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Site Info Card */}
        <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Site Information
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-neutral-600 dark:text-neutral-400">
                Site Title
              </label>
              <input
                type="text"
                defaultValue="My Portfolio"
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-900 dark:text-neutral-100"
              />
            </div>
            <div>
              <label className="text-sm text-neutral-600 dark:text-neutral-400">
                Site Description
              </label>
              <textarea
                defaultValue="Full-stack developer portfolio"
                rows={3}
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-900 dark:text-neutral-100"
              />
            </div>
          </div>
        </div>

        {/* SEO Settings Card */}
        <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            SEO Settings
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-neutral-600 dark:text-neutral-400">
                Meta Keywords
              </label>
              <input
                type="text"
                defaultValue="portfolio, web developer, react"
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-900 dark:text-neutral-100"
              />
            </div>
            <div>
              <label className="text-sm text-neutral-600 dark:text-neutral-400">
                Google Analytics ID
              </label>
              <input
                type="text"
                placeholder="G-XXXXXXXXXX"
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-900 dark:text-neutral-100"
              />
            </div>
          </div>
        </div>

        {/* Social Links Card */}
        <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Social Links
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-neutral-600 dark:text-neutral-400">
                GitHub
              </label>
              <input
                type="url"
                placeholder="https://github.com/username"
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-900 dark:text-neutral-100"
              />
            </div>
            <div>
              <label className="text-sm text-neutral-600 dark:text-neutral-400">
                LinkedIn
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/username"
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-900 dark:text-neutral-100"
              />
            </div>
          </div>
        </div>

        {/* Theme Settings Card */}
        <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Theme Settings
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-neutral-600 dark:text-neutral-400">
                Primary Color
              </label>
              <input
                type="color"
                defaultValue="#3b82f6"
                className="mt-1 w-full h-10 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-md"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-neutral-600 dark:text-neutral-400">
                Enable Dark Mode
              </label>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default SiteConfigurations
