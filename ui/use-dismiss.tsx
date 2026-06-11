"use client"

import * as React from "react"

/**
 * Close an open layer on Escape or on a pointer press outside all of the given
 * elements (e.g. the popup and its trigger). The listeners are only attached
 * while `open`, and because the effect runs after the click that opened the
 * layer, that same click never re-closes it.
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
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismissRef.current()
    }
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null
      if (!target) return
      if (refs.some((r) => r.current && r.current.contains(target))) return
      onDismissRef.current()
    }
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown, true)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
}
