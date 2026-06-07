import { SOCIAL_LINKS, type SocialIconName, type SocialLink } from '@/data/social'

export type HeadVariant =
  | 'head-pink'
  | 'head-cyan'
  | 'head-fill-pink'
  | 'head-fill-cyan'
  | 'head-yellow'

/** A styled inline run within a terminal sub-line. */
export type SubSegment =
  | { kind: 'text'; value: string }
  | { kind: 'accent'; value: string; tone: 'cyan' | 'yellow' }
  | {
      kind: 'link'
      href: string
      label: string
      icon: SocialIconName
      external: boolean
    }

/** Authored terminal content, before runtime ids/visibility are attached. */
export type ContentLine =
  | { type: 'head'; text: string; variant: HeadVariant; size?: string }
  | { type: 'sub'; segments: SubSegment[] }

/** Commands shown as quick-access chips below the terminal input. */
export const TERMINAL_CHIPS = ['whoami', 'skills', 'work', 'status'] as const

export type ChipCommand = (typeof TERMINAL_CHIPS)[number]
export type ContentCommand = ChipCommand | 'help'

const bullet = (text: string): ContentLine => ({
  type: 'sub',
  segments: [
    { kind: 'accent', value: '▸', tone: 'cyan' },
    { kind: 'text', value: ` ${text}` },
  ],
})

const numbered = (num: string, text: string): ContentLine => ({
  type: 'sub',
  segments: [
    { kind: 'accent', value: num, tone: 'yellow' },
    { kind: 'text', value: ` ${text}` },
  ],
})

const linkLine = (link: SocialLink): ContentLine => ({
  type: 'sub',
  segments: [
    { kind: 'accent', value: '▸', tone: 'cyan' },
    { kind: 'text', value: ' ' },
    {
      kind: 'link',
      href: link.href,
      label: link.label,
      icon: link.icon,
      external: link.external,
    },
  ],
})

export const COMMAND_CONTENT: Record<ContentCommand, ContentLine[]> = {
  whoami: [
    { type: 'head', text: '10+ YEARS', variant: 'head-fill-pink', size: '2.6rem' },
    { type: 'head', text: 'SHIPPING', variant: 'head-cyan', size: '2.2rem' },
    bullet('Senior Software Developer'),
    bullet('Publicis Sapient · Charles Schwab · OutboundEngine'),
    bullet('Healthcare · Retail · Fintech · E-Commerce'),
    bullet('Based in Austin, TX'),
  ],
  skills: [
    { type: 'head', text: 'THE STACK', variant: 'head-fill-cyan', size: '2.2rem' },
    bullet('React · Next.js · TypeScript'),
    bullet('Node.js · GraphQL · Apollo'),
    bullet('Tailwind · Material UI · Storybook'),
    bullet('React Native · Redux · Zustand · SWR'),
    bullet('Jest · React Testing Library · Design Systems'),
  ],
  work: [
    { type: 'head', text: 'SHIPPED', variant: 'head-yellow', size: '2.4rem' },
    numbered('01', 'Optum · SSO Dashboard · Next.js + NextAuth'),
    numbered('02', 'Wawa · Checkout Flow + Order Mgmt · 1K+ Associates'),
    numbered('03', 'Mayo Clinic · Patient Test Results + Mobile App'),
    numbered('04', 'Albertsons · Prescription Flow · WCAG Remediation'),
    numbered('05', 'Callaway Golf · E-Commerce Redesign · 1K+ Products'),
  ],
  status: [
    { type: 'head', text: 'OPEN TO TALK', variant: 'head-fill-pink', size: '2rem' },
    ...SOCIAL_LINKS.map(linkLine),
  ],
  help: [
    { type: 'head', text: 'COMMANDS', variant: 'head-cyan', size: '2.2rem' },
    {
      type: 'sub',
      segments: [{ kind: 'text', value: 'whoami · skills · work · status · clear' }],
    },
  ],
}
