import {
  isReactVersionAtLeast
} from "./_chunk-x8xehj6d.js";

// node_modules/@base-ui/utils/esm/inertValue.js
function inertValue(value) {
  if (isReactVersionAtLeast(19)) {
    return value;
  }
  return value ? "true" : undefined;
}

export { inertValue };
