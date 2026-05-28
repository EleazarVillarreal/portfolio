import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
  className?: string
  size?: number
}

export function Logo({ className, size = 64 }: LogoProps) {
  return (
    <Link href="/" aria-label="Eleazar Villarreal — home" className={className}>
      <Image
        src="/ghost.svg"
        alt=""
        width={size}
        height={size}
        className="block"
        priority
      />
    </Link>
  )
}
