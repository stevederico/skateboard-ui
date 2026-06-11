"use client"

import * as React from "react"

// Shared stack of open dismissable layers (most-recently-opened last). Escape
// only closes the topmost layer, so a popover opened inside a dialog doesn't
// close both at once.
const escapeStack: Array<() => void> = []

/**
 * Close an open layer on Escape or on a pointer press outside all of the given
 * elements (e.g. the popup and its trigger). The listeners are only attached
 * while `open`, and because the effect runs after the click that opened the
 * layer, that same click never re-closes it. Escape is stacked: only the
 * top layer closes, and the keydown is prevented/stopped so a native `<dialog>`
 * ancestor's Escape-to-close doesn't also fire.
 */
export function useDismiss(
  open: boolean,
  onDismiss: () => void,
  refs: Array<React.RefObject<HTMLElement | null>>
) {
  const onDismissRef = React.useRef(onDismiss)
  onDismissRef.current = onDismiss

  React.useEffect(() => {
    if (!open) return
    const token = () => onDismissRef.current()
    escapeStack.push(token)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      if (escapeStack[escapeStack.length - 1] !== token) return
      e.preventDefault()
      e.stopPropagation()
      onDismissRef.current()
    }
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null
      if (!target) return
      if (refs.some((r) => r.current && r.current.contains(target))) return
      onDismissRef.current()
    }
    document.addEventListener("keydown", onKeyDown, true)
    document.addEventListener("pointerdown", onPointerDown, true)
    return () => {
      const i = escapeStack.indexOf(token)
      if (i !== -1) escapeStack.splice(i, 1)
      document.removeEventListener("keydown", onKeyDown, true)
      document.removeEventListener("pointerdown", onPointerDown, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
}
