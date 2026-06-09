/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  CollapsibleRootContext,
  collapsibleOpenStateMapping,
  triggerOpenStateMapping,
  useCollapsiblePanel,
  useCollapsibleRoot,
  useCollapsibleRootContext
} from "./_chunk-6adaer33.js";
import"./_chunk-9x63vfqj.js";
import"./_chunk-x11e1k9r.js";
import"./_chunk-ase0ydtt.js";
import"./_chunk-6kqramh9.js";
import"./_chunk-451nqgsa.js";
import"./_chunk-e56mpvk1.js";
import"./_chunk-wdqynnjf.js";
import {
  transitionStatusMapping
} from "./_chunk-e13rsb6b.js";
import"./_chunk-zk4mtm9m.js";
import"./_chunk-8a9vv8am.js";
import"./_chunk-6ejf1z1r.js";
import {
  useButton
} from "./_chunk-5xmdvndx.js";
import"./_chunk-hm5h9vsk.js";
import"./_chunk-cdgfsr3q.js";
import"./_chunk-000kmre8.js";
import {
  useStableCallback
} from "./_chunk-cwvtvwc7.js";
import {
  useIsoLayoutEffect
} from "./_chunk-5tze5c8q.js";
import {
  resolveStyle,
  useRenderElement,
  warn
} from "./_chunk-x8xehj6d.js";
import {
  __export
} from "./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/collapsible/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  Trigger: () => CollapsibleTrigger,
  Root: () => CollapsibleRoot,
  Panel: () => CollapsiblePanel
});

// node_modules/@base-ui/react/esm/collapsible/root/CollapsibleRoot.js
import * as React from "react";

// node_modules/@base-ui/react/esm/collapsible/root/stateAttributesMapping.js
var collapsibleStateAttributesMapping = {
  ...collapsibleOpenStateMapping,
  ...transitionStatusMapping
};

// node_modules/@base-ui/react/esm/collapsible/root/CollapsibleRoot.js
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
var CollapsibleRoot = /* @__PURE__ */ React.forwardRef(function CollapsibleRoot2(componentProps, forwardedRef) {
  const {
    render,
    className,
    defaultOpen = false,
    disabled = false,
    onOpenChange: onOpenChangeProp,
    open,
    style,
    ...elementProps
  } = componentProps;
  const onOpenChange = useStableCallback(onOpenChangeProp);
  const collapsible = useCollapsibleRoot({
    open,
    defaultOpen,
    onOpenChange,
    disabled
  });
  const state = React.useMemo(() => ({
    open: collapsible.open,
    disabled: collapsible.disabled,
    transitionStatus: collapsible.transitionStatus
  }), [collapsible.open, collapsible.disabled, collapsible.transitionStatus]);
  const contextValue = React.useMemo(() => ({
    ...collapsible,
    onOpenChange,
    state
  }), [collapsible, onOpenChange, state]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: collapsibleStateAttributesMapping
  });
  return /* @__PURE__ */ _jsx(CollapsibleRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (true)
  CollapsibleRoot.displayName = "CollapsibleRoot";
// node_modules/@base-ui/react/esm/collapsible/trigger/CollapsibleTrigger.js
import * as React2 from "react";
"use client";
var stateAttributesMapping = {
  ...triggerOpenStateMapping,
  ...transitionStatusMapping
};
var CollapsibleTrigger = /* @__PURE__ */ React2.forwardRef(function CollapsibleTrigger2(componentProps, forwardedRef) {
  const {
    panelId,
    open,
    handleTrigger,
    state,
    disabled: contextDisabled
  } = useCollapsibleRootContext();
  const {
    className,
    disabled = contextDisabled,
    id,
    render,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton
  });
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef],
    props: [{
      "aria-controls": open ? panelId : undefined,
      "aria-expanded": open,
      onClick: handleTrigger
    }, elementProps, getButtonProps],
    stateAttributesMapping
  });
  return element;
});
if (true)
  CollapsibleTrigger.displayName = "CollapsibleTrigger";
// node_modules/@base-ui/react/esm/collapsible/panel/CollapsiblePanel.js
import * as React3 from "react";

// node_modules/@base-ui/react/esm/collapsible/panel/CollapsiblePanelCssVars.js
var CollapsiblePanelCssVars = /* @__PURE__ */ function(CollapsiblePanelCssVars2) {
  CollapsiblePanelCssVars2["collapsiblePanelHeight"] = "--collapsible-panel-height";
  CollapsiblePanelCssVars2["collapsiblePanelWidth"] = "--collapsible-panel-width";
  return CollapsiblePanelCssVars2;
}({});

// node_modules/@base-ui/react/esm/collapsible/panel/CollapsiblePanel.js
"use client";
var CollapsiblePanel = /* @__PURE__ */ React3.forwardRef(function CollapsiblePanel2(componentProps, forwardedRef) {
  const {
    className,
    hiddenUntilFound: hiddenUntilFoundProp,
    keepMounted: keepMountedProp,
    render,
    id: idProp,
    style,
    ...elementProps
  } = componentProps;
  if (true) {
    useIsoLayoutEffect(() => {
      if (hiddenUntilFoundProp && keepMountedProp === false) {
        warn("The `keepMounted={false}` prop on `Collapsible.Panel` is ignored when `hiddenUntilFound` is enabled, since the panel must remain mounted while closed.");
      }
    }, [hiddenUntilFoundProp, keepMountedProp]);
  }
  const {
    mounted,
    onOpenChange,
    open,
    panelId,
    setMounted,
    setPanelIdState,
    setOpen,
    state,
    transitionStatus
  } = useCollapsibleRootContext();
  const hiddenUntilFound = hiddenUntilFoundProp ?? false;
  const keepMounted = keepMountedProp ?? false;
  useIsoLayoutEffect(() => {
    if (idProp) {
      setPanelIdState(idProp);
      return () => {
        setPanelIdState(undefined);
      };
    }
    return;
  }, [idProp, setPanelIdState]);
  const {
    height,
    props,
    ref,
    shouldPreventOpenAnimation,
    shouldRender,
    transitionStatus: panelTransitionStatus,
    width
  } = useCollapsiblePanel({
    externalRef: forwardedRef,
    hiddenUntilFound,
    id: panelId,
    keepMounted,
    mounted,
    onOpenChange,
    open,
    setMounted,
    setOpen,
    transitionStatus
  });
  const panelState = {
    ...state,
    transitionStatus: panelTransitionStatus
  };
  const resolvedStyle = resolveStyle(style, panelState);
  const element = useRenderElement("div", {
    ...componentProps,
    style: undefined
  }, {
    state: panelState,
    ref,
    props: [
      props,
      {
        style: {
          [CollapsiblePanelCssVars.collapsiblePanelHeight]: height === undefined ? "auto" : `${height}px`,
          [CollapsiblePanelCssVars.collapsiblePanelWidth]: width === undefined ? "auto" : `${width}px`
        }
      },
      elementProps,
      resolvedStyle ? {
        style: resolvedStyle
      } : undefined,
      shouldPreventOpenAnimation ? {
        style: {
          animationName: "none"
        }
      } : undefined
    ],
    stateAttributesMapping: collapsibleStateAttributesMapping
  });
  if (!shouldRender) {
    return null;
  }
  return element;
});
if (true)
  CollapsiblePanel.displayName = "CollapsiblePanel";
export {
  exports_index_parts as Collapsible
};
