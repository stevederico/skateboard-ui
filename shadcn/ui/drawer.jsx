import * as React from "react"
import { Dialog as DialogPrimitive } from "../lib/base-ui/dialog.js"

import { cn } from "../lib/utils.js"

// Drag thresholds and animation timing ported from vaul (MIT — Emil Kowalski).
// https://github.com/emilkowalski/vaul/blob/main/src/constants.ts
const VELOCITY_THRESHOLD = 0.4
const CLOSE_THRESHOLD = 0.25
const TRANSITION = "transform 500ms cubic-bezier(0.32, 0.72, 0, 1)"

function dampenValue(v) {
  return 8 * (Math.log(v + 1) - 2)
}

// Ported from vaul/src/index.tsx `shouldDrag`. Skips drag when the pointer is
// inside a scrollable child that isn't at scrollTop=0 (lets content scroll
// naturally), on a <select>, on a [data-no-drag] subtree, or when text is
// highlighted.
function shouldDrag(el, popup) {
  let element = el
  if (window.getSelection()?.toString()) return false
  while (element && element !== popup) {
    if (element.tagName === "SELECT") return false
    if (element.hasAttribute?.("data-no-drag") || element.closest?.("[data-no-drag]")) return false
    if (element.scrollHeight > element.clientHeight && element.scrollTop !== 0) return false
    element = element.parentNode
  }
  return true
}

const DrawerCtx = React.createContext(null)

function Drawer({ open, defaultOpen, onOpenChange, ...props }) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false)
  const isControlled = open !== undefined
  const actualOpen = isControlled ? open : internalOpen
  const handleOpenChange = React.useCallback(
    (next) => {
      if (!isControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )
  return (
    <DrawerCtx.Provider value={{ onOpenChange: handleOpenChange }}>
      <DialogPrimitive.Root
        data-slot="drawer"
        open={actualOpen}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </DrawerCtx.Provider>
  )
}

function DrawerTrigger(props) {
  return <DialogPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal(props) {
  return <DialogPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose(props) {
  return <DialogPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn("drawer-backdrop fixed inset-0 z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs", className)}
      {...props}
    />
  )
}

function DrawerContent({ className, children, ...props }) {
  const popupRef = React.useRef(null)
  const ctx = React.useContext(DrawerCtx)
  const dragState = React.useRef({ dragging: false, startY: 0, height: 0, startTime: 0 })

  const snapBack = React.useCallback(() => {
    const el = popupRef.current
    if (!el) return
    el.style.transition = ""
    el.style.transform = ""
  }, [])

  const dismiss = React.useCallback(() => {
    const el = popupRef.current
    if (!el) {
      ctx?.onOpenChange(false)
      return
    }
    el.style.transition = TRANSITION
    el.style.transform = "translate3d(0, 100%, 0)"
    window.setTimeout(() => {
      ctx?.onOpenChange(false)
    }, 500)
  }, [ctx])

  const handlePointerDown = React.useCallback((event) => {
    const el = popupRef.current
    if (!el || !shouldDrag(event.target, el)) return
    event.target.setPointerCapture?.(event.pointerId)
    dragState.current = {
      dragging: true,
      startY: event.clientY,
      height: el.getBoundingClientRect().height || 0,
      startTime: event.timeStamp,
    }
    el.style.transition = "none"
  }, [])

  const handlePointerMove = React.useCallback((event) => {
    const state = dragState.current
    if (!state.dragging) return
    const el = popupRef.current
    if (!el) return
    const delta = event.clientY - state.startY
    if (delta >= 0) {
      // Dragging down toward close — direct translate
      el.style.transform = `translate3d(0, ${delta}px, 0)`
    } else {
      // Dragging up away from close — logarithmic rubber-band damping (vaul-style)
      const damped = -dampenValue(-delta)
      el.style.transform = `translate3d(0, ${damped}px, 0)`
    }
  }, [])

  const handlePointerUp = React.useCallback(
    (event) => {
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
    },
    [dismiss, snapBack]
  )

  const handlePointerCancel = React.useCallback(() => {
    if (!dragState.current.dragging) return
    dragState.current.dragging = false
    snapBack()
  }, [snapBack])

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DialogPrimitive.Popup
        ref={popupRef}
        data-slot="drawer-content"
        className={cn("drawer-popup bg-background text-sm", className)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 h-1.5 w-[100px] shrink-0 rounded-full" />
        {children}
      </DialogPrimitive.Popup>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("gap-0.5 p-4 text-center md:gap-1.5 md:text-left flex flex-col", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("gap-2 p-4 mt-auto flex flex-col", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-medium", className)}
      {...props}
    />
  )
}

function DrawerDescription({ className, ...props }) {
  return (
    <DialogPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
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
