import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { useRmSequence } from '@/hooks/use-rm-sequence'
import { TIMING } from '@/constants'
import {
  buildCommandOutput,
  buildUnknownCommandOutput,
  isRmEasterEggCommand,
  type TerminalCommand,
  type TerminalLine,
} from '@/lib/terminal-commands'

export type WindowState = 'open' | 'closed' | 'minimized'

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
    }, index * TIMING.LINE_REVEAL_MS)
  })
}

const KNOWN_COMMANDS: TerminalCommand[] = [
  'whoami',
  'skills',
  'work',
  'status',
  'help',
  'clear',
]

export function useTerminal() {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const reopenRef = useRef<HTMLButtonElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const [lines, setLines] = useState<TerminalLine[]>([])
  const [inputValue, setInputValue] = useState('')
  const [inputFocused, setInputFocused] = useState(false)
  const [windowState, setWindowState] = useState<WindowState>('open')

  const focusInput = useCallback(() => {
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }, [])

  const { isRmBusy, showVoid, voidDates, runRmSequence, closeVoid } =
    useRmSequence({ setLines, focusInput })

  const scrollOutputToBottom = useCallback(() => {
    const output = outputRef.current
    if (!output) return
    output.scrollTop = output.scrollHeight
  }, [])

  useEffect(() => {
    scrollOutputToBottom()
  }, [lines, scrollOutputToBottom])

  const setOutput = useCallback((nextLines: TerminalLine[], animate = true) => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // Reveal everything at once for reduced-motion users (or when the caller
    // opts out of animation) — no timed pop-in.
    if (!animate || reduceMotion) {
      setLines(
        nextLines.map((line) =>
          line.type === 'echo' ? line : { ...line, visible: true },
        ),
      )
      return
    }

    const prepared = withReveal(nextLines)
    setLines(prepared)
    revealLines(prepared, setLines)
  }, [])

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

      if ((KNOWN_COMMANDS as string[]).includes(command)) {
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
    const timer = window.setTimeout(
      () => runCommand('whoami'),
      TIMING.INTRO_DELAY_MS,
    )
    return () => window.clearTimeout(timer)
  }, [runCommand])

  const handleSubmit = useCallback(() => {
    const value = inputValue.trim()
    setInputValue('')
    if (value) runCommand(value)
  }, [inputValue, runCommand])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit],
  )

  const closeTerminal = useCallback(() => {
    setWindowState('closed')
    window.setTimeout(() => reopenRef.current?.focus(), 0)
  }, [])

  const reopenTerminal = useCallback(() => {
    setWindowState('open')
    focusInput()
  }, [focusInput])

  const minimizeTerminal = useCallback(() => setWindowState('minimized'), [])

  const restoreTerminal = useCallback(() => {
    setWindowState('open')
    focusInput()
  }, [focusInput])

  return {
    inputId,
    inputRef,
    reopenRef,
    outputRef,
    lines,
    inputValue,
    setInputValue,
    inputFocused,
    setInputFocused,
    windowState,
    showVoid,
    voidDates,
    closeVoid,
    runCommand,
    handleSubmit,
    handleKeyDown,
    closeTerminal,
    reopenTerminal,
    minimizeTerminal,
    restoreTerminal,
  }
}
