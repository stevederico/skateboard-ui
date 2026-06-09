import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type * as React from 'react';

/**
 * Drop-in replacement for the subset of react-day-picker that shadcn's
 * Calendar wrapper consumes. Matches the DOM structure (table > tr > td > button)
 * and slot-based classNames API so the shadcn CSS selectors keep working.
 *
 * Supports:
 *  - mode="single" and mode="range" (selected + onSelect)
 *  - month / defaultMonth + onMonthChange
 *  - showOutsideDays, weekStartsOn
 *  - captionLayout="label" or "dropdown"
 *  - formatters.formatMonthDropdown
 *  - disabled (Date, Date[], (date) => boolean, or { from, to })
 *  - components.{ Root, Chevron, DayButton, WeekNumber }
 *  - classNames slot overrides
 *  - Full keyboard nav: ←/→ ±1d, ↑/↓ ±7d, PageUp/Down ±1mo (Shift = year),
 *    Home/End start/end of week, Enter/Space select.
 *
 * Not supported (intentional — out of scope):
 *  - numberOfMonths > 1
 *  - mode="multiple"
 *  - Locales beyond toLocaleString defaults
 *  - showWeekNumber
 *  - hidden / fromDate / toDate (use disabled instead)
 *  - Custom modifiers/matchers beyond disabled
 */

const SLOT_KEYS = [
  'root', 'months', 'month', 'nav', 'button_previous', 'button_next',
  'month_caption', 'dropdowns', 'dropdown_root', 'dropdown', 'caption_label',
  'table', 'weekdays', 'weekday', 'week', 'week_number_header', 'week_number',
  'day', 'range_start', 'range_middle', 'range_end', 'today', 'outside',
  'disabled', 'hidden'
] as const;

/** Slot name accepted by the classNames prop. */
export type CalendarSlot = (typeof SLOT_KEYS)[number];

/** Map of slot name → class string for every classNames slot. */
export type CalendarClassNames = Record<CalendarSlot, string>;

/** Selected range for mode="range". */
export interface DateRange {
  from?: Date;
  to?: Date;
}

/** Matchers accepted by the disabled prop. */
export type DisabledMatcher =
  | Date
  | Date[]
  | ((date: Date) => boolean)
  | { from?: Date; to?: Date; before?: Date; after?: Date };

/** Day wrapper passed to the DayButton component override. */
export interface CalendarDay {
  date: Date;
}

/** Modifier flags passed to the DayButton component override. */
export interface DayModifiers {
  selected: boolean;
  range_start: boolean;
  range_middle: boolean;
  range_end: boolean;
  today: boolean;
  outside: boolean;
  disabled: boolean;
  focused: boolean | null;
}

/** Props for the Root component override. */
export interface CalendarRootProps {
  className?: string;
  rootRef?: React.Ref<HTMLDivElement>;
  children?: React.ReactNode;
  [key: string]: any;
}

/** Props for the Chevron component override. */
export interface CalendarChevronProps {
  className?: string;
  orientation?: 'left' | 'right' | 'down' | 'up';
  [key: string]: any;
}

/** Props for the DayButton component override. */
export interface CalendarDayButtonProps {
  day: CalendarDay;
  modifiers: DayModifiers;
  className?: string;
  [key: string]: any;
}

/** Sub-renderer overrides (components prop). */
export interface CalendarComponents {
  Root?: React.ComponentType<CalendarRootProps>;
  Chevron?: React.ComponentType<CalendarChevronProps>;
  DayButton?: React.ComponentType<CalendarDayButtonProps>;
  WeekNumber?: React.ComponentType<any>;
}

/** Formatter overrides (formatters prop). */
export interface CalendarFormatters {
  formatMonthDropdown?: (month: Date) => string;
}

/**
 * Returns an object with empty strings for every classNames slot.
 * Lets consumers spread defaults safely without depending on internal class names.
 */
export function getDefaultClassNames(): CalendarClassNames {
  const out = {} as CalendarClassNames;
  for (const k of SLOT_KEYS) out[k] = '';
  return out;
}

// ===== Date utilities =====

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);
const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const isSameMonth = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
const isBefore = (a: Date, b: Date) => startOfDay(a).getTime() < startOfDay(b).getTime();
const isAfter = (a: Date, b: Date) => startOfDay(a).getTime() > startOfDay(b).getTime();

function isDisabled(date: Date, disabled: DisabledMatcher | undefined): boolean {
  if (!disabled) return false;
  if (disabled instanceof Date) return sameDay(date, disabled);
  if (Array.isArray(disabled)) return disabled.some((d) => sameDay(date, d));
  if (typeof disabled === 'function') return disabled(date);
  if (typeof disabled === 'object') {
    const { from, to, before, after } = disabled;
    if (from && to) return !isBefore(date, from) && !isAfter(date, to);
    if (before) return isBefore(date, before);
    if (after) return isAfter(date, after);
  }
  return false;
}

