/**
 * Join class values into a single space-separated string.
 *
 * Drop-in for the `clsx` npm package, supporting strings, numbers,
 * truthy arrays, and `{ className: condition }` objects. Falsy values
 * are skipped.
 */

export type ClassValue =
  | string
  | number
  | null
  | undefined
  | boolean
  | ClassValue[]
  | Record<string, any>;

export function clsx(...args: ClassValue[]): string {
  const out: string[] = [];
  for (const a of args) {
    if (!a) continue;
    if (typeof a === 'string' || typeof a === 'number') {
      out.push(String(a));
    } else if (Array.isArray(a)) {
      const inner = clsx(...a);
      if (inner) out.push(inner);
    } else if (typeof a === 'object') {
      for (const k in a) if (a[k]) out.push(k);
    }
  }
  return out.join(' ');
}
