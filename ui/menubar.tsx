"use client"

import * as React from "react"

import { cn } from "../shadcn/lib/utils.js"
import { Slot, mergeRefs, resolveRender } from "./slot.js"
import { Portal } from "./portal.js"
import { useFloating, type Side, type Align } from "./use-floating.js"
import { usePresence } from "./use-presence.js"
import { useTypeahead } from "./use-typeahead.js"
import { usePointerMoved } from "./use-pointer-moved.js"
import { ChevronRightIcon, CheckIcon } from "../icons/index.js"

/* ------------------------------------------------------------------ *
 * Menubar: a horizontal row of menus. The bar root tracks which menu
 * value is currently open and whether the bar is "active" (engaged by a
 * click) — while active, hovering a sibling trigger switches the open
 * menu without a second click. Each menu reuses the same menu-core
 * patterns (roving keyboard nav, layer dismiss, focus-on-open) as
 * dropdown-menu.
 * ------------------------------------------------------------------ */

type MenubarContextValue = {
  value: string | null
  setValue: (value: string | null) => void
  active: boolean
  setActive: (active: boolean) => void
}
const MenubarRootContext = React.createContext<MenubarContextValue | null>(null)
function useMenubarRoot() {
  const ctx = React.useContext(MenubarRootContext)
  if (!ctx) throw new Error("Menubar parts must be used within <Menubar>")
  return ctx
}

type MenuContextValue = {
  value: string
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
  contentId: string
  // a11y: stable id placed on the trigger so the menu can point its
  // aria-labelledby at it, naming the menu by its button for screen readers.
  triggerId: string
  layers: React.MutableRefObject<Set<HTMLElement>>
}
const MenuContext = React.createContext<MenuContextValue | null>(null)
function useMenu() {
  const ctx = React.useContext(MenuContext)
  if (!ctx) throw new Error("Menu parts must be used within <MenubarMenu>")
  return ctx
}

function itemsOf(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      ':scope > [role^="menuitem"]:not([data-disabled]), :scope > [data-slot="menubar-group"] > [role^="menuitem"]:not([data-disabled]), :scope > [data-slot="menubar-radio-group"] > [role^="menuitem"]:not([data-disabled])'
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

function Menubar({ className, ...props }: React.ComponentProps<"div">) {
  const [value, setValue] = React.useState<string | null>(null)
  const [active, setActive] = React.useState(false)
  return (
    <MenubarRootContext.Provider value={{ value, setValue, active, setActive }}>
      <div
        role="menubar"
        data-slot="menubar"
        className={cn(
          "flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
          className
        )}
        {...props}
      />
    </MenubarRootContext.Provider>
  )
}

function MenubarMenu({
  value: valueProp,
  children,
}: {
  value?: string
  children?: React.ReactNode
}) {
  const root = useMenubarRoot()
  const generatedId = React.useId()
  const value = valueProp ?? generatedId
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const contentId = React.useId()
  const triggerId = React.useId()
  const layers = React.useRef<Set<HTMLElement>>(new Set())
  const open = root.value === value
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (next) {
        root.setValue(value)
        root.setActive(true)
      } else {
        if (root.value === value) root.setValue(null)
        root.setActive(false)
      }
    },
    [root, value]
  )
  return (
    <MenuContext.Provider
      value={{ value, open, setOpen, triggerRef, contentId, triggerId, layers }}
    >
      {children}
    </MenuContext.Provider>
  )
}

function MenubarPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function MenubarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="group" data-slot="menubar-group" className={className} {...props} />
}

