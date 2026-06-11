"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { Slot, mergeRefs, resolveRender } from "./slot.js"
import { Portal } from "./portal.js"
import { useFloating, type Side, type Align } from "./use-floating.js"
import { usePresence } from "./use-presence.js"
import { useControllableState } from "./use-controllable-state.js"
import { ChevronRightIcon, CheckIcon } from "../icons/index.js"

/* ------------------------------------------------------------------ *
 * Shared menu core: root state, dismiss across nested layers, and the
 * roving keyboard navigation used by dropdown-, context- and menubar menus.
 * ------------------------------------------------------------------ */

type MenuContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
  contentId: string
  layers: React.MutableRefObject<Set<HTMLElement>>
}
const MenuContext = React.createContext<MenuContextValue | null>(null)
function useMenu() {
  const ctx = React.useContext(MenuContext)
  if (!ctx) throw new Error("Menu parts must be used within <DropdownMenu>")
  return ctx
}

function itemsOf(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      ':scope > [role^="menuitem"]:not([data-disabled]), :scope > [data-slot="dropdown-menu-group"] > [role^="menuitem"]:not([data-disabled]), :scope > [data-slot="dropdown-menu-radio-group"] > [role^="menuitem"]:not([data-disabled])'
    )
  )
}

function moveFocus(
  container: HTMLElement,
  dir: "next" | "prev" | "first" | "last"
) {
  const items = itemsOf(container)
  if (!items.length) return
  const idx = items.indexOf(document.activeElement as HTMLElement)
  let next = 0
  if (dir === "first") next = 0
  else if (dir === "last") next = items.length - 1
  else if (dir === "next") next = idx < 0 ? 0 : (idx + 1) % items.length
  else next = idx < 0 ? items.length - 1 : (idx - 1 + items.length) % items.length
  items[next]?.focus()
}

export interface DropdownMenuProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

function DropdownMenu({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: DropdownMenuProps) {
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const contentId = React.useId()
  const layers = React.useRef<Set<HTMLElement>>(new Set())
  return (
    <MenuContext.Provider value={{ open: isOpen, setOpen, triggerRef, contentId, layers }}>
      {children}
    </MenuContext.Provider>
  )
}

function DropdownMenuPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function DropdownMenuTrigger({
  asChild = false,
  render,
  nativeButton: _nativeButton,
  children,
  onClick,
  onKeyDown,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  render?: React.ReactElement
  nativeButton?: boolean
}) {
  const { open, setOpen, triggerRef, contentId } = useMenu()
  const { useSlot, slotChild } = resolveRender(asChild, render, children)
  const Comp: React.ElementType = useSlot ? Slot : "button"
  return (
    <Comp
      ref={triggerRef as React.Ref<HTMLButtonElement>}
      type={useSlot ? undefined : "button"}
      data-slot="dropdown-menu-trigger"
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={open ? contentId : undefined}
      data-state={open ? "open" : "closed"}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(!open)
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
        onKeyDown?.(e)
        if (e.defaultPrevented) return
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setOpen(true)
        }
      }}
      {...props}
    >
      {slotChild}
    </Comp>
  )
}

