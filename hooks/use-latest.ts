import * as React from "react"

export function useLatest<T>(value: T): React.RefObject<T> {
  const ref = React.useRef(value)
  React.useInsertionEffect(() => {
    ref.current = value
  })
  return ref
}

function useLatestCallback<A extends unknown[], R>(fn: (...args: A) => R): (...args: A) => R {
  const ref = useLatest(fn)
  return React.useCallback((...args: A) => ref.current(...args), [ref])
}

export const useEffectEvent: <A extends unknown[], R>(fn: (...args: A) => R) => (...args: A) => R =
  typeof React.useEffectEvent === "function" ? React.useEffectEvent : useLatestCallback
