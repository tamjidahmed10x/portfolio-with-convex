import AboutMe from '@/components/home/about-me'
import BlogsSection from '@/components/home/blogs-section'
import ContactMe from '@/components/home/contact-me'
import HeroSection from '@/components/home/hero-section'
import Projects from '@/components/home/projects'
import Skills from '@/components/home/skills'

import { createFileRoute } from '@tanstack/react-router'

const App = () => {
  return (
    <div>
      <div>
        <HeroSection />
        <Skills />
        <Projects />
        <AboutMe />
        <BlogsSection />
        <ContactMe />
      </div>
    </div>
  )
}
export const Route = createFileRoute('/')({ component: App })
