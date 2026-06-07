export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      data-rm-target="footer"
      className="relative z-10 border-t border-pink/15 px-4 py-8 sm:px-6 md:px-12"
    >
      <div className="flex flex-col items-center justify-between gap-3 text-[0.6rem] tracking-[0.2em] text-subtle uppercase sm:flex-row">
        <p>&copy; {year} Eleazar Villarreal</p>
      </div>
    </footer>
  )
}
