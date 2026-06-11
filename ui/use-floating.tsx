"use client"

import * as React from "react"

export type Side = "top" | "bottom" | "left" | "right"
export type Align = "start" | "center" | "end"

export interface FloatingOptions {
  side?: Side
  align?: Align
  sideOffset?: number
  alignOffset?: number
}

export interface FloatingResult {
  x: number
  y: number
  side: Side
  align: Align
  transformOrigin: string
  /** Usable height (px) between the anchor and the viewport edge on the chosen
   * side, less offsets/padding. Exposed as `--available-height` so scrollable
   * popups (menus, selects) can clamp with `max-h-(--available-height)`. */
  availableHeight: number
}

const PAD = 8

const OPPOSITE: Record<Side, Side> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
}

/**
 * Pure positioning math: place a floating box relative to an anchor on the given
 * side/alignment, flipping to the opposite side when it would overflow and
 * shifting along the cross axis to stay within the viewport. A focused subset of
 * what a full floating-ui pipeline does — enough for popovers, menus, tooltips.
 */
export function computePosition(
  anchor: DOMRect,
  floating: { width: number; height: number },
  opts: Required<FloatingOptions>,
  viewport: { width: number; height: number }
): FloatingResult {
  let { side } = opts
  const { align, sideOffset, alignOffset } = opts

  const space = {
    top: anchor.top,
    bottom: viewport.height - anchor.bottom,
    left: anchor.left,
    right: viewport.width - anchor.right,
  }
  const isVertical = side === "top" || side === "bottom"
  const need =
    (isVertical ? floating.height : floating.width) + sideOffset
  if (space[side] < need && space[OPPOSITE[side]] > space[side]) {
    side = OPPOSITE[side]
  }
  const vertical = side === "top" || side === "bottom"

  let x = 0
  let y = 0
  if (side === "bottom") y = anchor.bottom + sideOffset
  else if (side === "top") y = anchor.top - floating.height - sideOffset
  else if (side === "right") x = anchor.right + sideOffset
  else x = anchor.left - floating.width - sideOffset

  if (vertical) {
    if (align === "start") x = anchor.left + alignOffset
    else if (align === "end") x = anchor.right - floating.width - alignOffset
    else x = anchor.left + anchor.width / 2 - floating.width / 2 + alignOffset
  } else {
    if (align === "start") y = anchor.top + alignOffset
    else if (align === "end") y = anchor.bottom - floating.height - alignOffset
    else y = anchor.top + anchor.height / 2 - floating.height / 2 + alignOffset
  }

  x = Math.max(PAD, Math.min(x, viewport.width - floating.width - PAD))
  y = Math.max(PAD, Math.min(y, viewport.height - floating.height - PAD))

  const originX = vertical
    ? align === "start"
      ? "left"
      : align === "end"
        ? "right"
        : "center"
    : side === "right"
      ? "left"
      : "right"
  const originY = vertical
    ? side === "bottom"
      ? "top"
      : "bottom"
    : align === "start"
      ? "top"
      : align === "end"
        ? "bottom"
        : "center"

  // Space left for the popup on its final side, so it can clamp + scroll
  // instead of overflowing the viewport. For left/right placements the popup
  // spans the cross axis, so the usable height is the full viewport less padding.
  const availableHeight = Math.max(
    0,
    (vertical ? space[side] - sideOffset : viewport.height) - PAD
  )

  return { x, y, side, align, transformOrigin: `${originX} ${originY}`, availableHeight }
}

/**
 * Position a floating element against an anchor, recomputing on scroll, resize,
 * and content resize while `open`. Attach `floatingRef` to the popup.
 */
export function useFloating(
  anchorRef: React.RefObject<HTMLElement | null>,
  open: boolean,
  options: FloatingOptions = {}
) {
  const floatingRef = React.useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = React.useState<FloatingResult | null>(null)

  const side = options.side ?? "bottom"
  const align = options.align ?? "center"
  const sideOffset = options.sideOffset ?? 0
  const alignOffset = options.alignOffset ?? 0

  const update = React.useCallback(() => {
    const a = anchorRef.current
    const f = floatingRef.current
    if (!a || !f) return
    setPos(
      computePosition(
        a.getBoundingClientRect(),
        { width: f.offsetWidth, height: f.offsetHeight },
        { side, align, sideOffset, alignOffset },
        { width: window.innerWidth, height: window.innerHeight }
      )
    )
  }, [anchorRef, side, align, sideOffset, alignOffset])

  React.useLayoutEffect(() => {
    // Drop the last position on close so a reopen stays visibility:hidden until
    // it is re-measured, rather than flashing one frame at stale coordinates.
    if (!open) {
      setPos(null)
      return
    }
    const ro = new ResizeObserver(update)
    window.addEventListener("scroll", update, true)
    window.addEventListener("resize", update)
    // The floating node is portaled and may attach a frame late (the Portal
    // defers rendering until its own effect runs). Retry each frame until the
    // ref is set, then measure + observe — otherwise the first update() runs
    // against a null ref, `pos` stays null, and the popup is stuck
    // `visibility:hidden`.
    let raf = 0
    const attach = () => {
      if (!floatingRef.current) {
        raf = requestAnimationFrame(attach)
        return
      }
      update()
      ro.observe(floatingRef.current)
      if (anchorRef.current) ro.observe(anchorRef.current)
    }
    attach()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", update, true)
      window.removeEventListener("resize", update)
      ro.disconnect()
    }
  }, [open, update, anchorRef])

  return { floatingRef, pos, update }
}
