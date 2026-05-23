// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/internals/clamp.js
function clamp(val, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return Math.max(min, Math.min(val, max));
}

export { clamp };
