import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import type * as React from 'react';

/**
 * Headless command palette primitives — minimal API-compatible drop-in for cmdk.
 *
 * Exports `Command`, `CommandInput`, `CommandList`, `CommandEmpty`,
 * `CommandGroup`, `CommandItem`, `CommandSeparator`, and `CommandShortcut`,
 * plus a `Command.<Sub>` namespace so existing shadcn imports of
 * `import { Command as CommandPrimitive } from "cmdk"` keep working.
 *
 * Filtering is substring-based on each item's `value` prop (lower-cased).
 * Arrow Up/Down navigate within the visible items; Enter triggers the
 * focused item's `onSelect`. Hover also updates focus. The focused item
 * carries `data-selected="true"` for styling. Disabled items get
 * `data-disabled="true"` and skip selection.
 */

/** Metadata registered for each CommandItem. */
interface CommandItemMeta {
  value: string;
  onSelect?: (value: string) => void;
  disabled: boolean;
}

/** Internal context shared between Command and its sub-components. */
interface CommandContextValue {
  filter: string;
  setFilter: (value: string) => void;
  /**
   * Id of the currently active/highlighted option. This is the same string
   * each CommandItem renders as its DOM `id`, so it doubles as the target for
   * the combobox input's `aria-activedescendant`.
   */
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  /** Shared base id used to build the listbox id and per-option DOM ids. */
  listboxId: string;
  register: (id: string, meta: CommandItemMeta) => void;
  unregister: (id: string) => void;
  /**
   * Set of currently visible (non-disabled, filter-matching) option ids,
   * recomputed once per render. Each CommandItem does an O(1) `has(id)` check
   * instead of scanning the full item list, and visibleCount is its `.size`.
   */
  visibleSet: Set<string>;
  visibleCount: number;
  move: (dir: number) => void;
  triggerSelected: () => void;
}

const CommandContext = createContext<CommandContextValue | null>(null);

function useCommand(): CommandContextValue {
  const ctx = useContext(CommandContext);
  if (!ctx) throw new Error('Command.* components must be used within <Command>');
  return ctx;
}

export interface CommandProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
  children?: React.ReactNode;
}

export function Command({ className, children, ...props }: CommandProps) {
  const [filter, setFilter] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Stable base id shared by the listbox container and every option, so the
  // input's aria-controls / aria-activedescendant can reference them.
  const listboxId = useId();
  const itemsRef = useRef(new Map<string, CommandItemMeta>()); // id -> { value, onSelect, disabled }
  // Bumped on every register/unregister so the visible-id memo (which reads the
  // non-reactive itemsRef) recomputes when the registered item set changes.
  const [registrationVersion, setRegistrationVersion] = useState(0);

  const register = useCallback((id: string, meta: CommandItemMeta) => {
    itemsRef.current.set(id, meta);
    setRegistrationVersion((v) => v + 1);
  }, []);
  const unregister = useCallback((id: string) => {
    itemsRef.current.delete(id);
    setRegistrationVersion((v) => v + 1);
    setSelectedId((cur) => (cur === id ? null : cur));
  }, []);

  // Compute the ordered visible ids and the membership Set once per render,
  // memoized on the filter and the registered item set. Items can then check
  // visibility in O(1) instead of rescanning the whole list each render.
  const visibleIds = useMemo(() => {
    const f = filter.trim().toLowerCase();
    const visible: string[] = [];
    for (const [id, meta] of itemsRef.current) {
      if (meta.disabled) continue;
      if (!f || meta.value.toLowerCase().includes(f)) visible.push(id);
    }
    return visible;
  }, [filter, registrationVersion]);
  const visibleSet = useMemo(() => new Set(visibleIds), [visibleIds]);
  const visibleCount = visibleSet.size;

  // Keep selection valid when the visible set changes (filter input or
  // registration), driven by the reactive derived ids rather than the ref.
  useEffect(() => {
    if (visibleIds.length === 0) {
      setSelectedId(null);
      return;
    }
    setSelectedId((cur) => (cur && visibleSet.has(cur) ? cur : visibleIds[0]));
  }, [visibleIds, visibleSet]);

  const move = useCallback((dir: number) => {
    if (visibleIds.length === 0) return;
    const idx = selectedId ? visibleIds.indexOf(selectedId) : -1;
    const next = (idx + dir + visibleIds.length) % visibleIds.length;
    setSelectedId(visibleIds[next]);
  }, [selectedId, visibleIds]);

  const triggerSelected = useCallback(() => {
    if (!selectedId) return;
    const meta = itemsRef.current.get(selectedId);
    meta?.onSelect?.(meta.value);
  }, [selectedId]);

  const value = useMemo(
    () => ({ filter, setFilter, selectedId, setSelectedId, listboxId, register, unregister, visibleSet, visibleCount, move, triggerSelected }),
    [filter, selectedId, listboxId, register, unregister, visibleSet, visibleCount, move, triggerSelected]
  );

  return (
    <CommandContext.Provider value={value}>
      {/*
        The wrapper is a plain container. Per the WAI-ARIA combobox pattern the
        combobox role lives on the text input (see CommandInput), not on a div.
      */}
      <div className={className} {...props}>
        {children}
      </div>
    </CommandContext.Provider>
  );
}

