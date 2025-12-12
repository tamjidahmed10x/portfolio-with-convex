import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  IconSettings,
  IconArticle,
  IconAddressBook,
  IconPhoto,
  IconArrowLeft,
  IconMenu2,
} from '@tabler/icons-react'
import {
  DashboardSidebar,
  type DashboardSidebarLink,
} from '@/components/dashboard/sidebar'
import { SiteConfigurations } from '@/components/dashboard/site-configurations'
import { DashboardBlogs } from '@/components/dashboard/blogs'
import { Contacts } from '@/components/dashboard/contacts'
import { Medias } from '@/components/dashboard/medias'
import { motion } from 'motion/react'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

type DashboardSection = 'site-configurations' | 'blogs' | 'contacts' | 'medias'

function RouteComponent() {
  const [activeSection, setActiveSection] = useState<DashboardSection>(
    'site-configurations',
  )
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const links: DashboardSidebarLink[] = [
    {
      label: 'Site Configurations',
      href: '#',
      icon: <IconSettings className="h-5 w-5 shrink-0" />,
      section: 'site-configurations',
    },
    {
      label: 'Blogs',
      href: '#',
      icon: <IconArticle className="h-5 w-5 shrink-0" />,
      section: 'blogs',
    },
    {
      label: 'Contacts',
      href: '#',
      icon: <IconAddressBook className="h-5 w-5 shrink-0" />,
      section: 'contacts',
    },
    {
      label: 'Medias',
      href: '#',
      icon: <IconPhoto className="h-5 w-5 shrink-0" />,
      section: 'medias',
    },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'site-configurations':
        return <SiteConfigurations />
      case 'blogs':
        return <DashboardBlogs />
      case 'contacts':
        return <Contacts />
      case 'medias':
        return <Medias />
      default:
        return <SiteConfigurations />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-800">
      {/* Dashboard Sidebar */}
      <DashboardSidebar
        links={links}
        activeSection={activeSection}
        onSectionChange={(section) =>
          setActiveSection(section as DashboardSection)
        }
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
        logo={<Logo />}
        logoCollapsed={<LogoIcon />}
        bottomContent={
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors"
          >
            <IconArrowLeft className="h-5 w-5 shrink-0" />
            <span>Back to Home</span>
          </Link>
        }
      />

      {/* Main Content - With left margin for fixed sidebar */}
      <motion.main
        className="min-h-screen"
        initial={{ marginLeft: isSidebarCollapsed ? 72 : 280 }}
        animate={{ marginLeft: isSidebarCollapsed ? 72 : 280 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <style>{`
          @media (max-width: 1023px) {
            main { margin-left: 0 !important; }
          }
        `}</style>

        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 lg:hidden border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <IconMenu2 className="h-6 w-6" />
          </button>
          <Logo />
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-8 lg:p-10">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 md:p-8 min-h-[calc(100vh-8rem)]">
            <div className="max-w-7xl mx-auto w-full">{renderContent()}</div>
          </div>
        </div>
      </motion.main>
    </div>
  )
}

const Logo = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Dashboard
      </motion.span>
    </Link>
  )
}

const LogoIcon = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
    </Link>
  )
}
