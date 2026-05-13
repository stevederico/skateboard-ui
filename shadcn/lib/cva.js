import { clsx } from './clsx.js';

/**
 * Build a class-variance function from a base string and a variants config.
 *
 * Drop-in for `class-variance-authority`'s `cva`. Returns a function that
 * accepts `{ variantKey, ..., class, className }` and returns the computed
 * class string for that combination, including any matching compoundVariants.
 * `class` and `className` props (if passed) are appended at the end so callers
 * can override.
 *
 * @param {string} base - Base classes applied to every variant
 * @param {Object} [config]
 * @param {Object<string,Object<string,string>>} [config.variants]
 * @param {Object<string,string>} [config.defaultVariants]
 * @param {Array<Object>} [config.compoundVariants] - Each: { ...conditions, class?, className? }
 * @returns {(props?: Object) => string}
 */
export function cva(base, config = {}) {
  const { variants = {}, defaultVariants = {}, compoundVariants = [] } = config;

  return function build(props = {}) {
    const result = [base];

    for (const key in variants) {
      const value = props[key] ?? defaultVariants[key];
      if (value != null && variants[key][value]) {
        result.push(variants[key][value]);
      }
    }

    for (const cv of compoundVariants) {
      const { class: cls, className, ...conditions } = cv;
      const matches = Object.keys(conditions).every((k) => {
        const expected = conditions[k];
        const actual = props[k] ?? defaultVariants[k];
        return Array.isArray(expected) ? expected.includes(actual) : expected === actual;
      });
      if (matches) result.push(cls || className);
    }

    if (props.class) result.push(props.class);
    if (props.className) result.push(props.className);

    return clsx(result);
  };
}
