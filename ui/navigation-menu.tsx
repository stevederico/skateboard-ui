"use client"

import * as React from "react"

import { cva } from "../shadcn/lib/cva.js"
import { cn } from "../shadcn/lib/utils.js"
import { Portal } from "./portal.js"
import { useFloating } from "./use-floating.js"
import { usePresence } from "./use-presence.js"
import { useControllableState } from "./use-controllable-state.js"
import { ChevronDownIcon } from "../icons/index.js"

/* ------------------------------------------------------------------ *
 * A self-contained navigation menu: the root tracks which item value is
 * currently open, opening on hover/focus of a trigger and closing on
 * mouse-leave of the whole menu (after a small grace period) or Escape.
 * Unlike base-ui, there is no shared-viewport morph animation — each
 * NavigationMenuContent floats independently under its own trigger.
 * ------------------------------------------------------------------ */

type NavigationMenuContextValue = {
  value: string | null
  setValue: (value: string | null) => void
  open: (value: string) => void
  scheduleClose: () => void
  cancelClose: () => void
}
const NavigationMenuContext =
  React.createContext<NavigationMenuContextValue | null>(null)
function useNavigationMenu() {
  const ctx = React.useContext(NavigationMenuContext)
  if (!ctx)
    throw new Error(
      "NavigationMenu parts must be used within <NavigationMenu>"
    )
  return ctx
}

type NavigationMenuItemContextValue = {
  value: string
  triggerRef: React.RefObject<HTMLButtonElement | null>
  // Stable id for the floating content panel, wired to the trigger via
  // aria-controls so AT announces the relationship (a11y).
  contentId: string
  // DOM node of the open content panel, used to move keyboard focus into the
  // portaled panel and to detect when focus is inside it for restore (a11y).
  contentRef: React.RefObject<HTMLDivElement | null>
}
const NavigationMenuItemContext =
  React.createContext<NavigationMenuItemContextValue | null>(null)
function useNavigationMenuItem() {
  const ctx = React.useContext(NavigationMenuItemContext)
  if (!ctx)
    throw new Error(
      "NavigationMenu trigger/content must be used within <NavigationMenuItem>"
    )
  return ctx
}

