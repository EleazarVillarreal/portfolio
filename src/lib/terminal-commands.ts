import {
  COMMAND_CONTENT,
  TERMINAL_CHIPS,
  type ContentLine,
  type HeadVariant,
  type SubSegment,
} from '@/data'

export { TERMINAL_CHIPS }
export type { HeadVariant, SubSegment }

export type TerminalCommand = (typeof TERMINAL_CHIPS)[number] | 'help' | 'clear'

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
  | { id: string; type: 'sub'; segments: SubSegment[]; visible: boolean }
  | { id: string; type: 'rm-log'; filename: string; visible: boolean }

export const RM_EASTER_EGG_COMMANDS = [
  'rm -rf',
  'rm -rf ~/',
  'rm -rf $HOME',
] as const

export function isRmEasterEggCommand(raw: string): boolean {
  const normalized = raw.trim().replace(/\s+/g, ' ')
  return (RM_EASTER_EGG_COMMANDS as readonly string[]).includes(normalized)
}

/** Attach stable ids + initial (hidden) visibility to authored content. */
function withIds(command: string, content: ContentLine[]): TerminalLine[] {
  return content.map((line, index) => {
    const id = `${command}-${index}`
    if (line.type === 'head') {
      return {
        id,
        type: 'head',
        text: line.text,
        variant: line.variant,
        size: line.size,
        visible: false,
      }
    }
    return { id, type: 'sub', segments: line.segments, visible: false }
  })
}

export function buildCommandOutput(command: TerminalCommand): TerminalLine[] {
  if (command === 'clear') return []

  const echo: TerminalLine = { id: `${command}-echo`, type: 'echo', command }
  return [echo, ...withIds(command, COMMAND_CONTENT[command])]
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
      segments: [
        { kind: 'text', value: 'command not found — try ' },
        { kind: 'accent', value: 'help', tone: 'cyan' },
      ],
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
