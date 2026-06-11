"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { Slot, mergeRefs, resolveRender } from "./slot.js"
import { Portal } from "./portal.js"
import { useFloating } from "./use-floating.js"
import { usePresence } from "./use-presence.js"
import { useTypeahead } from "./use-typeahead.js"
import { ChevronRightIcon, CheckIcon } from "../icons/index.js"

/* ------------------------------------------------------------------ *
 * Self-contained context menu: the same roving-keyboard / nested-layer
 * dismiss menu core as dropdown-menu, but opened at the cursor on
 * right-click instead of anchored to a trigger button. The content is
 * positioned with position:fixed at the captured click coordinates,
 * clamped into the viewport.
 * ------------------------------------------------------------------ */

type Point = { x: number; y: number }

type MenuContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  point: Point
  openAt: (point: Point) => void
  contentId: string
  layers: React.MutableRefObject<Set<HTMLElement>>
}
const MenuContext = React.createContext<MenuContextValue | null>(null)
function useMenu() {
  const ctx = React.useContext(MenuContext)
  if (!ctx) throw new Error("ContextMenu parts must be used within <ContextMenu>")
  return ctx
}

function itemsOf(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      ':scope > [role^="menuitem"]:not([data-disabled]), :scope > [data-slot="context-menu-group"] > [role^="menuitem"]:not([data-disabled]), :scope > [data-slot="context-menu-radio-group"] > [role^="menuitem"]:not([data-disabled])'
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

export interface ContextMenuProps {
  children?: React.ReactNode
}

function ContextMenu({ children }: ContextMenuProps) {
  const [open, setOpen] = React.useState(false)
  const [point, setPoint] = React.useState<Point>({ x: 0, y: 0 })
  const contentId = React.useId()
  const layers = React.useRef<Set<HTMLElement>>(new Set())
  const openAt = React.useCallback((p: Point) => {
    setPoint(p)
    setOpen(true)
  }, [])
  return (
    <MenuContext.Provider value={{ open, setOpen, point, openAt, contentId, layers }}>
      {children}
    </MenuContext.Provider>
  )
}

function ContextMenuPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function ContextMenuTrigger({
  asChild = false,
  render,
  nativeButton: _nativeButton,
  children,
  className,
  onContextMenu,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
  render?: React.ReactElement
  nativeButton?: boolean
}) {
  const { open, openAt, contentId } = useMenu()
  const { useSlot, slotChild } = resolveRender(asChild, render, children)
  const Comp: React.ElementType = useSlot ? Slot : "div"
  return (
    <Comp
      data-slot="context-menu-trigger"
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={open ? contentId : undefined}
      data-state={open ? "open" : "closed"}
      className={cn("select-none", className)}
      onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
        onContextMenu?.(e)
        if (e.defaultPrevented) return
        e.preventDefault()
        openAt({ x: e.clientX, y: e.clientY })
      }}
      {...props}
    >
      {slotChild}
    </Comp>
  )
}

export interface ContextMenuContentProps extends React.ComponentProps<"div"> {}