// ===== Grid =====

/**
 * Build a 6-row grid of Date objects covering the displayed month plus
 * leading/trailing outside-month days so every row has 7 cells.
 */
function buildGrid(displayMonth: Date, weekStartsOn: number): Date[][] {
  const first = startOfMonth(displayMonth);
  const dayOfWeek = (first.getDay() - weekStartsOn + 7) % 7;
  const start = addDays(first, -dayOfWeek);
  const weeks: Date[][] = [];
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) week.push(addDays(start, w * 7 + d));
    weeks.push(week);
  }
  return weeks;
}

// ===== Selection helpers =====

function isSelectedSingle(date: Date, selected: Date | DateRange | undefined): boolean {
  return selected instanceof Date && sameDay(date, selected);
}

function rangeModifiers(date: Date, range: DateRange | undefined) {
  if (!range || !range.from) {
    return { selected: false, range_start: false, range_middle: false, range_end: false };
  }
  const { from, to } = range;
  if (!to) {
    const isStart = sameDay(date, from);
    return { selected: isStart, range_start: isStart, range_middle: false, range_end: false };
  }
  const [lo, hi] = isBefore(from, to) ? [from, to] : [to, from];
  const isStart = sameDay(date, lo);
  const isEnd = sameDay(date, hi);
  const inMiddle =
    !isStart && !isEnd && !isBefore(date, lo) && !isAfter(date, hi);
  return {
    selected: isStart || isEnd || inMiddle,
    range_start: isStart,
    range_middle: inMiddle,
    range_end: isEnd
  };
}

// ===== Default sub-renderers (overridable via components prop) =====

function DefaultRoot({ className, rootRef, children, ...props }: CalendarRootProps) {
  return (
    <div ref={rootRef} className={className} {...props}>
      {children}
    </div>
  );
}

