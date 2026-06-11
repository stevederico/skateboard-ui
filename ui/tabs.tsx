"use client"

import * as React from "react"
import { cva, type VariantProps } from "../shadcn/lib/cva.js"

import { cn } from "../shadcn/lib/utils.js"
import { useControllableState } from "./use-controllable-state.js"

type TabsContextValue = {
  value: string | undefined
  setValue: (value: string) => void
  orientation: "horizontal" | "vertical"
  idBase: string
}
const TabsContext = React.createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error("Tabs parts must be used within <Tabs>")
  return ctx
}

export interface TabsProps
  extends Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: "horizontal" | "vertical"
}

/**
 * Self-contained tabs. Controlled/uncontrolled active value; the list provides
 * roving arrow-key navigation with automatic activation (WAI-ARIA tabs pattern).
 */
function Tabs({
  className,
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  ...props
}: TabsProps) {
  const [active, setActive] = useControllableState<string | undefined>({
    value,
    defaultValue,
    onChange: onValueChange as (v: string | undefined) => void,
  })
  const idBase = React.useId()
  return (
    <TabsContext.Provider
      value={{ value: active, setValue: setActive, orientation, idBase }}
    >
      <div
        data-slot="tabs"
        data-orientation={orientation}
        className={cn("group/tabs flex gap-2 data-horizontal:flex-col", className)}
        {...props}
      />
    </TabsContext.Provider>
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-9 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  onKeyDown,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof tabsListVariants>) {
  const { orientation } = useTabs()
  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      onKeyDown={(e) => {
        onKeyDown?.(e)
        if (e.defaultPrevented) return
        const tabs = Array.from(
          e.currentTarget.querySelectorAll<HTMLButtonElement>(
            '[role="tab"]:not([disabled]):not([data-disabled])'
          )
        )
        const current = tabs.indexOf(
          document.activeElement as HTMLButtonElement
        )
        if (current < 0) return
        const horizontal = orientation !== "vertical"
        let next = -1
        if ((horizontal && e.key === "ArrowRight") || (!horizontal && e.key === "ArrowDown"))
          next = (current + 1) % tabs.length
        else if ((horizontal && e.key === "ArrowLeft") || (!horizontal && e.key === "ArrowUp"))
          next = (current - 1 + tabs.length) % tabs.length
        else if (e.key === "Home") next = 0
        else if (e.key === "End") next = tabs.length - 1
        if (next >= 0) {
          e.preventDefault()
          tabs[next].focus()
          tabs[next].click()
        }
      }}
      {...props}
    />
  )
}

export interface TabsTriggerProps
  extends Omit<React.ComponentProps<"button">, "value"> {
  value: string
}

function TabsTrigger({
  className,
  value,
  onClick,
  ...props
}: TabsTriggerProps) {
  const { value: active, setValue, idBase } = useTabs()
  const selected = active === value
  return (
    <button
      type="button"
      role="tab"
      id={`${idBase}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${idBase}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      data-slot="tabs-trigger"
      data-active={selected ? "" : undefined}
      className={cn(
        "cursor-pointer relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) setValue(value)
      }}
      {...props}
    />
  )
}

export interface TabsContentProps
  extends Omit<React.ComponentProps<"div">, "value"> {
  value: string
}

function TabsContent({ className, value, ...props }: TabsContentProps) {
  const { value: active, idBase } = useTabs()
  const selected = active === value
  return (
    <div
      role="tabpanel"
      id={`${idBase}-panel-${value}`}
      aria-labelledby={`${idBase}-tab-${value}`}
      hidden={!selected}
      tabIndex={0}
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
