import * as React from "react";
import { Children } from "react";
import { Button as ButtonPrimitive } from "../lib/base-ui/button.js"
import { cva, type VariantProps } from "../lib/cva.js";

import { cn } from "../lib/utils.js"

const buttonVariants = cva(
  "cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline: "border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive: "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "relative group text-white font-semibold transition-all duration-300 shadow-xl backdrop-blur-sm overflow-hidden gradient-btn",
      },
      size: {
        default: "h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs": "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-10",
        cta: "h-14 gap-2 px-8 text-lg rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<typeof ButtonPrimitive>,
    VariantProps<typeof buttonVariants> {
  /** Render the single child element styled as a button (shadcn-style). Bridged onto Base UI's `render` prop. */
  asChild?: boolean;
}

/**
 * Primary button component with variant and size support.
 */
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));
  // Base UI has no `asChild` — it uses a `render` prop. Bridge the shadcn-style
  // `asChild` API so `<Button asChild><a .../></Button>` renders the child element
  // (merged with button props) instead of leaking `asChild` onto the DOM <button>.
  if (asChild) {
    const child = Children.only(children) as React.ReactElement<Record<string, unknown>>;
    // Base UI defaults `nativeButton` to true and warns when the rendered element
    // isn't a real <button>. Infer it from the child so `<Button asChild><a/></Button>`
    // reports the correct semantics; an explicit `nativeButton` in props still wins.
    const isNativeButton = child.type === "button";
    return (
      <ButtonPrimitive
        data-slot="button"
        className={classes}
        nativeButton={isNativeButton}
        render={child}
        {...props} />
    );
  }
  return (
    <ButtonPrimitive
      data-slot="button"
      className={classes}
      {...props}>
      {children}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants }
