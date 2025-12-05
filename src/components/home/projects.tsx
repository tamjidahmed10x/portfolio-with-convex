import { BorderBeam } from '@/components/magicui/border-beam'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'
import { motion, type Variants } from 'motion/react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiZod,
} from '@icons-pack/react-simple-icons'
import {
  ExternalLink,
  Sparkles,
  Globe,
  Server,
  Palette,
  Layers,
  ArrowUpRight,
  Code2,
  Rocket,
  Star,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'

type TechItem = {
  name: string
  icon: React.ElementType
  color: string
}

type Project = {
  id: number
  title: string
  description: string
  image: string
  liveUrl: string
  category: string
  categoryIcon: LucideIcon
  categoryColor: string
  techStack: TechItem[]
  highlights: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Walton Digitech',
    description:
      'A comprehensive product catalogue platform with dynamic filtering, optimized images, and fully responsive UI/UX design.',
    image: '/projects/walton-digitech.png',
    liveUrl: 'https://waltondigitech.com/',
    category: 'E-Commerce',
    categoryIcon: Layers,
    categoryColor: 'text-blue-500',
    techStack: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    ],
    highlights: [
      'Product catalogue with dynamic filtering',
      'Fully responsive layout',
      'Optimized images & dynamic routing',
      'Form handling with validation',
    ],
  },
  {
    id: 2,
    title: 'Expotech Global',
    description:
      'Corporate landing pages with clean UI, modern animations, and SEO-optimized architecture using Next.js metadata.',
    image: '/projects/expotech-global.png',
    liveUrl: 'https://expotechglobal.com/',
    category: 'Corporate',
    categoryIcon: Globe,
    categoryColor: 'text-emerald-500',
    techStack: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    ],
    highlights: [
      'Corporate landing pages with clean UI',
      'Dynamic pages & reusable components',
      'Modern animations & micro-interactions',
      'SEO optimization with Next.js metadata',
    ],
  },
  {
    id: 3,
    title: 'FoodExpo BD',
    description:
      'Event-focused branding platform with fast-loading UI, dynamic sections for gallery, schedule, and sponsors.',
    image: '/projects/foodexpo.png',
    liveUrl: 'https://foodexpobd.com/',
    category: 'Events',
    categoryIcon: Palette,
    categoryColor: 'text-orange-500',
    techStack: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    ],
    highlights: [
      'Event-focused branding',
      'Fast-loading optimized UI',
      'Dynamic gallery & schedule sections',
      'SEO-friendly site structure',
    ],
  },
  {
    id: 4,
    title: 'JustGo – Class Management',
    description:
      'Complete form management system with schema-driven UI using Zod, scalable context structure for enterprise applications.',
    image: '/projects/class.webp',
    liveUrl: 'https://justgo.com/features/class-management/',
    category: 'SaaS Product',
    categoryIcon: Server,
    categoryColor: 'text-purple-500',
    techStack: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Zod', icon: SiZod, color: '#3E67B1' },
    ],
    highlights: [
      'Built complete form management logic',
      'Schema-driven UI using Zod',
      'Scalable context structure for large apps',
      'High-performance React patterns',
    ],
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.01,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.05,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const TechBadge = ({ tech }: { tech: TechItem }) => {
  const Icon = tech.icon
  return (
    <div
      className="flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/90 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur-sm dark:border-slate-600/60 dark:bg-slate-800/90"
      title={tech.name}
    >
      <Icon size={12} style={{ color: tech.color }} />
      <span className="text-slate-600 dark:text-slate-300">{tech.name}</span>
    </div>
  )
}

