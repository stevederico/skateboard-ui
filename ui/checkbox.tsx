"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { CheckIcon } from "../icons/index.js"
import { useControllableState } from "./use-controllable-state.js"

export interface CheckboxProps
  extends Omit<React.ComponentProps<"button">, "onChange" | "value"> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  /** When set, a hidden checkbox of this name mirrors the state for form posts. */
  name?: string
  value?: string
}

/**
 * Self-contained checkbox: a `role="checkbox"` button with controlled/
 * uncontrolled checked state. Emits `data-checked`/`data-unchecked`/
 * `data-disabled` so the shared classes apply. Pass `name` to include a
 * hidden checkbox for forms.
 */
function Checkbox({
  className,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  name,
  value = "on",
  onClick,
  ...props
}: CheckboxProps) {
  const [on, setOn] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  })
  return (
    <>
      <button
        type="button"
        role="checkbox"
        aria-checked={on}
        disabled={disabled}
        data-slot="checkbox"
        data-state={on ? "checked" : "unchecked"}
        data-checked={on ? "" : undefined}
        data-unchecked={on ? undefined : ""}
        data-disabled={disabled ? "" : undefined}
        className={cn(
          "cursor-pointer peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input shadow-xs transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
          className
        )}
        onClick={(e) => {
          onClick?.(e)
          if (!e.defaultPrevented) setOn(!on)
        }}
        {...props}
      >
        {on ? (
          <span
            data-slot="checkbox-indicator"
            data-checked=""
            className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
          >
            <CheckIcon />
          </span>
        ) : null}
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

export { Checkbox }
