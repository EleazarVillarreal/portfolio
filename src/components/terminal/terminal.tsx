'use client'

import { RmVoidOverlay } from '@/components/terminal/rm-void-overlay'
import { TerminalControls } from '@/components/terminal/terminal-controls'
import { TerminalInput } from '@/components/terminal/terminal-input'
import { TerminalOutput } from '@/components/terminal/terminal-output'
import { useTerminal } from '@/hooks'

export function HeroTerminal() {
  const {
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
    handleKeyDown,
    closeTerminal,
    reopenTerminal,
    minimizeTerminal,
    restoreTerminal,
  } = useTerminal()

  const isClosed = windowState === 'closed'
  const isMinimized = windowState === 'minimized'

  return (
    <>
      <div className="relative w-[480px] max-w-[480px] shrink-0" inert={showVoid}>
        {!isClosed ? (
          <div className="relative w-[480px] max-w-[480px] border border-cyan/20 bg-terminal-bg font-mono text-[0.74rem] shadow-[0_0_40px_rgba(0,245,255,0.05),inset_0_0_50px_rgba(0,0,0,0.5)]">
            <TerminalControls
              onClose={closeTerminal}
              onMinimize={minimizeTerminal}
              onRestore={restoreTerminal}
            />

            <div
              className={`flex flex-col overflow-hidden px-6 transition-[height,min-height,padding,opacity] duration-200 ${
                isMinimized
                  ? 'pointer-events-none h-0 min-h-0 py-0 opacity-0'
                  : 'h-[340px] min-h-[340px] py-5'
              }`}
              inert={isMinimized}
            >
              <TerminalOutput ref={outputRef} lines={lines} />

              <TerminalInput
                inputId={inputId}
                inputRef={inputRef}
                value={inputValue}
                inputFocused={inputFocused}
                onChange={setInputValue}
                onKeyDown={handleKeyDown}
                onFocusChange={setInputFocused}
                onRunCommand={runCommand}
              />
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
            <span aria-hidden="true">▸ </span>reopen terminal
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
