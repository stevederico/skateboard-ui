import * as React from "react"

/**
 * Controlled/uncontrolled state in one hook. If `value` is provided the state is
 * controlled (the hook just forwards it and calls `onChange`); otherwise it owns
 * the state internally, seeded by `defaultValue`. Self-contained, no deps.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}): [T, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultValue)
  const isControlled = value !== undefined
  const state = isControlled ? (value as T) : uncontrolled
  const setState = React.useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )
  return [state, setState]
}
