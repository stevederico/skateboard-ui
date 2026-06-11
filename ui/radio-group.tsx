"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { mergeRefs } from "./slot.js"
import { useControllableState } from "./use-controllable-state.js"

type RadioGroupContextValue = {
  value: string | undefined
  setValue: (value: string) => void
  name: string | undefined
}
const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null
)

function useRadioGroup() {
  const ctx = React.useContext(RadioGroupContext)
  if (!ctx)
    throw new Error("RadioGroupItem must be used within <RadioGroup>")
  return ctx
}

export interface RadioGroupProps
  extends Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
}

/**
 * Self-contained radio group. Single-select with roving tab index and arrow-key
 * navigation that moves focus and selection together (WAI-ARIA radiogroup).
 */
function RadioGroup({
  className,
  value,
  defaultValue,
  onValueChange,
  name,
  onKeyDown,
  ...props
}: RadioGroupProps) {
  const [selected, setSelected] = useControllableState<string | undefined>({
    value,
    defaultValue,
    onChange: onValueChange as (v: string | undefined) => void,
  })
  return (
    <RadioGroupContext.Provider
      value={{ value: selected, setValue: setSelected, name }}
    >
      <div
        role="radiogroup"
        data-slot="radio-group"
        className={cn("grid w-full gap-3", className)}
        onKeyDown={(e) => {
          onKeyDown?.(e)
          if (e.defaultPrevented) return
          if (
            !["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(e.key)
          )
            return
          const radios = Array.from(
            e.currentTarget.querySelectorAll<HTMLButtonElement>(
              '[role="radio"]:not([disabled]):not([data-disabled])'
            )
          )
          const current = radios.indexOf(
            document.activeElement as HTMLButtonElement
          )
          if (current < 0) return
          e.preventDefault()
          const forward = e.key === "ArrowDown" || e.key === "ArrowRight"
          const next = forward
            ? (current + 1) % radios.length
            : (current - 1 + radios.length) % radios.length
          radios[next].focus()
          radios[next].click()
        }}
        {...props}
      />
      {name ? (
        <input type="hidden" name={name} value={selected ?? ""} />
      ) : null}
    </RadioGroupContext.Provider>
  )
}

export interface RadioGroupItemProps
  extends Omit<React.ComponentProps<"button">, "value"> {
  value: string
}

function RadioGroupItem({
  className,
  value,
  onClick,
  disabled,
  ref,
  ...props
}: RadioGroupItemProps) {
  const { value: selected, setValue } = useRadioGroup()
  const checked = selected === value
  const btnRef = React.useRef<HTMLButtonElement>(null)
  // Roving tab index: the checked radio is the single tab stop. When nothing is
  // checked, only the first enabled radio is tabbable — making every radio
  // tabbable would put multiple stops in Tab order, breaking the radiogroup
  // pattern.
  const [isFirstEnabled, setIsFirstEnabled] = React.useState(false)
  React.useLayoutEffect(() => {
    if (selected !== undefined) return
    const el = btnRef.current
    const first = el?.parentElement?.querySelector(
      '[role="radio"]:not([disabled]):not([data-disabled])'
    )
    setIsFirstEnabled(first === el)
  })
  const tabbable = checked || (selected === undefined && isFirstEnabled)
  return (
    <button
      ref={mergeRefs(btnRef, ref)}
      type="button"
      role="radio"
      aria-checked={checked}
      disabled={disabled}
      tabIndex={tabbable ? 0 : -1}
      data-slot="radio-group-item"
      data-state={checked ? "checked" : "unchecked"}
      data-checked={checked ? "" : undefined}
      className={cn(
        "cursor-pointer group/radio-group-item peer relative flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      )}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) setValue(value)
      }}
      {...props}
    >
      {checked ? (
        <span
          data-slot="radio-group-indicator"
          className="size-2 rounded-full bg-primary-foreground"
        />
      ) : null}
    </button>
  )
}

export { RadioGroup, RadioGroupItem }
