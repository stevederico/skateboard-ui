"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { CheckIcon, MinusIcon } from "../icons/index.js"
import { useControllableState } from "./use-controllable-state.js"

/** Checked state of a checkbox: a real boolean, or the tri-state "mixed" value. */
type CheckedState = boolean | "indeterminate"

export interface CheckboxProps
  extends Omit<
    React.ComponentProps<"button">,
    "onChange" | "value" | "checked" | "defaultChecked"
  > {
  checked?: CheckedState
  defaultChecked?: CheckedState
  onCheckedChange?: (checked: boolean) => void
  /** When set, a hidden checkbox of this name mirrors the state for form posts. */
  name?: string
  value?: string
}

/**
 * Self-contained checkbox: a `role="checkbox"` button with controlled/
 * uncontrolled checked state. Supports a tri-state `"indeterminate"` (mixed)
 * value for incoming controlled/default state. Emits `data-checked`/
 * `data-unchecked`/`data-indeterminate`/`data-disabled` so the shared classes
 * apply. Pass `name` to include a hidden checkbox for forms.
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
  // The hook tracks the full tri-state so an incoming "indeterminate" survives;
  // onCheckedChange is fired separately in onClick where the value is always a
  // boolean, keeping the public callback signature unchanged.
  const [on, setOn] = useControllableState<CheckedState>({
    value: checked,
    defaultValue: defaultChecked,
  })
  const isIndeterminate = on === "indeterminate"
  // a11y: a tri-state checkbox must report "mixed" so assistive tech announces
  // the partial selection instead of a plain checked/unchecked state.
  const ariaChecked = isIndeterminate ? "mixed" : on
  return (
    <>
      <button
        type="button"
        role="checkbox"
        aria-checked={ariaChecked}
        disabled={disabled}
        data-slot="checkbox"
        data-state={isIndeterminate ? "indeterminate" : on ? "checked" : "unchecked"}
        // Indeterminate reuses the filled "checked" styling so the box still
        // reads as active; data-checked/data-unchecked stay boolean-only.
        data-checked={on === true || isIndeterminate ? "" : undefined}
        data-unchecked={on === false ? "" : undefined}
        data-indeterminate={isIndeterminate ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        className={cn(
          "cursor-pointer peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input shadow-xs transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
          className
        )}
        onClick={(e) => {
          onClick?.(e)
          if (e.defaultPrevented) return
          // A user click always resolves to a real boolean: indeterminate and
          // unchecked both become checked, checked becomes unchecked.
          const next = on === true ? false : true
          setOn(next)
          onCheckedChange?.(next)
        }}
        {...props}
      >
        {on === true ? (
          <span
            data-slot="checkbox-indicator"
            data-checked=""
            className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
          >
            <CheckIcon />
          </span>
        ) : isIndeterminate ? (
          <span
            data-slot="checkbox-indicator"
            data-indeterminate=""
            className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
          >
            <MinusIcon />
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
          checked={on === true}
          disabled={disabled}
          readOnly
          className="sr-only"
        />
      ) : null}
    </>
  )
}

export { Checkbox }
