import {
  require_shim
} from "./_chunk-1vw45v38.js";
import {
  NOOP
} from "./_chunk-x8xehj6d.js";
import {
  __toESM
} from "./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/utils/useIsHydrating.js
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
