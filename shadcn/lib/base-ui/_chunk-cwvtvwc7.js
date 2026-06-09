import {
  SafeReact
} from "./_chunk-5tze5c8q.js";
import {
  useRefWithInit
} from "./_chunk-x8xehj6d.js";

// node_modules/@base-ui/utils/esm/useStableCallback.js
"use client";
var useInsertionEffect = SafeReact.useInsertionEffect;
var useSafeInsertionEffect = useInsertionEffect && useInsertionEffect !== SafeReact.useLayoutEffect ? useInsertionEffect : (fn) => fn();
function useStableCallback(callback) {
  const stable = useRefWithInit(createStableCallback).current;
  stable.next = callback;
  useSafeInsertionEffect(stable.effect);
  return stable.trampoline;
}
function createStableCallback() {
  const stable = {
    next: undefined,
    callback: assertNotCalled,
    trampoline: (...args) => stable.callback?.(...args),
    effect: () => {
      stable.callback = stable.next;
    }
  };
  return stable;
}
function assertNotCalled() {
  if (true) {
    throw new Error("Base UI: Cannot call an event handler while rendering.");
  }
}

export { useStableCallback };
