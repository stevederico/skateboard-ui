"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"

type ProgressContextValue = { value: number | null; max: number }

const ProgressContext = React.createContext<ProgressContextValue>({
  value: null,
  max: 100,
})

function usePercent() {
  const { value, max } = React.useContext(ProgressContext)
  if (value == null) return null
  return Math.min(100, Math.max(0, (value / max) * 100))
}

export interface ProgressProps extends React.ComponentProps<"div"> {
  value?: number | null
  max?: number
}

/**
 * Self-contained progress bar. Presentational only — exposes value/max via
 * context so the indicator can size itself and the value label can format.
 */
function Progress({
  className,
  children,
  value = null,
  max = 100,
  ...props
}: ProgressProps) {
  return (
    <ProgressContext.Provider value={{ value, max }}>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value ?? undefined}
        data-slot="progress"
        className={cn("flex flex-wrap gap-3", className)}
        {...props}
      >
        {children}
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </div>
    </ProgressContext.Provider>
  )
}

function ProgressTrack({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="progress-track"
      className={cn(
        "relative flex h-1.5 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) {
  const percent = usePercent()
  return (
    <div
      data-slot="progress-indicator"
      className={cn("h-full bg-primary transition-all", className)}
      style={{ width: `${percent ?? 0}%`, ...style }}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="progress-label"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

function ProgressValue({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  const percent = usePercent()
  return (
    <span
      data-slot="progress-value"
      className={cn(
        "ml-auto text-sm text-muted-foreground tabular-nums",
        className
      )}
      {...props}
    >
      {children ?? (percent == null ? null : `${Math.round(percent)}%`)}
    </span>
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
