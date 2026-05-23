/* @base-ui/react 1.4.1 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  CompositeRoot
} from "./_chunk-0h5sskyw.js";
import"./_chunk-r0vsdknk.js";
import {
  MenubarContext,
  useMenubarContext
} from "./_chunk-65zw5gs2.js";
import"./_chunk-vdc01ss3.js";
import"./_chunk-p6qynd6r.js";
import"./_chunk-20rtfsz9.js";
import"./_chunk-wtw745qd.js";
import {
  FloatingNode,
  FloatingTree,
  useFloatingNodeId,
  useFloatingTree
} from "./_chunk-2tyt8f8r.js";
import"./_chunk-aqwsk46c.js";
import"./_chunk-xb7ph1ka.js";
import"./_chunk-atnkefgd.js";
import"./_chunk-drfb9kp2.js";
import"./_chunk-qce0xt57.js";
import"./_chunk-nya71ccw.js";
import"./_chunk-t7j3rbpv.js";
import"./_chunk-7v1t86x1.js";
import"./_chunk-hzgetm70.js";
import"./_chunk-mvv30fkv.js";
import"./_chunk-4s0k3h7t.js";
import {
  useBaseUiId
} from "./_chunk-8kh3xk78.js";
import"./_chunk-v92ycsfj.js";
import"./_chunk-3h6zpchb.js";
import"./_chunk-8jz3hb7q.js";
import"./_chunk-6xevjepc.js";
import"./_chunk-sx6vkz01.js";
import"./_chunk-n7dnqnbw.js";
import"./_chunk-mznt6ktj.js";
import"./_chunk-b40erthe.js";
import"./_chunk-1s41sngz.js";
import"./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/menubar/Menubar.js
import * as React from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/menubar/MenubarDataAttributes.js
var MenubarDataAttributes = /* @__PURE__ */ function(MenubarDataAttributes2) {
  MenubarDataAttributes2["modal"] = "data-modal";
  MenubarDataAttributes2["orientation"] = "data-orientation";
  MenubarDataAttributes2["hasSubmenuOpen"] = "data-has-submenu-open";
  return MenubarDataAttributes2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/menubar/Menubar.js
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
var menubarStateAttributesMapping = {
  hasSubmenuOpen(value) {
    return value ? {
      [MenubarDataAttributes.hasSubmenuOpen]: ""
    } : null;
  }
};
var Menubar = /* @__PURE__ */ React.forwardRef(function Menubar2(props, forwardedRef) {
  const {
    orientation = "horizontal",
    loopFocus = true,
    render,
    className,
    modal = true,
    disabled = false,
    id: idProp,
    style,
    ...elementProps
  } = props;
  const [contentElement, setContentElement] = React.useState(null);
  const [hasSubmenuOpen, setHasSubmenuOpen] = React.useState(false);
  const id = useBaseUiId(idProp);
  const state = {
    orientation,
    modal,
    hasSubmenuOpen
  };
  const contentRef = React.useRef(null);
  const allowMouseUpTriggerRef = React.useRef(false);
  const context = React.useMemo(() => ({
    contentElement,
    setContentElement,
    setHasSubmenuOpen,
    hasSubmenuOpen,
    modal,
    disabled,
    orientation,
    allowMouseUpTriggerRef,
    rootId: id
  }), [contentElement, hasSubmenuOpen, modal, disabled, orientation, id]);
  return /* @__PURE__ */ _jsx(MenubarContext.Provider, {
    value: context,
    children: /* @__PURE__ */ _jsx(FloatingTree, {
      children: /* @__PURE__ */ _jsx(MenubarContent, {
        children: /* @__PURE__ */ _jsx(CompositeRoot, {
          render,
          className,
          style,
          state,
          stateAttributesMapping: menubarStateAttributesMapping,
          refs: [forwardedRef, setContentElement, contentRef],
          props: [{
            role: "menubar",
            id
          }, elementProps],
          orientation,
          loopFocus,
          highlightItemOnHover: hasSubmenuOpen
        })
      })
    })
  });
});
if (true)
  Menubar.displayName = "Menubar";
function MenubarContent(props) {
  const nodeId = useFloatingNodeId();
  const {
    events: menuEvents
  } = useFloatingTree();
  const rootContext = useMenubarContext();
  React.useEffect(() => {
    function onSubmenuOpenChange(details) {
      if (!details.nodeId || details.parentNodeId !== nodeId) {
        return;
      }
      if (details.open) {
        if (!rootContext.hasSubmenuOpen) {
          rootContext.setHasSubmenuOpen(true);
        }
      } else if (details.reason !== "sibling-open" && details.reason !== "list-navigation") {
        rootContext.setHasSubmenuOpen(false);
      }
    }
    menuEvents.on("menuopenchange", onSubmenuOpenChange);
    return () => {
      menuEvents.off("menuopenchange", onSubmenuOpenChange);
    };
  }, [menuEvents, nodeId, rootContext]);
  return /* @__PURE__ */ _jsx(FloatingNode, {
    id: nodeId,
    children: props.children
  });
}
export {
  Menubar
};