function NavigationMenu({
  className,
  children,
  onMouseLeave,
  ...props
}: React.ComponentProps<"nav">) {
  const [value, setValue] = useControllableState<string | null>({
    defaultValue: null,
  })
  const closeTimer = React.useRef<number | null>(null)

  const cancelClose = React.useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])
  const scheduleClose = React.useCallback(() => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setValue(null), 150)
  }, [cancelClose, setValue])
  const open = React.useCallback(
    (v: string) => {
      cancelClose()
      setValue(v)
    },
    [cancelClose, setValue]
  )

  React.useEffect(() => () => cancelClose(), [cancelClose])

  React.useEffect(() => {
    if (value === null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setValue(null)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [value, setValue])

  return (
    <NavigationMenuContext.Provider
      value={{ value, setValue, open, scheduleClose, cancelClose }}
    >
      <nav
        data-slot="navigation-menu"
        data-orientation="horizontal"
        className={cn(
          "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
          className
        )}
        onMouseEnter={cancelClose}
        onMouseLeave={(e) => {
          onMouseLeave?.(e)
          if (!e.defaultPrevented) scheduleClose()
        }}
        {...props}
      >
        {children}
      </nav>
    </NavigationMenuContext.Provider>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-0",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  const value = React.useId()
  // One id + content ref per item so multiple triggers/panels don't collide
  // when wiring aria-controls and focusing into the right portaled panel.
  const contentId = React.useId()
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const contentRef = React.useRef<HTMLDivElement | null>(null)
  return (
    <NavigationMenuItemContext.Provider
      value={{ value, triggerRef, contentId, contentRef }}
    >
      <li
        data-slot="navigation-menu-item"
        className={cn("relative", className)}
        {...props}
      />
    </NavigationMenuItemContext.Provider>
  )
}

// Tabbable descendants, in DOM order, used to move focus into the open content
// panel. Kept local (not imported) so this file stays self-contained.
const FOCUSABLE_SELECTOR =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

const navigationMenuTriggerStyle = cva(
  "cursor-pointer group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted"
)

function NavigationMenuTrigger({
  className,
  children,
  onMouseEnter,
  onFocus,
  onClick,
  onKeyDown,
  ...props
}: React.ComponentProps<"button">) {
  const { value, setValue, open } = useNavigationMenu()
  const { value: itemValue, triggerRef, contentId, contentRef } =
    useNavigationMenuItem()
  const isOpen = value === itemValue

  /**
   * Move keyboard focus into the open content panel so its links are
   * reachable. The panel is portaled and opens on focus/hover, but without
   * this a keyboard user can never enter it (WCAG 2.1.1 keyboard trap-out).
   * ArrowDown (and Enter) open if needed, then focus the first focusable child.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e)
    if (e.defaultPrevented) return
    if (e.key !== "ArrowDown" && e.key !== "Enter") return
    // Enter still toggles via onClick; only intercept it to enter an open panel.
    if (e.key === "Enter" && !isOpen) return
    e.preventDefault()
    open(itemValue)
    // The panel mounts this tick and is positioned a frame or two later (it
    // starts visibility:hidden until useFloating measures it, and focus() on a
    // hidden node is a no-op). Retry across a few frames until it is visible,
    // bounded so a panel that never opens can't spin forever.
    let frames = 0
    const focusFirst = () => {
      const node = contentRef.current
      if (!node || getComputedStyle(node).visibility === "hidden") {
        if (frames++ < 20) requestAnimationFrame(focusFirst)
        return
      }
      const first = node.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
      ;(first ?? node).focus()
    }
    requestAnimationFrame(focusFirst)
  }

  return (
    <button
      ref={triggerRef}
      type="button"
      data-slot="navigation-menu-trigger"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={isOpen ? contentId : undefined}
      data-state={isOpen ? "open" : "closed"}
      data-popup-open={isOpen ? "" : undefined}
      data-open={isOpen ? "" : undefined}
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      onMouseEnter={(e) => {
        onMouseEnter?.(e)
        if (!e.defaultPrevented) open(itemValue)
      }}
      onFocus={(e) => {
        onFocus?.(e)
        if (!e.defaultPrevented) open(itemValue)
      }}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) setValue(isOpen ? null : itemValue)
      }}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-px ml-1 size-3 transition duration-300 group-data-open:rotate-180"
        aria-hidden="true"
      />
    </button>
  )
}

function NavigationMenuContent({
  className,
  children,
  onMouseEnter,
  onKeyDown,
  ...props
}: React.ComponentProps<"div">) {
  const { value, setValue, cancelClose, scheduleClose } = useNavigationMenu()
  const { value: itemValue, triggerRef, contentId, contentRef } =
    useNavigationMenuItem()
  const isOpen = value === itemValue
  const [mounted, presenceRef] = usePresence<HTMLDivElement>(isOpen)
  const { floatingRef, pos } = useFloating(triggerRef, mounted, {
    side: "bottom",
    align: "start",
    sideOffset: 8,
    alignOffset: 0,
  })
  const setRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      floatingRef.current = node
      presenceRef.current = node
      contentRef.current = node
    },
    [floatingRef, presenceRef, contentRef]
  )

  /**
   * Restore focus to the trigger whenever the panel closes while focus is still
   * inside it (root-level Escape, mouse-leave timeout, etc.). Without this the
   * panel unmounts and keyboard focus is stranded on a detached node (a11y).
   * If focus already moved elsewhere (e.g. an outside click), leave it alone.
   */
  React.useEffect(() => {
    if (isOpen) return
    const node = contentRef.current
    const trigger = triggerRef.current
    if (trigger && node && node.contains(document.activeElement)) trigger.focus()
  }, [isOpen, contentRef, triggerRef])

  /**
   * Escape closes the menu and returns focus to the trigger. The root already
   * listens for Escape to clear the value, but only this panel knows to restore
   * focus — otherwise keyboard focus would be stranded on a now-unmounted node.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e)
    if (e.defaultPrevented || e.key !== "Escape") return
    e.preventDefault()
    setValue(null)
    triggerRef.current?.focus()
  }

  if (!mounted) return null
  return (
    <Portal>
      <div
        ref={setRef}
        id={contentId}
        role="menu"
        tabIndex={-1}
        data-slot="navigation-menu-content"
        data-state={isOpen ? "open" : "closed"}
        data-open={isOpen ? "" : undefined}
        data-closed={isOpen ? undefined : ""}
        data-side={pos?.side ?? "bottom"}
        style={{
          position: "fixed",
          left: pos?.x ?? 0,
          top: pos?.y ?? 0,
          visibility: pos ? "visible" : "hidden",
          ["--transform-origin" as string]: pos?.transformOrigin ?? "center",
        }}
        onKeyDown={handleKeyDown}
        onMouseEnter={(e) => {
          onMouseEnter?.(e)
          cancelClose()
        }}
        onMouseLeave={scheduleClose}
        className={cn(
          "z-50 w-auto origin-(--transform-origin) rounded-md bg-popover p-2 text-popover-foreground shadow ring-1 ring-foreground/10 duration-200 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </Portal>
  )
}

function NavigationMenuLink({
  className,
  active,
  ...props
}: React.ComponentProps<"a"> & { active?: boolean }) {
  return (
    <a
      data-slot="navigation-menu-link"
      data-active={active ? "true" : undefined}
      className={cn(
        "cursor-pointer flex items-center gap-1.5 rounded-md p-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-sm data-[active=true]:bg-muted/50 data-[active=true]:hover:bg-muted data-[active=true]:focus:bg-muted [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * No-op kept only to preserve the import name. The base-ui version renders an
 * arrow indicator tied to the shared viewport; this simpler menu floats each
 * content panel independently, so there is nothing to indicate.
 */
function NavigationMenuIndicator(
  _props: React.ComponentProps<"div">
): React.ReactElement | null {
  return null
}

/**
 * No-op kept only to preserve the import name. Positioning is handled inline by
 * NavigationMenuContent via useFloating, so no separate positioner is needed.
 */
function NavigationMenuPositioner(
  _props: React.ComponentProps<"div">
): React.ReactElement | null {
  return null
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuPositioner,
}
