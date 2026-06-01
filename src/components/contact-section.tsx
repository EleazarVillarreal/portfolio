const contactEmail = 'EleazarVillarreal13@gmail.com'

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-10 scroll-mt-28 border-y border-pink/10 bg-mid px-4 py-24 text-center sm:px-6 md:px-12 md:py-32"
    >
      <h2
        id="contact-heading"
        className="mb-8 font-marker text-[clamp(3rem,10vw,8rem)] leading-none"
      >
        <span className="block text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.1)]">
          Get In
        </span>
        <span className="block text-pink [text-shadow:0_0_40px_rgba(255,30,173,0.4)]">
          Touch.
        </span>
      </h2>

      <a
        href={`mailto:${contactEmail}`}
        className="inline-block max-w-full wrap-anywhere border-b border-cyan pb-1 text-base text-cyan transition-[text-shadow] duration-200 hover:[text-shadow:0_0_20px_var(--cyan)] sm:text-lg"
      >
        {contactEmail}
      </a>
    </section>
  )
}
