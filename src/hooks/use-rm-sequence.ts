import { useCallback, useState, type Dispatch, type SetStateAction } from 'react'
import { createVoidDates } from '@/components/terminal/rm-void-overlay'
import { TIMING } from '@/constants'
import { RM_DELETE_TARGETS, type TerminalLine } from '@/lib/terminal-commands'

function createLineId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

type UseRmSequenceArgs = {
  setLines: Dispatch<SetStateAction<TerminalLine[]>>
  focusInput: () => void
}

type VoidDates = { now: string; before: string }

/**
 * Drives the `rm -rf` easter egg: the glitch/jitter choreography that deletes
 * page sections, then the vim swap-file "void" overlay, plus the teardown that
 * restores every side effect when the overlay is dismissed.
 */
export function useRmSequence({ setLines, focusInput }: UseRmSequenceArgs) {
  const [isRmBusy, setIsRmBusy] = useState(false)
  const [showVoid, setShowVoid] = useState(false)
  const [voidDates, setVoidDates] = useState<VoidDates | null>(null)

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
        }, TIMING.RM_VOID_DELAY_MS)
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
            }, TIMING.RM_DELETE_MS)
          }, TIMING.RM_MARK_MS)
        }

        index += 1
        window.setTimeout(step, TIMING.RM_STEP_MS)
      }

      step()
    },
    [setLines],
  )

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
    focusInput()
  }, [setLines, focusInput])

  return { isRmBusy, showVoid, voidDates, runRmSequence, closeVoid }
}
