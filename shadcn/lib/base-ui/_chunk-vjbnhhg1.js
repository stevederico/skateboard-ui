import {
  require_shim
} from "./_chunk-aqwsk46c.js";
import {
  NOOP
} from "./_chunk-1s41sngz.js";
import {
  __toESM
} from "./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/utils/useIsHydrating.js
var import_shim = __toESM(require_shim(), 1);
function subscribe() {
  return NOOP;
}
function getSnapshot() {
  return false;
}
function getServerSnapshot() {
  return true;
}
function useIsHydrating() {
  return import_shim.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export { useIsHydrating };
