"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { Button } from "./button.js"
import { Slot, resolveRender } from "./slot.js"
import { XIcon } from "../icons/index.js"
import { useControllableState } from "./use-controllable-state.js"
import { usePresence } from "./use-presence.js"

type SheetSide = "top" | "right" | "bottom" | "left"

type SheetContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  titleId: string
  descriptionId: string
}
const SheetContext = React.createContext<SheetContextValue | null>(null)
function useSheet() {
  const ctx = React.useContext(SheetContext)
  if (!ctx) throw new Error("Sheet parts must be used within <Sheet>")
  return ctx
}

export interface SheetProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

/** Self-contained sheet (drawer) on native `<dialog>`, sliding in from an edge.
 * Exit slide is preserved via {@link usePresence} before `dialog.close()`. */
function Sheet({ open, defaultOpen = false, onOpenChange, children }: SheetProps) {
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const titleId = React.useId()
  const descriptionId = React.useId()
  return (
    <SheetContext.Provider value={{ open: isOpen, setOpen, titleId, descriptionId }}>
      {children}
    </SheetContext.Provider>
  )
}

function SheetTrigger({
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
  const { open, setOpen } = useSheet()
  const { useSlot, slotChild } = resolveRender(asChild, render, children)
  const Comp: React.ElementType = useSlot ? Slot : "button"
  return (
    <Comp
      type={useSlot ? undefined : "button"}
      data-slot="sheet-trigger"
      aria-haspopup="dialog"
      data-state={open ? "open" : "closed"}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(true)
      }}
      {...props}
    >
      {slotChild}
    </Comp>
  )
}

function SheetClose({
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
  const { setOpen } = useSheet()
  const { useSlot, slotChild } = resolveRender(asChild, render, children)
  const Comp: React.ElementType = useSlot ? Slot : "button"
  return (
    <Comp
      type={useSlot ? undefined : "button"}
      data-slot="sheet-close"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(false)
      }}
      {...props}
    >
      {slotChild}
    </Comp>
  )
}

// `left-auto`/`right-auto`/etc. override the native <dialog> UA inset (left:0),
// otherwise `right-0` + a width would still anchor to the left edge.
const SIDE_POSITION: Record<SheetSide, string> = {
  right: "inset-y-0 right-0 left-auto h-full w-3/4 border-l sm:max-w-sm",
  left: "inset-y-0 left-0 right-auto h-full w-3/4 border-r sm:max-w-sm",
  top: "inset-x-0 top-0 bottom-auto h-auto border-b",
  bottom: "inset-x-0 bottom-0 top-auto h-auto border-t",
}
const SIDE_IN: Record<SheetSide, string> = {
  right: "slide-in-from-right-52",
  left: "slide-in-from-left-52",
  top: "slide-in-from-top-52",
  bottom: "slide-in-from-bottom-52",
}
const SIDE_OUT: Record<SheetSide, string> = {
  right: "slide-out-to-right-52",
  left: "slide-out-to-left-52",
  top: "slide-out-to-top-52",
  bottom: "slide-out-to-bottom-52",
}

export interface SheetContentProps extends React.ComponentProps<"dialog"> {
  side?: SheetSide
  showCloseButton?: boolean
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetContentProps) {
  const { open, setOpen, titleId, descriptionId } = useSheet()
  const ref = React.useRef<HTMLDialogElement>(null)
  const pointerDownOnBackdrop = React.useRef(false)
  const [mounted] = usePresence(open)

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

  if (!mounted) return null
  return (
    <dialog
      {...props}
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      data-slot="sheet-content"
      data-side={side}
      data-state={open ? "open" : "closed"}
      data-open={open ? "" : undefined}
      data-closed={open ? undefined : ""}
      onCancel={(e) => {
        e.preventDefault()
        setOpen(false)
      }}
      onClose={() => setOpen(false)}
      onPointerDown={(e) => {
        pointerDownOnBackdrop.current = e.target === ref.current
      }}
      onClick={(e) => {
        if (e.target === ref.current && pointerDownOnBackdrop.current) {
          setOpen(false)
        }
      }}
      className={cn(
        "m-0 flex max-h-none flex-col gap-4 bg-background bg-clip-padding p-0 text-sm text-foreground shadow-lg backdrop:bg-black/10 backdrop:duration-150 supports-backdrop-filter:backdrop:backdrop-blur-xs fixed",
        SIDE_POSITION[side],
        open
          ? `animate-in fade-in-0 ${SIDE_IN[side]} duration-200`
          : `animate-out fade-out-0 ${SIDE_OUT[side]} duration-200`,
        className
      )}
    >
      {children}
      {showCloseButton && (
        <SheetClose asChild>
          <Button variant="ghost" className="absolute top-4 right-4" size="icon-sm">
            <XIcon />
            <span className="sr-only">Close</span>
          </Button>
        </SheetClose>
      )}
    </dialog>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: React.ComponentProps<"h2">) {
  const { titleId } = useSheet()
  return (
    <h2
      id={titleId}
      data-slot="sheet-title"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { descriptionId } = useSheet()
  return (
    <p
      id={descriptionId}
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
