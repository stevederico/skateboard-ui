import {
  useRefWithInit
} from "./_chunk-1s41sngz.js";

// node_modules/.deno/@base-ui+utils@0.2.8/node_modules/@base-ui/utils/esm/useStableCallback.js
import * as React from "react";
"use client";
var useInsertionEffect = React[`useInsertionEffect${Math.random().toFixed(1)}`.slice(0, -3)];
var useSafeInsertionEffect = useInsertionEffect && useInsertionEffect !== React.useLayoutEffect ? useInsertionEffect : (fn) => fn();
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
