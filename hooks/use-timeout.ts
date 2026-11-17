import * as React from "react"
import { useEffectEvent } from "./use-latest.js"

export function useTimeout(fn: () => void, ms: number | null): void {
  const onTimeout = useEffectEvent(fn)
  React.useEffect(() => {
    if (ms === null) return
    const id = setTimeout(() => onTimeout(), ms)
    return () => clearTimeout(id)
  }, [ms])
}
