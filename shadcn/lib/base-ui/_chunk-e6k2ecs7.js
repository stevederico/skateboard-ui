import {
  clamp
} from "./_chunk-yzr7eg4b.js";

// node_modules/@base-ui/react/esm/utils/styles.js
import { jsx as _jsx } from "react/jsx-runtime";
var DISABLE_SCROLLBAR_CLASS_NAME = "base-ui-disable-scrollbar";
var styleDisableScrollbar = {
  className: DISABLE_SCROLLBAR_CLASS_NAME,
  getElement(nonce) {
    return /* @__PURE__ */ _jsx("style", {
      nonce,
      href: DISABLE_SCROLLBAR_CLASS_NAME,
      precedence: "base-ui:low",
      children: `.${DISABLE_SCROLLBAR_CLASS_NAME}{scrollbar-width:none}.${DISABLE_SCROLLBAR_CLASS_NAME}::-webkit-scrollbar{display:none}`
    });
  }
};
if (true)
  styleDisableScrollbar.getElement.displayName = "styleDisableScrollbar.getElement";

// node_modules/@base-ui/react/esm/utils/scrollEdges.js
var SCROLL_EDGE_TOLERANCE_PX = 1;
function getMaxScrollOffset(scrollSize, clientSize) {
  return Math.max(0, scrollSize - clientSize);
}
function normalizeScrollOffset(value, max) {
  if (max <= 0) {
    return 0;
  }
  const clamped = clamp(value, 0, max);
  const startDistance = clamped;
  const endDistance = max - clamped;
  const withinStartTolerance = startDistance <= SCROLL_EDGE_TOLERANCE_PX;
  const withinEndTolerance = endDistance <= SCROLL_EDGE_TOLERANCE_PX;
  if (withinStartTolerance && withinEndTolerance) {
    return startDistance <= endDistance ? 0 : max;
  }
  if (withinStartTolerance) {
    return 0;
  }
  if (withinEndTolerance) {
    return max;
  }
  return clamped;
}

export { styleDisableScrollbar, SCROLL_EDGE_TOLERANCE_PX, getMaxScrollOffset, normalizeScrollOffset };
