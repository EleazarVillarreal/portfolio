const DOT_CLASS =
  'tt-dot relative inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-[8px] leading-none text-transparent transition-[filter] hover:brightness-125'

type TerminalControlsProps = {
  onClose: () => void
  onMinimize: () => void
  onRestore: () => void
}

export function TerminalControls({
  onClose,
  onMinimize,
  onRestore,
}: TerminalControlsProps) {
  return (
    <div className="relative flex items-center gap-[0.45rem] border-b border-white/5 bg-terminal-elevated px-[0.9rem] py-[0.55rem]">
      <button
        type="button"
        className={`${DOT_CLASS} d-r`}
        aria-label="Close terminal"
        title="Close"
        onClick={onClose}
      />
      <button
        type="button"
        className={`${DOT_CLASS} d-y`}
        aria-label="Minimize terminal"
        title="Minimize"
        onClick={onMinimize}
      />
      <button
        type="button"
        className={`${DOT_CLASS} d-g`}
        aria-label="Restore terminal"
        title="Restore"
        onClick={onRestore}
      />
    </div>
  )
}
