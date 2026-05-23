import {
  useIsoLayoutEffect
} from "./_chunk-b40erthe.js";
import {
  useRefWithInit
} from "./_chunk-1s41sngz.js";

// node_modules/.deno/@base-ui+utils@0.2.8/node_modules/@base-ui/utils/esm/useValueAsRef.js
"use client";
function useValueAsRef(value) {
  const latest = useRefWithInit(createLatestRef, value).current;
  latest.next = value;
  useIsoLayoutEffect(latest.effect);
  return latest;
}
function createLatestRef(value) {
  const latest = {
    current: value,
    next: value,
    effect: () => {
      latest.current = latest.next;
    }
  };
  return latest;
}

export { useValueAsRef };
