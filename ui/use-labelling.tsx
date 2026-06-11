"use client"

import * as React from "react"

export interface DialogLabelling {
  titleId: string
  descriptionId: string
  /** Call from the title element's effect; returns the unregister cleanup. */
  registerTitle: () => () => void
  /** Call from the description element's effect; returns the unregister cleanup. */
  registerDescription: () => () => void
  /** `aria-labelledby` value — undefined when no title is rendered, so the
   * attribute is omitted instead of pointing at a missing element. */
  labelledBy: string | undefined
  /** `aria-describedby` value — undefined when no description is rendered. */
  describedBy: string | undefined
}

/**
 * Tracks whether a title/description part is actually rendered inside an overlay
 * so the container can wire `aria-labelledby`/`aria-describedby` only when the
 * referenced element exists. An unconditional IDREF to an absent node is an
 * accessibility defect (dangling reference) that assistive tech may announce as
 * an empty or broken label. Reference-counted so it is robust to remounting.
 */
export function useDialogLabelling(): DialogLabelling {
  const titleId = React.useId()
  const descriptionId = React.useId()
  const titleCount = React.useRef(0)
  const descriptionCount = React.useRef(0)
  const [hasTitle, setHasTitle] = React.useState(false)
  const [hasDescription, setHasDescription] = React.useState(false)

  const registerTitle = React.useCallback(() => {
    titleCount.current += 1
    setHasTitle(true)
    return () => {
      titleCount.current -= 1
      if (titleCount.current === 0) setHasTitle(false)
    }
  }, [])

  const registerDescription = React.useCallback(() => {
    descriptionCount.current += 1
    setHasDescription(true)
    return () => {
      descriptionCount.current -= 1
      if (descriptionCount.current === 0) setHasDescription(false)
    }
  }, [])

  return {
    titleId,
    descriptionId,
    registerTitle,
    registerDescription,
    labelledBy: hasTitle ? titleId : undefined,
    describedBy: hasDescription ? descriptionId : undefined,
  }
}
