"use client"

import * as React from "react"
import { createPortal } from "react-dom"

/** Render children into `container` (defaults to document.body), SSR-safe. */
function Portal({
  children,
  container,
}: {
  children: React.ReactNode
  container?: Element | null
}) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return createPortal(children, container ?? document.body)
}

export { Portal }
