import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"

/**
 * Minimal `asChild` Slot — self-contained replacement for Radix Slot / Base UI's
 * `render` prop. Merges this slot's props onto its single child element:
 * `className` is class-merged, refs are composed, and the child's own props win
 * on any other collision (the child is the concrete element).
 *
 * This is the only behavioral helper the self-contained `ui/` tier depends on;
 * it carries no primitive framework. React 19 ref-as-prop, no forwardRef.
 */
function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.RefObject<T | null>).current = node
    }
  }
}

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
  ref?: React.Ref<HTMLElement>
}

function Slot({ children, className, ref, ...props }: SlotProps) {
  const child = React.Children.only(children) as React.ReactElement<
    Record<string, unknown>
  >
  const childProps = child.props as Record<string, unknown>
  return React.cloneElement(child, {
    ...props,
    ...childProps,
    className: cn(className, childProps.className as string | undefined),
    ref: mergeRefs(childProps.ref as React.Ref<HTMLElement>, ref),
  })
}

export { Slot, mergeRefs }
