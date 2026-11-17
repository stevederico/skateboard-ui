import path from 'node:path';

export function repoRelative(context) {
  return toPosix(path.relative(context.cwd, context.filename));
}

export function toPosix(p) {
  return p.split(path.sep).join('/');
}

export function resolveSpecifier(context, source) {
  if (!source.startsWith('.') && !source.startsWith('/')) return null;
  const absolute = path.resolve(path.dirname(context.filename), source);
  return toPosix(path.relative(context.cwd, absolute));
}

export function specifierTo(context, target) {
  const rel = path.posix.relative(path.posix.dirname(repoRelative(context)), target);
  return rel.startsWith('.') ? rel : `./${rel}`;
}

export const TEST_FILE = /\.(?:test|spec)\.[cm]?[jt]sx?$/;
