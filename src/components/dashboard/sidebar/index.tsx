import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import { PanelLeftClose, PanelLeft, X } from 'lucide-react'
import type { ReactNode } from 'react'

export type DashboardSidebarLink = {
  label: string
  href: string
  icon: ReactNode
  section?: string
  onClick?: () => void
}

type DashboardSidebarProps = {
  links: DashboardSidebarLink[]
  activeSection?: string
  onSectionChange?: (section: string) => void
  logo?: ReactNode
  logoCollapsed?: ReactNode
  bottomContent?: ReactNode
  isMobileOpen?: boolean
  onMobileClose?: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export const DashboardSidebar = ({
  links,
  activeSection,
  onSectionChange,
  logo,
  logoCollapsed,
  bottomContent,
  isMobileOpen = false,
  onMobileClose,
  isCollapsed = false,
  onToggleCollapse,
}: DashboardSidebarProps) => {
  // Collapsed sidebar view - just icons
  const collapsedContent = (
    <div className="flex h-full flex-col items-center gap-3 py-5">
      {/* Logo collapsed */}
      {logoCollapsed && <div className="mb-2">{logoCollapsed}</div>}

      {/* Expand Button */}
      <motion.button
        onClick={onToggleCollapse}
        className="flex size-10 items-center justify-center rounded-xl bg-linear-to-r from-neutral-800 to-neutral-700 dark:from-neutral-200 dark:to-neutral-300 text-white dark:text-neutral-800 shadow-md transition-all hover:shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Expand Sidebar"
      >
        <PanelLeft className="size-5" />
      </motion.button>

      <div className="my-2 h-px w-8 bg-neutral-200 dark:bg-neutral-700" />

      {/* Quick Link Icons */}
      {links.map((link, idx) => {
        const isSelected = activeSection === link.section
        return (
          <motion.button
            key={idx}
            onClick={() => {
              if (link.section && onSectionChange) {
                onSectionChange(link.section)
              }
              link.onClick?.()
            }}
            className={cn(
              'flex size-10 items-center justify-center rounded-xl transition-all',
              isSelected
                ? 'bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-800 shadow-md'
                : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800',
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={link.label}
          >
            {link.icon}
          </motion.button>
        )
      })}
    </div>
  )

  const sidebarContent = (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header with Logo and Collapse Button */}
      <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 p-4">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {logo}
        </motion.div>
        {onToggleCollapse && (
          <motion.button
            onClick={onToggleCollapse}
            className="flex size-8 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="size-5" />
          </motion.button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700">
        {/* Mobile Close Button */}
        {onMobileClose && (
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
              Menu
            </h2>
            <motion.button
              onClick={onMobileClose}
              className="rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              whileTap={{ scale: 0.95 }}
            >
              <X className="size-5" />
            </motion.button>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {links.map((link, idx) => {
            const isSelected = activeSection === link.section

            return (
              <motion.button
                key={idx}
                onClick={() => {
                  if (link.section && onSectionChange) {
                    onSectionChange(link.section)
                  }
                  link.onClick?.()
                }}
                className={cn(
                  'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all text-left',
                  isSelected
                    ? 'bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-800 shadow-md'
                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800',
                )}
                whileHover={{ scale: 1.01, x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className={cn(
                    'shrink-0',
                    isSelected
                      ? 'text-white dark:text-neutral-800'
                      : 'text-neutral-500',
                  )}
                >
                  {link.icon}
                </span>
                <span>{link.label}</span>
                {isSelected && (
                  <motion.div
                    layoutId="dashboardSidebarIndicator"
                    className="absolute right-3 size-2 rounded-full bg-white dark:bg-neutral-800"
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
        </nav>
      </div>

      {/* Bottom Content */}
      {bottomContent && (
        <div className="border-t border-neutral-200/60 dark:border-neutral-700/60 p-4">
          {bottomContent}
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar - Fixed/Absolute Position */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 72 : 280,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
        className="fixed left-0 top-0 z-30 hidden h-screen shrink-0 overflow-hidden border-r border-neutral-200/60 bg-neutral-50/95 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/95 lg:block"
      >
        {/* Collapsed Content */}
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

        {/* Expanded Content */}
        <motion.div
          initial={false}
          animate={{
            opacity: isCollapsed ? 0 : 1,
            scale: isCollapsed ? 0.95 : 1,
            pointerEvents: isCollapsed ? 'none' : 'auto',
          }}
          transition={{ duration: 0.2 }}
          className="h-full w-[280px]"
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
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