const ProjectCard = ({
  project,
  index,
}: {
  project: Project
  index: number
}) => {
  const CategoryIcon = project.categoryIcon
  const [isHovered, setIsHovered] = useState(false)

  const cardColors = [
    {
      gradient: 'from-blue-500/20 via-cyan-500/10 to-blue-500/5',
      border: 'hover:border-blue-300/60',
      glow: 'group-hover:shadow-blue-500/10',
    },
    {
      gradient: 'from-emerald-500/20 via-teal-500/10 to-emerald-500/5',
      border: 'hover:border-emerald-300/60',
      glow: 'group-hover:shadow-emerald-500/10',
    },
    {
      gradient: 'from-orange-500/20 via-amber-500/10 to-orange-500/5',
      border: 'hover:border-orange-300/60',
      glow: 'group-hover:shadow-orange-500/10',
    },
    {
      gradient: 'from-purple-500/20 via-violet-500/10 to-purple-500/5',
      border: 'hover:border-purple-300/60',
      glow: 'group-hover:shadow-purple-500/10',
    },
  ]

  const colors = cardColors[index]

  return (
    <motion.div
      variants={itemVariants}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <motion.div
        className={cn(
          'absolute -inset-1 rounded-2xl bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100',
          colors.gradient,
        )}
        animate={isHovered ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
      />

      <div
        className={cn(
          'relative h-full overflow-hidden rounded-xl border border-slate-200/60 bg-white/95 shadow-lg backdrop-blur-sm transition-all duration-300 dark:border-slate-700/60 dark:bg-slate-800/90',
          colors.border,
          colors.glow,
          'group-hover:shadow-xl',
        )}
      >
        {/* Image Container */}
        <div className="relative h-36 overflow-hidden sm:h-40">
          <motion.img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover object-top"
            animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Category Badge */}
          <motion.div
            className="absolute left-3 top-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.01 + 0.02 }}
          >
            <div
              className={cn(
                'flex items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-bold shadow-md backdrop-blur-sm dark:bg-slate-900/95',
                project.categoryColor,
              )}
            >
              <CategoryIcon className="size-3.5" />
              <span>{project.category}</span>
            </div>
          </motion.div>

          {/* Link Button */}
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-lg bg-white/95 shadow-md backdrop-blur-sm transition-colors hover:bg-white dark:bg-slate-900/95"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUpRight className="size-3.5 text-slate-700 dark:text-slate-300" />
          </motion.a>

          {/* Project Number */}
          <motion.div
            className="absolute bottom-3 right-3 flex size-7 items-center justify-center rounded-lg bg-black/50 text-xs font-bold text-white backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.01 + 0.03 }}
          >
            0{project.id}
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-4">
          {/* Title */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400 sm:text-lg">
              {project.title}
            </h3>
            <motion.div
              animate={
                isHovered
                  ? { rotate: 360, scale: 1.2 }
                  : { rotate: 0, scale: 1 }
              }
              transition={{ duration: 0.6 }}
            >
              <Star className="size-4 fill-amber-400 text-amber-400" />
            </motion.div>
          </div>

          {/* Description */}
          <p className="line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 3).map((tech) => (
              <TechBadge key={tech.name} tech={tech} />
            ))}
            {project.techStack.length > 3 && (
              <span className="flex items-center rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          {/* Highlights - Show on hover */}
          <motion.div
            className="space-y-1.5 rounded-lg border border-slate-100 bg-slate-50/80 p-2.5 dark:border-slate-700/50 dark:bg-slate-800/50"
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-amber-500" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Features
              </span>
            </div>
            <ul className="space-y-1.5">
              {project.highlights.slice(0, 2).map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400"
                >
                  <span
                    className={cn(
                      'flex size-4 shrink-0 items-center justify-center rounded text-[9px] font-bold text-white',
                      index === 0 &&
                        'bg-gradient-to-br from-blue-500 to-cyan-500',
                      index === 1 &&
                        'bg-gradient-to-br from-emerald-500 to-teal-500',
                      index === 2 &&
                        'bg-gradient-to-br from-orange-500 to-amber-500',
                      index === 3 &&
                        'bg-gradient-to-br from-purple-500 to-violet-500',
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="line-clamp-1">{highlight}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA Button */}
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-lg px-4 py-2.5 text-xs font-bold text-white shadow-md transition-shadow hover:shadow-lg',
              index === 0 && 'bg-gradient-to-r from-blue-600 to-cyan-600',
              index === 1 && 'bg-gradient-to-r from-emerald-600 to-teal-600',
              index === 2 && 'bg-gradient-to-r from-orange-600 to-amber-600',
              index === 3 && 'bg-gradient-to-r from-purple-600 to-violet-600',
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Globe className="size-3.5" />
            <span>View Live</span>
            <ExternalLink className="size-3.5" />
          </motion.a>
        </div>

        {/* Border Beam */}
        <BorderBeam
          size={200}
          duration={15}
          delay={index * 2}
          colorFrom={
            index === 0
              ? '#3b82f6'
              : index === 1
                ? '#10b981'
                : index === 2
                  ? '#f97316'
                  : '#8b5cf6'
          }
          colorTo={
            index === 0
              ? '#06b6d4'
              : index === 1
                ? '#14b8a6'
                : index === 2
                  ? '#eab308'
                  : '#6366f1'
          }
        />
      </div>
    </motion.div>
  )
}

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:py-24 lg:py-28"
    >
      {/* Background Pattern */}
      <DotPattern
        className="absolute inset-0 z-0 text-slate-300/40 dark:text-foreground/10 [mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1.2}
      />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="pointer-events-none absolute -left-40 top-1/3 size-[400px] rounded-full bg-gradient-to-br from-emerald-500/15 via-cyan-500/10 to-transparent blur-3xl"
        animate={{ x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute -right-40 bottom-1/3 size-[400px] rounded-full bg-gradient-to-br from-violet-500/15 via-purple-500/10 to-transparent blur-3xl"
        animate={{ x: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 5 }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-4 text-center">
            <motion.div
              className="mx-auto flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 px-4 py-2 shadow-lg backdrop-blur-sm"
              whileHover={{ scale: 1.03 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Rocket className="size-4 text-emerald-500" />
              </motion.div>
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-xs font-bold text-transparent dark:from-emerald-400 dark:to-cyan-400">
                Featured Work
              </span>
            </motion.div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              <span className="block">Projects I've</span>
              <span className="mt-1 block bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-cyan-400 dark:to-blue-400">
                Built & Shipped
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              Production-ready applications with modern tech stacks and
              real-world impact.
            </p>
          </motion.div>

          {/* Projects Grid - 4 Columns */}
          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white/80 to-slate-50/80 p-6 shadow-xl backdrop-blur-sm dark:border-slate-700/60 dark:from-slate-800/80 dark:to-slate-900/80"
          >
            <div className="absolute -right-16 -top-16 size-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 size-32 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-3xl" />

            <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  label: 'Projects',
                  value: '4+',
                  icon: Layers,
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  label: 'Technologies',
                  value: '10+',
                  icon: Code2,
                  color: 'from-emerald-500 to-teal-500',
                },
                {
                  label: 'Live Apps',
                  value: '4',
                  icon: Globe,
                  color: 'from-orange-500 to-amber-500',
                },
                {
                  label: 'Success Rate',
                  value: '100%',
                  icon: TrendingUp,
                  color: 'from-purple-500 to-violet-500',
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.01 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={cn(
                      'mx-auto mb-2 flex size-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-md sm:size-12',
                      stat.color,
                    )}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <stat.icon className="size-5 text-white sm:size-6" />
                  </motion.div>
                  <div className="text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 sm:text-xs">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <BorderBeam
              size={300}
              duration={20}
              colorFrom="#10b981"
              colorTo="#8b5cf6"
            />
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.div
              className="inline-flex items-center gap-3 rounded-xl border border-slate-200/60 bg-white/80 px-5 py-3 shadow-lg backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-800/80"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Want to work together?
              </span>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 px-3 py-1.5 text-xs font-bold text-white shadow-md transition-shadow hover:shadow-lg"
              >
                Let's Connect
                <Rocket className="size-3" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
