import { BorderBeam } from '@/components/magicui/border-beam'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'
import { motion, type Variants } from 'motion/react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiMongodb,
  SiPostgresql,
  SiSqlite,
  SiRedis,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiGo,
  SiShadcnui,
  SiBun,
} from '@icons-pack/react-simple-icons'
import {
  Database,
  Server,
  Layout,
  Wrench,
  Cpu,
  Zap,
  TestTube2,
  type LucideIcon,
} from 'lucide-react'

type Skill = {
  name: string
  icon: React.ElementType
  color: string
}

type SkillCategory = {
  title: string
  icon: LucideIcon
  iconColor: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Layout,
    iconColor: 'text-blue-500',
    skills: [
      { name: 'React.js', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Shadcn/UI', icon: SiShadcnui, color: '#000000' },
      { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    iconColor: 'text-green-500',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, color: '#000000' },
      { name: 'tRPC', icon: Zap, color: '#2596BE' },
      { name: 'Hono', icon: Zap, color: '#E36002' },
      { name: 'Prisma ORM', icon: SiPrisma, color: '#2D3748' },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    iconColor: 'text-amber-500',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'SQLite', icon: SiSqlite, color: '#003B57' },
      { name: 'Redis', icon: SiRedis, color: '#DC382D' },
      { name: 'Convex', icon: Database, color: '#F3722C' },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: Wrench,
    iconColor: 'text-purple-500',
    skills: [
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#181717' },
      { name: 'Bun', icon: SiBun, color: '#000000' },
      { name: 'WSL / Linux', icon: SiLinux, color: '#FCC624' },
      { name: 'Playwright', icon: TestTube2, color: '#2EAD33' },
    ],
  },
  {
    title: 'Systems & Low-Level',
    icon: Cpu,
    iconColor: 'text-rose-500',
    skills: [
      { name: 'Go', icon: SiGo, color: '#00ADD8' },
      { name: 'ESP32 / Teensy', icon: Cpu, color: '#E7352C' },
      { name: 'Arduino', icon: Cpu, color: '#00979D' },
      { name: 'Micro Python', icon: Cpu, color: '#2B2728' },
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.05,
    },
  },
}

const skillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.03,
    },
  },
}

const SkillCard = ({ skill }: { skill: Skill }) => {
  const Icon = skill.icon
  return (
    <motion.div
      variants={skillVariants}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="group relative"
    >
      <div className="relative flex items-center gap-3 rounded-xl border border-slate-200/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/70 dark:hover:border-slate-600">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${skill.color}10` }}
        >
          <Icon
            size={20}
            className="transition-all duration-300"
            style={{ color: skill.color }}
          />
        </div>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {skill.name}
        </span>

        {/* Hover glow effect */}
        <div
          className="absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-15"
          style={{ backgroundColor: skill.color }}
        />
      </div>
    </motion.div>
  )
}

const CategoryCard = ({
  category,
  index,
}: {
  category: SkillCategory
  index: number
}) => {
  const CategoryIcon = category.icon
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10 dark:bg-slate-800/60 dark:shadow-black/20',
        index === skillCategories.length - 1 && 'md:col-span-2 lg:col-span-1',
      )}
    >
      {/* Category Header */}
      <div className="mb-5 flex items-center gap-3">
        <div
          className={cn(
            'flex size-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg',
            category.iconColor === 'text-blue-500' &&
              'from-blue-500/20 to-blue-600/20 shadow-blue-500/20',
            category.iconColor === 'text-green-500' &&
              'from-green-500/20 to-green-600/20 shadow-green-500/20',
            category.iconColor === 'text-amber-500' &&
              'from-amber-500/20 to-amber-600/20 shadow-amber-500/20',
            category.iconColor === 'text-purple-500' &&
              'from-purple-500/20 to-purple-600/20 shadow-purple-500/20',
            category.iconColor === 'text-rose-500' &&
              'from-rose-500/20 to-rose-600/20 shadow-rose-500/20',
          )}
        >
          <CategoryIcon className={cn('size-5', category.iconColor)} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {category.title}
        </h3>
      </div>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {category.skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </motion.div>

      <BorderBeam
        size={250}
        duration={12}
        delay={index * 2}
        colorFrom="#10b981"
        colorTo="#3b82f6"
      />
    </motion.div>
  )
}

const Skills = () => {
  const totalSkills = skillCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0,
  )

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:py-20 lg:py-24"
    >
      {/* Background Pattern */}
      <DotPattern
        className="absolute inset-0 z-0 text-slate-300/40 dark:text-foreground/10 [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]"
        width={24}
        height={24}
        cx={1}
        cy={1}
        cr={1.5}
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="space-y-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="space-y-4 text-center">
            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5">
              <Zap className="size-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {totalSkills}+ Technologies
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              My Tech Stack
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-muted-foreground sm:text-lg">
              A curated collection of technologies I use to build modern,
              scalable, and performant web applications.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
          >
            {skillCategories.map((category, index) => (
              <CategoryCard
                key={category.title}
                category={category}
                index={index}
              />
            ))}
          </motion.div>

          {/* Additional Info */}
          <motion.div variants={itemVariants} className="pt-6 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Always learning and exploring new technologies to stay ahead of
              the curve ✨
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
