'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const finePointer = window.matchMedia('(pointer: fine)').matches

    // Only take over the cursor for mouse users who haven't opted out of motion.
    if (!finePointer || reduceMotion) return

    let cursorOn = false
    const interactiveElements = document.querySelectorAll('a, button, input')

    const onMouseMove = (event: MouseEvent) => {
      if (!cursorOn) {
        document.body.classList.add('has-custom-cursor')
        cursorOn = true
      }

      cursor.style.left = `${event.clientX}px`
      cursor.style.top = `${event.clientY}px`
    }

    const onMouseEnter = () => cursor.classList.add('hovered')
    const onMouseLeave = () => cursor.classList.remove('hovered')

    document.addEventListener('mousemove', onMouseMove)
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', onMouseEnter)
      element.addEventListener('mouseleave', onMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', onMouseEnter)
        element.removeEventListener('mouseleave', onMouseLeave)
      })
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return <div id="cursor" ref={cursorRef} aria-hidden="true" />
}
