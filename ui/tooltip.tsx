"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { Slot, mergeRefs } from "./slot.js"
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
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { open, show, hide, triggerRef, contentId } = useTooltip()
  const Comp: React.ElementType = asChild ? Slot : "button"
  return (
    <Comp
      ref={triggerRef as React.Ref<HTMLButtonElement>}
      type={asChild ? undefined : "button"}
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
    />
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
  const { open, contentId, triggerRef } = useTooltip()
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
