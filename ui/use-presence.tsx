"use client"

import * as React from "react"

/**
 * Keep an element mounted through its CSS exit animation. When `open` flips to
 * false the element stays rendered (so `data-closed:animate-out` can play) until
 * its animations finish, then unmounts. Falls back to a timeout if there are
 * none. Returns `[mounted, ref]` — attach `ref` to the animated element.
 */
export function usePresence<T extends HTMLElement = HTMLElement>(
  open: boolean
): [boolean, React.RefObject<T | null>] {
  const ref = React.useRef<T | null>(null)
  const [mounted, setMounted] = React.useState(open)

  React.useEffect(() => {
    if (open) {
      setMounted(true)
      return
    }
    const node = ref.current
    if (!node) {
      setMounted(false)
      return
    }
    let cancelled = false
    let fallback = 0
    const finish = () => {
      if (!cancelled) setMounted(false)
    }
    // Let the data-closed classes apply and animations register, then wait for
    // the actual animations to finish (no short timeout racing them — that would
    // cut off any exit animation longer than the timeout). A generous backstop
    // only guards against animations that never settle.
    const raf = requestAnimationFrame(() => {
      const anims = node.getAnimations?.() ?? []
      if (anims.length === 0) {
        finish()
        return
      }
      Promise.allSettled(anims.map((a) => a.finished)).then(finish)
      fallback = window.setTimeout(finish, 2000)
    })
    return () => {
      cancelled = true
      window.clearTimeout(fallback)
      cancelAnimationFrame(raf)
    }
  }, [open])

  return [mounted, ref]
}
