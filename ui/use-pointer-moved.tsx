"use client"

import * as React from "react"

/**
 * Guard against synthetic `pointermove` events that fire when content scrolls
 * under a stationary pointer (e.g. keyboard arrow navigation scrolls the focused
 * item into view). Those events report the SAME client coordinates as the last,
 * so pointer-driven focus would otherwise yank focus off the keyboard target.
 *
 * Returns a predicate that is true only when the pointer's client position
 * actually changed since the previous call — wire it at the top of a menu's
 * `onPointerMove` and bail when it returns false.
 */
export function usePointerMoved(): (event: React.PointerEvent) => boolean {
  const last = React.useRef<{ x: number; y: number } | null>(null)
  return React.useCallback((event: React.PointerEvent): boolean => {
    const prev = last.current
    const moved = !prev || prev.x !== event.clientX || prev.y !== event.clientY
    last.current = { x: event.clientX, y: event.clientY }
    return moved
  }, [])
}
