import { clsx, type ClassValue } from './clsx.js';

type VariantShape = Record<string, Record<string, string>>;

type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

type ConfigVariants<T extends VariantShape> = {
  [K in keyof T]?: StringToBoolean<keyof T[K]> | null | undefined;
};

type CompoundVariant<T extends VariantShape> = {
  [K in keyof T]?: StringToBoolean<keyof T[K]> | StringToBoolean<keyof T[K]>[] | undefined;
} & {
  class?: string | undefined;
  className?: string | undefined;
};

export interface CvaConfig<T extends VariantShape> {
  variants?: T;
  defaultVariants?: ConfigVariants<T>;
  compoundVariants?: CompoundVariant<T>[];
}

export type CvaProps<T extends VariantShape> = ConfigVariants<T> & {
  class?: ClassValue;
  className?: ClassValue;
};

export type VariantProps<Component extends (...args: any) => any> = Omit<
  Exclude<Parameters<Component>[0], undefined>,
  'class' | 'className'
>;

export function cva<T extends VariantShape>(
  base: ClassValue,
  config: CvaConfig<T> = {},
): (props?: CvaProps<T>) => string {
  const { variants = {} as T, defaultVariants = {}, compoundVariants = [] } = config;

  return function build(props: CvaProps<T> = {}): string {
    const p = props as Record<string, any>;
    const v = variants as Record<string, Record<string, string>>;
    const dv = defaultVariants as Record<string, any>;
    const result: ClassValue[] = [base];

    for (const key in v) {
      const value = p[key] ?? dv[key];
      if (value != null && v[key][value]) {
        result.push(v[key][value]);
      }
    }

    for (const cv of compoundVariants as Record<string, any>[]) {
      const { class: cls, className, ...conditions } = cv;
      const matches = Object.keys(conditions).every((k) => {
        const expected = conditions[k];
        const actual = p[k] ?? dv[k];
        return Array.isArray(expected) ? expected.includes(actual) : expected === actual;
      });
      if (matches) result.push(cls || className);
    }

    if (p.class) result.push(p.class);
    if (p.className) result.push(p.className);

    return clsx(result);
  };
}