export interface DropdownMenuContentProps extends React.ComponentProps<"div"> {
  side?: Side
  align?: Align
  sideOffset?: number
  alignOffset?: number
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  children,
  onKeyDown,
  ...props
}: DropdownMenuContentProps) {
  const { open, setOpen, triggerRef, contentId, layers } = useMenu()
  const [mounted, presenceRef] = usePresence<HTMLDivElement>(open)
  const { floatingRef, pos } = useFloating(triggerRef, mounted, {
    side,
    align,
    sideOffset,
    alignOffset,
  })
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const node = containerRef.current
    if (!node) return
    layers.current.add(node)
    return () => {
      layers.current.delete(node)
    }
  }, [mounted, layers])

  // Focus the first item once the popup is actually visible — a
  // visibility:hidden element can't take focus, so retry each frame until it is.
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
        moveFocus(c, "first")
      } else if (!didFocus.current) {
        raf = requestAnimationFrame(tryFocus)
      }
    }
    raf = requestAnimationFrame(tryFocus)
    return () => cancelAnimationFrame(raf)
  }, [open])

  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (triggerRef.current?.contains(t)) return
      for (const layer of layers.current) if (layer.contains(t)) return
      setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown, true)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true)
    }
  }, [open, setOpen, triggerRef, layers])

  if (!mounted) return null
  return (
    <Portal>
      <div
        ref={mergeRefs(floatingRef, presenceRef, containerRef)}
        id={contentId}
        role="menu"
        aria-orientation="vertical"
        tabIndex={-1}
        data-slot="dropdown-menu-content"
        data-state={open ? "open" : "closed"}
        data-open={open ? "" : undefined}
        data-closed={open ? undefined : ""}
        data-side={pos?.side ?? side}
        style={{
          position: "fixed",
          left: pos?.x ?? 0,
          top: pos?.y ?? 0,
          visibility: pos ? "visible" : "hidden",
          ["--transform-origin" as string]: pos?.transformOrigin ?? "center",
        }}
        onPointerMove={(e) => {
          const item = (e.target as HTMLElement).closest(
            '[role^="menuitem"]:not([data-disabled])'
          ) as HTMLElement | null
          if (item && item !== document.activeElement) item.focus()
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e)
          if (e.defaultPrevented) return
          const c = containerRef.current!
          if (e.key === "ArrowDown") (e.preventDefault(), moveFocus(c, "next"))
          else if (e.key === "ArrowUp") (e.preventDefault(), moveFocus(c, "prev"))
          else if (e.key === "Home") (e.preventDefault(), moveFocus(c, "first"))
          else if (e.key === "End") (e.preventDefault(), moveFocus(c, "last"))
          else if (e.key === "Escape") {
            e.preventDefault()
            setOpen(false)
            triggerRef.current?.focus()
          } else if (e.key === "Tab") {
            setOpen(false)
          } else if (e.key === "Enter" || e.key === " ") {
            const active = document.activeElement as HTMLElement | null
            if (active && c.contains(active) && active.getAttribute("role")?.startsWith("menuitem")) {
              e.preventDefault()
              active.click()
            }
          }
        }}
        className={cn(
          "z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </Portal>
  )
}

function DropdownMenuGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="group" data-slot="dropdown-menu-group" className={className} {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & { inset?: boolean }) {
  return (
    <div
      data-slot="dropdown-menu-label"
      data-inset={inset ? "" : undefined}
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground data-inset:pl-8",
        className
      )}
      {...props}
    />
  )
}

export interface DropdownMenuItemProps extends React.ComponentProps<"div"> {
  inset?: boolean
  variant?: "default" | "destructive"
  disabled?: boolean
  onSelect?: () => void
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  disabled,
  onSelect,
  onClick,
  ...props
}: DropdownMenuItemProps) {
  const { setOpen } = useMenu()
  return (
    <div
      role="menuitem"
      tabIndex={-1}
      aria-disabled={disabled || undefined}
      data-slot="dropdown-menu-item"
      data-inset={inset ? "" : undefined}
      data-variant={variant}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      onClick={(e) => {
        if (disabled) return
        onClick?.(e)
        if (e.defaultPrevented) return
        onSelect?.()
        setOpen(false)
      }}
      {...props}
    />
  )
}

const RadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  onCheckedChange,
  disabled,
  inset,
  onClick,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  inset?: boolean
}) {
  return (
    <div
      role="menuitemcheckbox"
      tabIndex={-1}
      aria-checked={!!checked}
      aria-disabled={disabled || undefined}
      data-slot="dropdown-menu-checkbox-item"
      data-disabled={disabled ? "" : undefined}
      data-inset={inset ? "" : undefined}
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-8 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      onClick={(e) => {
        if (disabled) return
        onClick?.(e)
        if (!e.defaultPrevented) onCheckedChange?.(!checked)
      }}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        {checked ? <CheckIcon /> : null}
      </span>
      {children}
    </div>
  )
}

