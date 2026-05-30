'use client'

import { useEffect, useRef } from 'react'

type RmVoidOverlayProps = {
  active: boolean
  now: string
  before: string
}

export function RmVoidOverlay({ active, now, before }: RmVoidOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return

    overlayRef.current?.focus()
  }, [active])

  if (!active) return null

  return (
    <div
      ref={overlayRef}
      className="rm-void on"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="rm-void-title"
      aria-describedby="rm-void-description"
      tabIndex={-1}
    >
      <div className="vim-body">
        <div id="rm-void-title" className="err">
          E325: ATTENTION
        </div>
        <br />
        <div id="rm-void-description">
          Found a swap file by the name{' '}
          <span className="label">&quot;/home/eleazar/.portfolio.html.swp&quot;</span>
        </div>
        <br />
        <div className="dim">
          {'          '}
          owned by: eleazar dated: {now}
        </div>
        <div className="dim"> file name: ~eleazar/portfolio.html</div>
        <div className="dim">
          {'          '}
          modified: <span className="warn">YES</span>
        </div>
        <div className="dim">
          {'         '}
          user name: eleazar host name: villarreal.local
        </div>
        <div className="dim">
          {'        '}
          process ID: 4831 <span className="err">(STILL RUNNING)</span>
        </div>
        <br />
        <div>
          While opening file <span className="label">&quot;portfolio.html&quot;</span>
        </div>
        <div className="dim"> dated: {before}</div>
        <div className="err"> NEWER than swap file!</div>
        <br />
        <div>(1) Another program may be editing the same file. If this is the case,</div>
        <div>
          be careful not to end up with two different instances of the same
        </div>
        <div>file when making changes. Quit, or continue with caution.</div>
        <br />
        <div>(2) An edit session for this file crashed.</div>
        <div>
          If this is the case, use <span className="ok">&quot;:recover&quot;</span> or{' '}
          <span className="ok">&quot;vim -r portfolio.html&quot;</span>
        </div>
        <div>
          to recover the changes (see <span className="ok">&quot;:help recovery&quot;</span>
          ).
        </div>
        <div>
          If you did this already, delete the swap file{' '}
          <span className="label">&quot;.portfolio.html.swp&quot;</span>
        </div>
        <div> to avoid this message.</div>
        <br />
        <div className="vim-prompt">
          Swap file <span className="label">&quot;.portfolio.html.swp&quot;</span> already
          exists!
        </div>
        <div className="vim-menu">
          <span>
            <span className="opt">[O]</span>pen Read-Only,
          </span>{' '}
          <span>
            <span className="opt">(E)</span>dit anyway,
          </span>{' '}
          <span>
            <span className="opt">(R)</span>ecover,
          </span>{' '}
          <span>
            <span className="opt">(D)</span>elete it,
          </span>{' '}
          <span>
            <span className="opt">(Q)</span>uit,
          </span>{' '}
          <span>
            <span className="opt">(A)</span>bort:
          </span>
          <span className="blink" aria-hidden="true" />
        </div>
      </div>
      <div className="vim-status">
        <span>
          &quot;portfolio.html&quot; [unix] [readonly] 1,1 Top
        </span>
        <span>NORMAL</span>
      </div>
      <div className="vim-cmdline">
        E37: No write since last change (add ! to override)
      </div>
    </div>
  )
}

function formatVimDate(date: Date): string {
  const parts = date.toString().split(' ')
  return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[4]} ${parts[3]}`
}

export function createVoidDates() {
  const now = new Date()
  return {
    now: formatVimDate(now),
    before: formatVimDate(new Date(now.getTime() - 9000)),
  }
}
