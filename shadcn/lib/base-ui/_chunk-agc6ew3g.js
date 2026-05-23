import {
  useScrollLock
} from "./_chunk-q3nee19r.js";
import {
  ownerDocument
} from "./_chunk-xb7ph1ka.js";
import {
  useIsoLayoutEffect
} from "./_chunk-b40erthe.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/utils/useAnchoredPopupScrollLock.js
import * as React from "react";
"use client";
var VIEWPORT_WIDTH_TOLERANCE_PX = 20;
function useAnchoredPopupScrollLock(enabled, touchOpen, positionerElement, referenceElement) {
  const [touchOpenShouldLockScroll, setTouchOpenShouldLockScroll] = React.useState(false);
  useIsoLayoutEffect(() => {
    if (!enabled || !touchOpen || positionerElement == null) {
      setTouchOpenShouldLockScroll(false);
      return;
    }
    const viewportWidth = ownerDocument(positionerElement).documentElement.clientWidth;
    const popupWidth = positionerElement.offsetWidth;
    setTouchOpenShouldLockScroll(viewportWidth > 0 && popupWidth > 0 && popupWidth >= viewportWidth - VIEWPORT_WIDTH_TOLERANCE_PX);
  }, [enabled, touchOpen, positionerElement]);
  useScrollLock(enabled && (!touchOpen || touchOpenShouldLockScroll), referenceElement);
}

export { useAnchoredPopupScrollLock };
