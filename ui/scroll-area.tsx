"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"

/**
 * Self-contained scroll area: a native-overflow viewport with the platform
 * scrollbar hidden, plus a custom thumb synced to scroll position and draggable.
 * Vertical and horizontal bars appear only when their axis overflows.
 */
function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = React.useState({
    vSize: 0,
    vPos: 0,
    hSize: 0,
    hPos: 0,
  })

  const sync = React.useCallback(() => {
    const vp = viewportRef.current
    if (!vp) return
    const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = vp
    setThumb({
      vSize: scrollHeight > clientHeight ? (clientHeight / scrollHeight) * 100 : 0,
      vPos: scrollHeight > clientHeight ? (scrollTop / scrollHeight) * 100 : 0,
      hSize: scrollWidth > clientWidth ? (clientWidth / scrollWidth) * 100 : 0,
      hPos: scrollWidth > clientWidth ? (scrollLeft / scrollWidth) * 100 : 0,
    })
  }, [])

  React.useLayoutEffect(() => {
    sync()
    const vp = viewportRef.current
    if (!vp) return
    const ro = new ResizeObserver(sync)
    ro.observe(vp)
    for (const child of Array.from(vp.children)) ro.observe(child)
    return () => ro.disconnect()
  }, [sync])

  const dragBar =
    (axis: "v" | "h") => (e: React.PointerEvent<HTMLDivElement>) => {
      const vp = viewportRef.current
      if (!vp) return
      const startPos = axis === "v" ? e.clientY : e.clientX
      const startScroll = axis === "v" ? vp.scrollTop : vp.scrollLeft
      const track = e.currentTarget
      const trackLen = axis === "v" ? track.clientHeight : track.clientWidth
      const scrollLen = axis === "v" ? vp.scrollHeight : vp.scrollWidth
      track.setPointerCapture(e.pointerId)
      const onMove = (ev: PointerEvent) => {
        const delta = (axis === "v" ? ev.clientY : ev.clientX) - startPos
        const next = startScroll + (delta / trackLen) * scrollLen
        if (axis === "v") vp.scrollTop = next
        else vp.scrollLeft = next
      }
      const onUp = (ev: PointerEvent) => {
        track.releasePointerCapture(ev.pointerId)
        track.removeEventListener("pointermove", onMove)
        track.removeEventListener("pointerup", onUp)
      }
      track.addEventListener("pointermove", onMove)
      track.addEventListener("pointerup", onUp)
    }

  return (
    <div
      data-slot="scroll-area"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        onScroll={sync}
        className="size-full overflow-auto rounded-[inherit] outline-none [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      {thumb.vSize > 0 && (
        <div
          data-slot="scroll-area-scrollbar"
          data-orientation="vertical"
          onPointerDown={dragBar("v")}
          className="absolute top-0 right-0 bottom-0 w-2.5 touch-none p-px select-none"
        >
          <div
            data-slot="scroll-area-thumb"
            className="absolute inset-x-px rounded-full bg-border"
            style={{ height: `${thumb.vSize}%`, top: `${thumb.vPos}%` }}
          />
        </div>
      )}
      {thumb.hSize > 0 && (
        <div
          data-slot="scroll-area-scrollbar"
          data-orientation="horizontal"
          onPointerDown={dragBar("h")}
          className="absolute right-0 bottom-0 left-0 h-2.5 touch-none p-px select-none"
        >
          <div
            data-slot="scroll-area-thumb"
            className="absolute inset-y-px rounded-full bg-border"
            style={{ width: `${thumb.hSize}%`, left: `${thumb.hPos}%` }}
          />
        </div>
      )}
    </div>
  )
}

function ScrollBar(_props: React.ComponentProps<"div">) {
  return null
}

export { ScrollArea, ScrollBar }
