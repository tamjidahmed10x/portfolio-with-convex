import { useCallback, useState, useEffect } from 'react'
import { motion } from 'motion/react'
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
} from 'lucide-react'

const NAV_LINKS = [
  { id: '/#home', label: 'Home', icon: Home },
  { id: '/#skills', label: 'Skills', icon: Wrench },
  { id: '/#projects', label: 'Projects', icon: FolderKanban },
  { id: '/#aboutMe', label: 'About', icon: User },
  { id: '/#blogs', label: 'Blogs', icon: BookOpen },
  { id: '/#contact', label: 'Contact', icon: Mail },
] as const

const HEADER_OFFSET = 80

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isOpen, setIsOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAnchorClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const href = event.currentTarget.getAttribute('href')
      if (!href || !href.includes('#')) {
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
    },
    [],
  )

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-slate-200/60 bg-white/80 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/80 dark:shadow-black/20'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.a
          href="/#home"
          className="group flex items-center gap-2.5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/25 transition-shadow group-hover:shadow-xl group-hover:shadow-emerald-500/30">
            <Code2 className="size-5 text-white" />
            <motion.div
              className="absolute -right-1 -top-1 size-3 rounded-full bg-emerald-400"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Tamjid Ahmed
            </span>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
              Frontend Engineer
            </span>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon
            const isActive = link.id.includes(activeSection)

            return (
              <motion.a
                key={link.id}
                href={link.id}
                onClick={handleAnchorClick}
                className={cn(
                  'relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="size-4" />
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 -z-10 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.a>
            )
          })}
        </nav>

        {/* CTA Button - Desktop */}
        <motion.div
          className="hidden lg:block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            href="/#contact"
            onClick={handleAnchorClick}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30"
          >
            <Sparkles className="size-4" />
            Hire Me
          </a>
        </motion.div>

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
            className="w-full max-w-sm border-l border-slate-200/60 bg-white/95 p-0 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/95"
          >
            <div className="flex h-full flex-col">
              {/* Mobile Header */}
              <div className="flex items-center justify-between border-b border-slate-200/60 px-6 py-4 dark:border-slate-700/60">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg">
                    <Code2 className="size-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Tamjid Ahmed
                    </span>
                    <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      Frontend Engineer
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex-1 space-y-1 px-4 py-6">
                {NAV_LINKS.map((link, index) => {
                  const Icon = link.icon
                  const isActive = link.id.includes(activeSection)

                  return (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SheetClose asChild>
                        <a
                          href={link.id}
                          onClick={handleAnchorClick}
                          className={cn(
                            'flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all',
                            isActive
                              ? 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
                          )}
                        >
                          <div
                            className={cn(
                              'flex size-10 items-center justify-center rounded-lg',
                              isActive
                                ? 'bg-emerald-500/20 dark:bg-emerald-500/30'
                                : 'bg-slate-100 dark:bg-slate-800',
                            )}
                          >
                            <Icon
                              className={cn(
                                'size-5',
                                isActive
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-slate-500 dark:text-slate-400',
                              )}
                            />
                          </div>
                          {link.label}
                        </a>
                      </SheetClose>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Mobile CTA */}
              <div className="border-t border-slate-200/60 p-4 dark:border-slate-700/60">
                <SheetClose asChild>
                  <a
                    href="/#contact"
                    onClick={handleAnchorClick}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25"
                  >
                    <Sparkles className="size-4" />
                    Let's Work Together
                  </a>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}

export default Header
