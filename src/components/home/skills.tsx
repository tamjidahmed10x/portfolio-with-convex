import { PinContainer } from '@/components/ui/3d-pin'

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
    name: 'PostgreSQL',
    punchline: 'Relational muscle',
    details:
      'Design normalized schemas, craft windowed analytics, and keep ' +
      'data consistent at scale.',
    href: 'https://www.postgresql.org/',
    stat: '4 yrs',
    gradient: 'bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500',
  },
  {
    name: 'PostgreSQL',
    punchline: 'Relational muscle',
    details:
      'Design normalized schemas, craft windowed analytics, and keep ' +
      'data consistent at scale.',
    href: 'https://www.postgresql.org/',
    stat: '4 yrs',
    gradient: 'bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-500',
  },
]

const Skills = () => {
  return (
    <>
      <div></div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
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
                <div className={`h-52 w-full rounded-lg ${skill.gradient}`} />
              </div>
            </div>
          </PinContainer>
        ))}
      </div>
    </>
  )
}

export default Skills
