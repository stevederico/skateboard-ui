import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';

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

const CommandContext = createContext(null);

function useCommand() {
  const ctx = useContext(CommandContext);
  if (!ctx) throw new Error('Command.* components must be used within <Command>');
  return ctx;
}

export function Command({ className, children, ...props }) {
  const [filter, setFilter] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const itemsRef = useRef(new Map()); // id -> { value, onSelect, disabled }

  const register = useCallback((id, meta) => {
    itemsRef.current.set(id, meta);
  }, []);
  const unregister = useCallback((id) => {
    itemsRef.current.delete(id);
    setSelectedId((cur) => (cur === id ? null : cur));
  }, []);

  const visibleIds = useCallback(() => {
    const f = filter.trim().toLowerCase();
    const visible = [];
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

  const move = useCallback((dir) => {
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

  const isVisible = useCallback((id) => visibleIds().includes(id), [visibleIds]);
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

export function CommandInput({ className, placeholder, value: controlledValue, onValueChange, ...props }) {
  const { filter, setFilter, move, triggerSelected } = useCommand();
  const value = controlledValue ?? filter;

  const handleChange = (e) => {
    const v = e.target.value;
    setFilter(v);
    onValueChange?.(v);
  };

  const handleKeyDown = (e) => {
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

export function CommandList({ className, children, ...props }) {
  return (
    <div role="listbox" className={className} {...props}>
      {children}
    </div>
  );
}

export function CommandEmpty({ className, children, ...props }) {
  const { visibleCount } = useCommand();
  if (visibleCount > 0) return null;
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function CommandGroup({ className, heading, children, ...props }) {
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

export function CommandItem({ className, value, onSelect, disabled = false, children, ...props }) {
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

export function CommandSeparator({ className, ...props }) {
  return <div role="separator" className={className} {...props} />;
}

export function CommandShortcut({ className, ...props }) {
  return <span className={className} {...props} />;
}

// cmdk-style namespace so existing `Command.Input` / `Command.List` access works
Command.Input = CommandInput;
Command.List = CommandList;
Command.Empty = CommandEmpty;
Command.Group = CommandGroup;
Command.Item = CommandItem;
Command.Separator = CommandSeparator;
