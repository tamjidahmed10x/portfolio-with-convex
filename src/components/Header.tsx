import { useCallback } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

const NAV_LINKS = [
  { id: '/#home', label: 'Home' },
  { id: '/#aboutMe', label: 'About Me' },
  { id: '/#skills', label: 'Skills' },
  { id: '/#projects', label: 'Projects' },
  { id: '/blog', label: 'Blogs' },
  { id: '/#contact', label: 'Contact' },
] as const

const HEADER_OFFSET = 64

const Header = () => {
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-8 lg:px-12">
        <a href="/#home" className="flex items-center gap-2 font-semibold">
          <MountainIcon className="h-6 w-6 text-primary" />
          <span>Tamjid Ahmed</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.id}
              onClick={handleAnchorClick}
              className="transition hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-full max-w-xs border-r border-border/50 bg-background/95 px-6 py-8 backdrop-blur"
          >
            <div className="flex items-center gap-2 text-lg font-semibold">
              <MountainIcon className="h-6 w-6 text-primary" />
              <span>Tamjid Ahmed</span>
            </div>
            <nav className="mt-8 grid gap-2 text-base font-medium">
              {NAV_LINKS.map((link) => (
                <SheetClose key={link.id} asChild>
                  <a
                    href={link.id}
                    onClick={handleAnchorClick}
                    className="rounded-md px-1 py-2 text-muted-foreground transition hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

export default Header
