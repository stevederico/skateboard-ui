import * as React from "react"
import { useEffectEvent } from "./use-latest.js"

export function useMountEffect(fn: () => void | (() => void)): void {
  const onMount = useEffectEvent(fn)
  React.useEffect(() => onMount(), [])
}
