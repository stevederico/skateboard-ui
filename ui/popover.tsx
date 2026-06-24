"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { Slot, mergeRefs, resolveRender } from "./slot.js"
import { Portal } from "./portal.js"
import { useFloating, type Side, type Align } from "./use-floating.js"
import { useDismiss } from "./use-dismiss.js"
import { registerLayer } from "./layer-stack.js"
import { usePresence } from "./use-presence.js"
import { useControllableState } from "./use-controllable-state.js"
import { useDialogLabelling } from "./use-labelling.js"

type PopoverContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
  contentId: string
  // Labelling wiring: PopoverContent reads labelledBy/describedBy for its
  // role="dialog", and PopoverTitle/PopoverDescription register their ids so a
  // screen reader announces the dialog by its title instead of as "dialog".
  titleId: string
  descriptionId: string
  registerTitle: () => () => void
  registerDescription: () => () => void
  labelledBy: string | undefined
  describedBy: string | undefined
}
const PopoverContext = React.createContext<PopoverContextValue | null>(null)
function usePopover() {
  const ctx = React.useContext(PopoverContext)
  if (!ctx) throw new Error("Popover parts must be used within <Popover>")
  return ctx
}

export interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

function Popover({ open, defaultOpen = false, onOpenChange, children }: PopoverProps) {
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const contentId = React.useId()
  const labelling = useDialogLabelling()
  return (
    <PopoverContext.Provider
      value={{
        open: isOpen,
        setOpen,
        triggerRef,
        contentId,
        titleId: labelling.titleId,
        descriptionId: labelling.descriptionId,
        registerTitle: labelling.registerTitle,
        registerDescription: labelling.registerDescription,
        labelledBy: labelling.labelledBy,
        describedBy: labelling.describedBy,
      }}
    >
      {children}
    </PopoverContext.Provider>
  )
}

function PopoverTrigger({
  asChild = false,
  render,
  nativeButton: _nativeButton,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  render?: React.ReactElement
  nativeButton?: boolean
}) {
  const { open, setOpen, triggerRef, contentId } = usePopover()
  const { useSlot, slotChild } = resolveRender(asChild, render, children)
  const Comp: React.ElementType = useSlot ? Slot : "button"
  return (
    <Comp
      ref={triggerRef as React.Ref<HTMLButtonElement>}
      type={useSlot ? undefined : "button"}
      data-slot="popover-trigger"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={open ? contentId : undefined}
      data-state={open ? "open" : "closed"}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(!open)
      }}
      {...props}
    >
      {slotChild}
    </Comp>
  )
}

export interface PopoverContentProps extends React.ComponentProps<"div"> {
  side?: Side
  align?: Align
  sideOffset?: number
  alignOffset?: number
}

// Tabbable descendants, in DOM order, for focus-in and the Tab trap.
const FOCUSABLE_SELECTOR =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

