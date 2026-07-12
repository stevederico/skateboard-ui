import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

/**
 * Generic main-content loading placeholder (header bar + text + card grid).
 * Use inside SidebarInset / route content — not as a full-app takeover.
 */
function PageSkeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-skeleton"
      className={cn("flex flex-1 flex-col gap-4 p-4 lg:p-6", className)}
      aria-busy="true"
      aria-live="polite"
      {...props}
    >
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full max-w-xl" />
      <Skeleton className="h-4 w-4/5 max-w-lg" />
      <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    </div>
  )
}

/**
 * List/grid of bordered cards with avatar + text lines.
 * Match count to typical list size so layout stays stable.
 */
function CardListSkeleton({
  count = 6,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  count?: number
}) {
  return (
    <div
      data-slot="card-list-skeleton"
      className={cn("flex flex-1 flex-col gap-4 p-4 lg:p-6", className)}
      aria-busy="true"
      aria-live="polite"
      {...props}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg border border-border p-4"
          >
            <Skeleton className="size-12 shrink-0 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="mt-1 h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Settings page placeholder — header strip + stacked max-w-lg cards.
 */
function SettingsSkeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="settings-skeleton"
      className={cn("flex-1", className)}
      aria-busy="true"
      aria-live="polite"
      {...props}
    >
      <div className="flex h-(--header-height) shrink-0 items-center px-4 lg:px-6">
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="h-px bg-border" />
      <div className="flex flex-col items-center gap-4 p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex w-full max-w-lg items-center justify-between gap-4 rounded-xl border border-border p-6"
          >
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-8 w-20 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}

export { Skeleton, PageSkeleton, CardListSkeleton, SettingsSkeleton }