function ContextMenuContent({
  className,
  children,
  onKeyDown,
  ...props
}: ContextMenuContentProps) {
  const { open, setOpen, point, contentId, layers } = useMenu()
  const [mounted, presenceRef] = usePresence<HTMLDivElement>(open)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { onTypeaheadKeyDown } = useTypeahead()
  // Position the menu at the cursor, clamped into the viewport once the
  // popup has measurable dimensions. availableHeight caps the menu so long
  // lists scroll inside the viewport instead of overflowing it.
  const [pos, setPos] = React.useState<{
    x: number
    y: number
    availableHeight: number
  } | null>(null)

  React.useLayoutEffect(() => {
    if (!mounted) {
      setPos(null)
      return
    }
    let raf = 0
    const measure = () => {
      const node = containerRef.current
      // The popup is portaled and may attach a frame late; retry until it does,
      // otherwise pos stays null and the menu is stuck visibility:hidden.
      if (!node) {
        raf = requestAnimationFrame(measure)
        return
      }
      const w = node.offsetWidth
      const h = node.offsetHeight
      const PAD = 8
      const vw = window.innerWidth
      const vh = window.innerHeight
      // Flip toward the side with room, then clamp.
      let x = point.x
      let y = point.y
      if (x + w + PAD > vw) x = Math.max(PAD, point.x - w)
      if (y + h + PAD > vh) y = Math.max(PAD, point.y - h)
      x = Math.max(PAD, Math.min(x, vw - w - PAD))
      y = Math.max(PAD, Math.min(y, vh - h - PAD))
      // Space from the menu's top to the bottom of the viewport, minus padding.
      const availableHeight = Math.max(0, vh - y - PAD)
      setPos({ x, y, availableHeight })
    }
    measure()
    window.addEventListener("scroll", measure, true)
    window.addEventListener("resize", measure)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", measure, true)
      window.removeEventListener("resize", measure)
    }
  }, [mounted, point])

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
      for (const layer of layers.current) if (layer.contains(t)) return
      setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown, true)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true)
    }
  }, [open, setOpen, layers])

  if (!mounted) return null
  return (
    <Portal>
      <div
        ref={mergeRefs(presenceRef, containerRef)}
        id={contentId}
        role="menu"
        aria-orientation="vertical"
        tabIndex={-1}
        data-slot="context-menu-content"
        data-state={open ? "open" : "closed"}
        data-open={open ? "" : undefined}
        data-closed={open ? undefined : ""}
        style={{
          position: "fixed",
          left: pos?.x ?? point.x,
          top: pos?.y ?? point.y,
          visibility: pos ? "visible" : "hidden",
          ["--transform-origin" as string]: "top left",
          ["--available-height" as string]: pos ? `${pos.availableHeight}px` : undefined,
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
          } else if (e.key === "Tab") {
            setOpen(false)
          } else if (e.key === "Enter" || e.key === " ") {
            const active = document.activeElement as HTMLElement | null
            if (active && c.contains(active) && active.getAttribute("role")?.startsWith("menuitem")) {
              e.preventDefault()
              active.click()
            }
          } else {
            // Printable-character typeahead: jump to the matching item.
            const items = itemsOf(c)
            const idx = items.indexOf(document.activeElement as HTMLElement)
            const match = onTypeaheadKeyDown(e, items, idx)
            if (match) {
              e.preventDefault()
              match.focus()
            }
          }
        }}
        className={cn(
          "z-50 max-h-(--available-height) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </Portal>
  )
}

function ContextMenuGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="group" data-slot="context-menu-group" className={className} {...props} />
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & { inset?: boolean }) {
  return (
    <div
      data-slot="context-menu-label"
      data-inset={inset ? "" : undefined}
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground data-inset:pl-8",
        className
      )}
      {...props}
    />
  )
}

export interface ContextMenuItemProps extends React.ComponentProps<"div"> {
  inset?: boolean
  variant?: "default" | "destructive"
  disabled?: boolean
  onSelect?: () => void
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  disabled,
  onSelect,
  onClick,
  ...props
}: ContextMenuItemProps) {
  const { setOpen } = useMenu()
  return (
    <div
      role="menuitem"
      tabIndex={-1}
      aria-disabled={disabled || undefined}
      data-slot="context-menu-item"
      data-inset={inset ? "" : undefined}
      data-variant={variant}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "group/context-menu-item relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive",
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

function ContextMenuCheckboxItem({
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
      data-slot="context-menu-checkbox-item"
      data-disabled={disabled ? "" : undefined}
      data-inset={inset ? "" : undefined}
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
        data-slot="context-menu-checkbox-item-indicator"
      >
        {checked ? <CheckIcon /> : null}
      </span>
      {children}
    </div>
  )
}

function ContextMenuRadioGroup({
  value,
  onValueChange,
  ...props
}: React.ComponentProps<"div"> & {
  value?: string
  onValueChange?: (value: string) => void
}) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="group" data-slot="context-menu-radio-group" {...props} />
    </RadioGroupContext.Provider>
  )
}

function ContextMenuRadioItem({
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
      data-slot="context-menu-radio-item"
      data-disabled={disabled ? "" : undefined}
      data-inset={inset ? "" : undefined}
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
        data-slot="context-menu-radio-item-indicator"
      >
        {checked ? <CheckIcon /> : null}
      </span>
      {children}
    </div>
  )
}

function ContextMenuSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      data-slot="context-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/context-menu-item:text-accent-foreground",
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
  if (!ctx) throw new Error("Submenu parts must be used within <ContextMenuSub>")
  return ctx
}

function ContextMenuSub({
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

function ContextMenuSubTrigger({
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
      data-slot="context-menu-sub-trigger"
      data-inset={inset ? "" : undefined}
      data-popup-open={open ? "" : undefined}
      data-open={open ? "" : undefined}
      className={cn(
        "flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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

function ContextMenuSubContent({
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
  const { onTypeaheadKeyDown } = useTypeahead()

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
        data-slot="context-menu-sub-content"
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
          } else {
            // Printable-character typeahead: jump to the matching item.
            const items = itemsOf(c)
            const idx = items.indexOf(document.activeElement as HTMLElement)
            const match = onTypeaheadKeyDown(e, items, idx)
            if (match) {
              e.preventDefault()
              match.focus()
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
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
