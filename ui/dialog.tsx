"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { Button } from "./button.js"
import { Slot } from "./slot.js"
import { XIcon } from "../icons/index.js"
import { useControllableState } from "./use-controllable-state.js"

type DialogContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  titleId: string
  descriptionId: string
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
  const titleId = React.useId()
  const descriptionId = React.useId()
  return (
    <DialogContext.Provider value={{ open: isOpen, setOpen, titleId, descriptionId }}>
      {children}
    </DialogContext.Provider>
  )
}

function DialogTrigger({
  asChild = false,
  onClick,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { open, setOpen } = useDialog()
  const Comp: React.ElementType = asChild ? Slot : "button"
  return (
    <Comp
      type={asChild ? undefined : "button"}
      data-slot="dialog-trigger"
      aria-haspopup="dialog"
      aria-expanded={open}
      data-state={open ? "open" : "closed"}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(true)
      }}
      {...props}
    />
  )
}

function DialogClose({
  asChild = false,
  onClick,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { setOpen } = useDialog()
  const Comp: React.ElementType = asChild ? Slot : "button"
  return (
    <Comp
      type={asChild ? undefined : "button"}
      data-slot="dialog-close"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(false)
      }}
      {...props}
    />
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
  const { open, setOpen, titleId, descriptionId } = useDialog()
  const ref = React.useRef<HTMLDialogElement>(null)
  const pointerDownOnBackdrop = React.useRef(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    if (open && !node.open) node.showModal()
    else if (!open && node.open) node.close()
  }, [open])

  // Lock background scroll while open.
  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
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
  const { titleId } = useDialog()
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
  const { descriptionId } = useDialog()
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
