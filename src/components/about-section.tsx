const profileDetails = [
  { label: 'ROLE', value: 'Software Developer' },
  { label: 'BASE', value: 'Austin, TX' },
  { label: 'EXP', value: '10+ Years' },
  { label: 'FOCUS', value: 'React.js · Next.js · TypeScript · Node.js' },
] as const

const skills = [
  'React.js',
  'Next.js',
  'TypeScript',
  'Node.js',
  'GraphQL',
  'React Native',
  'Tailwind',
  'Material UI',
  'Storybook',
  'WCAG',
  'Design Systems',
] as const

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 scroll-mt-28 px-4 py-16 sm:px-6 md:px-12 md:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative min-w-0 overflow-hidden border border-pink/15 bg-surface p-8 sm:p-10">
          <div
            aria-hidden="true"
            className="absolute left-4 top-4 text-[0.65rem] tracking-[0.2em] text-white/20 uppercase"
          >
            {'// ABOUT'}
          </div>
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 h-[120px] w-[120px] bg-[radial-gradient(circle,rgba(255,30,173,0.12),transparent_70%)]"
          />

          <div className="relative z-10 flex flex-col gap-8">
            <div className="bg-linear-to-br from-pink to-cyan bg-clip-text font-marker text-[clamp(4rem,14vw,5rem)] leading-none text-transparent">
              EV
            </div>

            <dl className="flex flex-col">
              {profileDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-center justify-between gap-4 border-b border-white/5 py-3 text-[0.7rem] last:border-b-0"
                >
                  <dt className="text-[0.6rem] tracking-[0.2em] text-subtle uppercase">
                    {detail.label}
                  </dt>
                  <dd className="text-right tracking-wider text-muted">
                    {detail.value}
                  </dd>
                </div>
              ))}

              <div className="flex items-center justify-between gap-4 py-3 text-[0.7rem]">
                <dt className="flex items-center gap-2 text-[0.6rem] tracking-[0.2em] text-subtle uppercase">
                  <span
                    aria-hidden="true"
                    className="h-[7px] w-[7px] rounded-full bg-success shadow-[0_0_8px_#00e676] animate-[pulse_2s_ease-in-out_infinite] motion-reduce:animate-none"
                  />
                  STATUS
                </dt>
                <dd className="text-right tracking-wider text-success">
                  Open to Talk
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="min-w-0">
          <p className="mb-3 flex items-center gap-3 text-[0.65rem] tracking-[0.4em] text-pink uppercase after:h-px after:max-w-[60px] after:flex-1 after:bg-pink/40 after:content-['']">
            About Me
          </p>
          <h2
            id="about-heading"
            className="mb-6 max-w-full wrap-break-word font-display text-[clamp(1.7rem,4vw,1.8rem)] leading-tight text-white"
          >
            I debug in the morning and second-guess my variable names at{' '}
            <span className="text-pink">night.</span>
          </h2>

          <div className="space-y-4 text-[0.8rem] leading-[1.9] text-muted-foreground">
            <p>
              I&apos;m a software developer based in Austin, TX with over a
              decade of experience building accessible, high-performance web
              applications across healthcare, retail, fintech, and e-commerce.
            </p>
            <p>
              Most of my career has been spent at the intersection of design and
              engineering, leading front-end development at Publicis Sapient on
              clients like Optum, Mayo Clinic, Albertsons, and Wawa, and before
              that at Charles Schwab where I built and maintained design systems
              used across their digital platforms.
            </p>
            <p>
              I care about the details that are easy to skip: WCAG compliance
              from the first commit, component APIs that make sense to the next
              developer, and interfaces that hold up under real-world
              conditions.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3" aria-label="Skills">
            {skills.map((skill) => (
              <li
                key={skill}
                className="border border-pink/25 bg-pink/10 px-4 py-2 text-[0.65rem] tracking-widest text-pink uppercase"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
