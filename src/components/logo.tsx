import Image from 'next/image'

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/ghost.svg"
      alt=""
      width={80}
      height={80}
      className={`block h-14 w-14 animate-[logoFloat_3.5s_ease-in-out_infinite] motion-reduce:animate-none md:h-20 md:w-20${className ? ` ${className}` : ''}`}
      priority
    />
  )
}
