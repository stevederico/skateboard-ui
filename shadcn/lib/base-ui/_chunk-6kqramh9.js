import {
  useIsoLayoutEffect
} from "./_chunk-5tze5c8q.js";
import {
  useRefWithInit
} from "./_chunk-x8xehj6d.js";

// node_modules/@base-ui/utils/esm/useValueAsRef.js
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
