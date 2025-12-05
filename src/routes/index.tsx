import AboutMe from '@/components/home/about-me'
import ContactMe from '@/components/home/contact-me'
import HeroSection from '@/components/home/hero-section'
import Projects from '@/components/home/projects'
import Skills from '@/components/home/skills'

import { createFileRoute } from '@tanstack/react-router'

const App = () => {
  return (
    <div className="mt-16">
      <div>
        <HeroSection />
        <AboutMe />
        <Skills />
        <Projects />
        <ContactMe />
      </div>
    </div>
  )
}
export const Route = createFileRoute('/')({ component: App })
