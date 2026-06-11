"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { useControllableState } from "./use-controllable-state.js"

type CollapsibleContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  triggerId: string
  panelId: string
}
const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(
  null
)

function useCollapsible() {
  const ctx = React.useContext(CollapsibleContext)
  if (!ctx)
    throw new Error("Collapsible parts must be used within <Collapsible>")
  return ctx
}

export interface CollapsibleProps
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

/** Self-contained collapsible region with a pure-CSS grid-rows height animation. */
function Collapsible({
  open,
  defaultOpen = false,
  onOpenChange,
  ...props
}: CollapsibleProps) {
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const reactId = React.useId()
  return (
    <CollapsibleContext.Provider
      value={{
        open: isOpen,
        setOpen,
        triggerId: `${reactId}-trigger`,
        panelId: `${reactId}-panel`,
      }}
    >
      <div data-slot="collapsible" data-state={isOpen ? "open" : "closed"} {...props} />
    </CollapsibleContext.Provider>
  )
}

function CollapsibleTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { open, setOpen, triggerId, panelId } = useCollapsible()
  return (
    <button
      type="button"
      id={triggerId}
      aria-expanded={open}
      aria-controls={panelId}
      data-slot="collapsible-trigger"
      data-state={open ? "open" : "closed"}
      className={cn("cursor-pointer", className)}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(!open)
      }}
      {...props}
    />
  )
}

function CollapsibleContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { open, triggerId, panelId } = useCollapsible()
  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={triggerId}
      inert={!open}
      data-slot="collapsible-content"
      data-state={open ? "open" : "closed"}
      className={cn(
        "grid transition-[grid-template-rows] duration-200 ease-out",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
      {...props}
    >
      <div className={cn("overflow-hidden", className)}>{children}</div>
    </div>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
