"use client"

import * as React from "react"
import { type VariantProps } from "../shadcn/lib/cva.js"

import { cn } from "../shadcn/lib/utils.js"
import { toggleVariants } from "./toggle.js"
import { useControllableState } from "./use-controllable-state.js"

type GroupContext = VariantProps<typeof toggleVariants> & {
  spacing?: number
  orientation?: "horizontal" | "vertical"
  value: string[]
  toggle: (value: string) => void
}

const ToggleGroupContext = React.createContext<GroupContext>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
  value: [],
  toggle: () => {},
})

export interface ToggleGroupProps
  extends Omit<React.ComponentProps<"div">, "onChange">,
    VariantProps<typeof toggleVariants> {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  /** Allow more than one item selected at once. */
  toggleMultiple?: boolean
  spacing?: number
  orientation?: "horizontal" | "vertical"
}

/**
 * Self-contained toggle group: manages single- or multi-select state across its
 * items via context. Keyboard: native button focus order + Space/Enter (roving
 * arrow nav is intentionally omitted from this tier).
 */
function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  value,
  defaultValue = [],
  onValueChange,
  toggleMultiple = false,
  children,
  ...props
}: ToggleGroupProps) {
  const [selected, setSelected] = useControllableState<string[]>({
    value,
    defaultValue,
    onChange: onValueChange,
  })

  const toggle = React.useCallback(
    (item: string) => {
      const has = selected.includes(item)
      const next = toggleMultiple
        ? has
          ? selected.filter((v) => v !== item)
          : [...selected, item]
        : has
          ? []
          : [item]
      setSelected(next)
    },
    [selected, toggleMultiple, setSelected]
  )

  return (
    <div
      role="group"
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=0]:data-[variant=outline]:shadow-xs data-vertical:flex-col data-vertical:items-stretch",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing, orientation, value: selected, toggle }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </div>
  )
}

export interface ToggleGroupItemProps
  extends Omit<React.ComponentProps<"button">, "value">,
    VariantProps<typeof toggleVariants> {
  value: string
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  value,
  onClick,
  ...props
}: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext)
  const pressed = context.value.includes(value)

  return (
    <button
      type="button"
      data-slot="toggle-group-item"
      data-state={pressed ? "on" : "off"}
      aria-pressed={pressed}
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-[spacing=0]/toggle-group:shadow-none focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-md group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-md group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-md data-[state=on]:bg-muted group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) context.toggle(value)
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export { ToggleGroup, ToggleGroupItem }
