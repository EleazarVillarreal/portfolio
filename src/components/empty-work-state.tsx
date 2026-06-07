export function EmptyWorkState() {
  return (
    <div
      role="region"
      aria-labelledby="work-empty-heading"
      aria-describedby="work-empty-description"
      className="relative overflow-hidden border border-pink/20 bg-surface p-8 sm:p-10"
    >
      <div
        aria-hidden="true"
        className="absolute -right-12 -top-16 font-marker text-[12rem] leading-none text-pink/10"
      >
        00
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,30,173,0.12),transparent_35%),radial-gradient(circle_at_20%_90%,rgba(0,245,255,0.1),transparent_40%)]"
      />

      <div className="relative z-10 max-w-2xl">
        <p className="mb-3 text-[0.65rem] tracking-[0.35em] text-cyan uppercase">
          Selected work coming soon
        </p>
        <h3
          id="work-empty-heading"
          className="mb-4 font-display text-2xl leading-tight text-white sm:text-3xl"
        >
          No selected work published yet.
        </h3>
        <p id="work-empty-description" className="mb-6 text-sm leading-7 text-muted">
          I&apos;m preparing a curated set of case studies that reflect the
          production work, accessibility standards, and product outcomes behind
          my recent projects. In the meantime, I&apos;m happy to share relevant
          examples in a conversation.
        </p>
        <a
          href="mailto:EleazarVillarreal13@gmail.com"
          className="inline-flex items-center gap-2 bg-pink px-5 py-3 text-xs font-bold tracking-widest text-black uppercase shadow-[4px_4px_0_var(--cyan)] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--cyan)] motion-reduce:transform-none"
        >
          Start a conversation
          <span aria-hidden="true">-&gt;</span>
        </a>
      </div>
    </div>
  )
}