function PopoverContent({
  className,
  style,
  ref,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  onKeyDown,
  ...props
}: PopoverContentProps) {
  const { open, setOpen, triggerRef, contentId, labelledBy, describedBy } = usePopover()
  const [mounted, presenceRef] = usePresence<HTMLDivElement>(open)
  const { floatingRef, pos } = useFloating(triggerRef, mounted, {
    side,
    align,
    sideOffset,
    alignOffset,
  })
  const contentRef = React.useRef<HTMLDivElement>(null)
  useDismiss(open, () => setOpen(false), [triggerRef, floatingRef])

  // Move focus into the popover when it opens and restore it to the trigger on
  // close — a role="dialog" must manage focus (native <dialog> does this for
  // free; this portaled div does not).
  React.useEffect(() => {
    if (!open) return
    const trigger = triggerRef.current
    let raf = 0
    // Retry across frames until the content is mounted AND visible: presence
    // mounts it a tick after `open` flips, and it stays visibility:hidden until
    // useFloating positions it — focus() on a missing or hidden node is a silent
    // no-op. The effect cleanup cancels this when the popover closes.
    let tries = 0
    const focusIn = () => {
      // Safety bound (~1.5s of frames) so a popover that can never take focus
      // doesn't spin forever.
      if (tries++ > 90) return
      const node = contentRef.current
      // Wait while the content is still mounting (presence renders it a tick
      // after `open` flips) or still positioning (it stays visibility:hidden
      // until useFloating measures it) — focus() on a missing/hidden node is a
      // silent no-op.
      if (!node || getComputedStyle(node).visibility === "hidden") {
        raf = requestAnimationFrame(focusIn)
        return
      }
      // Focus is already where it belongs.
      if (node.contains(document.activeElement)) return
      // Don't fight the user: if focus moved somewhere that isn't the trigger or
      // <body>, they placed it deliberately — stop chasing.
      const active = document.activeElement
      if (active && active !== trigger && active !== document.body) return
      const first = node.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
      ;(first ?? node).focus()
      // Even once visible, the target can be a frame away from being focusable,
      // so focus() may no-op — retry until focus genuinely lands inside.
      if (!node.contains(document.activeElement)) raf = requestAnimationFrame(focusIn)
    }
    raf = requestAnimationFrame(focusIn)
    return () => {
      cancelAnimationFrame(raf)
      // Only reclaim focus if it is still inside the popover (an outside click
      // already moved it elsewhere — don't yank it back).
      const node = contentRef.current
      if (trigger && node && node.contains(document.activeElement)) trigger.focus()
    }
  }, [open, triggerRef])

  // Register the floating content as an open dismissable layer while mounted, so
  // an outer overlay's outside-press dismiss ignores clicks landing inside this
  // popover (e.g. a popover nested in another popover). Keyed on `mounted` so it
  // runs once contentRef attaches.
  React.useEffect(() => {
    if (!mounted) return
    const node = contentRef.current
    if (!node) return
    return registerLayer(node)
  }, [mounted])

  if (!mounted) return null
  return (
    <Portal>
      <div
        ref={mergeRefs(floatingRef, presenceRef, contentRef, ref as React.Ref<HTMLDivElement>)}
        id={contentId}
        role="dialog"
        // Name/describe the dialog from its rendered Title/Description so screen
        // readers announce it by content; undefined omits a dangling IDREF.
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        data-slot="popover-content"
        data-state={open ? "open" : "closed"}
        data-open={open ? "" : undefined}
        data-closed={open ? undefined : ""}
        data-side={pos?.side ?? side}
        onKeyDown={(e) => {
          onKeyDown?.(e)
          if (e.defaultPrevented || e.key !== "Tab") return
          const node = contentRef.current
          if (!node) return
          const focusables = Array.from(
            node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
          ).filter((el) => el.offsetParent !== null || el === document.activeElement)
          if (focusables.length === 0) {
            e.preventDefault()
            node.focus()
            return
          }
          const first = focusables[0]
          const last = focusables[focusables.length - 1]
          const activeEl = document.activeElement
          if (e.shiftKey && (activeEl === first || activeEl === node)) {
            e.preventDefault()
            last.focus()
          } else if (!e.shiftKey && activeEl === last) {
            e.preventDefault()
            first.focus()
          }
        }}
        style={{
          ...style,
          position: "fixed",
          left: pos?.x ?? 0,
          top: pos?.y ?? 0,
          visibility: pos ? "visible" : "hidden",
          ["--transform-origin" as string]: pos?.transformOrigin ?? "center",
        }}
        className={cn(
          "isolate z-50 flex w-72 origin-(--transform-origin) flex-col gap-4 rounded-md bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden transition-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </Portal>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-1 text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  // Register this title's id so PopoverContent can point aria-labelledby at it.
  const { titleId, registerTitle } = usePopover()
  React.useEffect(registerTitle, [registerTitle])
  return (
    <h2
      id={titleId}
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

function PopoverDescription({ className, ...props }: React.ComponentProps<"p">) {
  // Register this description's id so PopoverContent can point aria-describedby at it.
  const { descriptionId, registerDescription } = usePopover()
  React.useEffect(registerDescription, [registerDescription])
  return (
    <p
      id={descriptionId}
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
}
