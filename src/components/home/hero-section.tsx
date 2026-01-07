import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'motion/react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import {
  ArrowRight,
  Download,
  Sparkles,
  Code2,
  Zap,
  MousePointer2,
} from 'lucide-react'
import { ThemeLink } from '@/components/theme-link'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useRef } from 'react'

const HERO_IMAGE = '/tamjid-ahmed.webp'

const floatingIcons = [
  { icon: Code2, delay: 0, x: -60, y: -40 },
  { icon: Zap, delay: 0.2, x: 60, y: -30 },
  { icon: Sparkles, delay: 0.4, x: -50, y: 50 },
]

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.1 })
  const shouldAnimate = !prefersReducedMotion && isInView

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative  w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100/50 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 lg:py-28"
    >
      {/* Background Pattern */}
      {!prefersReducedMotion && (
        <AnimatedGridPattern
          width={40}
          height={40}
          numSquares={50}
          maxOpacity={0.08}
          duration={3}
          className={cn(
            '[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]',
            'absolute inset-0 h-full w-full text-slate-400 dark:text-foreground/20',
          )}
          isInView={isInView}
        />
      )}

      {/* Gradient Orbs - Only animate when in view */}
      <motion.div
        className="pointer-events-none absolute -left-32 top-1/4 size-[400px] rounded-full bg-gradient-to-br from-theme-primary/20 via-theme-secondary/15 to-transparent blur-3xl"
        animate={
          shouldAnimate
            ? {
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }
            : { scale: 1, opacity: 0.5 }
        }
        transition={
          shouldAnimate
            ? {
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : { duration: 0 }
        }
      />
      <motion.div
        className="pointer-events-none absolute -right-32 bottom-1/4 size-[350px] rounded-full bg-gradient-to-br from-theme-accent/20 via-theme-secondary/15 to-transparent blur-3xl"
        animate={
          shouldAnimate
            ? {
                scale: [1.1, 1, 1.1],
                opacity: [0.4, 0.6, 0.4],
              }
            : { scale: 1, opacity: 0.5 }
        }
        transition={
          shouldAnimate
            ? {
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : { duration: 0 }
        }
      />

      <div className="container relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 px-4 md:flex-row md:gap-16 md:px-6">
        {/* Left Content */}
        <motion.div className="flex-1 space-y-8 text-center md:text-left">
          {/* Badge */}
          <motion.div className="inline-flex items-center gap-2 rounded-full border border-theme-primary/20 bg-theme-primary/10 px-4 py-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-theme-primary-light opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-theme-primary" />
            </span>
            <span className="text-sm font-medium text-theme-primary">
              Available for work
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-theme-primary">
              Frontend Engineer
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Hi, I'm{' '}
              <span className="relative">
                <span className="text-gradient-theme-accent">Tamjid Ahmed</span>
                <motion.span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-theme" />
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p className="max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg">
            I craft{' '}
            <span className="font-semibold text-slate-900 dark:text-white">
              delightful web experiences
            </span>{' '}
            with a focus on performance, accessibility, and polished UI details.
            Let's build something{' '}
            <span className="font-semibold text-theme-primary">ambitious</span>{' '}
            together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <Button
              asChild
              size="lg"
              className="group bg-gradient-theme px-6 text-white shadow-theme transition-all hover:shadow-theme-hover"
            >
              <ThemeLink to="/" hash="projects">
                View My Work
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </ThemeLink>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group border-slate-300 bg-white/80 px-6 backdrop-blur-sm transition-all hover:border-theme-primary hover:bg-theme-primary/10 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-theme-primary dark:hover:bg-theme-primary/10"
            >
              <ThemeLink to="/" hash="contact">
                Let's Talk
                <Sparkles className="ml-2 size-4 text-theme-primary" />
              </ThemeLink>
            </Button>
          </motion.div>

          {/* Stats or Social Proof */}
          <motion.div className="flex flex-wrap items-center justify-center gap-6 pt-4 md:justify-start">
            <a
              href="https://github.com/tamjidahmed10x"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <SiGithub className="size-5" />
              <span className="font-medium">@tamjidahmed10x</span>
            </a>
            <div className="hidden h-5 w-px bg-slate-300 dark:bg-slate-700 sm:block" />
            <a
              href="/TamjidCV.pdf"
              download
              className="group flex items-center gap-2 text-sm font-medium text-theme-primary transition-colors hover:text-theme-primary-dark"
            >
              <Download className="size-4 transition-transform group-hover:-translate-y-0.5" />
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Right Content - Image */}
        <motion.div className="relative order-first flex-1 md:order-last">
          {/* Floating Icons - Only when in view */}
          {shouldAnimate &&
            floatingIcons.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  className="absolute z-20 flex size-10 items-center justify-center rounded-xl border border-slate-200/60 bg-white/90 shadow-lg backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-800/90"
                  style={{
                    left: `calc(50% + ${item.x}%)`,
                    top: `calc(50% + ${item.y}%)`,
                  }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <Icon className="size-5 text-theme-primary" />
                </motion.div>
              )
            })}

          {/* Main Image Container */}
          <div className="relative mx-auto aspect-square max-w-[280px] md:max-w-[380px]">
            {/* Gradient Ring - Only animate when in view */}
            <motion.div
              className="absolute -inset-3 rounded-full bg-gradient-theme-diagonal opacity-20 blur-2xl"
              animate={
                shouldAnimate
                  ? {
                      scale: [1, 1.05, 1],
                      opacity: [0.2, 0.3, 0.2],
                    }
                  : { scale: 1, opacity: 0.25 }
              }
              transition={
                shouldAnimate
                  ? {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  : { duration: 0 }
              }
            />

            {/* Rotating Border - Only animate when in view */}
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-theme-diagonal"
              animate={shouldAnimate ? { rotate: 360 } : { rotate: 0 }}
              transition={
                shouldAnimate
                  ? {
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }
                  : { duration: 0 }
              }
              style={{
                maskImage:
                  'radial-gradient(transparent 65%, black 66%, black 100%)',
                WebkitMaskImage:
                  'radial-gradient(transparent 65%, black 66%, black 100%)',
              }}
            />

            {/* Image Wrapper */}
            <div className="relative overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xl dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
              <img
                src={HERO_IMAGE}
                alt="Portrait of Tamjid Ahmed"
                loading="eager"
                decoding="async"
                width={400}
                height={400}
                className="h-full w-full object-cover object-center"
              />

              {/* Overlay Shine Effect - Only when in view */}
              {shouldAnimate && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%', y: '100%' }}
                  animate={{ x: '100%', y: '-100%' }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </div>

            {/* Experience Badge */}
            <motion.div className="absolute -bottom-2 -right-2 z-20 flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-800/95">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-theme">
                <Zap className="size-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Experience
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  4+ Years
                </p>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div className="absolute -bottom-8 left-1/2 hidden -translate-x-1/2 md:flex">
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MousePointer2 className="size-5 text-slate-400" />
              <span className="text-xs text-slate-400">Scroll</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
