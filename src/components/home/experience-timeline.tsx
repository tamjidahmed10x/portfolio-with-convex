import { cn } from '@/lib/utils'
import { motion, type Variants } from 'motion/react'
import { Briefcase, MapPin, Building2, Calendar } from 'lucide-react'
import { BorderBeam } from '@/components/magicui/border-beam'

type Experience = {
  id: number
  company: string
  position: string
  location: string
  locationType: 'Remote' | 'On-site' | 'Hybrid'
  startDate: Date
  endDate: Date | null
  gradient: string
}

const experiences: Experience[] = [
  {
    id: 1,
    company: 'Digital Gregg',
    position: 'Jr. React Developer',
    location: 'New York, US',
    locationType: 'Remote',
    startDate: new Date('2021-12-01'),
    endDate: new Date('2022-06-30'),
    gradient: 'bg-gradient-theme',
  },
  {
    id: 2,
    company: 'One Direction Companies',
    position: 'React Developer',
    location: 'Dhaka, BD',
    locationType: 'On-site',
    startDate: new Date('2022-06-01'),
    endDate: new Date('2024-03-31'),
    gradient: 'bg-gradient-theme-accent',
  },
  {
    id: 3,
    company: 'JustGo Technologies',
    position: 'Mid-level Frontend Engineer',
    location: 'Dhaka, BD',
    locationType: 'Hybrid',
    startDate: new Date('2024-03-01'),
    endDate: null,
    gradient: 'bg-gradient-theme',
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const calculateDuration = (startDate: Date, endDate: Date | null) => {
  const end = endDate || new Date()

  // LinkedIn style: count months inclusively (Dec 2021 - Jun 2022 = 7 months)
  const startYear = startDate.getFullYear()
  const startMonth = startDate.getMonth()
  const endYear = end.getFullYear()
  const endMonth = end.getMonth()

  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (years > 0 && months > 0) {
    return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`
  } else if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''}`
  } else {
    return `${months} month${months > 1 ? 's' : ''}`
  }
}

const getLocationTypeStyles = (type: string) => {
  switch (type) {
    case 'Remote':
      return 'bg-theme-primary/10 text-theme-primary'
    case 'On-site':
      return 'bg-theme-secondary/10 text-theme-secondary'
    case 'Hybrid':
      return 'bg-theme-accent/10 text-theme-accent'
    default:
      return 'bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400'
  }
}

const ExperienceTimeline = () => {
  return (
    <motion.div
      className="mt-14"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="mb-10 text-center">
        <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-theme-primary/20 bg-theme-primary/10 px-4 py-1.5">
          <Briefcase className="size-4 text-theme-primary" />
          <span className="text-sm font-medium text-theme-primary">
            Career Journey
          </span>
        </div>
        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          <span className="text-gradient-theme-accent">Work Experience</span>
        </h3>
      </motion.div>

      {/* Horizontal Timeline Container */}
      <div className="relative">
        {/* Desktop Timeline Line */}
        <div className="absolute left-0 right-0 top-8 hidden h-1 rounded-full bg-gradient-theme opacity-20 sm:block" />
        <motion.div
          className="absolute left-0 top-8 hidden h-1 rounded-full bg-gradient-theme sm:block"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        />

        {/* Timeline Cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8"
          variants={containerVariants}
        >
          {experiences.map((exp, index) => {
            const isPresent = exp.endDate === null

            return (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline Node - Desktop */}
                <div className="absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 sm:block">
                  <motion.div
                    className={cn(
                      'flex size-16 items-center justify-center rounded-2xl shadow-lg',
                      exp.gradient,
                    )}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Building2 className="size-7 text-white" />
                  </motion.div>
                  {isPresent && (
                    <motion.div
                      className={cn(
                        'absolute inset-0 rounded-2xl opacity-60',
                        exp.gradient,
                      )}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </div>

                {/* Card Content */}
                <motion.div
                  className="group relative mt-0 overflow-hidden rounded-2xl border border-slate-200/60 bg-white/90 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-slate-700/60 dark:bg-slate-800/70 sm:mt-24"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Mobile Timeline Icon */}
                  <div className="mb-4 flex items-center gap-3 sm:hidden">
                    <div
                      className={cn(
                        'flex size-12 items-center justify-center rounded-xl shadow-md',
                        exp.gradient,
                      )}
                    >
                      <Building2 className="size-5 text-white" />
                    </div>
                    <div className="h-0.5 flex-1 rounded-full bg-gradient-to-r from-slate-300 to-transparent dark:from-slate-600" />
                  </div>

                  {/* Present Badge */}
                  {isPresent && (
                    <motion.div
                      className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-gradient-theme px-3 py-1 text-xs font-bold text-white shadow-md"
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(139, 92, 246, 0.4)',
                          '0 0 0 8px rgba(139, 92, 246, 0)',
                        ],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    >
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-white" />
                      </span>
                      Current
                    </motion.div>
                  )}

                  {/* Date */}
                  <div className="mb-2 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                    <Calendar className="size-4" />
                    <span>
                      {formatDate(exp.startDate)} –{' '}
                      {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </span>
                  </div>

                  {/* Duration Badge */}
                  <div className="mb-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                      {calculateDuration(exp.startDate, exp.endDate)}
                    </span>
                  </div>

                  {/* Position */}
                  <h4 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                    {exp.position}
                  </h4>

                  {/* Company */}
                  <p className="mb-4 text-base font-medium text-slate-600 dark:text-slate-400">
                    {exp.company}
                  </p>

                  {/* Location & Type */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-700/50 dark:text-slate-400">
                      <MapPin className="size-3.5" />
                      <span>{exp.location}</span>
                    </div>
                    <span
                      className={cn(
                        'rounded-full px-3 py-1 text-sm font-medium',
                        getLocationTypeStyles(exp.locationType),
                      )}
                    >
                      {exp.locationType}
                    </span>
                  </div>

                  {/* Border Beam Effect */}
                  <BorderBeam
                    size={180}
                    duration={10}
                    delay={index * 2}
                    colorFrom="var(--theme-primary)"
                    colorTo="var(--theme-secondary)"
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ExperienceTimeline
