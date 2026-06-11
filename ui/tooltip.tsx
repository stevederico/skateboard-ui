"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { Slot, mergeRefs, resolveRender } from "./slot.js"
import { Portal } from "./portal.js"
import { useFloating, type Side, type Align } from "./use-floating.js"
import { usePresence } from "./use-presence.js"

type TooltipContextValue = {
  open: boolean
  show: () => void
  hide: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  contentId: string
}
const TooltipContext = React.createContext<TooltipContextValue | null>(null)
function useTooltip() {
  const ctx = React.useContext(TooltipContext)
  if (!ctx) throw new Error("Tooltip parts must be used within <Tooltip>")
  return ctx
}

const DelayContext = React.createContext<number>(0)

function TooltipProvider({
  delay = 0,
  children,
}: {
  delay?: number
  children?: React.ReactNode
}) {
  return <DelayContext.Provider value={delay}>{children}</DelayContext.Provider>
}

export interface TooltipProps {
  delay?: number
  defaultOpen?: boolean
  children?: React.ReactNode
}

function Tooltip({ delay, defaultOpen = false, children }: TooltipProps) {
  const providerDelay = React.useContext(DelayContext)
  const openDelay = delay ?? providerDelay
  const [open, setOpen] = React.useState(defaultOpen)
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const contentId = React.useId()
  const timer = React.useRef<number | undefined>(undefined)

  const show = React.useCallback(() => {
    window.clearTimeout(timer.current)
    if (openDelay > 0) {
      timer.current = window.setTimeout(() => setOpen(true), openDelay)
    } else {
      setOpen(true)
    }
  }, [openDelay])
  const hide = React.useCallback(() => {
    window.clearTimeout(timer.current)
    setOpen(false)
  }, [])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, hide])

  return (
    <TooltipContext.Provider value={{ open, show, hide, triggerRef, contentId }}>
      {children}
    </TooltipContext.Provider>
  )
}

function TooltipTrigger({
  asChild = false,
  render,
  nativeButton: _nativeButton,
  children,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  render?: React.ReactElement
  nativeButton?: boolean
}) {
  const { open, show, hide, triggerRef, contentId } = useTooltip()
  const { useSlot, slotChild } = resolveRender(asChild, render, children)
  const Comp: React.ElementType = useSlot ? Slot : "button"
  return (
    <Comp
      ref={triggerRef as React.Ref<HTMLButtonElement>}
      type={useSlot ? undefined : "button"}
      data-slot="tooltip-trigger"
      aria-describedby={open ? contentId : undefined}
      data-state={open ? "open" : "closed"}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        onMouseEnter?.(e)
        show()
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
        onMouseLeave?.(e)
        hide()
      }}
      onFocus={(e: React.FocusEvent<HTMLButtonElement>) => {
        onFocus?.(e)
        show()
      }}
      onBlur={(e: React.FocusEvent<HTMLButtonElement>) => {
        onBlur?.(e)
        hide()
      }}
      {...props}
    >
      {slotChild}
    </Comp>
  )
}

export interface TooltipContentProps extends React.ComponentProps<"div"> {
  side?: Side
  align?: Align
  sideOffset?: number
  alignOffset?: number
}

function TooltipContent({
  className,
  style,
  ref,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipContentProps) {
  const { open, contentId, triggerRef, hide } = useTooltip()
  const [mounted, presenceRef] = usePresence<HTMLDivElement>(open)
  const { floatingRef, pos } = useFloating(triggerRef, mounted, {
    side,
    align,
    sideOffset,
    alignOffset,
  })

  // Touch dismissal: on touch devices a tooltip can open via tap/long-press
  // (which focuses the trigger) with no pointer-leave/blur to close it again.
  // While open, close it when the user points outside both the trigger and the
  // content, and on scroll — so it can never get stuck on screen. Capture phase
  // ensures we observe the pointerdown even if inner handlers stop propagation.
  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target
      if (!(target instanceof Node)) return
      const trigger = triggerRef.current
      const content = presenceRef.current
      if (trigger?.contains(target) || content?.contains(target)) return
      hide()
    }
    const onScroll = () => hide()
    document.addEventListener("pointerdown", onPointerDown, true)
    window.addEventListener("scroll", onScroll, true)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true)
      window.removeEventListener("scroll", onScroll, true)
    }
  }, [open, hide, triggerRef, presenceRef])

  if (!mounted) return null
  return (
    <Portal>
      <div
        ref={mergeRefs(floatingRef, presenceRef, ref as React.Ref<HTMLDivElement>)}
        id={contentId}
        role="tooltip"
        data-slot="tooltip-content"
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
        className={cn(
          "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
