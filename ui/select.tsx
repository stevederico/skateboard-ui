"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { mergeRefs } from "./slot.js"
import { Portal } from "./portal.js"
import { useFloating, type Side, type Align } from "./use-floating.js"
import { usePresence } from "./use-presence.js"
import { useControllableState } from "./use-controllable-state.js"
import { useTypeahead } from "./use-typeahead.js"
import { usePointerMoved } from "./use-pointer-moved.js"
import { ChevronDownIcon, CheckIcon } from "../icons/index.js"

type SelectContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  value: string | undefined
  setValue: (value: string) => void
  triggerRef: React.RefObject<HTMLElement | null>
  contentId: string
  triggerId: string
  labels: Record<string, React.ReactNode>
  registerLabel: (value: string, label: React.ReactNode) => void
  unregisterLabel: (value: string) => void
}
const SelectContext = React.createContext<SelectContextValue | null>(null)
function useSelect() {
  const ctx = React.useContext(SelectContext)
  if (!ctx) throw new Error("Select parts must be used within <Select>")
  return ctx
}

export interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

function Select({
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: SelectProps) {
  const [selected, setSelected] = useControllableState<string | undefined>({
    value,
    defaultValue,
    onChange: onValueChange as (v: string | undefined) => void,
  })
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const contentId = React.useId()
  const triggerId = React.useId()
  const [labels, setLabels] = React.useState<Record<string, React.ReactNode>>({})

  const registerLabel = React.useCallback(
    (v: string, label: React.ReactNode) =>
      setLabels((prev) => ({ ...prev, [v]: label })),
    []
  )
  const unregisterLabel = React.useCallback(
    (v: string) =>
      setLabels((prev) => {
        const { [v]: _, ...rest } = prev
        return rest
      }),
    []
  )

  const setValue = React.useCallback(
    (v: string) => {
      setSelected(v)
      setOpen(false)
      triggerRef.current?.focus()
    },
    [setSelected, setOpen]
  )

  return (
    <SelectContext.Provider
      value={{
        open: isOpen,
        setOpen,
        value: selected,
        setValue,
        triggerRef,
        contentId,
        triggerId,
        labels,
        registerLabel,
        unregisterLabel,
      }}
    >
      {children}
    </SelectContext.Provider>
  )
}

function SelectGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({
  className,
  placeholder,
  ...props
}: React.ComponentProps<"span"> & { placeholder?: React.ReactNode }) {
  const { value, labels } = useSelect()
  const label = value !== undefined ? labels[value] : undefined
  return (
    <span
      data-slot="select-value"
      data-placeholder={value === undefined ? "" : undefined}
      className={cn("flex flex-1 text-left", className)}
      {...props}
    >
      {label ?? placeholder ?? null}
    </span>
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  id,
  onClick,
  onKeyDown,
  ...props
}: React.ComponentProps<"button"> & { size?: "sm" | "default" }) {
  const { open, setOpen, value, triggerRef, contentId, triggerId } = useSelect()
  // Give the trigger a stable id so the listbox can point back at it via
  // aria-labelledby — naming the popup with its combobox. Honor a consumer id
  // when supplied so an existing label association isn't clobbered.
  const resolvedTriggerId = id ?? triggerId
  return (
    <button
      ref={triggerRef as React.Ref<HTMLButtonElement>}
      type="button"
      id={resolvedTriggerId}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={open ? contentId : undefined}
      data-slot="select-trigger"
      data-size={size}
      data-state={open ? "open" : "closed"}
      data-placeholder={value === undefined ? "" : undefined}
      className={cn(
        "flex w-fit cursor-pointer items-center justify-between gap-1.5 rounded-md border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(!open)
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e)
        if (e.defaultPrevented) return
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setOpen(true)
        }
      }}
      {...props}
    >
      {children}
      <ChevronDownIcon />
    </button>
  )
}

function optionsOf(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>('[role="option"]:not([data-disabled])')
  )
}

