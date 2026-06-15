"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { Slot, mergeRefs, resolveRender } from "./slot.js"
import { Portal } from "./portal.js"
import { useFloating, type Side, type Align } from "./use-floating.js"
import { usePresence } from "./use-presence.js"
import { useControllableState } from "./use-controllable-state.js"

type HoverCardContextValue = {
  open: boolean
  scheduleOpen: () => void
  scheduleClose: () => void
  cancelClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  contentId: string
}
const HoverCardContext = React.createContext<HoverCardContextValue | null>(null)
function useHoverCard() {
  const ctx = React.useContext(HoverCardContext)
  if (!ctx) throw new Error("HoverCard parts must be used within <HoverCard>")
  return ctx
}

export interface HoverCardProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Delay before the card opens on hover/focus. */
  openDelay?: number
  /** Delay before the card closes after the pointer leaves. */
  closeDelay?: number
  children?: React.ReactNode
}

/**
 * Self-contained hover card: a popover that opens on trigger hover/focus after
 * `openDelay` and closes `closeDelay` after the pointer leaves both the
 * trigger and the content. One shared timer means re-entering the content
 * cancels a pending close.
 */
function HoverCard({
  open,
  defaultOpen = false,
  onOpenChange,
  openDelay = 700,
  closeDelay = 300,
  children,
}: HoverCardProps) {
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const contentId = React.useId()
  const timer = React.useRef<number | undefined>(undefined)

  const scheduleOpen = React.useCallback(() => {
    window.clearTimeout(timer.current)
    if (openDelay > 0) {
      timer.current = window.setTimeout(() => setOpen(true), openDelay)
    } else {
      setOpen(true)
    }
  }, [openDelay, setOpen])
  const scheduleClose = React.useCallback(() => {
    window.clearTimeout(timer.current)
    if (closeDelay > 0) {
      timer.current = window.setTimeout(() => setOpen(false), closeDelay)
    } else {
      setOpen(false)
    }
  }, [closeDelay, setOpen])
  const cancelClose = React.useCallback(() => {
    window.clearTimeout(timer.current)
  }, [])

  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  React.useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.clearTimeout(timer.current)
        setOpen(false)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isOpen, setOpen])

  return (
    <HoverCardContext.Provider
      value={{
        open: isOpen,
        scheduleOpen,
        scheduleClose,
        cancelClose,
        triggerRef,
        contentId,
      }}
    >
      {children}
    </HoverCardContext.Provider>
  )
}

function HoverCardTrigger({
  asChild = false,
  render,
  nativeButton: _nativeButton,
  children,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  render?: React.ReactElement
  nativeButton?: boolean
}) {
  const { open, scheduleOpen, scheduleClose, triggerRef, contentId } =
    useHoverCard()
  const { useSlot, slotChild } = resolveRender(asChild, render, children)
  const Comp: React.ElementType = useSlot ? Slot : "a"
  return (
    <Comp
      ref={triggerRef as React.Ref<HTMLAnchorElement>}
      data-slot="hover-card-trigger"
      aria-describedby={open ? contentId : undefined}
      data-state={open ? "open" : "closed"}
      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
        onMouseEnter?.(e)
        scheduleOpen()
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
        onMouseLeave?.(e)
        scheduleClose()
      }}
      onFocus={(e: React.FocusEvent<HTMLAnchorElement>) => {
        onFocus?.(e)
        scheduleOpen()
      }}
      onBlur={(e: React.FocusEvent<HTMLAnchorElement>) => {
        onBlur?.(e)
        scheduleClose()
      }}
      {...props}
    >
      {slotChild}
    </Comp>
  )
}

export interface HoverCardContentProps extends React.ComponentProps<"div"> {
  side?: Side
  align?: Align
  sideOffset?: number
  alignOffset?: number
}

function HoverCardContent({
  className,
  style,
  ref,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 4,
  onMouseEnter,
  onMouseLeave,
  ...props
}: HoverCardContentProps) {
  const { open, cancelClose, scheduleClose, triggerRef, contentId } =
    useHoverCard()
  const [mounted, presenceRef] = usePresence<HTMLDivElement>(open)
  const { floatingRef, pos } = useFloating(triggerRef, mounted, {
    side,
    align,
    sideOffset,
    alignOffset,
  })

  if (!mounted) return null
  return (
    <Portal>
      <div
        ref={mergeRefs(floatingRef, presenceRef, ref as React.Ref<HTMLDivElement>)}
        id={contentId}
        data-slot="hover-card-content"
        data-state={open ? "open" : "closed"}
        data-open={open ? "" : undefined}
        data-closed={open ? undefined : ""}
        data-side={pos?.side ?? side}
        style={{
          ...style,
          position: "fixed",
          left: pos?.x ?? 0,
          top: pos?.y ?? 0,
          visibility: pos ? "visible" : "hidden",
          ["--transform-origin" as string]: pos?.transformOrigin ?? "center",
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
          onMouseEnter?.(e)
          cancelClose()
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
          onMouseLeave?.(e)
          scheduleClose()
        }}
        className={cn(
          "isolate z-50 w-64 origin-(--transform-origin) rounded-lg bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden transition-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
