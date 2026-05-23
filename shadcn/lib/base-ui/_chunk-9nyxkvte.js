import {
  isReactVersionAtLeast
} from "./_chunk-1s41sngz.js";

// node_modules/.deno/@base-ui+utils@0.2.8/node_modules/@base-ui/utils/esm/inertValue.js
function inertValue(value) {
  if (isReactVersionAtLeast(19)) {
    return value;
  }
  return value ? "true" : undefined;
}

export { inertValue };
