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
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  register: (id: string, meta: CommandItemMeta) => void;
  unregister: (id: string) => void;
  isVisible: (id: string) => boolean;
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

export interface CommandProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function Command({ className, children, ...props }: CommandProps) {
  const [filter, setFilter] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const itemsRef = useRef(new Map<string, CommandItemMeta>()); // id -> { value, onSelect, disabled }

  const register = useCallback((id: string, meta: CommandItemMeta) => {
    itemsRef.current.set(id, meta);
  }, []);
  const unregister = useCallback((id: string) => {
    itemsRef.current.delete(id);
    setSelectedId((cur) => (cur === id ? null : cur));
  }, []);

  const visibleIds = useCallback(() => {
    const f = filter.trim().toLowerCase();
    const visible: string[] = [];
    for (const [id, meta] of itemsRef.current) {
      if (meta.disabled) continue;
      if (!f || meta.value.toLowerCase().includes(f)) visible.push(id);
    }
    return visible;
  }, [filter]);

  // Keep selection valid when filter changes
  useEffect(() => {
    const visible = visibleIds();
    if (visible.length === 0) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !visible.includes(selectedId)) setSelectedId(visible[0]);
  }, [filter, visibleIds, selectedId]);

  const move = useCallback((dir: number) => {
    const visible = visibleIds();
    if (visible.length === 0) return;
    const idx = selectedId ? visible.indexOf(selectedId) : -1;
    const next = (idx + dir + visible.length) % visible.length;
    setSelectedId(visible[next]);
  }, [selectedId, visibleIds]);

  const triggerSelected = useCallback(() => {
    if (!selectedId) return;
    const meta = itemsRef.current.get(selectedId);
    meta?.onSelect?.(meta.value);
  }, [selectedId]);

  const isVisible = useCallback((id: string) => visibleIds().includes(id), [visibleIds]);
  const visibleCount = visibleIds().length;

  const value = useMemo(
    () => ({ filter, setFilter, selectedId, setSelectedId, register, unregister, isVisible, visibleCount, move, triggerSelected }),
    [filter, selectedId, register, unregister, isVisible, visibleCount, move, triggerSelected]
  );

  return (
    <CommandContext.Provider value={value}>
      <div role="combobox" aria-expanded="true" className={className} {...props}>
        {children}
      </div>
    </CommandContext.Provider>
  );
}

export interface CommandInputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  [key: string]: any;
}

export function CommandInput({ className, placeholder, value: controlledValue, onValueChange, ...props }: CommandInputProps) {
  const { filter, setFilter, move, triggerSelected } = useCommand();
  const value = controlledValue ?? filter;

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
    <input
      role="searchbox"
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

export interface CommandListProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function CommandList({ className, children, ...props }: CommandListProps) {
  return (
    <div role="listbox" className={className} {...props}>
      {children}
    </div>
  );
}

export interface CommandEmptyProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
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

export interface CommandGroupProps {
  className?: string;
  heading?: React.ReactNode;
  children?: React.ReactNode;
  [key: string]: any;
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

export interface CommandItemProps {
  className?: string;
  value?: string;
  onSelect?: (value: string) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}

export function CommandItem({ className, value, onSelect, disabled = false, children, ...props }: CommandItemProps) {
  const id = useId();
  const { register, unregister, selectedId, setSelectedId, isVisible } = useCommand();

  // Resolve a usable value string — fall back to children text if no value prop
  const resolvedValue = value ?? (typeof children === 'string' ? children : id);

  useEffect(() => {
    register(id, { value: String(resolvedValue), onSelect, disabled });
    return () => unregister(id);
  }, [id, resolvedValue, onSelect, disabled, register, unregister]);

  if (!isVisible(id)) return null;

  const isSelected = selectedId === id;
  const handleClick = () => {
    if (disabled) return;
    onSelect?.(String(resolvedValue));
  };

  return (
    <div
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

export interface CommandSeparatorProps {
  className?: string;
  [key: string]: any;
}

export function CommandSeparator({ className, ...props }: CommandSeparatorProps) {
  return <div role="separator" className={className} {...props} />;
}

export interface CommandShortcutProps {
  className?: string;
  [key: string]: any;
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
