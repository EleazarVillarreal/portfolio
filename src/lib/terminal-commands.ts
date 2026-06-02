export const TERMINAL_CHIPS = [
  'whoami',
  'skills',
  'work',
  'status',
] as const

export type TerminalCommand =
  | (typeof TERMINAL_CHIPS)[number]
  | 'help'
  | 'clear'

export type HeadVariant =
  | 'head-pink'
  | 'head-cyan'
  | 'head-fill-pink'
  | 'head-fill-cyan'
  | 'head-yellow'

export type TerminalLine =
  | { id: string; type: 'echo'; command: string }
  | {
      id: string
      type: 'head'
      text: string
      variant: HeadVariant
      size?: string
      visible: boolean
    }
  | { id: string; type: 'sub'; html: string; visible: boolean }
  | { id: string; type: 'rm-log'; filename: string; visible: boolean }

type DraftTerminalLine =
  | { type: 'echo'; command: string }
  | {
      type: 'head'
      text: string
      variant: HeadVariant
      size?: string
    }
  | { type: 'sub'; html: string }
  | { type: 'rm-log'; filename: string }

export const RM_EASTER_EGG_COMMANDS = [
  'rm -rf',
  'rm -rf ~/',
  'rm -rf $HOME',
] as const

export function isRmEasterEggCommand(raw: string): boolean {
  const normalized = raw.trim().replace(/\s+/g, ' ')
  return (RM_EASTER_EGG_COMMANDS as readonly string[]).includes(normalized)
}

export function buildCommandOutput(command: TerminalCommand): TerminalLine[] {
  const lines: DraftTerminalLine[] = [{ type: 'echo', command }]

  switch (command) {
    case 'whoami':
      lines.push(
        { type: 'head', text: '10+ YEARS', variant: 'head-fill-pink', size: '2.6rem' },
        { type: 'head', text: 'SHIPPING', variant: 'head-cyan', size: '2.2rem' },
        {
          type: 'sub',
          html: '<span class="tt-c">▸</span> Senior Software Developer',
        },
        {
          type: 'sub',
          html: '<span class="tt-c">▸</span> Publicis Sapient · Charles Schwab · OutboundEngine',
        },
        {
          type: 'sub',
          html: '<span class="tt-c">▸</span> Healthcare · Retail · Fintech · E-Commerce',
        },
        {
          type: 'sub',
          html: '<span class="tt-c">▸</span> Based in Austin, TX',
        },
      )
      break
    case 'skills':
      lines.push(
        { type: 'head', text: 'THE STACK', variant: 'head-fill-cyan', size: '2.2rem' },
        {
          type: 'sub',
          html: '<span class="tt-c">▸</span> React · Next.js · TypeScript',
        },
        {
          type: 'sub',
          html: '<span class="tt-c">▸</span> Node.js · GraphQL · Apollo',
        },
        {
          type: 'sub',
          html: '<span class="tt-c">▸</span> Tailwind · Material UI · Storybook',
        },
        {
          type: 'sub',
          html: '<span class="tt-c">▸</span> React Native · Redux · Zustand · SWR',
        },
        {
          type: 'sub',
          html: '<span class="tt-c">▸</span> Jest · React Testing Library · Design Systems',
        },
      )
      break
    case 'work':
      lines.push(
        { type: 'head', text: 'SHIPPED', variant: 'head-yellow', size: '2.4rem' },
        {
          type: 'sub',
          html: '<span class="tt-y">01</span> Optum · SSO Dashboard · Next.js + NextAuth',
        },
        {
          type: 'sub',
          html: '<span class="tt-y">02</span> Wawa · Checkout Flow + Order Mgmt · 1K+ Associates',
        },
        {
          type: 'sub',
          html: '<span class="tt-y">03</span> Mayo Clinic · Patient Test Results + Mobile App',
        },
        {
          type: 'sub',
          html: '<span class="tt-y">04</span> Albertsons · Prescription Flow · WCAG Remediation',
        },
        {
          type: 'sub',
          html: '<span class="tt-y">05</span> Callaway Golf · E-Commerce Redesign · 1K+ Products',
        },
      )
      break
    case 'status':
      lines.push(
        { type: 'head', text: 'OPEN TO TALK', variant: 'head-fill-pink', size: '2rem' },
        {
          type: 'sub',
          html:
            '<span class="tt-c">▸</span> <a href="https://x.com/E5R_V8L" target="_blank" rel="noopener noreferrer" class="tt-link"><svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>X</a>',
        },
        {
          type: 'sub',
          html:
            '<span class="tt-c">▸</span> <a href="https://github.com/EleazarVillarreal" target="_blank" rel="noopener noreferrer" class="tt-link"><svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.03-.02-2.03-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>GitHub</a>',
        },
        {
          type: 'sub',
          html:
            '<span class="tt-c">▸</span> <a href="https://www.linkedin.com/in/eleazar-villarreal/" target="_blank" rel="noopener noreferrer" class="tt-link"><svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/></svg>LinkedIn</a>',
        },
        {
          type: 'sub',
          html:
            '<span class="tt-c">▸</span> <a href="mailto:EleazarVillarreal13@gmail.com" class="tt-link"><svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>EleazarVillarreal13@gmail.com</a>',
        },
      )
      break
    case 'help':
      lines.push(
        { type: 'head', text: 'COMMANDS', variant: 'head-cyan', size: '2.2rem' },
        {
          type: 'sub',
          html: 'whoami · skills · work · status · clear',
        },
      )
      break
    case 'clear':
      return []
  }

  return lines.map((line, index) => {
    const id = `${command}-${index}`

    if (line.type === 'echo') {
      return { ...line, id }
    }

    return { ...line, id, visible: false }
  })
}

export function buildUnknownCommandOutput(command: string): TerminalLine[] {
  return [
    { id: 'unknown-echo', type: 'echo', command },
    {
      id: 'unknown-head',
      type: 'head',
      text: '???',
      variant: 'head-fill-pink',
      size: '2.6rem',
      visible: false,
    },
    {
      id: 'unknown-sub',
      type: 'sub',
      html: 'command not found — try <span class="tt-c">help</span>',
      visible: false,
    },
  ]
}

export const RM_DELETE_TARGETS = [
  { selector: '[data-rm-target="nav"]', name: '/nav/header.tsx' },
  { selector: '[data-rm-target="hero"]', name: '/home/hero.jsx' },
  { selector: '#work', name: '/projects/*.case' },
  { selector: '#about', name: '/about/bio.md' },
  { selector: '#contact', name: '/contact/email.env' },
  { selector: '[data-rm-target="footer"]', name: '/.footer.lock' },
] as const
