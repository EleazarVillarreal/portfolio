'use client'

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { RmVoidOverlay, createVoidDates } from '@/components/rm-void-overlay'
import {
  TERMINAL_CHIPS,
  buildCommandOutput,
  buildUnknownCommandOutput,
  isRmEasterEggCommand,
  RM_DELETE_TARGETS,
  type TerminalCommand,
  type TerminalLine,
} from '@/lib/terminal-commands'

function createLineId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

function withReveal(lines: TerminalLine[]): TerminalLine[] {
  return lines.map((line) => {
    if (line.type === 'echo') return line
    return { ...line, visible: false }
  })
}

function revealLines(
  lines: TerminalLine[],
  setLines: (updater: (current: TerminalLine[]) => TerminalLine[]) => void,
) {
  const revealable = lines.filter(
    (line) => line.type === 'head' || line.type === 'sub' || line.type === 'rm-log',
  )

  revealable.forEach((line, index) => {
    window.setTimeout(() => {
      setLines((current) =>
        current.map((entry) =>
          entry.id === line.id ? { ...entry, visible: true } : entry,
        ),
      )
    }, index * 110)
  })
}

function renderLine(line: TerminalLine) {
  switch (line.type) {
    case 'echo':
      return (
        <div
          key={line.id}
          className="mb-[0.1rem] wrap-anywhere whitespace-pre-wrap text-[#aaa] leading-[1.75]"
        >
          <span className="text-pink">❯ </span>
          <span className="text-white">{line.command}</span>
        </div>
      )
    case 'head':
      return (
        <div
          key={line.id}
          className={`tt-head ${line.variant} ${line.visible ? 'show' : ''}`}
          style={{ fontSize: line.size ?? '2.4rem' }}
        >
          {line.text}
        </div>
      )
    case 'sub':
      return (
        <div
          key={line.id}
          className={`tt-sub mb-[0.1rem] wrap-anywhere whitespace-pre-wrap text-[#aaa] leading-[1.75] ${
            line.visible ? 'show' : ''
          }`}
          dangerouslySetInnerHTML={{ __html: line.html }}
        />
      )
    case 'rm-log':
      return (
        <div
          key={line.id}
          className={`tt-sub mb-[0.1rem] wrap-anywhere whitespace-pre-wrap text-[#aaa] leading-[1.75] ${
            line.visible ? 'show' : ''
          }`}
        >
          <span style={{ color: '#ff5f57' }}>rm</span> {line.filename}
          <span className="tt-dim">
            {' '}
            … <span style={{ color: '#00e676' }}>✓</span>
          </span>
        </div>
      )
  }
}

