import { BorderBeam } from '@/components/magicui/border-beam'
import { DotPattern } from '@/components/magicui/dot-pattern'

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
  phone: '01625910775',
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

  return (
    <section
      id="aboutMe"
      className="relative w-full overflow-hidden bg-muted/40 py-12 dark:bg-muted/10 sm:py-16 lg:py-24"
    >
      <DotPattern className="absolute inset-0 z-0 text-foreground/10 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="space-y-6">
          <div className="space-y-2 px-3 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              About Me
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
              For the past {experience} I have been crafting user-centered web
              experiences that balance delightful UI with resilient
              architecture. I thrive on translating ambiguous product ideas into
              accessible, performant interfaces, staying curious about new
              tooling, and sharing what I learn with the teams I collaborate
              with.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative rounded-2xl bg-background/95 p-6 shadow-lg shadow-black/5 dark:bg-background/60">
              <h3 className="mb-3 text-lg font-semibold">
                Personal Information
              </h3>
              <dl className="space-y-2 text-sm text-muted-foreground sm:text-base">
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-foreground">Name</dt>
                  <dd>{personalInfo.name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-foreground">Current Job</dt>
                  <dd>{personalInfo.currentJob}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-foreground">Position</dt>
                  <dd>{personalInfo.position}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-foreground">Age</dt>
                  <dd>{personalInfo.age}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-foreground">Experience</dt>
                  <dd>{experience}</dd>
                </div>
              </dl>
              <BorderBeam size={220} duration={12} delay={3} />
            </div>

            <div className="relative rounded-2xl bg-background/95 p-6 shadow-lg shadow-black/5 dark:bg-background/60">
              <h3 className="mb-3 text-lg font-semibold">
                Contact Information
              </h3>
              <dl className="space-y-2 text-sm text-muted-foreground sm:text-base">
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-foreground">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="hover:text-foreground"
                    >
                      {contactInfo.email}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-foreground">Phone</dt>
                  <dd>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="hover:text-foreground"
                    >
                      {contactInfo.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-foreground">LinkedIn</dt>
                  <dd>
                    <a
                      href={contactInfo.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      linkedin.com/tamjid-ahmed-b11683230
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-foreground">
                    Present Address
                  </dt>
                  <dd>{contactInfo.presentAddress}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-foreground">
                    Permanent Address
                  </dt>
                  <dd>{contactInfo.permanentAddress}</dd>
                </div>
              </dl>
              <BorderBeam size={220} duration={12} delay={8} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
