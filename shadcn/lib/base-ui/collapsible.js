/* @base-ui/react 1.4.1 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  CollapsibleRootContext,
  collapsibleOpenStateMapping,
  triggerOpenStateMapping,
  useCollapsiblePanel,
  useCollapsibleRoot,
  useCollapsibleRootContext
} from "./_chunk-wana68v3.js";
import"./_chunk-01rqe37g.js";
import"./_chunk-f5d01bp9.js";
import"./_chunk-mvv30fkv.js";
import"./_chunk-4s0k3h7t.js";
import"./_chunk-8kh3xk78.js";
import {
  transitionStatusMapping,
  useOpenChangeComplete
} from "./_chunk-mbn76q14.js";
import"./_chunk-v92ycsfj.js";
import"./_chunk-3h6zpchb.js";
import"./_chunk-8jz3hb7q.js";
import {
  useButton
} from "./_chunk-85vrgzwr.js";
import"./_chunk-71zm6zgv.js";
import"./_chunk-6xevjepc.js";
import"./_chunk-sx6vkz01.js";
import"./_chunk-n7dnqnbw.js";
import {
  useStableCallback
} from "./_chunk-mznt6ktj.js";
import {
  useIsoLayoutEffect
} from "./_chunk-b40erthe.js";
import {
  useRenderElement,
  warn
} from "./_chunk-1s41sngz.js";
import {
  __export
} from "./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/collapsible/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  Trigger: () => CollapsibleTrigger,
  Root: () => CollapsibleRoot,
  Panel: () => CollapsiblePanel
});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/collapsible/root/CollapsibleRoot.js
import * as React from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/collapsible/root/stateAttributesMapping.js
var collapsibleStateAttributesMapping = {
  ...collapsibleOpenStateMapping,
  ...transitionStatusMapping
};

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/collapsible/root/CollapsibleRoot.js
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
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/collapsible/trigger/CollapsibleTrigger.js
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
  const props = React2.useMemo(() => ({
    "aria-controls": open ? panelId : undefined,
    "aria-expanded": open,
    onClick: handleTrigger
  }), [panelId, open, handleTrigger]);
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef],
    props: [props, elementProps, getButtonProps],
    stateAttributesMapping
  });
  return element;
});
if (true)
  CollapsibleTrigger.displayName = "CollapsibleTrigger";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/collapsible/panel/CollapsiblePanel.js
import * as React3 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/collapsible/panel/CollapsiblePanelCssVars.js
var CollapsiblePanelCssVars = /* @__PURE__ */ function(CollapsiblePanelCssVars2) {
  CollapsiblePanelCssVars2["collapsiblePanelHeight"] = "--collapsible-panel-height";
  CollapsiblePanelCssVars2["collapsiblePanelWidth"] = "--collapsible-panel-width";
  return CollapsiblePanelCssVars2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/collapsible/panel/CollapsiblePanel.js
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
        warn("The `keepMounted={false}` prop on a Collapsible will be ignored when using `hiddenUntilFound` since it requires the Panel to remain mounted even when closed.");
      }
    }, [hiddenUntilFoundProp, keepMountedProp]);
  }
  const {
    abortControllerRef,
    animationTypeRef,
    height,
    mounted,
    onOpenChange,
    open,
    panelId,
    panelRef,
    runOnceAnimationsFinish,
    setDimensions,
    setHiddenUntilFound,
    setKeepMounted,
    setMounted,
    setPanelIdState,
    setOpen,
    setVisible,
    state,
    transitionDimensionRef,
    visible,
    width,
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
  useIsoLayoutEffect(() => {
    setHiddenUntilFound(hiddenUntilFound);
  }, [setHiddenUntilFound, hiddenUntilFound]);
  useIsoLayoutEffect(() => {
    setKeepMounted(keepMounted);
  }, [setKeepMounted, keepMounted]);
  const {
    props
  } = useCollapsiblePanel({
    abortControllerRef,
    animationTypeRef,
    externalRef: forwardedRef,
    height,
    hiddenUntilFound,
    id: panelId,
    keepMounted,
    mounted,
    onOpenChange,
    open,
    panelRef,
    runOnceAnimationsFinish,
    setDimensions,
    setMounted,
    setOpen,
    setVisible,
    transitionDimensionRef,
    visible,
    width
  });
  useOpenChangeComplete({
    open: open && transitionStatus === "idle",
    ref: panelRef,
    onComplete() {
      if (!open) {
        return;
      }
      setDimensions({
        height: undefined,
        width: undefined
      });
    }
  });
  const panelState = React3.useMemo(() => ({
    ...state,
    transitionStatus
  }), [state, transitionStatus]);
  const element = useRenderElement("div", componentProps, {
    state: panelState,
    ref: [forwardedRef, panelRef],
    props: [props, {
      style: {
        [CollapsiblePanelCssVars.collapsiblePanelHeight]: height === undefined ? "auto" : `${height}px`,
        [CollapsiblePanelCssVars.collapsiblePanelWidth]: width === undefined ? "auto" : `${width}px`
      }
    }, elementProps],
    stateAttributesMapping: collapsibleStateAttributesMapping
  });
  const shouldRender = keepMounted || hiddenUntilFound || mounted;
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
