import { BorderBeam } from '@/components/magicui/border-beam'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'
import { LightRays } from '@/components/ui/light-rays'
import { useState } from 'react'

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
      months > 0 ? ` and ${months} month${months > 1 ? 's' : ''}` : ''
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
      className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:py-20 lg:py-24"
    >
      <DotPattern
        className="absolute inset-0 z-0 text-slate-300/40 dark:text-foreground/10 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
        width={24}
        height={24}
        cx={1}
        cy={1}
        cr={1.5}
      />
      <LightRays
        className="absolute inset-0 z-[1]"
        count={10}
        color="rgba(148, 163, 184, 0.15)"
        blur={40}
        speed={16}
        length="80vh"
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="space-y-6">
          <div className="space-y-3 px-3 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              About Me
            </h2>
            <p className="mx-auto max-w-3xl text-base text-slate-600 dark:text-muted-foreground sm:text-lg md:text-xl">
              For the past {experience} I have been crafting user-centered web
              experiences that balance delightful UI with resilient
              architecture. I thrive on translating ambiguous product ideas into
              accessible, performant interfaces, staying curious about new
              tooling, and sharing what I learn with the teams I collaborate
              with.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="group relative overflow-hidden rounded-2xl bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10 dark:bg-slate-800/60 dark:shadow-black/20">
              <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                Personal Information
              </h3>
              <dl className="space-y-3 text-sm text-slate-600 dark:text-muted-foreground sm:text-base">
                <div className="flex justify-between gap-4 border-b border-slate-200/50 pb-2 dark:border-slate-700/50">
                  <dt className="font-semibold text-slate-900 dark:text-foreground">
                    Name
                  </dt>
                  <dd className="text-right">{personalInfo.name}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-slate-200/50 pb-2 dark:border-slate-700/50">
                  <dt className="font-semibold text-slate-900 dark:text-foreground">
                    Current Job
                  </dt>
                  <dd className="text-right">{personalInfo.currentJob}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-slate-200/50 pb-2 dark:border-slate-700/50">
                  <dt className="font-semibold text-slate-900 dark:text-foreground">
                    Position
                  </dt>
                  <dd className="text-right">{personalInfo.position}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-slate-200/50 pb-2 dark:border-slate-700/50">
                  <dt className="font-semibold text-slate-900 dark:text-foreground">
                    Age
                  </dt>
                  <dd className="text-right">{personalInfo.age}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-slate-900 dark:text-foreground">
                    Experience
                  </dt>
                  <dd className="text-right font-medium text-emerald-600 dark:text-emerald-400">
                    {experience}
                  </dd>
                </div>
              </dl>
              <BorderBeam size={250} duration={12} delay={3} />
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/10 dark:bg-slate-800/60 dark:shadow-black/20">
              <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                Contact Information
              </h3>
              <dl className="space-y-3 text-sm text-slate-600 dark:text-muted-foreground sm:text-base">
                <div className="flex justify-between gap-4 border-b border-slate-200/50 pb-2 dark:border-slate-700/50">
                  <dt className="font-semibold text-slate-900 dark:text-foreground">
                    Email
                  </dt>
                  <dd className="text-right">
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      {contactInfo.email}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-slate-200/50 pb-2 dark:border-slate-700/50">
                  <dt className="font-semibold text-slate-900 dark:text-foreground">
                    Phone
                  </dt>
                  <dd className="text-right">
                    {showPhone ? (
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        {contactInfo.phone}
                      </a>
                    ) : (
                      <button
                        onClick={() => setShowPhone(true)}
                        className="text-slate-500 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        Click to reveal
                      </button>
                    )}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-slate-200/50 pb-2 dark:border-slate-700/50">
                  <dt className="font-semibold text-slate-900 dark:text-foreground">
                    LinkedIn
                  </dt>
                  <dd className="text-right">
                    <a
                      href={contactInfo.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 underline-offset-4 transition-all hover:underline dark:text-emerald-400"
                    >
                      View Profile
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-slate-200/50 pb-2 dark:border-slate-700/50">
                  <dt className="font-semibold text-slate-900 dark:text-foreground">
                    Present Address
                  </dt>
                  <dd className="text-right">{contactInfo.presentAddress}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-slate-900 dark:text-foreground">
                    Permanent Address
                  </dt>
                  <dd className="text-right">{contactInfo.permanentAddress}</dd>
                </div>
              </dl>
              <BorderBeam size={250} duration={12} delay={8} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
