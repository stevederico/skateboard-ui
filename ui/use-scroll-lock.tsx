"use client"

import * as React from "react"

let lockCount = 0
let previousOverflow = ""

/**
 * Lock background scroll while `active` is true, reentrant across any number of
 * simultaneously-open overlays. The original `body` overflow is captured on the
 * first lock and restored only when the last lock releases.
 */
export function useScrollLock(active: boolean): void {
  React.useEffect(() => {
    if (!active) return
    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
    }
    lockCount++
    return () => {
      lockCount--
      if (lockCount === 0) document.body.style.overflow = previousOverflow
    }
  }, [active])
}
