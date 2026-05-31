import { EmptyWorkState } from '@/components/empty-work-state'

export function WorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative z-10 scroll-mt-28 px-4 py-16 sm:px-6 md:px-12 md:py-24"
    >
      <div className="mb-12">
        <p className="mb-3 flex items-center gap-3 text-[0.65rem] tracking-[0.4em] text-pink uppercase after:h-px after:max-w-[60px] after:flex-1 after:bg-pink/40 after:content-['']">
          Selected Work
        </p>
        <h2
          id="work-heading"
          className="font-display text-[clamp(2rem,5vw,4rem)] leading-none text-white"
        >
          Things I&apos;ve
          <br />
          BUILT.
        </h2>
      </div>

      <EmptyWorkState />
    </section>
  )
}
