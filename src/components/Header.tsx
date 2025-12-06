import { useCallback, useState, useEffect, useLayoutEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import {
  Home,
  User,
  Wrench,
  FolderKanban,
  BookOpen,
  Mail,
  Menu,
  Sparkles,
  Code2,
  X,
} from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'
import { ThemeSwitcher, ThemeSwitcherCompact } from './theme-switcher'

const NAV_LINKS = [
  { id: '/#home', label: 'Home', icon: Home, isExternal: false },
  { id: '/#skills', label: 'Skills', icon: Wrench, isExternal: false },
  {
    id: '/#projects',
    label: 'Projects',
    icon: FolderKanban,
    isExternal: false,
  },
  { id: '/#aboutMe', label: 'About', icon: User, isExternal: false },
  { id: '/blogs', label: 'Blogs', icon: BookOpen, isExternal: true },
  { id: '/#contact', label: 'Contact', icon: Mail, isExternal: false },
] as const

const HEADER_OFFSET = 80

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Check if we're on any blogs related page (/blogs or /blogs/$slug)
  const isOnBlogsPage = location.pathname.startsWith('/blogs')

  // Immediately sync activeSection when route changes (before paint)
  useLayoutEffect(() => {
    if (isOnBlogsPage) {
      setActiveSection('blogs')
    } else if (location.pathname === '/') {
      // When navigating to home, immediately set home
      // (page scrolls to top on navigation, so home is always visible first)
      setActiveSection('home')
    }
  }, [location.pathname, isOnBlogsPage])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // If on /blogs or /blogs/$slug routes, always set blogs as active
      if (isOnBlogsPage) {
        return
      }

      // Update active section based on scroll position
      // Order should match page layout: home -> skills -> projects -> aboutMe -> blogs -> contact
      const sections = [
        'home',
        'skills',
        'projects',
        'aboutMe',
        'blogs',
        'contact',
      ]
      // Check from bottom to top to find the current visible section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Initial check
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOnBlogsPage])

  // Scroll to hash targets after route changes (e.g., /blogs -> /#skills)
  useEffect(() => {
    if (!location.hash) return

    const targetId = location.hash.replace('#', '')
    let attempts = 0

    const tryScroll = () => {
      const element = document.getElementById(targetId)
      if (element) {
        const targetPosition =
          element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET

        window.scrollTo({
          top: Math.max(targetPosition, 0),
          behavior: 'smooth',
        })
        return
      }

      // Retry briefly after navigation to wait for the section to render
      if (attempts < 12) {
        attempts += 1
        window.requestAnimationFrame(tryScroll)
      }
    }

    window.requestAnimationFrame(tryScroll)
  }, [location.hash, location.pathname])

  const handleAnchorClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, isExternal: boolean) => {
      const href = event.currentTarget.getAttribute('href')
      if (!href) return

      // If it's an external link (like /blogs), let it navigate normally
      if (isExternal || !href.includes('#')) {
        setIsOpen(false)
        return
      }

      const targetId = href.split('#')[1]
      const targetElement = targetId ? document.getElementById(targetId) : null
      if (!targetElement) {
        return
      }

      event.preventDefault()
      setIsOpen(false)

      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: Math.max(targetPosition - HEADER_OFFSET, 0),
        behavior: 'smooth',
      })

      // Keep the URL hash in sync for same-page navigation
      window.history.replaceState(null, '', href)
    },
    [],
  )

  // Helper function to check if a nav link is active
  const isLinkActive = (link: (typeof NAV_LINKS)[number]) => {
    // For /blogs link (external):
    if (link.isExternal && link.id === '/blogs') {
      // If on /blogs or /blogs/$slug routes, always active
      if (isOnBlogsPage) return true
      // If on landing page and blogs section is visible, active
      if (location.pathname === '/' && activeSection === 'blogs') return true
      // Otherwise not active
      return false
    }
    // For anchor links, check if the section is active
    return link.id.includes(activeSection)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-white/95 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/95',
        isScrolled &&
          'shadow-lg shadow-slate-900/5 transition-shadow duration-300 dark:shadow-black/20',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" hash="home" className="group flex items-center gap-2.5">
          <div className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-theme shadow-theme transition-shadow group-hover:shadow-theme-hover">
            <Code2 className="size-5 text-white" />
            <div className="absolute -right-1 -top-1 size-3 rounded-full bg-theme-secondary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Tamjid Ahmed
            </span>
            <span className="text-[10px] font-medium text-theme-primary">
              Frontend Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon
            const isActive = isLinkActive(link)

            return (
              <Link
                key={link.id}
                to={link.isExternal ? link.id : '/'}
                hash={link.isExternal ? undefined : link.id.split('#')[1]}
                onClick={(e) => handleAnchorClick(e, link.isExternal)}
                className={cn(
                  'relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium',
                  isActive
                    ? 'text-theme-primary'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                )}
              >
                <Icon className="size-4" />
                <span>{link.label}</span>
                {isActive && (
                  <div className="absolute inset-0 -z-10 rounded-lg bg-theme-primary/10" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Theme Switcher & CTA Button - Desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeSwitcher />
          <Link
            to="/"
            hash="contact"
            onClick={(e) => handleAnchorClick(e, false)}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-theme px-4 py-2 text-sm font-bold text-white shadow-theme transition-shadow hover:shadow-theme-hover"
          >
            <Sparkles className="size-4" />
            Hire Me
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative size-10 rounded-xl border border-slate-200/60 bg-white/80 backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-800/80 lg:hidden"
            >
              <Menu className="size-5 text-slate-700 dark:text-slate-300" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            hideClose
            className="w-full max-w-sm border-l border-slate-200/60 bg-white/95 p-0 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/95"
          >
            <div className="flex h-full flex-col">
              {/* Mobile Header */}
              <div className="flex items-center justify-between border-b border-slate-200/60 px-6 py-4 dark:border-slate-700/60">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-theme shadow-lg">
                    <Code2 className="size-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Tamjid Ahmed
                    </span>
                    <span className="text-[10px] font-medium text-theme-primary">
                      Frontend Engineer
                    </span>
                  </div>
                </div>
                {/* Theme controls and close button */}
                <div className="flex items-center gap-2">
                  <ThemeSwitcherCompact />
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-10 rounded-xl border border-slate-200/60 bg-white/80 dark:border-slate-700/60 dark:bg-slate-800/80"
                    >
                      <X className="size-5 text-slate-700 dark:text-slate-300" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </SheetClose>
                </div>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex-1 space-y-1 px-4 py-6">
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon
                  const isActive = isLinkActive(link)

                  return (
                    <div key={link.id}>
                      <SheetClose asChild>
                        <Link
                          to={link.isExternal ? link.id : '/'}
                          hash={
                            link.isExternal ? undefined : link.id.split('#')[1]
                          }
                          onClick={(e) => handleAnchorClick(e, link.isExternal)}
                          className={cn(
                            'flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium',
                            isActive
                              ? 'bg-theme-primary/10 text-theme-primary'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
                          )}
                        >
                          <div
                            className={cn(
                              'flex size-10 items-center justify-center rounded-lg',
                              isActive
                                ? 'bg-theme-primary/20'
                                : 'bg-slate-100 dark:bg-slate-800',
                            )}
                          >
                            <Icon
                              className={cn(
                                'size-5',
                                isActive
                                  ? 'text-theme-primary'
                                  : 'text-slate-500 dark:text-slate-400',
                              )}
                            />
                          </div>
                          {link.label}
                        </Link>
                      </SheetClose>
                    </div>
                  )
                })}
              </nav>

              {/* Mobile CTA */}
              <div className="border-t border-slate-200/60 p-4 dark:border-slate-700/60">
                <SheetClose asChild>
                  <Link
                    to="/"
                    hash="contact"
                    onClick={(e) => handleAnchorClick(e, false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-theme px-6 py-3 text-sm font-bold text-white! shadow-theme"
                  >
                    <Sparkles className="size-4" />
                    Let's Work Together
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Header
