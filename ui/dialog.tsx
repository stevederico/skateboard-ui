"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { Button } from "./button.js"
import { Slot, resolveRender } from "./slot.js"
import { XIcon } from "../icons/index.js"
import { useControllableState } from "./use-controllable-state.js"
import { useDialogLabelling } from "./use-labelling.js"
import { useScrollLock } from "./use-scroll-lock.js"

type DialogContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  titleId: string
  descriptionId: string
  /** Call from the title element's effect; returns the unregister cleanup. */
  registerTitle: () => () => void
  /** Call from the description element's effect; returns the unregister cleanup. */
  registerDescription: () => () => void
  /** `aria-labelledby` value, undefined when no title is rendered. */
  labelledBy: string | undefined
  /** `aria-describedby` value, undefined when no description is rendered. */
  describedBy: string | undefined
}
const DialogContext = React.createContext<DialogContextValue | null>(null)
function useDialog() {
  const ctx = React.useContext(DialogContext)
  if (!ctx) throw new Error("Dialog parts must be used within <Dialog>")
  return ctx
}

export interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

/**
 * Self-contained dialog built on the native `<dialog>` element: focus trapping,
 * Escape, top-layer stacking, and the `::backdrop` come from the platform, so no
 * hand-rolled focus trap or portal is needed.
 */
function Dialog({ open, defaultOpen = false, onOpenChange, children }: DialogProps) {
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  // Track which labelling parts actually render so DialogContent can reference
  // them only when present, avoiding a dangling aria-labelledby/-describedby IDREF.
  const labelling = useDialogLabelling()
  return (
    <DialogContext.Provider value={{ open: isOpen, setOpen, ...labelling }}>
      {children}
    </DialogContext.Provider>
  )
}

function DialogTrigger({
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
  const { open, setOpen } = useDialog()
  const { useSlot, slotChild } = resolveRender(asChild, render, children)
  const Comp: React.ElementType = useSlot ? Slot : "button"
  return (
    <Comp
      type={useSlot ? undefined : "button"}
      data-slot="dialog-trigger"
      aria-haspopup="dialog"
      aria-expanded={open}
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

function DialogClose({
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
  const { setOpen } = useDialog()
  const { useSlot, slotChild } = resolveRender(asChild, render, children)
  const Comp: React.ElementType = useSlot ? Slot : "button"
  return (
    <Comp
      type={useSlot ? undefined : "button"}
      data-slot="dialog-close"
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

/** No-op wrappers kept for API parity with the Base UI version. The native
 * `<dialog>` provides the portal/top-layer and the dim via `::backdrop`. */
function DialogPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}
function DialogOverlay() {
  return null
}

export interface DialogContentProps extends React.ComponentProps<"div"> {
  showCloseButton?: boolean
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  const { open, setOpen, labelledBy, describedBy } = useDialog()
  const ref = React.useRef<HTMLDialogElement>(null)
  const pointerDownOnBackdrop = React.useRef(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    if (open && !node.open) node.showModal()
    else if (!open && node.open) node.close()
  }, [open])

  // Reentrant, reference-counted scroll lock so stacked overlays don't clobber
  // each other's overflow restore (an inner close would otherwise unlock scroll
  // while an outer dialog is still open).
  useScrollLock(open)

  return (
    <dialog
      ref={ref}
      // Conditional so the attribute is omitted when no title/description is
      // rendered, instead of pointing at an id that doesn't exist (a dangling
      // IDREF assistive tech may announce as a broken/empty label).
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      data-slot="dialog-overlay"
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
        // Close only when the press both started and ended on the backdrop —
        // a drag that began inside the content (e.g. text selection) must not.
        if (e.target === ref.current && pointerDownOnBackdrop.current) {
          setOpen(false)
        }
      }}
      className="group/dialog m-0 grid max-h-none max-w-none place-items-center bg-transparent p-4 backdrop:bg-black/10 backdrop:duration-100 supports-backdrop-filter:backdrop:backdrop-blur-xs open:fixed open:inset-0 open:size-full"
    >
      {open ? (
        <div
          data-slot="dialog-content"
          data-state={open ? "open" : "closed"}
          data-open={open ? "" : undefined}
          className={cn(
            "relative grid w-full max-w-[calc(100%-2rem)] gap-6 rounded-xl bg-background p-6 text-sm text-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            className
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogClose asChild>
              <Button variant="ghost" className="absolute top-4 right-4" size="icon-sm">
                <XIcon />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          )}
        </div>
      ) : null}
    </dialog>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & { showCloseButton?: boolean }) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: React.ComponentProps<"h2">) {
  const { titleId, registerTitle } = useDialog()
  // Register presence so the container wires aria-labelledby only when a title exists.
  React.useEffect(registerTitle, [registerTitle])
  return (
    <h2
      id={titleId}
      data-slot="dialog-title"
      className={cn("leading-none font-medium", className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { descriptionId, registerDescription } = useDialog()
  // Register presence so the container wires aria-describedby only when a description exists.
  React.useEffect(registerDescription, [registerDescription])
  return (
    <p
      id={descriptionId}
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
