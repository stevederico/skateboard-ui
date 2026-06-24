"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { ChevronDownIcon } from "../icons/index.js"
import { useControllableState } from "./use-controllable-state.js"

type AccordionContextValue = {
  value: string[]
  toggle: (value: string) => void
}
const AccordionContext = React.createContext<AccordionContextValue>({
  value: [],
  toggle: () => {},
})

type ItemContextValue = {
  value: string
  open: boolean
  triggerId: string
  panelId: string
}
const ItemContext = React.createContext<ItemContextValue | null>(null)

function useItem() {
  const ctx = React.useContext(ItemContext)
  if (!ctx)
    throw new Error("Accordion parts must be used within <AccordionItem>")
  return ctx
}

export interface AccordionProps
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  /** Allow more than one item open at once (default true, like Base UI). */
  openMultiple?: boolean
}

/**
 * Self-contained accordion. Open state is tracked as an array of item values;
 * panels animate height with a pure-CSS grid-rows transition (no measured
 * `--accordion-panel-height` var or keyframes).
 */
function Accordion({
  className,
  value: controlled,
  defaultValue = [],
  onValueChange,
  openMultiple = true,
  ...props
}: AccordionProps) {
  const [open, setOpen] = useControllableState<string[]>({
    value: controlled,
    defaultValue,
    onChange: onValueChange,
  })
  const toggle = (item: string) => {
    const has = open.includes(item)
    const next = has
      ? open.filter((v) => v !== item)
      : openMultiple
        ? [...open, item]
        : [item]
    setOpen(next)
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    props.onKeyDown?.(e)
    if (e.defaultPrevented) return
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return
    const triggers = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>(
        '[data-slot="accordion-trigger"]:not([disabled])'
      )
    )
    const current = triggers.findIndex((t) => t === document.activeElement)
    if (current < 0) return
    let next = -1
    if (e.key === "ArrowDown") next = (current + 1) % triggers.length
    else if (e.key === "ArrowUp")
      next = (current - 1 + triggers.length) % triggers.length
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = triggers.length - 1
    if (next >= 0) {
      e.preventDefault()
      triggers[next].focus()
    }
  }
  return (
    <AccordionContext.Provider value={{ value: open, toggle }}>
      <div
        data-slot="accordion"
        className={cn("flex w-full flex-col", className)}
        {...props}
        onKeyDown={onKeyDown}
      />
    </AccordionContext.Provider>
  )
}

export interface AccordionItemProps extends React.ComponentProps<"div"> {
  value: string
}

function AccordionItem({ className, value, ...props }: AccordionItemProps) {
  const { value: openValues } = React.useContext(AccordionContext)
  const open = openValues.includes(value)
  const reactId = React.useId()
  const ctx: ItemContextValue = {
    value,
    open,
    triggerId: `${reactId}-trigger`,
    panelId: `${reactId}-panel`,
  }
  return (
    <ItemContext.Provider value={ctx}>
      <div
        data-slot="accordion-item"
        data-state={open ? "open" : "closed"}
        className={cn("not-last:border-b", className)}
        {...props}
      />
    </ItemContext.Provider>
  )
}

function AccordionTrigger({
  className,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { value, open, triggerId, panelId } = useItem()
  const { toggle } = React.useContext(AccordionContext)
  return (
    <h3 className="flex">
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={panelId}
        data-slot="accordion-trigger"
        data-state={open ? "open" : "closed"}
        className={cn(
          "cursor-pointer group/accordion-trigger relative flex flex-1 items-start justify-between gap-4 rounded-md border border-transparent py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        onClick={(e) => {
          onClick?.(e)
          if (!e.defaultPrevented) toggle(value)
        }}
        {...props}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className="pointer-events-none mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/accordion-trigger:rotate-180"
        />
      </button>
    </h3>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { open, triggerId, panelId } = useItem()
  return (
    <div
      role="region"
      id={panelId}
      aria-labelledby={triggerId}
      inert={!open}
      data-slot="accordion-content"
      data-state={open ? "open" : "closed"}
      className={cn(
        "grid text-sm transition-[grid-template-rows] duration-200 ease-out",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
      {...props}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
