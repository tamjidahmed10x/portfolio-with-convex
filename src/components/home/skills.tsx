import { PinContainer } from '@/components/ui/3d-pin'
import { DotPattern } from '@/components/magicui/dot-pattern'

type Skill = {
  name: string
  punchline: string
  details: string
  href: string
  stat: string
  gradient: string
}

const skills: Skill[] = [
  {
    name: 'TypeScript',
    punchline: 'Type-safe systems',
    details:
      'Build resilient UI contracts, share schemas, and never ship ' +
      'uncaught runtime surprises.',
    href: 'https://www.typescriptlang.org/',
    stat: '5+ yrs',
    gradient: 'bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-500',
  },
  {
    name: 'React',
    punchline: 'Composable frontends',
    details:
      'Architect feature-rich SPAs with hooks, concurrent data, and ' +
      'animation polish.',
    href: 'https://react.dev/',
    stat: '6+ yrs',
    gradient: 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500',
  },
  {
    name: 'Next.js',
    punchline: 'Edge-ready apps',
    details:
      'Route streaming, Server Actions, and hybrid rendering tuned for ' +
      'DX and performance.',
    href: 'https://nextjs.org/',
    stat: '5 yrs',
    gradient: 'bg-gradient-to-br from-slate-600 via-neutral-700 to-zinc-900',
  },
  {
    name: 'PostgreSQL',
    punchline: 'Relational muscle',
    details:
      'Design normalized schemas, craft windowed analytics, and keep ' +
      'data consistent at scale.',
    href: 'https://www.postgresql.org/',
    stat: '4 yrs',
    gradient: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500',
  },
  {
    name: 'Node.js',
    punchline: 'Scalable backends',
    details:
      'Build high-performance APIs with Express, Fastify, and event-driven ' +
      'architectures for real-time applications.',
    href: 'https://nodejs.org/',
    stat: '5 yrs',
    gradient: 'bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500',
  },
  {
    name: 'Tailwind CSS',
    punchline: 'Rapid UI styling',
    details:
      'Create responsive, modern interfaces with utility-first CSS and ' +
      'custom design systems at lightning speed.',
    href: 'https://tailwindcss.com/',
    stat: '4 yrs',
    gradient: 'bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-500',
  },
]

const Skills = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <DotPattern
        className="absolute inset-0 z-0 text-slate-300/50 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1.5}
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="space-y-12">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Skills & Expertise
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
              Technologies and tools I've mastered through years of building
              production-ready applications
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <PinContainer
                key={`${skill.name}-${index}`}
                title={`${skill.name} · ${skill.stat}`}
                href={skill.href}
                containerClassName="w-full h-[28rem] flex justify-center items-center"
                className="w-64 sm:w-72 text-slate-900"
                variant="light"
              >
                <div className="flex h-full flex-col gap-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
                      {skill.stat}
                    </p>
                    <h3 className="text-2xl font-semibold">{skill.name}</h3>
                    <p className="text-sm text-slate-500">{skill.punchline}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {skill.details}
                  </p>
                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="h-1 w-1 rounded-full bg-emerald-500"></span>
                      <span>Tap to explore docs</span>
                    </div>
                    <div
                      className={`h-52 w-full rounded-lg ${skill.gradient}`}
                    />
                  </div>
                </div>
              </PinContainer>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
