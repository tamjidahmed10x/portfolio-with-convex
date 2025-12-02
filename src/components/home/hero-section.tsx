import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const HERO_IMAGE = '/tamjid-ahmed.webp'

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative mt-4 w-full overflow-hidden bg-muted/40 py-14 dark:bg-muted/10 md:mt-16 lg:py-32"
    >
      <AnimatedGridPattern
        width={40}
        height={40}
        numSquares={40}
        maxOpacity={0.1}
        duration={2}
        className={cn(
          '[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]',
          'absolute inset-0 h-full w-full text-foreground/20',
        )}
      />
      <div className="container relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 px-4 md:flex-row md:gap-12 md:px-6">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
            Frontend Engineer
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            Hi, I am Tamjid Ahmed
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            I craft delightful web experiences with a focus on performance,
            accessibility, and polished UI details. Dive into my latest work or
            reach out to build something ambitious together.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <Button asChild size="lg">
              <a href="#projects">View Work</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
        <div className="order-first flex-1 md:order-last">
          <div className="relative mx-auto aspect-square max-w-[260px] overflow-hidden rounded-full border border-border/60 bg-background/60 shadow-2xl md:max-w-[360px]">
            <img
              src={HERO_IMAGE}
              alt="Portrait of Tamjid Ahmed"
              loading="lazy"
              decoding="async"
              width={400}
              height={400}
              className="h-full w-full object-cover object-center"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-foreground/10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
