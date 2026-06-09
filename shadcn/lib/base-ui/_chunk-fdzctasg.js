import {
  useFloatingPortalNode
} from "./_chunk-2z044bba.js";

// node_modules/@base-ui/react/esm/utils/FloatingPortalLite.js
import * as React from "react";
import * as ReactDOM from "react-dom";
import { jsxs as _jsxs } from "react/jsx-runtime";
"use client";
var FloatingPortalLite = /* @__PURE__ */ React.forwardRef(function FloatingPortalLite2(componentProps, forwardedRef) {
  const {
    children,
    container,
    className,
    render,
    style,
    ...elementProps
  } = componentProps;
  const {
    portalNode,
    portalSubtree
  } = useFloatingPortalNode({
    container,
    ref: forwardedRef,
    componentProps,
    elementProps
  });
  if (!portalSubtree && !portalNode) {
    return null;
  }
  return /* @__PURE__ */ _jsxs(React.Fragment, {
    children: [portalSubtree, portalNode && /* @__PURE__ */ ReactDOM.createPortal(children, portalNode)]
  });
});
if (true)
  FloatingPortalLite.displayName = "FloatingPortalLite";

export { FloatingPortalLite };