export function HeroTerminal() {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const reopenRef = useRef<HTMLButtonElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const [lines, setLines] = useState<TerminalLine[]>([])
  const [inputValue, setInputValue] = useState('')
  const [inputFocused, setInputFocused] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isRmBusy, setIsRmBusy] = useState(false)
  const [showVoid, setShowVoid] = useState(false)
  const [voidDates, setVoidDates] = useState<{
    now: string
    before: string
  } | null>(null)

  const scrollOutputToBottom = useCallback(() => {
    const output = outputRef.current
    if (!output) return
    output.scrollTop = output.scrollHeight
  }, [])

  useEffect(() => {
    scrollOutputToBottom()
  }, [lines, scrollOutputToBottom])

  const setOutput = useCallback(
    (nextLines: TerminalLine[], animate = true) => {
      const prepared = withReveal(nextLines)
      setLines(prepared)
      if (animate) {
        revealLines(prepared, setLines)
      }
    },
    [],
  )

  const runRmSequence = useCallback(
    (command: string) => {
      setIsRmBusy(true)

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      const targets = RM_DELETE_TARGETS.map((target) => ({
        ...target,
        element: document.querySelector<HTMLElement>(target.selector),
      })).filter((target) => target.element)

      const echoLine: TerminalLine = {
        id: createLineId('rm-echo'),
        type: 'echo',
        command,
      }

      setLines([echoLine])

      const finishSequence = () => {
        document.body.classList.remove('rm-jitter')
        window.setTimeout(() => {
          setVoidDates(createVoidDates())
          setShowVoid(true)
        }, 350)
      }

      if (reduceMotion) {
        const logLines: TerminalLine[] = targets.map((target, index) => ({
          id: createLineId(`rm-${index}`),
          type: 'rm-log',
          filename: target.name,
          visible: true,
        }))

        setLines([echoLine, ...logLines])
        targets.forEach((target) => {
          if (target.element) target.element.style.visibility = 'hidden'
        })
        finishSequence()
        return
      }

      document.body.classList.add('rm-jitter')

      let index = 0

      const step = () => {
        if (index >= targets.length) {
          finishSequence()
          return
        }

        const target = targets[index]
        const logLine: TerminalLine = {
          id: createLineId(`rm-${index}`),
          type: 'rm-log',
          filename: target.name,
          visible: true,
        }

        setLines((current) => [...current, logLine])

        if (target.element) {
          target.element.classList.add('rm-target')
          window.setTimeout(() => {
            target.element?.classList.add('rm-deleting')
            window.setTimeout(() => {
              if (target.element) target.element.style.visibility = 'hidden'
            }, 540)
          }, 200)
        }

        index += 1
        window.setTimeout(step, 520)
      }

      step()
    },
    [],
  )

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim()
      const command = trimmed.toLowerCase()
      if (!trimmed) return

      if (isRmEasterEggCommand(trimmed)) {
        if (isRmBusy) return
        runRmSequence(trimmed)
        return
      }

      if (command === 'clear') {
        setLines([])
        return
      }

      const knownCommands: TerminalCommand[] = [
        'whoami',
        'skills',
        'work',
        'status',
        'help',
        'clear',
      ]

      if ((knownCommands as string[]).includes(command)) {
        setOutput(buildCommandOutput(command as TerminalCommand))
        return
      }

      setOutput(buildUnknownCommandOutput(command))
    },
    [isRmBusy, runRmSequence, setOutput],
  )

  const introRanRef = useRef(false)

  useEffect(() => {
    if (introRanRef.current) return
    introRanRef.current = true
    const timer = window.setTimeout(() => runCommand('whoami'), 500)
    return () => window.clearTimeout(timer)
  }, [runCommand])

  const handleSubmit = () => {
    const value = inputValue.trim()
    setInputValue('')
    if (value) runCommand(value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSubmit()
    }
  }

  const closeTerminal = () => {
    setIsClosed(true)
    window.setTimeout(() => reopenRef.current?.focus(), 0)
  }

  const reopenTerminal = () => {
    setIsClosed(false)
    setIsMinimized(false)
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }

  const minimizeTerminal = () => {
    setIsMinimized(true)
  }

  const restoreTerminal = () => {
    setIsMinimized(false)
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }

  const closeVoid = useCallback(() => {
    // Undo every side effect of the rm sequence so the page is fully restored.
    document.body.classList.remove('rm-jitter')

    RM_DELETE_TARGETS.forEach((target) => {
      const element = document.querySelector<HTMLElement>(target.selector)
      if (!element) return
      element.classList.remove('rm-target', 'rm-deleting')
      element.style.removeProperty('visibility')
    })

    setShowVoid(false)
    setVoidDates(null)
    setIsRmBusy(false)
    setLines([])
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }, [])

  return (
    <>
      <div className="relative w-[480px] max-w-[480px] shrink-0" inert={showVoid}>
        {!isClosed ? (
          <div className="relative w-[480px] max-w-[480px] border border-cyan/20 bg-[#0a0a14] font-mono text-[0.74rem] shadow-[0_0_40px_rgba(0,245,255,0.05),inset_0_0_50px_rgba(0,0,0,0.5)]">
            <div className="relative flex items-center gap-[0.45rem] border-b border-white/5 bg-[#0f0f1e] px-[0.9rem] py-[0.55rem]">
              <button
                type="button"
                className="tt-dot d-r relative inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-[8px] leading-none text-transparent transition-[filter] hover:brightness-125"
                aria-label="Close terminal"
                title="Close"
                onClick={closeTerminal}
              />
              <button
                type="button"
                className="tt-dot d-y relative inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-[8px] leading-none text-transparent transition-[filter] hover:brightness-125"
                aria-label="Minimize terminal"
                title="Minimize"
                onClick={minimizeTerminal}
              />
              <button
                type="button"
                className="tt-dot d-g relative inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-[8px] leading-none text-transparent transition-[filter] hover:brightness-125"
                aria-label="Restore terminal"
                title="Restore"
                onClick={restoreTerminal}
              />
            </div>

            <div
              className={`flex flex-col overflow-hidden px-6 transition-[height,min-height,padding,opacity] duration-200 ${
                isMinimized
                  ? 'pointer-events-none h-0 min-h-0 py-0 opacity-0'
                  : 'h-[340px] min-h-[340px] py-5'
              }`}
              inert={isMinimized}
            >
              <div
                ref={outputRef}
                className="min-h-0 flex-1 overflow-hidden"
                role="log"
                aria-live="polite"
                aria-label="Terminal output"
              >
                {lines.map(renderLine)}
              </div>

              <div className="mt-[0.8rem] flex shrink-0 items-center gap-2 border-t border-dashed border-pink/25 pt-[0.7rem]">
                <span className="font-bold text-pink" aria-hidden="true">
                  ❯
                </span>
                <input
                  ref={inputRef}
                  id={inputId}
                  type="text"
                  className="flex-1 border-0 bg-transparent font-mono text-[0.74rem] text-white caret-cyan outline-none placeholder:text-[#9a9a9a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
                  value={inputValue}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Type a command: whoami, skills, work, status, or help"
                  placeholder="whoami · skills · work · status · help"
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                />
                {!inputFocused ? (
                  <span className="tt-cursor" aria-hidden="true" />
                ) : null}
              </div>

              <div
                className="mt-[0.7rem] flex shrink-0 flex-wrap gap-[0.4rem]"
                role="group"
                aria-label="Terminal commands"
              >
                {TERMINAL_CHIPS.map((command) => (
                  <button
                    key={command}
                    type="button"
                    className="cursor-pointer border border-cyan/30 bg-transparent px-2 py-[0.18rem] font-mono text-[0.5rem] tracking-widest text-cyan uppercase transition-all hover:bg-cyan hover:text-black focus-visible:bg-cyan focus-visible:text-black"
                    data-cmd={command}
                    onClick={() => runCommand(command)}
                  >
                    {command}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {isClosed ? (
          <button
            ref={reopenRef}
            type="button"
            className="cursor-pointer border border-cyan/35 bg-transparent px-[1.1rem] py-[0.7rem] font-mono text-[0.7rem] tracking-[0.08em] text-cyan transition-all hover:bg-cyan hover:text-black focus-visible:bg-cyan focus-visible:text-black"
            onClick={reopenTerminal}
          >
            ▸ reopen terminal
          </button>
        ) : null}
      </div>

      <RmVoidOverlay
        active={showVoid}
        now={voidDates?.now ?? ''}
        before={voidDates?.before ?? ''}
        onClose={closeVoid}
      />
    </>
  )
}
