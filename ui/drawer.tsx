"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { Slot } from "./slot.js"
import { useControllableState } from "./use-controllable-state.js"
import { usePresence } from "./use-presence.js"

// Drag thresholds and animation timing ported from vaul (MIT — Emil Kowalski).
// https://github.com/emilkowalski/vaul/blob/main/src/constants.ts
const VELOCITY_THRESHOLD = 0.4
const CLOSE_THRESHOLD = 0.25
const TRANSITION = "transform 500ms cubic-bezier(0.32, 0.72, 0, 1)"

function dampenValue(v: number): number {
  return 8 * (Math.log(v + 1) - 2)
}

// Ported from vaul/src/index.tsx `shouldDrag`. Skips drag when the pointer is
// inside a scrollable child that isn't at scrollTop=0 (lets content scroll
// naturally), on a <select>, on a [data-no-drag] subtree, or when text is
// highlighted.
function shouldDrag(el: HTMLElement | null, popup: HTMLElement): boolean {
  let element = el
  if (window.getSelection()?.toString()) return false
  while (element && element !== popup) {
    if (element.tagName === "SELECT") return false
    if (element.hasAttribute?.("data-no-drag") || element.closest?.("[data-no-drag]")) return false
    if (element.scrollHeight > element.clientHeight && element.scrollTop !== 0) return false
    element = element.parentNode as HTMLElement | null
  }
  return true
}

type DrawerContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  titleId: string
  descriptionId: string
}
const DrawerContext = React.createContext<DrawerContextValue | null>(null)
function useDrawer() {
  const ctx = React.useContext(DrawerContext)
  if (!ctx) throw new Error("Drawer parts must be used within <Drawer>")
  return ctx
}

export interface DrawerProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

/**
 * Self-contained bottom drawer on native `<dialog>` (focus trap, Escape,
 * top-layer, ::backdrop) with vaul-style drag-to-dismiss: direct translate when
 * dragging down, logarithmic rubber-band damping when dragging up, dismiss past
 * 25% height or 0.4 px/ms velocity, otherwise snap back.
 */
function Drawer({ open, defaultOpen = false, onOpenChange, children }: DrawerProps) {
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const titleId = React.useId()
  const descriptionId = React.useId()
  return (
    <DrawerContext.Provider value={{ open: isOpen, setOpen, titleId, descriptionId }}>
      {children}
    </DrawerContext.Provider>
  )
}

function DrawerTrigger({
  asChild = false,
  onClick,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { open, setOpen } = useDrawer()
  const Comp: React.ElementType = asChild ? Slot : "button"
  return (
    <Comp
      type={asChild ? undefined : "button"}
      data-slot="drawer-trigger"
      aria-haspopup="dialog"
      data-state={open ? "open" : "closed"}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(true)
      }}
      {...props}
    />
  )
}

function DrawerClose({
  asChild = false,
  onClick,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { setOpen } = useDrawer()
  const Comp: React.ElementType = asChild ? Slot : "button"
  return (
    <Comp
      type={asChild ? undefined : "button"}
      data-slot="drawer-close"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(false)
      }}
      {...props}
    />
  )
}

/** No-op wrappers kept for API parity — the native `<dialog>` provides the
 * top-layer portal and the dim via `::backdrop`. */
function DrawerPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}
function DrawerOverlay() {
  return null
}

interface DragState {
  dragging: boolean
  startY: number
  height: number
  startTime: number
}