function DropdownMenuRadioGroup({
  value,
  onValueChange,
  ...props
}: React.ComponentProps<"div"> & {
  value?: string
  onValueChange?: (value: string) => void
}) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="group" data-slot="dropdown-menu-radio-group" {...props} />
    </RadioGroupContext.Provider>
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  value,
  disabled,
  inset,
  onClick,
  ...props
}: Omit<React.ComponentProps<"div">, "value"> & {
  value: string
  disabled?: boolean
  inset?: boolean
}) {
  const { value: groupValue, onValueChange } = React.useContext(RadioGroupContext)
  const checked = groupValue === value
  return (
    <div
      role="menuitemradio"
      tabIndex={-1}
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      data-slot="dropdown-menu-radio-item"
      data-disabled={disabled ? "" : undefined}
      data-inset={inset ? "" : undefined}
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-8 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      onClick={(e) => {
        if (disabled) return
        onClick?.(e)
        if (!e.defaultPrevented) onValueChange?.(value)
      }}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        {checked ? <CheckIcon /> : null}
      </span>
      {children}
    </div>
  )
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------ submenus ------------------------------ */

type SubContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
}
const SubContext = React.createContext<SubContextValue | null>(null)
function useSub() {
  const ctx = React.useContext(SubContext)
  if (!ctx) throw new Error("Submenu parts must be used within <DropdownMenuSub>")
  return ctx
}

function DropdownMenuSub({
  defaultOpen = false,
  children,
}: {
  defaultOpen?: boolean
  children?: React.ReactNode
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  const triggerRef = React.useRef<HTMLElement | null>(null)
  return (
    <SubContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </SubContext.Provider>
  )
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  onClick,
  onKeyDown,
  onMouseEnter,
  ...props
}: React.ComponentProps<"div"> & { inset?: boolean }) {
  const { open, setOpen, triggerRef } = useSub()
  return (
    <div
      ref={triggerRef as React.Ref<HTMLDivElement>}
      role="menuitem"
      tabIndex={-1}
      aria-haspopup="menu"
      aria-expanded={open}
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset ? "" : undefined}
      data-popup-open={open ? "" : undefined}
      data-open={open ? "" : undefined}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      onMouseEnter={(e) => {
        onMouseEnter?.(e)
        setOpen(true)
      }}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(!open)
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e)
        if (e.defaultPrevented) return
        if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setOpen(true)
        }
      }}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </div>
  )
}

function DropdownMenuSubContent({
  className,
  children,
  onKeyDown,
  ...props
}: React.ComponentProps<"div">) {
  const { open, setOpen, triggerRef } = useSub()
  const { layers } = useMenu()
  const [mounted, presenceRef] = usePresence<HTMLDivElement>(open)
  const { floatingRef, pos } = useFloating(triggerRef, mounted, {
    side: "right",
    align: "start",
    sideOffset: 0,
    alignOffset: -3,
  })
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const node = containerRef.current
    if (!node) return
    layers.current.add(node)
    return () => {
      layers.current.delete(node)
    }
  }, [mounted, layers])

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
        moveFocus(c, "first")
      } else if (!didFocus.current) {
        raf = requestAnimationFrame(tryFocus)
      }
    }
    raf = requestAnimationFrame(tryFocus)
    return () => cancelAnimationFrame(raf)
  }, [open])

  if (!mounted) return null
  return (
    <Portal>
      <div
        ref={mergeRefs(floatingRef, presenceRef, containerRef)}
        role="menu"
        tabIndex={-1}
        data-slot="dropdown-menu-sub-content"
        data-state={open ? "open" : "closed"}
        data-open={open ? "" : undefined}
        data-closed={open ? undefined : ""}
        data-side={pos?.side ?? "right"}
        style={{
          position: "fixed",
          left: pos?.x ?? 0,
          top: pos?.y ?? 0,
          visibility: pos ? "visible" : "hidden",
          ["--transform-origin" as string]: pos?.transformOrigin ?? "center",
        }}
        onPointerMove={(e) => {
          const item = (e.target as HTMLElement).closest(
            '[role^="menuitem"]:not([data-disabled])'
          ) as HTMLElement | null
          if (item && item !== document.activeElement) item.focus()
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e)
          if (e.defaultPrevented) return
          const c = containerRef.current!
          if (e.key === "ArrowDown") (e.preventDefault(), moveFocus(c, "next"))
          else if (e.key === "ArrowUp") (e.preventDefault(), moveFocus(c, "prev"))
          else if (e.key === "ArrowLeft" || e.key === "Escape") {
            e.preventDefault()
            setOpen(false)
            triggerRef.current?.focus()
          } else if (e.key === "Enter" || e.key === " ") {
            const active = document.activeElement as HTMLElement | null
            if (active && c.contains(active)) {
              e.preventDefault()
              active.click()
            }
          }
        }}
        className={cn(
          "z-50 min-w-[96px] origin-(--transform-origin) overflow-hidden rounded-md bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </Portal>
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
