import {
  getNextTabbable,
  getTabbableAfterElement,
  getTabbableBeforeElement,
  isOutsideEvent
} from "./_chunk-2tyt8f8r.js";
import {
  contains
} from "./_chunk-atnkefgd.js";
import {
  createChangeEventDetails,
  exports_reason_parts
} from "./_chunk-4s0k3h7t.js";
import {
  useStableCallback
} from "./_chunk-mznt6ktj.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/utils/popups/useTriggerFocusGuards.js
import * as React from "react";
import * as ReactDOM from "react-dom";
"use client";
function useTriggerFocusGuards(store, triggerElementRef) {
  const preFocusGuardRef = React.useRef(null);
  const handlePreFocusGuardFocus = useStableCallback((event) => {
    ReactDOM.flushSync(() => {
      store.setOpen(false, createChangeEventDetails(exports_reason_parts.focusOut, event.nativeEvent, event.currentTarget));
    });
    const previousTabbable = getTabbableBeforeElement(preFocusGuardRef.current);
    previousTabbable?.focus();
  });
  const handleFocusTargetFocus = useStableCallback((event) => {
    const positionerElement = store.select("positionerElement");
    if (positionerElement && isOutsideEvent(event, positionerElement)) {
      store.context.beforeContentFocusGuardRef.current?.focus();
    } else {
      ReactDOM.flushSync(() => {
        store.setOpen(false, createChangeEventDetails(exports_reason_parts.focusOut, event.nativeEvent, event.currentTarget));
      });
      let nextTabbable = getTabbableAfterElement(store.context.triggerFocusTargetRef.current || triggerElementRef.current);
      while (nextTabbable !== null && contains(positionerElement, nextTabbable)) {
        const prevTabbable = nextTabbable;
        nextTabbable = getNextTabbable(nextTabbable);
        if (nextTabbable === prevTabbable) {
          break;
        }
      }
      nextTabbable?.focus();
    }
  });
  return {
    preFocusGuardRef,
    handlePreFocusGuardFocus,
    handleFocusTargetFocus
  };
}

export { useTriggerFocusGuards };
