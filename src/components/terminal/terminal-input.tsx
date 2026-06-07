import type { ChangeEvent, KeyboardEvent, RefObject } from 'react'
import { TERMINAL_CHIPS } from '@/lib/terminal-commands'

type TerminalInputProps = {
  inputId: string
  inputRef: RefObject<HTMLInputElement | null>
  value: string
  inputFocused: boolean
  onChange: (value: string) => void
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  onFocusChange: (focused: boolean) => void
  onRunCommand: (command: string) => void
}

export function TerminalInput({
  inputId,
  inputRef,
  value,
  inputFocused,
  onChange,
  onKeyDown,
  onFocusChange,
  onRunCommand,
}: TerminalInputProps) {
  return (
    <>
      <div className="mt-[0.8rem] flex shrink-0 items-center gap-2 border-t border-dashed border-pink/25 pt-[0.7rem]">
        <span className="font-bold text-pink" aria-hidden="true">
          ❯
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          className="flex-1 border-0 bg-transparent font-mono text-[0.74rem] text-white caret-cyan outline-none placeholder:text-terminal-placeholder focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
          value={value}
          autoComplete="off"
          spellCheck={false}
          aria-label="Type a command: whoami, skills, work, status, or help"
          placeholder="whoami · skills · work · status · help"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value)
          }
          onKeyDown={onKeyDown}
          onFocus={() => onFocusChange(true)}
          onBlur={() => onFocusChange(false)}
        />
        {!inputFocused ? <span className="tt-cursor" aria-hidden="true" /> : null}
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
            onClick={() => onRunCommand(command)}
          >
            {command}
          </button>
        ))}
      </div>
    </>
  )
}
