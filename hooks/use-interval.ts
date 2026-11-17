import * as React from "react"
import { useEffectEvent } from "./use-latest.js"

export function useInterval(fn: () => void, ms: number | null): void {
  const onTick = useEffectEvent(fn)
  React.useEffect(() => {
    if (ms === null) return
    const id = setInterval(() => onTick(), ms)
    return () => clearInterval(id)
  }, [ms])
}