function DrawerContent({
  className,
  children,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  ...props
}: React.ComponentProps<"dialog">) {
  const { open, setOpen, titleId, descriptionId } = useDrawer()
  const ref = React.useRef<HTMLDialogElement>(null)
  const [mounted] = usePresence(open)
  const dragState = React.useRef<DragState>({ dragging: false, startY: 0, height: 0, startTime: 0 })

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    if (mounted && !node.open) node.showModal()
    else if (!mounted && node.open) node.close()
  }, [mounted])

  React.useEffect(() => {
    if (!mounted) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [mounted])

  // Clear any drag-leftover inline transform whenever we (re)open.
  React.useEffect(() => {
    if (open && ref.current) {
      ref.current.style.transition = ""
      ref.current.style.transform = ""
    }
  }, [open])

  const snapBack = React.useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = TRANSITION
    el.style.transform = ""
  }, [])

  const dismiss = React.useCallback(() => {
    const el = ref.current
    if (!el) {
      setOpen(false)
      return
    }
    el.style.transition = TRANSITION
    el.style.transform = "translate3d(0, 100%, 0)"
    window.setTimeout(() => setOpen(false), 500)
  }, [setOpen])

  const handlePointerDown = (event: React.PointerEvent<HTMLDialogElement>) => {
    onPointerDown?.(event)
    if (event.defaultPrevented) return
    const el = ref.current
    const target = event.target as HTMLElement | null
    if (!el || !shouldDrag(target, el)) return
    target?.setPointerCapture?.(event.pointerId)
    dragState.current = {
      dragging: true,
      startY: event.clientY,
      height: el.getBoundingClientRect().height || 0,
      startTime: event.timeStamp,
    }
    el.style.transition = "none"
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDialogElement>) => {
    onPointerMove?.(event)
    if (event.defaultPrevented) return
    const state = dragState.current
    const el = ref.current
    if (!state.dragging || !el) return
    const delta = event.clientY - state.startY
    if (delta >= 0) {
      // Dragging down toward close — direct translate
      el.style.transform = `translate3d(0, ${delta}px, 0)`
    } else {
      // Dragging up away from close — logarithmic rubber-band damping (vaul-style)
      el.style.transform = `translate3d(0, ${-dampenValue(-delta)}px, 0)`
    }
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDialogElement>) => {
    onPointerUp?.(event)
    if (event.defaultPrevented) return
    const state = dragState.current
    if (!state.dragging) return
    state.dragging = false
    const delta = event.clientY - state.startY
    const elapsed = Math.max(1, event.timeStamp - state.startTime)
    const velocity = Math.abs(delta) / elapsed
    if (delta < 0) {
      snapBack()
      return
    }
    if (velocity > VELOCITY_THRESHOLD || delta >= state.height * CLOSE_THRESHOLD) {
      dismiss()
    } else {
      snapBack()
    }
  }

  const handlePointerCancel = (event: React.PointerEvent<HTMLDialogElement>) => {
    onPointerCancel?.(event)
    if (event.defaultPrevented) return
    if (!dragState.current.dragging) return
    dragState.current.dragging = false
    snapBack()
  }

  if (!mounted) return null
  return (
    <dialog
      {...props}
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      data-slot="drawer-content"
      data-state={open ? "open" : "closed"}
      data-open={open ? "" : undefined}
      data-closed={open ? undefined : ""}
      onCancel={(e) => {
        e.preventDefault()
        setOpen(false)
      }}
      onClose={() => setOpen(false)}
      onClick={(e) => {
        if (e.target === ref.current && !dragState.current.dragging) setOpen(false)
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className={cn(
        // top-auto/m-0/w-full/max-w-none clear the native <dialog> UA inset and
        // sizing so the drawer pins to the bottom edge at full width.
        "fixed inset-x-0 top-auto bottom-0 z-50 m-0 flex max-h-[80vh] w-full max-w-none flex-col rounded-t-xl border-t border-border bg-background p-0 text-sm outline-none backdrop:bg-black/10 backdrop:transition-opacity backdrop:duration-250 supports-backdrop-filter:backdrop:backdrop-blur-xs",
        open
          ? "animate-in fade-in-0 slide-in-from-bottom-52 duration-300"
          : "animate-out fade-out-0 slide-out-to-bottom-52 duration-300",
        className
      )}
    >
      <div className="mx-auto mt-4 h-1.5 w-[100px] shrink-0 rounded-full bg-muted" />
      {children}
    </dialog>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-0.5 p-4 text-center md:gap-1.5 md:text-left", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: React.ComponentProps<"h2">) {
  const { titleId } = useDrawer()
  return (
    <h2
      id={titleId}
      data-slot="drawer-title"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  )
}

function DrawerDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { descriptionId } = useDrawer()
  return (
    <p
      id={descriptionId}
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
