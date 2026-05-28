import { Logo } from '@/components/logo'

const navItems = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-pink/20 bg-dark/85 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="flex items-center justify-between px-6 py-6 md:px-12"
      >
        <Logo />

        <div className="flex gap-5 md:gap-10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-xs tracking-[0.2em] text-muted uppercase transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-cyan after:transition-[width] after:duration-300 hover:text-cyan hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
