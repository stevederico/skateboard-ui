"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { useControllableState } from "./use-controllable-state.js"

export interface SliderProps
  extends Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> {
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  orientation?: "horizontal" | "vertical"
  disabled?: boolean
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/**
 * Self-contained slider with pointer drag and keyboard control. Supports one or
 * more thumbs (the nearest thumb to the pointer is the one that moves). Track,
 * range, and thumbs mirror the shadcn structure/classes.
 */
function Slider({
  className,
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  orientation = "horizontal",
  disabled = false,
  ...props
}: SliderProps) {
  const [values, setValues] = useControllableState<number[]>({
    value,
    defaultValue: defaultValue ?? [min],
    onChange: onValueChange,
  })
  const trackRef = React.useRef<HTMLDivElement>(null)
  const activeThumb = React.useRef<number>(0)
  const vertical = orientation === "vertical"

  const percent = (v: number) => ((v - min) / (max - min)) * 100

  const valueFromPointer = (clientX: number, clientY: number) => {
    const track = trackRef.current
    if (!track) return min
    const rect = track.getBoundingClientRect()
    const ratio = vertical
      ? (rect.bottom - clientY) / rect.height
      : (clientX - rect.left) / rect.width
    const raw = min + clamp(ratio, 0, 1) * (max - min)
    return clamp(Math.round(raw / step) * step, min, max)
  }

  const updateThumb = (index: number, next: number) => {
    setValues(values.map((v, i) => (i === index ? next : v)))
  }

  const nearestThumb = (v: number) => {
    let best = 0
    let bestDist = Infinity
    values.forEach((tv, i) => {
      const d = Math.abs(tv - v)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    })
    return best
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return
    const v = valueFromPointer(e.clientX, e.clientY)
    const idx = nearestThumb(v)
    activeThumb.current = idx
    updateThumb(idx, v)
    const target = e.currentTarget
    target.setPointerCapture(e.pointerId)
    const onMove = (ev: PointerEvent) => {
      updateThumb(activeThumb.current, valueFromPointer(ev.clientX, ev.clientY))
    }
    const onUp = (ev: PointerEvent) => {
      target.releasePointerCapture(ev.pointerId)
      target.removeEventListener("pointermove", onMove)
      target.removeEventListener("pointerup", onUp)
    }
    target.addEventListener("pointermove", onMove)
    target.addEventListener("pointerup", onUp)
  }

  const onThumbKeyDown =
    (index: number) => (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (disabled) return
      let next: number | null = null
      const cur = values[index]
      if (e.key === "ArrowRight" || e.key === "ArrowUp") next = cur + step
      else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = cur - step
      else if (e.key === "Home") next = min
      else if (e.key === "End") next = max
      if (next !== null) {
        e.preventDefault()
        updateThumb(index, clamp(next, min, max))
      }
    }

  const rangeStart = values.length > 1 ? Math.min(...values.map(percent)) : 0
  const rangeEnd = Math.max(...values.map(percent))

  return (
    <div
      data-slot="slider"
      data-orientation={orientation}
      data-disabled={disabled ? "" : undefined}
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      {...props}
    >
      <div
        data-orientation={orientation}
        onPointerDown={onPointerDown}
        className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col"
      >
        <div
          ref={trackRef}
          data-slot="slider-track"
          data-orientation={orientation}
          className="relative grow overflow-hidden rounded-full bg-muted select-none data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5"
        >
          <div
            data-slot="slider-range"
            data-orientation={orientation}
            className="absolute bg-primary select-none data-horizontal:h-full data-vertical:w-full"
            style={
              vertical
                ? { bottom: `${rangeStart}%`, height: `${rangeEnd - rangeStart}%` }
                : { left: `${rangeStart}%`, width: `${rangeEnd - rangeStart}%` }
            }
          />
        </div>
        {values.map((v, index) => (
          <span
            key={index}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={v}
            aria-orientation={orientation}
            aria-disabled={disabled || undefined}
            data-slot="slider-thumb"
            onKeyDown={onThumbKeyDown(index)}
            className="absolute block size-4 shrink-0 -translate-x-1/2 cursor-pointer rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] select-none hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-vertical:translate-x-0 data-vertical:-translate-y-1/2"
            data-orientation={orientation}
            style={
              vertical
                ? { bottom: `${percent(v)}%` }
                : { left: `${percent(v)}%` }
            }
          />
        ))}
      </div>
    </div>
  )
}

export { Slider }
