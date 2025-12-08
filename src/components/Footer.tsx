import { Heart, Github, Linkedin, Mail } from 'lucide-react'
import { SiX, SiFacebook } from '@icons-pack/react-simple-icons'
import { ThemeLink } from './theme-link'

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/tamjidahmed10x',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tamjid-ahmed-b11683230/',
    icon: Linkedin,
  },
  {
    name: 'X',
    href: 'https://x.com/tamjid10x',
    icon: SiX,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/tamjid.ahmed.913505',
    icon: SiFacebook,
  },
  {
    name: 'Email',
    href: 'mailto:tamjid10x@gmail.com',
    icon: Mail,
  },
] as const

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200/60 bg-white dark:border-slate-700/60 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Left: Copyright */}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span>© {currentYear} Tamjid Ahmed. Made with</span>
            <Heart className="size-4 fill-theme-primary text-theme-primary" />
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-theme-primary/10 hover:text-theme-primary dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-theme-primary/20"
                  aria-label={link.name}
                >
                  <Icon className="size-4" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
