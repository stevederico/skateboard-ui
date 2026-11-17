import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import type * as React from 'react';

interface CommandItemMeta {
  value: string;
  onSelect?: (value: string) => void;
  disabled: boolean;
}

interface CommandContextValue {
  filter: string;
  setFilter: (value: string) => void;
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  listboxId: string;
  register: (id: string, meta: CommandItemMeta) => void;
  unregister: (id: string) => void;
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
  const listboxId = useId();
  const itemsRef = useRef(new Map<string, CommandItemMeta>());
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

  const isExpanded = visibleCount > 0;
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
    <input
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={isExpanded}
      aria-controls={listboxId}
      aria-activedescendant={activeDescendant}
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
  const id = useId();
  const { register, unregister, selectedId, setSelectedId, visibleSet } = useCommand();
  const optionRef = useRef<HTMLDivElement | null>(null);

  const resolvedValue = value ?? (typeof children === 'string' ? children : id);

  useEffect(() => {
    register(id, { value: String(resolvedValue), onSelect, disabled });
    return () => unregister(id);
  }, [id, resolvedValue, onSelect, disabled, register, unregister]);

  const isSelected = selectedId === id;

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

Command.Input = CommandInput;
Command.List = CommandList;
Command.Empty = CommandEmpty;
Command.Group = CommandGroup;
Command.Item = CommandItem;
Command.Separator = CommandSeparator;
