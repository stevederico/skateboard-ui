"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { Button } from "./button.js"
import { Slot, resolveRender } from "./slot.js"
import { useControllableState } from "./use-controllable-state.js"
import { useDialogLabelling } from "./use-labelling.js"
import { useScrollLock } from "./use-scroll-lock.js"

type AlertDialogContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  titleId: string
  descriptionId: string
  /** Register the title part so `aria-labelledby` is wired only when present. */
  registerTitle: () => () => void
  /** Register the description part so `aria-describedby` is wired only when present. */
  registerDescription: () => () => void
  /** `aria-labelledby` value, or undefined when no title is rendered. */
  labelledBy: string | undefined
  /** `aria-describedby` value, or undefined when no description is rendered. */
  describedBy: string | undefined
}
const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(
  null
)
function useAlertDialog() {
  const ctx = React.useContext(AlertDialogContext)
  if (!ctx)
    throw new Error("AlertDialog parts must be used within <AlertDialog>")
  return ctx
}

export interface AlertDialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

/** Self-contained alert dialog on native `<dialog>`: Escape closes, but (unlike
 * Dialog) clicking the backdrop does not — a decision must be made. */
function AlertDialog({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: AlertDialogProps) {
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const {
    titleId,
    descriptionId,
    registerTitle,
    registerDescription,
    labelledBy,
    describedBy,
  } = useDialogLabelling()
  return (
    <AlertDialogContext.Provider
      value={{
        open: isOpen,
        setOpen,
        titleId,
        descriptionId,
        registerTitle,
        registerDescription,
        labelledBy,
        describedBy,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  )
}

function AlertDialogTrigger({
  className,
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
  const { open, setOpen } = useAlertDialog()
  const { useSlot, slotChild } = resolveRender(asChild, render, children)
  const Comp: React.ElementType = useSlot ? Slot : "button"
  return (
    <Comp
      type={useSlot ? undefined : "button"}
      data-slot="alert-dialog-trigger"
      aria-haspopup="dialog"
      data-state={open ? "open" : "closed"}
      className={cn("cursor-pointer", className)}
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

function AlertDialogPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}
function AlertDialogOverlay() {
  return null
}

export interface AlertDialogContentProps extends React.ComponentProps<"div"> {
  size?: "default" | "sm"
}

function AlertDialogContent({
  className,
  size = "default",
  children,
  ...props
}: AlertDialogContentProps) {
  const { open, setOpen, labelledBy, describedBy } = useAlertDialog()
  const ref = React.useRef<HTMLDialogElement>(null)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    if (open && !node.open) node.showModal()
    else if (!open && node.open) node.close()
  }, [open])

  // Lock background scroll while open via the shared reentrant helper so stacked
  // overlays don't unlock each other when one closes.
  useScrollLock(open)

  return (
    <dialog
      ref={ref}
      role="alertdialog"
      // Reference the title/description only when those parts are actually
      // rendered; a dangling IDREF is an a11y defect that assistive tech may
      // announce as an empty or broken label.
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      data-slot="alert-dialog-overlay"
      data-state={open ? "open" : "closed"}
      data-open={open ? "" : undefined}
      data-closed={open ? undefined : ""}
      onCancel={(e) => {
        e.preventDefault()
        setOpen(false)
      }}
      onClose={() => setOpen(false)}
      className="m-0 grid max-h-none max-w-none place-items-center bg-transparent p-4 backdrop:bg-black/10 backdrop:duration-100 supports-backdrop-filter:backdrop:backdrop-blur-xs open:fixed open:inset-0 open:size-full"
    >
      {open ? (
        <div
          data-slot="alert-dialog-content"
          data-size={size}
          data-state={open ? "open" : "closed"}
          data-open={open ? "" : undefined}
          className={cn(
            "group/alert-dialog-content relative grid w-full gap-6 rounded-xl bg-background p-6 text-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            className
          )}
          {...props}
        >
          {children}
        </div>
      ) : null}
    </dialog>
  )
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "mb-2 inline-flex size-16 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({ className, ...props }: React.ComponentProps<"h2">) {
  const { titleId, registerTitle } = useAlertDialog()
  // Signal that a title exists so the content wires `aria-labelledby` to it.
  React.useEffect(registerTitle, [registerTitle])
  return (
    <h2
      id={titleId}
      data-slot="alert-dialog-title"
      className={cn(
        "text-lg font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { descriptionId, registerDescription } = useAlertDialog()
  // Signal that a description exists so the content wires `aria-describedby`.
  React.useEffect(registerDescription, [registerDescription])
  return (
    <p
      id={descriptionId}
      data-slot="alert-dialog-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { setOpen } = useAlertDialog()
  return (
    <Button
      data-slot="alert-dialog-action"
      className={cn(className)}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(false)
      }}
      {...props}
    />
  )
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { setOpen } = useAlertDialog()
  return (
    <Button
      data-slot="alert-dialog-cancel"
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(false)
      }}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
