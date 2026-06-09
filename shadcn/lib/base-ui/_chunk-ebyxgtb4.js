import {
  useScrollLock
} from "./_chunk-ytnp24gq.js";
import {
  ownerDocument
} from "./_chunk-451nqgsa.js";
import {
  useIsoLayoutEffect
} from "./_chunk-5tze5c8q.js";

// node_modules/@base-ui/react/esm/utils/useAnchoredPopupScrollLock.js
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
