import * as React from "react"
import { useEffectEvent } from "./use-latest.js"

export type EventListenerTarget = EventTarget | React.RefObject<EventTarget | null> | null | undefined

function resolve(target: EventListenerTarget): EventTarget | null {
  if (!target) return null
  if ("current" in target && !("addEventListener" in target)) return target.current
  return target as EventTarget
}

export function useEventListener<K extends keyof WindowEventMap>(
  target: Window | null | undefined,
  type: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void
export function useEventListener<K extends keyof DocumentEventMap>(
  target: Document | null | undefined,
  type: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void
export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement | React.RefObject<HTMLElement | null> | null | undefined,
  type: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void
export function useEventListener<E extends Event = Event>(
  target: EventListenerTarget,
  type: string,
  handler: (event: E) => void,
  options?: boolean | AddEventListenerOptions,
): void
export function useEventListener(
  target: EventListenerTarget,
  type: string,
  handler: (event: Event) => void,
  options?: boolean | AddEventListenerOptions,
): void {
  const onEvent = useEffectEvent(handler)
  const capture = typeof options === "boolean" ? options : !!options?.capture
  const passive = typeof options === "object" ? options.passive : undefined
  const once = typeof options === "object" ? !!options.once : false

  React.useEffect(() => {
    const element = resolve(target)
    if (!element) return
    const listener = (event: Event) => onEvent(event)
    const opts: AddEventListenerOptions = { capture, once }
    if (passive !== undefined) opts.passive = passive
    element.addEventListener(type, listener, opts)
    return () => element.removeEventListener(type, listener, opts)
  }, [target, type, capture, passive, once])
}
