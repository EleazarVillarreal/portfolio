import { HeroTerminal } from '@/components/terminal'

const graffitiTags = [
  {
    text: 'CODE',
    className:
      'right-[5%] top-[10%] text-[clamp(5rem,12vw,12rem)] text-pink -rotate-[15deg]',
  },
  {
    text: 'BUILD',
    className:
      'bottom-[20%] left-[5%] text-[clamp(3rem,8vw,6rem)] text-cyan rotate-[8deg]',
  },
  {
    text: 'SHIP',
    className:
      'right-[25%] top-1/2 text-[clamp(2rem,5vw,3rem)] text-yellow -rotate-[5deg]',
  },
]

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-7rem)] w-full items-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 md:px-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(0,245,255,0.06)_0%,transparent_70%),radial-gradient(ellipse_40%_60%_at_10%_60%,rgba(255,30,173,0.08)_0%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full bg-pink/10 blur-[80px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-12 left-1/5 h-[400px] w-[400px] rounded-full bg-cyan/10 blur-[80px]"
      />

      {graffitiTags.map((tag) => (
        <div
          key={tag.text}
          aria-hidden="true"
          className={`absolute select-none font-marker opacity-[0.08] ${tag.className}`}
        >
          {tag.text}
        </div>
      ))}

      <div className="relative z-10 flex w-full items-center justify-between gap-12">
        <div
          className="hero-left w-full min-w-0 max-w-[520px]"
          data-rm-target="hero"
        >
          <div className="mb-6 flex items-center gap-3 text-[0.65rem] tracking-[0.25em] text-cyan uppercase sm:gap-4 sm:text-[0.7rem] sm:tracking-[0.4em] before:h-px before:w-8 before:shrink-0 before:bg-cyan before:content-[''] sm:before:w-10">
            Software Developer
          </div>

          <h1 className="mb-6">
            <span className="glitch-wrapper">
              <span className="glitch-name" data-text="Eleazar">
                Eleazar
              </span>
              <span className="glitch-name title-line" data-text="Villarreal">
                Villarreal
              </span>
            </span>
          </h1>

          <p className="w-full border-l-[3px] border-pink pl-4 text-[0.8rem] leading-[1.8] text-muted sm:max-w-[500px] sm:pl-6 sm:text-[0.85rem]">
            Senior software developer with over a decade of experience shipping
            production React, Next.js, and TypeScript across healthcare, retail,
            and fintech. Accessible, performant interfaces are the baseline. The
            stack goes as deep as the product needs. WCAG compliance isn&apos;t an
            afterthought in my work, it&apos;s in the first commit.
          </p>
        </div>

        <div className="hero-right hidden w-[480px] shrink-0 items-center justify-end min-[920px]:flex">
          <HeroTerminal />
        </div>
      </div>
    </section>
  )
}