function MenubarTrigger({
  asChild = false,
  render,
  nativeButton: _nativeButton,
  children,
  className,
  onClick,
  onKeyDown,
  onMouseEnter,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  render?: React.ReactElement
  nativeButton?: boolean
}) {
  const root = useMenubarRoot()
  const { value, open, setOpen, triggerRef, contentId, triggerId } = useMenu()
  const { useSlot, slotChild } = resolveRender(asChild, render, children)
  const Comp: React.ElementType = useSlot ? Slot : "button"
  return (
    <Comp
      ref={triggerRef as React.Ref<HTMLButtonElement>}
      type={useSlot ? undefined : "button"}
      data-slot="menubar-trigger"
      // a11y: give the trigger a stable id so its menu can reference it via
      // aria-labelledby; a consumer-supplied id in ...props overrides this.
      id={triggerId}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={open ? contentId : undefined}
      data-state={open ? "open" : "closed"}
      className={cn(
        "cursor-pointer flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none hover:bg-muted aria-expanded:bg-muted",
        className
      )}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(!open)
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        onMouseEnter?.(e)
        // When the bar is engaged, hovering a sibling trigger switches the
        // open menu to this one without requiring another click.
        if (!e.defaultPrevented && root.active && root.value !== value) {
          root.setValue(value)
        }
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
        onKeyDown?.(e)
        if (e.defaultPrevented) return
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setOpen(true)
        } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          // Move focus along the bar to the sibling trigger.
          const bar = (e.currentTarget as HTMLElement).closest('[role="menubar"]')
          if (!bar) return
          const triggers = Array.from(
            bar.querySelectorAll<HTMLElement>('[data-slot="menubar-trigger"]')
          )
          const idx = triggers.indexOf(e.currentTarget as HTMLElement)
          if (idx < 0) return
          e.preventDefault()
          const delta = e.key === "ArrowRight" ? 1 : -1
          const target = triggers[(idx + delta + triggers.length) % triggers.length]
          target?.focus()
          if (root.active) target?.click()
        }
      }}
      {...props}
    >
      {slotChild}
    </Comp>
  )
}

export interface MenubarContentProps extends React.ComponentProps<"div"> {
  side?: Side
  align?: Align
  sideOffset?: number
  alignOffset?: number
}

function MenubarContent({
  align = "start",
  alignOffset = -4,
  side = "bottom",
  sideOffset = 8,
  className,
  children,
  onKeyDown,
  ...props
}: MenubarContentProps) {
  const root = useMenubarRoot()
  const { open, setOpen, triggerRef, contentId, triggerId, layers } = useMenu()
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
        // a11y: name the menu by its trigger button. The content only mounts
        // while open, so the trigger is already in the DOM — prefer its live id
        // (honors a consumer-supplied id), falling back to the generated one.
        aria-labelledby={triggerRef.current?.id ?? triggerId}
        aria-orientation="vertical"
        tabIndex={-1}
        data-slot="menubar-content"
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
          // a11y: ignore synthetic pointermove events fired when keyboard nav
          // scrolls the focused item into view — those report unchanged
          // coordinates and would otherwise steal focus from the keyboard target.
          if (!hasPointerMoved(e)) return
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
          else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            // Switch to the adjacent menu in the bar, keeping it open.
            const trigger = triggerRef.current
            const bar = trigger?.closest('[role="menubar"]')
            if (!bar) return
            const triggers = Array.from(
              bar.querySelectorAll<HTMLElement>('[data-slot="menubar-trigger"]')
            )
            const idx = triggers.indexOf(trigger as HTMLElement)
            if (idx < 0) return
            e.preventDefault()
            const delta = e.key === "ArrowRight" ? 1 : -1
            triggers[(idx + delta + triggers.length) % triggers.length]?.click()
          } else if (e.key === "Escape") {
            e.preventDefault()
            setOpen(false)
            triggerRef.current?.focus()
          } else if (e.key === "Tab") {
            root.setValue(null)
            root.setActive(false)
          } else if (e.key === "Enter" || e.key === " ") {
            const active = document.activeElement as HTMLElement | null
            if (active && c.contains(active) && active.getAttribute("role")?.startsWith("menuitem")) {
              e.preventDefault()
              active.click()
            }
          } else {
            // Printable-character typeahead: jump to the menu item whose label
            // matches the typed buffer (WAI-ARIA menu pattern).
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
          "z-50 min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 transition-none outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </Portal>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & { inset?: boolean }) {
  return (
    <div
      data-slot="menubar-label"
      data-inset={inset ? "" : undefined}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-inset:pl-8",
        className
      )}
      {...props}
    />
  )
}

export interface MenubarItemProps extends React.ComponentProps<"div"> {
  inset?: boolean
  variant?: "default" | "destructive"
  disabled?: boolean
  onSelect?: () => void
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  disabled,
  onSelect,
  onClick,
  ...props
}: MenubarItemProps) {
  const { setOpen, triggerRef } = useMenu()
  return (
    <div
      role="menuitem"
      tabIndex={-1}
      aria-disabled={disabled || undefined}
      data-slot="menubar-item"
      data-inset={inset ? "" : undefined}
      data-variant={variant}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "group/menubar-item relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      )}
      onClick={(e) => {
        if (disabled) return
        onClick?.(e)
        if (e.defaultPrevented) return
        onSelect?.()
        setOpen(false)
        // a11y: selecting an item closes the menu, which would otherwise drop
        // focus to <body>; restore it to the trigger so keyboard users keep
        // their place in the bar.
        triggerRef.current?.focus()
      }}
      {...props}
    />
  )
}

const RadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

function MenubarCheckboxItem({
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
      data-slot="menubar-checkbox-item"
      data-disabled={disabled ? "" : undefined}
      data-inset={inset ? "" : undefined}
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset data-inset:pl-8 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
        className="pointer-events-none absolute left-2 flex size-4 items-center justify-center"
        data-slot="menubar-checkbox-item-indicator"
      >
        {checked ? <CheckIcon /> : null}
      </span>
      {children}
    </div>
  )
}

function MenubarRadioGroup({
  value,
  onValueChange,
  ...props
}: React.ComponentProps<"div"> & {
  value?: string
  onValueChange?: (value: string) => void
}) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="group" data-slot="menubar-radio-group" {...props} />
    </RadioGroupContext.Provider>
  )
}

function MenubarRadioItem({
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
      data-slot="menubar-radio-item"
      data-disabled={disabled ? "" : undefined}
      data-inset={inset ? "" : undefined}
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset data-inset:pl-8 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
        className="pointer-events-none absolute left-2 flex size-4 items-center justify-center"
        data-slot="menubar-radio-item-indicator"
      >
        {checked ? <CheckIcon /> : null}
      </span>
      {children}
    </div>
  )
}

function MenubarSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      data-slot="menubar-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function MenubarShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/menubar-item:text-accent-foreground",
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
  // a11y: id shared between the sub-trigger (aria-controls) and the
  // sub-content (id) so AT can associate the trigger with the popup it opens.
  subContentId: string
}
const SubContext = React.createContext<SubContextValue | null>(null)
function useSub() {
  const ctx = React.useContext(SubContext)
  if (!ctx) throw new Error("Submenu parts must be used within <MenubarSub>")
  return ctx
}

function MenubarSub({
  defaultOpen = false,
  children,
}: {
  defaultOpen?: boolean
  children?: React.ReactNode
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const subContentId = React.useId()
  return (
    <SubContext.Provider value={{ open, setOpen, triggerRef, subContentId }}>
      {children}
    </SubContext.Provider>
  )
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  onClick,
  onKeyDown,
  onMouseEnter,
  ...props
}: React.ComponentProps<"div"> & { inset?: boolean }) {
  const { open, setOpen, triggerRef, subContentId } = useSub()
  return (
    <div
      ref={triggerRef as React.Ref<HTMLDivElement>}
      role="menuitem"
      tabIndex={-1}
      aria-haspopup="menu"
      aria-expanded={open}
      // a11y: point at the sub-content it opens so AT can follow the
      // disclosure; only valid while the controlled popup exists in the DOM.
      aria-controls={open ? subContentId : undefined}
      data-slot="menubar-sub-trigger"
      data-inset={inset ? "" : undefined}
      data-popup-open={open ? "" : undefined}
      data-open={open ? "" : undefined}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset data-inset:pl-8 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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

function MenubarSubContent({
  className,
  children,
  onKeyDown,
  ...props
}: React.ComponentProps<"div">) {
  const { open, setOpen, triggerRef, subContentId } = useSub()
  const { layers } = useMenu()
  const [mounted, presenceRef] = usePresence<HTMLDivElement>(open)
  const { floatingRef, pos } = useFloating(triggerRef, mounted, {
    side: "right",
    align: "start",
    sideOffset: 0,
    alignOffset: -3,
  })
  const containerRef = React.useRef<HTMLDivElement>(null)
  const hasPointerMoved = usePointerMoved()

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
        id={subContentId}
        role="menu"
        tabIndex={-1}
        data-slot="menubar-sub-content"
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
          // Ignore synthetic same-coordinate pointermoves (from keyboard-nav
          // scroll) so they don't steal focus off the keyboard target.
          if (!hasPointerMoved(e)) return
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
          "z-50 min-w-32 origin-(--transform-origin) overflow-hidden rounded-md bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 transition-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
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
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
