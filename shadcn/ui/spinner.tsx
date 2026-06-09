import { cn } from "../lib/utils.js"
import { Loader2Icon } from "../../icons/index.js"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon />
  )
}

export { Spinner }
