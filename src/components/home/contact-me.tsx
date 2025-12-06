import { BorderBeam } from '@/components/magicui/border-beam'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'
import { motion, type Variants } from 'motion/react'
import { SiGithub, SiX } from '@icons-pack/react-simple-icons'
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  MessageSquare,
  User,
  AtSign,
  PenLine,
  CheckCircle2,
  Loader2,
  Linkedin,
} from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

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
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

type ContactInfo = {
  icon: React.ElementType
  label: string
  value: string
  href?: string
}

const contactDetails: ContactInfo[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'tamjidahammad10@gmail.com',
    href: 'mailto:tamjidahammad10@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+880 1625-910775',
    href: 'tel:+8801625910775',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Dhaka, Bangladesh',
  },
]

type SocialLink = {
  icon: React.ElementType
  label: string
  href: string
  color: string
}

const socialLinks: SocialLink[] = [
  {
    icon: SiGithub,
    label: 'GitHub',
    href: 'https://github.com/tamjid-ahammad',
    color: 'hover:text-slate-900 dark:hover:text-white',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/tamjid-ahammad',
    color: 'hover:text-theme-primary',
  },
  {
    icon: SiX,
    label: 'Twitter',
    href: 'https://twitter.com/tamjid_ahammad',
    color: 'hover:text-slate-900 dark:hover:text-white',
  },
]

const ContactMe = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: '', email: '', subject: '', message: '' })

    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:py-10"
    >
      {/* Background Pattern - Only on desktop */}
      {!prefersReducedMotion && (
        <DotPattern
          className="absolute inset-0 z-0 text-slate-300/40 dark:text-foreground/10 [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1.2}
        />
      )}

      {/* Animated Gradient Orbs - Static on mobile */}
      <motion.div
        className="pointer-events-none absolute -right-40 top-1/4 size-[500px] rounded-full bg-gradient-to-br from-theme-primary/15 via-theme-secondary/10 to-transparent blur-3xl"
        animate={
          prefersReducedMotion
            ? { scale: 1, opacity: 0.4 }
            : {
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      />
      <motion.div
        className="pointer-events-none absolute -left-40 bottom-1/4 size-[400px] rounded-full bg-gradient-to-br from-theme-secondary/15 via-theme-accent/10 to-transparent blur-3xl"
        animate={
          prefersReducedMotion
            ? { scale: 1, opacity: 0.4 }
            : {
                scale: [1.1, 1, 1.1],
                opacity: [0.3, 0.5, 0.3],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
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
            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-theme-primary/20 bg-theme-primary/10 px-4 py-1.5">
              <MessageSquare className="size-4 text-theme-primary" />
              <span className="text-sm font-medium text-theme-primary">
                Get in Touch
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              <span className="block">Let's Work</span>
              <span className="text-gradient-theme-accent mt-1 block">
                Together
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              Have a project in mind or want to collaborate? I'd love to hear
              from you. Drop me a message and let's create something amazing.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
            {/* Contact Info Card */}
            <motion.div
              variants={itemVariants}
              className="space-y-6 lg:col-span-2"
            >
              {/* Contact Details */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-slate-700/60 dark:bg-slate-800/60 dark:shadow-black/20">
                <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                  <Sparkles className="size-5 text-theme-primary" />
                  Contact Information
                </h3>

                <div className="space-y-4">
                  {contactDetails.map((item) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.label}
                        className="group/item flex items-center gap-4"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-theme-primary/10 to-theme-secondary/10 transition-all group-hover/item:from-theme-primary/20 group-hover/item:to-theme-secondary/20">
                          <Icon className="size-5 text-theme-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-sm font-semibold text-slate-900 transition-colors hover:text-theme-primary dark:text-white dark:hover:text-theme-primary-light"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                <BorderBeam
                  size={200}
                  duration={12}
                  delay={0}
                  colorFrom="var(--theme-primary)"
                  colorTo="var(--theme-accent)"
                />
              </div>

              {/* Social Links */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-slate-700/60 dark:bg-slate-800/60 dark:shadow-black/20">
                <h3 className="mb-5 text-lg font-bold text-slate-900 dark:text-white">
                  Follow Me
                </h3>

                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          'flex size-12 items-center justify-center rounded-xl border border-slate-200/60 bg-slate-50 text-slate-500 transition-all dark:border-slate-700/60 dark:bg-slate-800/80',
                          social.color,
                        )}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.label}
                      >
                        <Icon className="size-5" />
                      </motion.a>
                    )
                  })}
                </div>

                <BorderBeam
                  size={150}
                  duration={10}
                  delay={3}
                  colorFrom="var(--theme-secondary)"
                  colorTo="var(--theme-accent)"
                />
              </div>

              {/* Availability Status */}
              <motion.div
                className="flex items-center gap-3 rounded-xl border border-theme-primary/40 bg-theme-primary/10 p-4 dark:border-theme-primary/30 dark:bg-theme-primary/10"
                whileHover={{ scale: 1.02 }}
              >
                <span className="relative flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-theme-primary opacity-75" />
                  <span className="relative inline-flex size-3 rounded-full bg-theme-primary" />
                </span>
                <p className="text-sm font-medium text-theme-primary">
                  Available for freelance projects
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-slate-700/60 dark:bg-slate-800/60 dark:shadow-black/20 sm:p-8">
                <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        <User className="size-4 text-slate-400" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200/60 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-white dark:focus:border-theme-primary-light"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        <AtSign className="size-4 text-slate-400" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200/60 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-white dark:focus:border-theme-primary-light"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      <PenLine className="size-4 text-slate-400" />
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState({ ...formState, subject: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200/60 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-white dark:focus:border-theme-primary-light"
                      placeholder="Project Collaboration"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      <MessageSquare className="size-4 text-slate-400" />
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full resize-none rounded-xl border border-slate-200/60 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-white dark:focus:border-theme-primary-light"
                      placeholder="Tell me about your project, ideas, or just say hello..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={cn(
                      'group/btn flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-theme transition-all disabled:cursor-not-allowed',
                      isSubmitted
                        ? 'bg-theme-primary'
                        : 'bg-gradient-theme hover:shadow-theme-hover',
                    )}
                    whileHover={
                      !isSubmitting && !isSubmitted ? { scale: 1.02 } : {}
                    }
                    whileTap={
                      !isSubmitting && !isSubmitted ? { scale: 0.98 } : {}
                    }
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle2 className="size-4" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="size-4 transition-transform group-hover/btn:translate-x-1" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>

                <BorderBeam
                  size={300}
                  duration={15}
                  delay={5}
                  colorFrom="var(--theme-primary)"
                  colorTo="var(--theme-secondary)"
                />
              </div>
            </motion.div>
          </div>

          {/* Footer Text */}
          <motion.div variants={itemVariants} className="pt-4 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              I typically respond within{' '}
              <span className="font-semibold text-theme-primary">24 hours</span>
              . Looking forward to connecting with you!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactMe
