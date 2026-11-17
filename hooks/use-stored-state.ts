import * as React from "react"
import { useEventListener } from "./use-event-listener.js"

export type StorageArea = "local" | "session"

export interface StoredStateOptions {
  storage?: StorageArea
}

function getStorage(area: StorageArea): Storage | null {
  try {
    if (typeof window === "undefined") return null
    return area === "session" ? window.sessionStorage : window.localStorage
  } catch {
    return null
  }
}

function parse<T>(raw: string | null, initial: T): T {
  if (raw === null) return initial
  try {
    return JSON.parse(raw) as T
  } catch {
    return initial
  }
}

function read<T>(area: StorageArea, key: string, initial: T): T {
  const storage = getStorage(area)
  if (!storage) return initial
  try {
    return parse(storage.getItem(key), initial)
  } catch {
    return initial
  }
}

function write<T>(area: StorageArea, key: string, value: T): boolean {
  const storage = getStorage(area)
  if (!storage) return false
  try {
    storage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function useStoredState<T>(
  key: string,
  initial: T,
  options: StoredStateOptions = {},
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const area = options.storage ?? "local"
  const [state, setState] = React.useState(() => ({ key, area, value: read(area, key, initial) }))
  let current = state
  if (state.key !== key || state.area !== area) {
    current = { key, area, value: read(area, key, initial) }
    setState(current)
  }

  const set = React.useCallback<React.Dispatch<React.SetStateAction<T>>>((action) => {
    setState((prev) => {
      const value = typeof action === "function" ? (action as (prev: T) => T)(prev.value) : action
      write(prev.area, prev.key, value)
      return { ...prev, value }
    })
  }, [])

  useEventListener(typeof window === "undefined" ? null : window, "storage", (event) => {
    if (event.storageArea !== getStorage(area)) return
    if (event.key !== null && event.key !== key) return
    setState({ key, area, value: event.key === null ? initial : parse(event.newValue, initial) })
  })

  return [current.value, set]
}
