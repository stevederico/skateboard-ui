import * as React from "react"

function getServerSnapshot(): boolean {
  return false
}

export function useMediaQuery(query: string): boolean {
  const mql = React.useMemo(
    () => (typeof window === "undefined" || typeof window.matchMedia !== "function" ? null : window.matchMedia(query)),
    [query],
  )
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      if (!mql) return () => {}
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    },
    [mql],
  )
  const getSnapshot = React.useCallback(() => (mql ? mql.matches : false), [mql])
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
