import path from 'node:path';

/**
 * Path of the linted file relative to the ESLint working directory (the repo root),
 * always with forward slashes so patterns behave the same on every OS.
 *
 * @param {import('eslint').Rule.RuleContext} context - Rule context
 * @returns {string} Repo-relative path, e.g. `components/views/SettingsView.tsx`
 */
export function repoRelative(context) {
  return toPosix(path.relative(context.cwd, context.filename));
}

/**
 * Convert an OS path to forward slashes.
 *
 * @param {string} p - Path in OS format
 * @returns {string} Same path with `/` separators
 */
export function toPosix(p) {
  return p.split(path.sep).join('/');
}

/**
 * Resolve an import specifier written in `context.filename` to a repo-relative path.
 * Only `./`, `../` and absolute specifiers resolve; bare package specifiers return null.
 *
 * @param {import('eslint').Rule.RuleContext} context - Rule context
 * @param {string} source - Import specifier as written
 * @returns {string | null} Repo-relative target path, or null for package imports
 */
export function resolveSpecifier(context, source) {
  if (!source.startsWith('.') && !source.startsWith('/')) return null;
  const absolute = path.resolve(path.dirname(context.filename), source);
  return toPosix(path.relative(context.cwd, absolute));
}

/**
 * Relative specifier from the linted file to a repo-relative target, for fix hints.
 *
 * @param {import('eslint').Rule.RuleContext} context - Rule context
 * @param {string} target - Repo-relative target, e.g. `icons/index.js`
 * @returns {string} Specifier such as `../../icons/index.js`
 */
export function specifierTo(context, target) {
  const rel = path.posix.relative(path.posix.dirname(repoRelative(context)), target);
  return rel.startsWith('.') ? rel : `./${rel}`;
}

/** Matches test files: guardrail RuleTester suites (`*.test.js`) and Playwright specs (`*.spec.ts`). */
export const TEST_FILE = /\.(?:test|spec)\.[cm]?[jt]sx?$/;
