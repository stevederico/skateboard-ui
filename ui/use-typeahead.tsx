"use client"

import * as React from "react"

const RESET_MS = 500

function labelOf(el: HTMLElement): string {
  return (el.textContent ?? "").trim().toLowerCase()
}

/**
 * WAI-ARIA typeahead for listbox/menu widgets. Collects printable keystrokes
 * into a buffer that resets after a short pause, then resolves the item whose
 * label matches the buffer (prefix match). Repeating a single character cycles
 * through the items starting with it. The caller owns the items and decides how
 * to focus/activate the returned match.
 *
 * Usage inside a keydown handler, after handling Arrow/Home/End/Enter/Escape/Tab:
 *   const match = onTypeaheadKeyDown(e, items, currentIndex)
 *   if (match) { e.preventDefault(); match.focus() }
 *
 * @returns `onTypeaheadKeyDown(event, items, activeIndex)` → matched element or null.
 *   `items` must be the enabled item elements in DOM order; `activeIndex` is the
 *   index of the currently focused item within `items` (-1 if none).
 */
export function useTypeahead() {
  const bufferRef = React.useRef("")
  const timerRef = React.useRef<number>(0)

  React.useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const onTypeaheadKeyDown = React.useCallback(
    (
      event: React.KeyboardEvent,
      items: HTMLElement[],
      activeIndex: number
    ): HTMLElement | null => {
      const key = event.key
      if (
        key.length !== 1 ||
        key === " " ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      )
        return null

      window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => {
        bufferRef.current = ""
      }, RESET_MS)

      const prev = bufferRef.current
      bufferRef.current += key.toLowerCase()
      const buffer = bufferRef.current

      const allSame =
        buffer.length > 1 && [...buffer].every((c) => c === buffer[0])
      const query = allSame ? buffer[0] : buffer

      const n = items.length
      if (n === 0) return null
      const start =
        allSame || prev === "" ? Math.max(0, activeIndex) + 1 : Math.max(0, activeIndex)
      for (let i = 0; i < n; i++) {
        const item = items[(start + i) % n]
        if (labelOf(item).startsWith(query)) return item
      }
      return null
    },
    []
  )

  return { onTypeaheadKeyDown }
}
