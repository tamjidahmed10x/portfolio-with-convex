import AboutMe from '@/components/home/about-me'
import HeroSection from '@/components/home/hero-section'
import Skills from '@/components/home/skills'
import { createFileRoute } from '@tanstack/react-router'

const App = () => {
  return (
    <div className="mt-16">
      <div>
        <HeroSection />
        <AboutMe />
        <Skills />
      </div>
    </div>
  )
}
export const Route = createFileRoute('/')({ component: App })
