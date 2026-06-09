/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  CompositeRoot
} from "./_chunk-cdj8cpx5.js";
import"./_chunk-5tt5hk59.js";
import {
  MenubarContext,
  useMenubarContext
} from "./_chunk-wx2nxg0p.js";
import"./_chunk-26cc610z.js";
import"./_chunk-j29xjete.js";
import"./_chunk-3xpke33f.js";
import"./_chunk-gy0bpkmx.js";
import {
  FloatingNode,
  FloatingTree,
  useFloatingNodeId,
  useFloatingTree
} from "./_chunk-2z044bba.js";
import"./_chunk-1vw45v38.js";
import"./_chunk-cgptgywc.js";
import"./_chunk-pv7b791x.js";
import"./_chunk-kw8nnq00.js";
import"./_chunk-rrh8rt4v.js";
import"./_chunk-b6dkjkbw.js";
import"./_chunk-dan0mva4.js";
import"./_chunk-ase0ydtt.js";
import"./_chunk-6kqramh9.js";
import"./_chunk-451nqgsa.js";
import"./_chunk-e56mpvk1.js";
import {
  useBaseUiId
} from "./_chunk-wdqynnjf.js";
import"./_chunk-zk4mtm9m.js";
import"./_chunk-8a9vv8am.js";
import"./_chunk-6ejf1z1r.js";
import"./_chunk-cdgfsr3q.js";
import"./_chunk-000kmre8.js";
import"./_chunk-cwvtvwc7.js";
import"./_chunk-5tze5c8q.js";
import"./_chunk-x8xehj6d.js";
import"./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/menubar/Menubar.js
import * as React from "react";

// node_modules/@base-ui/react/esm/menubar/MenubarDataAttributes.js
var MenubarDataAttributes = /* @__PURE__ */ function(MenubarDataAttributes2) {
  MenubarDataAttributes2["modal"] = "data-modal";
  MenubarDataAttributes2["orientation"] = "data-orientation";
  MenubarDataAttributes2["hasSubmenuOpen"] = "data-has-submenu-open";
  return MenubarDataAttributes2;
}({});

// node_modules/@base-ui/react/esm/menubar/Menubar.js
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
