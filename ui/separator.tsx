"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"

export interface SeparatorProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical"
  /** Set true for a purely-visual divider hidden from a11y. Defaults to false
   * so the separator keeps `role="separator"` semantics (matches the spec). */
  decorative?: boolean
}

/**
 * Self-contained separator: a styled `<div>` with the correct ARIA role and
 * orientation. No primitive framework, no `data-orientation` style bridge —
 * orientation classes are applied directly.
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = false,
  ...props
}: SeparatorProps) {
  return (
    <div
      data-slot="separator"
      data-orientation={orientation}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "w-px self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