function DefaultChevron({ className, orientation }: CalendarChevronProps) {
  // Inline SVG fallback if no override supplied
  const rotate = orientation === 'left' ? 180 : orientation === 'down' ? 90 : 0;
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotate}deg)` }}
      className={className}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function DefaultDayButton({ day, modifiers, className, ...props }: CalendarDayButtonProps) {
  return (
    <button
      type="button"
      className={className}
      disabled={modifiers.disabled}
      {...props}
    >
      {day.date.getDate()}
    </button>
  );
}

function DefaultWeekNumber({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) {
  return <td {...props}>{children}</td>;
}

// ===== Caption (label vs dropdown) =====

function CaptionLabel({ displayMonth, classNames, format, captionLayout, ChevronCmp }: {
  displayMonth: Date;
  classNames: CalendarClassNames;
  format?: (month: Date) => string;
  captionLayout?: string;
  ChevronCmp: React.ComponentType<CalendarChevronProps>;
}) {
  const monthYear = format
    ? format(displayMonth)
    : displayMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  if (captionLayout === 'dropdown') {
    return (
      <span className={classNames.caption_label}>
        {monthYear}
        <ChevronCmp className="" orientation="down" />
      </span>
    );
  }
  return <span className={classNames.caption_label}>{monthYear}</span>;
}

function CaptionDropdowns({
  displayMonth, onMonthChange, classNames, formatters, ChevronCmp
}: {
  displayMonth: Date;
  onMonthChange?: (month: Date) => void;
  classNames: CalendarClassNames;
  formatters: CalendarFormatters;
  ChevronCmp: React.ComponentType<CalendarChevronProps>;
}) {
  const yearNow = new Date().getFullYear();
  const years: number[] = [];
  for (let y = yearNow - 100; y <= yearNow + 10; y++) years.push(y);

  const handleMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = new Date(displayMonth.getFullYear(), Number(e.target.value), 1);
    onMonthChange?.(next);
  };
  const handleYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = new Date(Number(e.target.value), displayMonth.getMonth(), 1);
    onMonthChange?.(next);
  };

  return (
    <div className={classNames.dropdowns}>
      <div className={classNames.dropdown_root}>
        <span className={classNames.caption_label}>
          {formatters.formatMonthDropdown
            ? formatters.formatMonthDropdown(displayMonth)
            : displayMonth.toLocaleString('default', { month: 'short' })}
          <ChevronCmp className="" orientation="down" />
        </span>
        <select
          aria-label="Month"
          value={displayMonth.getMonth()}
          onChange={handleMonth}
          className={classNames.dropdown}
        >
          {Array.from({ length: 12 }, (_, m) => (
            <option key={m} value={m}>
              {new Date(2000, m, 1).toLocaleString('default', { month: 'short' })}
            </option>
          ))}
        </select>
      </div>
      <div className={classNames.dropdown_root}>
        <span className={classNames.caption_label}>
          {displayMonth.getFullYear()}
          <ChevronCmp className="" orientation="down" />
        </span>
        <select
          aria-label="Year"
          value={displayMonth.getFullYear()}
          onChange={handleYear}
          className={classNames.dropdown}
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

// ===== Main DayPicker =====

/**
 * Calendar root — renders nav + caption + day grid for a single month.
 *
 * @param {Object} props
 * @param {'single'|'range'} [props.mode='single']
 * @param {Date|{from?: Date, to?: Date}} [props.selected]
 * @param {(value: any) => void} [props.onSelect]
 * @param {Date} [props.month] - Controlled displayed month
 * @param {(month: Date) => void} [props.onMonthChange]
 * @param {Date} [props.defaultMonth=new Date()]
 * @param {boolean} [props.showOutsideDays=true]
 * @param {0|1|2|3|4|5|6} [props.weekStartsOn=0]
 * @param {'label'|'dropdown'} [props.captionLayout='label']
 * @param {Object} [props.formatters]
 * @param {Object} [props.components]
 * @param {Object} [props.classNames]
 * @param {string} [props.className]
 * @param {Date|Date[]|Function|{from,to}|{before:Date}|{after:Date}} [props.disabled]
 */
export interface DayPickerProps {
  mode?: 'single' | 'range';
  selected?: Date | DateRange;
  onSelect?: (value: any) => void;
  month?: Date;
  onMonthChange?: (month: Date) => void;
  defaultMonth?: Date;
  showOutsideDays?: boolean;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  captionLayout?: 'label' | 'dropdown';
  formatters?: CalendarFormatters;
  components?: CalendarComponents;
  classNames?: Partial<CalendarClassNames>;
  className?: string;
  disabled?: DisabledMatcher;
  [key: string]: any;
}

export function DayPicker({
  mode = 'single',
  selected,
  onSelect,
  month: controlledMonth,
  onMonthChange,
  defaultMonth,
  showOutsideDays = true,
  weekStartsOn = 0,
  captionLayout = 'label',
  formatters = {},
  components = {},
  classNames: classNamesProp = {},
  className,
  disabled,
  ...rest
}: DayPickerProps) {
  const [internalMonth, setInternalMonth] = useState(() =>
    startOfMonth(controlledMonth || defaultMonth || (selected instanceof Date ? selected : new Date()))
  );
  const displayMonth = controlledMonth ? startOfMonth(controlledMonth) : internalMonth;

  const setMonth = useCallback((m: Date) => {
    const sm = startOfMonth(m);
    if (!controlledMonth) setInternalMonth(sm);
    onMonthChange?.(sm);
  }, [controlledMonth, onMonthChange]);

  const [focusedDay, setFocusedDay] = useState<Date | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const cls = useMemo(
    () => ({ ...getDefaultClassNames(), ...classNamesProp }),
    [classNamesProp]
  );

  const Root = components.Root || DefaultRoot;
  const ChevronCmp = components.Chevron || DefaultChevron;
  const DayButton = components.DayButton || DefaultDayButton;
  const WeekNumber = components.WeekNumber || DefaultWeekNumber;

  const today = useMemo(() => startOfDay(new Date()), []);
  const grid = useMemo(() => buildGrid(displayMonth, weekStartsOn), [displayMonth, weekStartsOn]);

  // Selection handler
  const handleSelect = useCallback((date: Date) => {
    if (mode === 'single') {
      onSelect?.(sameDay(selected as Date, date) ? undefined : date);
      return;
    }
    if (mode === 'range') {
      const range = (selected || {}) as DateRange;
      if (!range.from || (range.from && range.to)) {
        onSelect?.({ from: date });
      } else if (isBefore(date, range.from)) {
        onSelect?.({ from: date, to: range.from });
      } else {
        onSelect?.({ from: range.from, to: date });
      }
    }
  }, [mode, selected, onSelect]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!focusedDay) return;
    let next: Date | null = null;
    switch (e.key) {
      case 'ArrowLeft':  next = addDays(focusedDay, -1); break;
      case 'ArrowRight': next = addDays(focusedDay, 1); break;
      case 'ArrowUp':    next = addDays(focusedDay, -7); break;
      case 'ArrowDown':  next = addDays(focusedDay, 7); break;
      case 'PageUp':     next = addMonths(focusedDay, e.shiftKey ? -12 : -1); break;
      case 'PageDown':   next = addMonths(focusedDay, e.shiftKey ? 12 : 1); break;
      case 'Home': {
        const dow = (focusedDay.getDay() - weekStartsOn + 7) % 7;
        next = addDays(focusedDay, -dow);
        break;
      }
      case 'End': {
        const dow = (focusedDay.getDay() - weekStartsOn + 7) % 7;
        next = addDays(focusedDay, 6 - dow);
        break;
      }
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isDisabled(focusedDay, disabled)) handleSelect(focusedDay);
        return;
      default:
        return;
    }
    e.preventDefault();
    setFocusedDay(next);
    if (!isSameMonth(next, displayMonth)) setMonth(next);
  }, [focusedDay, displayMonth, weekStartsOn, disabled, handleSelect, setMonth]);

  // Initialize focused day on first interaction with grid
  const handleDayFocus = (date: Date) => setFocusedDay(date);

  const weekdayLabels = useMemo(() => {
    const labels: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(2024, 0, 7 + ((i + weekStartsOn) % 7)); // 2024-01-07 was a Sunday
      labels.push(d.toLocaleString('default', { weekday: 'short' }));
    }
    return labels;
  }, [weekStartsOn]);

  const handlePrev = () => setMonth(addMonths(displayMonth, -1));
  const handleNext = () => setMonth(addMonths(displayMonth, 1));

  return (
    <Root className={[cls.root, className].filter(Boolean).join(' ')} rootRef={rootRef} {...rest}>
      <div className={cls.months}>
        <div className={cls.month}>
          <div className={cls.nav}>
            <button
              type="button"
              aria-label="Previous month"
              onClick={handlePrev}
              className={cls.button_previous}
            >
              <ChevronCmp className="" orientation="left" />
            </button>
            <button
              type="button"
              aria-label="Next month"
              onClick={handleNext}
              className={cls.button_next}
            >
              <ChevronCmp className="" orientation="right" />
            </button>
          </div>
          <div className={cls.month_caption}>
            {captionLayout === 'dropdown' ? (
              <CaptionDropdowns
                displayMonth={displayMonth}
                onMonthChange={setMonth}
                classNames={cls}
                formatters={formatters}
                ChevronCmp={ChevronCmp}
              />
            ) : (
              <CaptionLabel
                displayMonth={displayMonth}
                classNames={cls}
                captionLayout={captionLayout}
                ChevronCmp={ChevronCmp}
              />
            )}
          </div>
          <table className={cls.table} role="grid" onKeyDown={handleKeyDown}>
            <thead>
              <tr className={cls.weekdays}>
                {weekdayLabels.map((label, i) => (
                  <th key={i} className={cls.weekday} scope="col" aria-label={label}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grid.map((week, wi) => (
                <tr key={wi} className={cls.week}>
                  {week.map((date) => {
                    const outside = !isSameMonth(date, displayMonth);
                    if (outside && !showOutsideDays) {
                      return <td key={date.toISOString()} className={cls.hidden}><div /></td>;
                    }
                    const dis = isDisabled(date, disabled);
                    const tod = sameDay(date, today);
                    const focused = focusedDay && sameDay(date, focusedDay);
                    let modSel = false, rs = false, rm = false, re = false;
                    if (mode === 'single') {
                      modSel = isSelectedSingle(date, selected);
                    } else if (mode === 'range') {
                      const rmods = rangeModifiers(date, selected as DateRange | undefined);
                      modSel = rmods.selected;
                      rs = rmods.range_start;
                      rm = rmods.range_middle;
                      re = rmods.range_end;
                    }
                    const dayClass = [
                      cls.day,
                      outside && cls.outside,
                      dis && cls.disabled,
                      tod && cls.today,
                      rs && cls.range_start,
                      rm && cls.range_middle,
                      re && cls.range_end
                    ].filter(Boolean).join(' ');

                    const modifiers = {
                      selected: modSel,
                      range_start: rs,
                      range_middle: rm,
                      range_end: re,
                      today: tod,
                      outside,
                      disabled: dis,
                      focused
                    };
                    const dayObj = { date };

                    return (
                      <td
                        key={date.toISOString()}
                        className={dayClass}
                        data-selected={modSel ? 'true' : undefined}
                        data-disabled={dis ? 'true' : undefined}
                        data-outside={outside ? 'true' : undefined}
                        data-today={tod ? 'true' : undefined}
                      >
                        <DayButton
                          day={dayObj}
                          modifiers={modifiers}
                          onClick={() => !dis && handleSelect(date)}
                          onFocus={() => handleDayFocus(date)}
                          tabIndex={focused || (!focusedDay && sameDay(date, today)) ? 0 : -1}
                          aria-selected={modSel}
                          aria-disabled={dis}
                          aria-current={tod ? 'date' : undefined}
                          className=""
                        >
                          {date.getDate()}
                        </DayButton>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Root>
  );
}
