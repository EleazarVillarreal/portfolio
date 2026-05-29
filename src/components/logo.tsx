import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Eleazar Villarreal — home"
      className={`logo-link${className ? ` ${className}` : ''}`}
    >
      <Image
        src="/ghost.svg"
        alt=""
        width={80}
        height={80}
        className="logo-float block h-14 w-14 md:h-20 md:w-20"
        priority
      />
    </Link>
  )
}