export interface SelectContentProps extends React.ComponentProps<"div"> {
  side?: Side
  align?: Align
  sideOffset?: number
  alignOffset?: number
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  onKeyDown,
  ...props
}: SelectContentProps) {
  const { open, setOpen, value, triggerRef, contentId, triggerId } = useSelect()
  const [mounted, presenceRef] = usePresence<HTMLDivElement>(open)
  const { floatingRef, pos } = useFloating(triggerRef, mounted, {
    side,
    align,
    sideOffset,
    alignOffset,
  })
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { onTypeaheadKeyDown } = useTypeahead()
  const hasPointerMoved = usePointerMoved()

  // Focus the selected (or first) option once the popup is actually visible.
  const didFocus = React.useRef(false)
  React.useEffect(() => {
    if (!open) {
      didFocus.current = false
      return
    }
    let raf = 0
    const tryFocus = () => {
      const c = containerRef.current
      if (c && getComputedStyle(c).visibility !== "hidden") {
        didFocus.current = true
        const opts = optionsOf(c)
        const selected = opts.find((o) => o.getAttribute("data-value") === value)
        ;(selected ?? opts[0])?.focus()
      } else if (!didFocus.current) {
        raf = requestAnimationFrame(tryFocus)
      }
    }
    raf = requestAnimationFrame(tryFocus)
    return () => cancelAnimationFrame(raf)
  }, [open, value])

  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (triggerRef.current?.contains(t)) return
      if (containerRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown, true)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true)
    }
  }, [open, setOpen, triggerRef])

  // While closed, render the items into a hidden tree so their value→label
  // mappings register — this lets SelectValue show the selected label on initial
  // render, before the listbox has ever been opened.
  if (!mounted) {
    return (
      <div hidden aria-hidden data-slot="select-content-registry">
        {children}
      </div>
    )
  }
  const triggerWidth = triggerRef.current?.offsetWidth
  // Name the listbox after its combobox trigger for screen readers. Prefer the
  // trigger's live DOM id (which reflects any consumer-supplied id) and fall
  // back to the context-generated triggerId.
  const labelledById = triggerRef.current?.id || triggerId
  return (
    <Portal>
      <div
        ref={mergeRefs(floatingRef, presenceRef, containerRef)}
        id={contentId}
        role="listbox"
        aria-labelledby={labelledById}
        tabIndex={-1}
        data-slot="select-content"
        data-state={open ? "open" : "closed"}
        data-open={open ? "" : undefined}
        data-closed={open ? undefined : ""}
        data-side={pos?.side ?? side}
        style={{
          position: "fixed",
          left: pos?.x ?? 0,
          top: pos?.y ?? 0,
          minWidth: triggerWidth,
          visibility: pos ? "visible" : "hidden",
          ["--transform-origin" as string]: pos?.transformOrigin ?? "center",
          ["--available-height" as string]: pos ? `${pos.availableHeight}px` : undefined,
        }}
        onPointerMove={(e) => {
          // Ignore synthetic pointermoves fired by keyboard arrow scrolling
          // (same coords) — otherwise pointer focus yanks focus off the
          // keyboard-navigated option right after it scrolls into view.
          if (!hasPointerMoved(e)) return
          const opt = (e.target as HTMLElement).closest(
            '[role="option"]:not([data-disabled])'
          ) as HTMLElement | null
          if (opt && opt !== document.activeElement) opt.focus()
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e)
          if (e.defaultPrevented) return
          const c = containerRef.current!
          const opts = optionsOf(c)
          const idx = opts.indexOf(document.activeElement as HTMLElement)
          if (e.key === "ArrowDown") {
            e.preventDefault()
            opts[idx < 0 ? 0 : (idx + 1) % opts.length]?.focus()
          } else if (e.key === "ArrowUp") {
            e.preventDefault()
            opts[idx < 0 ? opts.length - 1 : (idx - 1 + opts.length) % opts.length]?.focus()
          } else if (e.key === "Home") {
            e.preventDefault()
            opts[0]?.focus()
          } else if (e.key === "End") {
            e.preventDefault()
            opts[opts.length - 1]?.focus()
          } else if (e.key === "Escape") {
            e.preventDefault()
            setOpen(false)
            triggerRef.current?.focus()
          } else if (e.key === "Enter" || e.key === " ") {
            const active = document.activeElement as HTMLElement | null
            if (active && c.contains(active) && active.getAttribute("role") === "option") {
              e.preventDefault()
              active.click()
            }
          } else {
            const match = onTypeaheadKeyDown(e, opts, idx)
            if (match) {
              e.preventDefault()
              match.focus()
            }
          }
        }}
        className={cn(
          "relative isolate z-50 max-h-(--available-height) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 transition-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </Portal>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export interface SelectItemProps
  extends Omit<React.ComponentProps<"div">, "value"> {
  value: string
  disabled?: boolean
}

function SelectItem({
  className,
  children,
  value,
  disabled,
  onClick,
  ...props
}: SelectItemProps) {
  const ctx = useSelect()
  const selected = ctx.value === value

  // Register the value→label mapping. Kept sticky (no unregister on unmount) so
  // SelectValue can still render the selected label after the list closes and
  // its items unmount.
  const { registerLabel } = ctx
  React.useEffect(() => {
    registerLabel(value, children)
  }, [value, children, registerLabel])

  return (
    <div
      role="option"
      tabIndex={-1}
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      data-slot="select-item"
      data-value={value}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        // focus-visible ring gives keyboard users a clear focus indicator;
        // focus:bg-accent alone is a weak signal and fails when accent contrast
        // is low, so pair it with a visible ring for arrow-key navigation.
        "relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      onClick={(e) => {
        if (disabled) return
        onClick?.(e)
        if (!e.defaultPrevented) ctx.setValue(value)
      }}
      {...props}
    >
      <span className="flex flex-1 shrink-0 items-center gap-2 whitespace-nowrap">
        {children}
      </span>
      {selected ? (
        <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
          <CheckIcon />
        </span>
      ) : null}
    </div>
  )
}

function SelectSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

/** No-op scroll buttons — native overflow handles scrolling. Kept for API parity. */
function SelectScrollUpButton(_props: React.ComponentProps<"div">) {
  return null
}
function SelectScrollDownButton(_props: React.ComponentProps<"div">) {
  return null
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
