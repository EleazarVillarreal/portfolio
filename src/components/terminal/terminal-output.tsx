import { forwardRef } from 'react'
import { SOCIAL_ICONS } from '@/components/icons'
import type { SubSegment, TerminalLine } from '@/lib/terminal-commands'

// Shared base styling for echo / sub / rm-log lines.
const LINE_CLASS =
  'mb-[0.1rem] wrap-anywhere whitespace-pre-wrap text-terminal-fg leading-[1.75]'

function TerminalLink({
  href,
  label,
  icon,
  external,
}: Extract<SubSegment, { kind: 'link' }>) {
  const Icon = SOCIAL_ICONS[icon]
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <a href={href} className="tt-link" {...externalProps}>
      <Icon />
      {label}
    </a>
  )
}

function Segment({ segment }: { segment: SubSegment }) {
  switch (segment.kind) {
    case 'text':
      return <>{segment.value}</>
    case 'accent':
      return (
        <span className={segment.tone === 'cyan' ? 'tt-c' : 'tt-y'}>
          {segment.value}
        </span>
      )
    case 'link':
      return <TerminalLink {...segment} />
  }
}

function Line({ line }: { line: TerminalLine }) {
  switch (line.type) {
    case 'echo':
      return (
        <div className={LINE_CLASS}>
          <span className="text-pink">❯ </span>
          <span className="text-white">{line.command}</span>
        </div>
      )
    case 'head':
      return (
        <div
          className={`tt-head ${line.variant} ${line.visible ? 'show' : ''}`}
          style={{ fontSize: line.size ?? '2.4rem' }}
        >
          {line.text}
        </div>
      )
    case 'sub':
      return (
        <div className={`tt-sub ${LINE_CLASS} ${line.visible ? 'show' : ''}`}>
          {line.segments.map((segment, index) => (
            <Segment key={index} segment={segment} />
          ))}
        </div>
      )
    case 'rm-log':
      return (
        <div className={`tt-sub ${LINE_CLASS} ${line.visible ? 'show' : ''}`}>
          <span className="text-error">rm</span> {line.filename}
          <span className="tt-dim">
            {' '}
            … <span className="text-success">✓</span>
          </span>
        </div>
      )
  }
}

export const TerminalOutput = forwardRef<HTMLDivElement, { lines: TerminalLine[] }>(
  function TerminalOutput({ lines }, ref) {
    return (
      <div
        ref={ref}
        className="min-h-0 flex-1 overflow-hidden"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {lines.map((line) => (
          <Line key={line.id} line={line} />
        ))}
      </div>
    )
  },
)
