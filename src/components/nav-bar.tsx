import { Logo } from '@/components/logo'

const navItems = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function NavBar() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-pink/20 bg-dark/85 backdrop-blur-xl"
      data-rm-target="nav"
    >
      <nav
        aria-label="Primary"
        className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-6 md:px-12"
      >
        <a
          href="#top"
          aria-label="Eleazar Villarreal — home"
          className="inline-flex shrink-0 items-center leading-0 transition-[transform,filter] duration-200 filter-[drop-shadow(0_0_5px_var(--pink))_drop-shadow(0_0_11px_var(--pink))_drop-shadow(0_0_22px_rgba(255,30,173,0.5))] animate-[logoGlowPulse_4.5s_ease-in-out_infinite] hover:scale-105 hover:filter-[drop-shadow(0_0_6px_var(--pink))_drop-shadow(0_0_16px_var(--pink))_drop-shadow(0_0_32px_rgba(255,30,173,0.65))] motion-reduce:animate-none"
        >
          <Logo />
        </a>

        <div className="flex shrink-0 gap-3 sm:gap-5 md:gap-10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-[0.65rem] tracking-[0.15em] text-muted uppercase transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-cyan after:transition-[width] after:duration-300 hover:text-cyan hover:after:w-full sm:text-xs sm:tracking-[0.2em]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
