"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { useControllableState } from "./use-controllable-state.js"

export interface SwitchProps
  extends Omit<React.ComponentProps<"button">, "onChange" | "value"> {
  size?: "sm" | "default"
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  /** When set, a hidden checkbox of this name mirrors the state for form posts. */
  name?: string
  value?: string
}

/**
 * Self-contained switch: a `role="switch"` button with controlled/uncontrolled
 * checked state. Emits `data-checked`/`data-unchecked`/`data-disabled` so the
 * shared classes apply. Pass `name` to include a hidden checkbox for forms.
 */
function Switch({
  className,
  size = "default",
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  name,
  value = "on",
  onClick,
  ...props
}: SwitchProps) {
  const [on, setOn] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  })
  return (
    <>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        data-slot="switch"
        data-size={size}
        data-state={on ? "checked" : "unchecked"}
        data-checked={on ? "" : undefined}
        data-unchecked={on ? undefined : ""}
        data-disabled={disabled ? "" : undefined}
        className={cn(
          "cursor-pointer peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
          className
        )}
        onClick={(e) => {
          onClick?.(e)
          if (!e.defaultPrevented) setOn(!on)
        }}
        {...props}
      >
        <span
          data-slot="switch-thumb"
          data-checked={on ? "" : undefined}
          data-unchecked={on ? undefined : ""}
          className="pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
        />
      </button>
      {name ? (
        <input
          type="checkbox"
          aria-hidden
          tabIndex={-1}
          name={name}
          value={value}
          checked={on}
          disabled={disabled}
          readOnly
          className="sr-only"
        />
      ) : null}
    </>
  )
}

export { Switch }
