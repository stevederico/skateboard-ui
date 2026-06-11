import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { Loader2Icon } from "../icons/index.js"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
