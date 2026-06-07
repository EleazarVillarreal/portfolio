export type SocialIconName = 'x' | 'github' | 'linkedin' | 'mail'

export type SocialLink = {
  label: string
  href: string
  icon: SocialIconName
  /** External links open in a new tab with rel="noopener noreferrer". */
  external: boolean
}

export const CONTACT_EMAIL = 'EleazarVillarreal13@gmail.com'

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'X', href: 'https://x.com/E5R_V8L', icon: 'x', external: true },
  {
    label: 'GitHub',
    href: 'https://github.com/EleazarVillarreal',
    icon: 'github',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/eleazar-villarreal/',
    icon: 'linkedin',
    external: true,
  },
  {
    label: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: 'mail',
    external: false,
  },
] as const