export interface CommandInputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'value' | 'onChange'> {
  className?: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function CommandInput({ className, placeholder, value: controlledValue, onValueChange, ...props }: CommandInputProps) {
  const { filter, setFilter, move, triggerSelected, selectedId, listboxId, visibleCount } = useCommand();
  const value = controlledValue ?? filter;

  // The listbox is considered "shown"/expanded whenever it has visible options.
  const isExpanded = visibleCount > 0;
  // aria-activedescendant points at the DOM id of the active option (selectedId
  // is rendered verbatim as each CommandItem's id). Undefined when nothing is
  // active, so screen readers don't reference a missing element.
  const activeDescendant = isExpanded && selectedId ? selectedId : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setFilter(v);
    onValueChange?.(v);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); triggerSelected(); }
  };

  return (
    // The input is the combobox. Real DOM focus stays here during arrow
    // navigation; only aria-activedescendant moves so screen readers announce
    // the active option (WAI-ARIA combobox + activedescendant pattern).
    <input
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={isExpanded}
      aria-controls={listboxId}
      aria-activedescendant={activeDescendant}
      // Gives the combobox an accessible name when the caller hasn't supplied
      // an explicit aria-label / aria-labelledby (both overridable via props).
      aria-label="Search"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  );
}

export interface CommandListProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
  children?: React.ReactNode;
}

export function CommandList({ className, children, ...props }: CommandListProps) {
  const { listboxId } = useCommand();
  // id matches the input's aria-controls so the combobox owns this listbox.
  return (
    <div role="listbox" id={listboxId} className={className} {...props}>
      {children}
    </div>
  );
}

export interface CommandEmptyProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
  children?: React.ReactNode;
}

export function CommandEmpty({ className, children, ...props }: CommandEmptyProps) {
  const { visibleCount } = useCommand();
  if (visibleCount > 0) return null;
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export interface CommandGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
  heading?: React.ReactNode;
  children?: React.ReactNode;
}

export function CommandGroup({ className, heading, children, ...props }: CommandGroupProps) {
  return (
    <div role="group" className={className} {...props}>
      {heading && (
        <div cmdk-group-heading="" role="presentation">
          {heading}
        </div>
      )}
      {children}
    </div>
  );
}

export interface CommandItemProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  className?: string;
  value?: string;
  onSelect?: (value: string) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function CommandItem({ className, value, onSelect, disabled = false, children, ...props }: CommandItemProps) {
  // This id is both the value tracked in selectedId and the option's DOM id,
  // which is what the input's aria-activedescendant references.
  const id = useId();
  const { register, unregister, selectedId, setSelectedId, visibleSet } = useCommand();
  const optionRef = useRef<HTMLDivElement | null>(null);

  // Resolve a usable value string — fall back to children text if no value prop
  const resolvedValue = value ?? (typeof children === 'string' ? children : id);

  useEffect(() => {
    register(id, { value: String(resolvedValue), onSelect, disabled });
    return () => unregister(id);
  }, [id, resolvedValue, onSelect, disabled, register, unregister]);

  const isSelected = selectedId === id;

  // Focus stays on the input under the activedescendant model, so scroll the
  // active option into view manually when it becomes active.
  useEffect(() => {
    if (isSelected) optionRef.current?.scrollIntoView({ block: 'nearest' });
  }, [isSelected]);

  if (!visibleSet.has(id)) return null;

  const handleClick = () => {
    if (disabled) return;
    onSelect?.(String(resolvedValue));
  };

  return (
    <div
      // Stable DOM id targeted by aria-activedescendant when this option is active.
      id={id}
      ref={optionRef}
      role="option"
      aria-selected={isSelected}
      data-selected={isSelected ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      onMouseEnter={() => !disabled && setSelectedId(id)}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CommandSeparatorProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
}

export function CommandSeparator({ className, ...props }: CommandSeparatorProps) {
  return <div role="separator" className={className} {...props} />;
}

export interface CommandShortcutProps extends React.ComponentPropsWithoutRef<'span'> {
  className?: string;
}

export function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return <span className={className} {...props} />;
}

// cmdk-style namespace so existing `Command.Input` / `Command.List` access works
Command.Input = CommandInput;
Command.List = CommandList;
Command.Empty = CommandEmpty;
Command.Group = CommandGroup;
Command.Item = CommandItem;
Command.Separator = CommandSeparator;
