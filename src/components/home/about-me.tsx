import { BorderBeam } from '@/components/magicui/border-beam'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'
import { motion, type Variants } from 'motion/react'
import { useState } from 'react'
import {
  User,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Calendar,
  Award,
  Code2,
  Heart,
  Coffee,
  Rocket,
  Target,
  Sparkles,
  ExternalLink,
  Eye,
  EyeOff,
} from 'lucide-react'

type PersonalInfo = {
  name: string
  currentJob: string
  position: string
  age: number
  startDate: Date
}

type ContactInfo = {
  email: string
  phone: string
  linkedin: string
  presentAddress: string
  permanentAddress: string
}

const personalInfo: PersonalInfo = {
  name: 'Tamjid Ahmed',
  currentJob: 'JustGo Technologies',
  position: 'Mid-level React Developer',
  age: 28,
  startDate: new Date('2021-12-01'),
}

const contactInfo: ContactInfo = {
  email: 'tamjidahammad10@gmail.com',
  phone: '+880 1625-910775',
  linkedin: 'https://www.linkedin.com/in/tamjid-ahmed-b11683230/',
  presentAddress: 'Mirpur 2, Dhaka',
  permanentAddress: 'Tangail, Bangladesh',
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const highlights = [
  {
    icon: Code2,
    label: 'Lines of Code',
    value: '100K+',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Coffee,
    label: 'Cups of Coffee',
    value: '∞',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Rocket,
    label: 'Projects Shipped',
    value: '25+',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Heart,
    label: 'Happy Clients',
    value: '15+',
    color: 'from-pink-500 to-rose-500',
  },
]

const calculateExperience = (startDate: Date) => {
  const now = new Date()
  const diffInMs = now.getTime() - startDate.getTime()
  const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25))
  const months = Math.floor(
    (diffInMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44),
  )

  if (years > 0) {
    const yearLabel = `year${years > 1 ? 's' : ''}`
    const monthLabel =
      months > 0 ? ` ${months} month${months > 1 ? 's' : ''}` : ''
    return `${years} ${yearLabel}${monthLabel}`
  }

  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''}`
  }

  return 'Less than a month'
}

const AboutMe = () => {
  const experience = calculateExperience(personalInfo.startDate)
  const [showPhone, setShowPhone] = useState(false)

  return (
    <section
      id="aboutMe"
      className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:py-24 lg:py-28"
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

      {/* Animated Gradient Orbs */}
      <motion.div
        className="pointer-events-none absolute -left-40 top-1/4 size-[450px] rounded-full bg-gradient-to-br from-emerald-500/15 via-cyan-500/10 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="pointer-events-none absolute -right-40 bottom-1/4 size-[400px] rounded-full bg-gradient-to-br from-violet-500/15 via-purple-500/10 to-transparent blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="space-y-4 text-center">
            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5">
              <User className="size-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Get to Know Me
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              <span className="block">About</span>
              <span className="mt-1 block bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-cyan-400 dark:to-blue-400">
                Me
              </span>
            </h2>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            variants={itemVariants}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="relative rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-xl backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-800/60 sm:p-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg">
                  <Sparkles className="size-4 text-white" />
                </div>
              </div>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
                For the past{' '}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {experience}
                </span>
                , I have been crafting{' '}
                <span className="font-semibold text-slate-900 dark:text-white">
                  user-centered web experiences
                </span>{' '}
                that balance delightful UI with resilient architecture. I thrive
                on translating ambiguous product ideas into accessible,
                performant interfaces, staying curious about new tooling, and
                sharing what I learn with the teams I collaborate with.
              </p>
              <BorderBeam
                size={200}
                duration={12}
                delay={0}
                colorFrom="#10b981"
                colorTo="#3b82f6"
              />
            </div>
          </motion.div>

          {/* Highlights Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  className="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white/80 p-4 text-center shadow-lg backdrop-blur-sm transition-all hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-800/60"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={cn(
                      'mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-md',
                      item.color,
                    )}
                  >
                    <Icon className="size-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {item.value}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Info Cards Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Personal Information Card */}
            <motion.div
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-slate-700/60 dark:bg-slate-800/60"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md">
                  <User className="size-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Personal Information
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  { icon: User, label: 'Name', value: personalInfo.name },
                  {
                    icon: Briefcase,
                    label: 'Company',
                    value: personalInfo.currentJob,
                  },
                  {
                    icon: Target,
                    label: 'Position',
                    value: personalInfo.position,
                  },
                  {
                    icon: Calendar,
                    label: 'Age',
                    value: `${personalInfo.age} years`,
                  },
                  {
                    icon: Award,
                    label: 'Experience',
                    value: experience,
                    highlight: true,
                  },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.label}
                      className="group/item flex items-center justify-between gap-4 rounded-lg border-b border-slate-100 pb-3 last:border-0 last:pb-0 dark:border-slate-700/50"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700/50">
                          <Icon className="size-4 text-slate-500 dark:text-slate-400" />
                        </div>
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          {item.label}
                        </span>
                      </div>
                      <span
                        className={cn(
                          'text-sm font-semibold',
                          item.highlight
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-900 dark:text-white',
                        )}
                      >
                        {item.value}
                      </span>
                    </motion.div>
                  )
                })}
              </div>

              <BorderBeam
                size={250}
                duration={12}
                delay={3}
                colorFrom="#3b82f6"
                colorTo="#06b6d4"
              />
            </motion.div>

            {/* Contact Information Card */}
            <motion.div
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-slate-700/60 dark:bg-slate-800/60"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
                  <Mail className="size-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Contact Information
                </h3>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <motion.div
                  className="group/item flex items-center justify-between gap-4 rounded-lg border-b border-slate-100 pb-3 dark:border-slate-700/50"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700/50">
                      <Mail className="size-4 text-slate-500 dark:text-slate-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Email
                    </span>
                  </div>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm font-semibold text-slate-900 transition-colors hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400"
                  >
                    {contactInfo.email}
                  </a>
                </motion.div>

                {/* Phone */}
                <motion.div
                  className="group/item flex items-center justify-between gap-4 rounded-lg border-b border-slate-100 pb-3 dark:border-slate-700/50"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700/50">
                      <Phone className="size-4 text-slate-500 dark:text-slate-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Phone
                    </span>
                  </div>
                  {showPhone ? (
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-sm font-semibold text-slate-900 transition-colors hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400"
                    >
                      {contactInfo.phone}
                    </a>
                  ) : (
                    <button
                      onClick={() => setShowPhone(true)}
                      className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                      <Eye className="size-3.5" />
                      Click to reveal
                    </button>
                  )}
                </motion.div>

                {/* LinkedIn */}
                <motion.div
                  className="group/item flex items-center justify-between gap-4 rounded-lg border-b border-slate-100 pb-3 dark:border-slate-700/50"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700/50">
                      <Linkedin className="size-4 text-slate-500 dark:text-slate-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      LinkedIn
                    </span>
                  </div>
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    View Profile
                    <ExternalLink className="size-3.5" />
                  </a>
                </motion.div>

                {/* Present Address */}
                <motion.div
                  className="group/item flex items-center justify-between gap-4 rounded-lg border-b border-slate-100 pb-3 dark:border-slate-700/50"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700/50">
                      <MapPin className="size-4 text-slate-500 dark:text-slate-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Present
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {contactInfo.presentAddress}
                  </span>
                </motion.div>

                {/* Permanent Address */}
                <motion.div
                  className="group/item flex items-center justify-between gap-4 rounded-lg"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700/50">
                      <MapPin className="size-4 text-slate-500 dark:text-slate-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Permanent
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {contactInfo.permanentAddress}
                  </span>
                </motion.div>
              </div>

              <BorderBeam
                size={250}
                duration={12}
                delay={6}
                colorFrom="#10b981"
                colorTo="#14b8a6"
              />
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="pt-4 text-center">
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="size-4" />
              Let's Work Together
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutMe
