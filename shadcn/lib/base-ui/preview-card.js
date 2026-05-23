/* @base-ui/react 1.4.1 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  FloatingPortalLite
} from "./_chunk-qt6r015s.js";
import {
  usePopupViewport
} from "./_chunk-q7yw9mz4.js";
import"./_chunk-gfce3j3z.js";
import {
  adaptiveOrigin,
  getDisabledMountTransitionStyles,
  useAnchorPositioning,
  usePositioner
} from "./_chunk-502wngfc.js";
import"./_chunk-xfagb0fq.js";
import"./_chunk-wtw745qd.js";
import {
  createInitialPopupStoreState,
  popupStoreSelectors,
  useImplicitActiveTrigger,
  useOpenStateTransitions,
  useTriggerDataForwarding
} from "./_chunk-7jjzay8b.js";
import {
  useOnFirstRender
} from "./_chunk-f09cp81f.js";
import"./_chunk-f9tgee1q.js";
import {
  popupStateMapping,
  triggerOpenStateMapping
} from "./_chunk-536jvgeq.js";
import"./_chunk-9nyxkvte.js";
import {
  FloatingNode,
  FloatingTree,
  POPUP_COLLISION_AVOIDANCE,
  PopupTriggerMap,
  ReactStore,
  createSelector,
  safePolygon,
  useDismiss,
  useFloatingNodeId,
  useFocus,
  useHoverFloatingInteraction,
  useHoverReferenceInteraction,
  useInteractions,
  useSyncedFloatingRootContext
} from "./_chunk-2tyt8f8r.js";
import"./_chunk-aqwsk46c.js";
import"./_chunk-xb7ph1ka.js";
import"./_chunk-atnkefgd.js";
import"./_chunk-drfb9kp2.js";
import"./_chunk-nya71ccw.js";
import"./_chunk-t7j3rbpv.js";
import"./_chunk-7v1t86x1.js";
import"./_chunk-hzgetm70.js";
import"./_chunk-mvv30fkv.js";
import {
  createChangeEventDetails,
  exports_reason_parts
} from "./_chunk-4s0k3h7t.js";
import {
  useBaseUiId
} from "./_chunk-8kh3xk78.js";
import {
  transitionStatusMapping,
  useOpenChangeComplete
} from "./_chunk-mbn76q14.js";
import"./_chunk-v92ycsfj.js";
import"./_chunk-3h6zpchb.js";
import"./_chunk-8jz3hb7q.js";
import"./_chunk-sx6vkz01.js";
import"./_chunk-n7dnqnbw.js";
import {
  useStableCallback
} from "./_chunk-mznt6ktj.js";
import {
  useIsoLayoutEffect
} from "./_chunk-b40erthe.js";
import {
  useRefWithInit,
  useRenderElement
} from "./_chunk-1s41sngz.js";
import {
  __export
} from "./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  createHandle: () => createPreviewCardHandle,
  Viewport: () => PreviewCardViewport,
  Trigger: () => PreviewCardTrigger,
  Root: () => PreviewCardRoot,
  Positioner: () => PreviewCardPositioner,
  Portal: () => PreviewCardPortal,
  Popup: () => PreviewCardPopup,
  Handle: () => PreviewCardHandle,
  Backdrop: () => PreviewCardBackdrop,
  Arrow: () => PreviewCardArrow
});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/root/PreviewCardRoot.js
import * as React3 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/root/PreviewCardContext.js
import * as React from "react";
"use client";
var PreviewCardRootContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  PreviewCardRootContext.displayName = "PreviewCardRootContext";
function usePreviewCardRootContext(optional) {
  const context = React.useContext(PreviewCardRootContext);
  if (context === undefined && !optional) {
    throw new Error("Base UI: PreviewCardRootContext is missing. PreviewCard parts must be placed within <PreviewCard.Root>.");
  }
  return context;
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/store/PreviewCardStore.js
import * as React2 from "react";
import * as ReactDOM from "react-dom";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/utils/constants.js
var OPEN_DELAY = 600;
var CLOSE_DELAY = 300;

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/store/PreviewCardStore.js
var selectors = {
  ...popupStoreSelectors,
  instantType: createSelector((state) => state.instantType),
  hasViewport: createSelector((state) => state.hasViewport)
};

class PreviewCardStore extends ReactStore {
  constructor(initialState) {
    super({
      ...createInitialState(),
      ...initialState
    }, {
      popupRef: /* @__PURE__ */ React2.createRef(),
      onOpenChange: undefined,
      onOpenChangeComplete: undefined,
      triggerElements: new PopupTriggerMap,
      closeDelayRef: {
        current: CLOSE_DELAY
      }
    }, selectors);
  }
  setOpen = (nextOpen, eventDetails) => {
    const reason = eventDetails.reason;
    const isHover = reason === exports_reason_parts.triggerHover;
    const isFocusOpen = nextOpen && reason === exports_reason_parts.triggerFocus;
    const isDismissClose = !nextOpen && (reason === exports_reason_parts.triggerPress || reason === exports_reason_parts.escapeKey);
    eventDetails.preventUnmountOnClose = () => {
      this.set("preventUnmountingOnClose", true);
    };
    this.context.onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
    const changeState = () => {
      const updatedState = {
        open: nextOpen
      };
      if (isFocusOpen) {
        updatedState.instantType = "focus";
      } else if (isDismissClose) {
        updatedState.instantType = "dismiss";
      } else if (reason === exports_reason_parts.triggerHover) {
        updatedState.instantType = undefined;
      }
      const newTriggerId = eventDetails.trigger?.id ?? null;
      if (newTriggerId || nextOpen) {
        updatedState.activeTriggerId = newTriggerId;
        updatedState.activeTriggerElement = eventDetails.trigger ?? null;
      }
      this.update(updatedState);
    };
    if (isHover) {
      ReactDOM.flushSync(changeState);
    } else {
      changeState();
    }
  };
  static useStore(externalStore, initialState) {
    const internalStore = useRefWithInit(() => {
      return new PreviewCardStore(initialState);
    }).current;
    const store = externalStore ?? internalStore;
    const floatingRootContext = useSyncedFloatingRootContext({
      popupStore: store,
      onOpenChange: store.setOpen
    });
    store.state.floatingRootContext = floatingRootContext;
    return store;
  }
}
function createInitialState() {
  return {
    ...createInitialPopupStoreState(),
    instantType: undefined,
    hasViewport: false
  };
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/root/PreviewCardRoot.js
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
function PreviewCardRootComponent(props) {
  const {
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    actionsRef,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null,
    children
  } = props;
  const store = PreviewCardStore.useStore(handle?.store, {
    open: defaultOpen,
    openProp,
    activeTriggerId: defaultTriggerIdProp,
    triggerIdProp
  });
  useOnFirstRender(() => {
    if (openProp === undefined && store.state.open === false && defaultOpen === true) {
      store.update({
        open: true,
        activeTriggerId: defaultTriggerIdProp
      });
    }
  });
  store.useControlledProp("openProp", openProp);
  store.useControlledProp("triggerIdProp", triggerIdProp);
  store.useContextCallback("onOpenChange", onOpenChange);
  store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
  const open = store.useState("open");
  const floatingRootContext = store.select("floatingRootContext");
  const activeTriggerId = store.useState("activeTriggerId");
  const payload = store.useState("payload");
  useImplicitActiveTrigger(store);
  const {
    forceUnmount
  } = useOpenStateTransitions(open, store);
  useIsoLayoutEffect(() => {
    if (open) {
      if (activeTriggerId == null) {
        store.set("payload", undefined);
      }
    }
  }, [store, activeTriggerId, open]);
  const handleImperativeClose = React3.useCallback(() => {
    store.setOpen(false, createChangeEventDetails(exports_reason_parts.imperativeAction));
  }, [store]);
  React3.useImperativeHandle(actionsRef, () => ({
    unmount: forceUnmount,
    close: handleImperativeClose
  }), [forceUnmount, handleImperativeClose]);
  const dismiss = useDismiss(floatingRootContext);
  const {
    getReferenceProps,
    getTriggerProps,
    getFloatingProps
  } = useInteractions([dismiss]);
  const activeTriggerProps = React3.useMemo(() => getReferenceProps(), [getReferenceProps]);
  const inactiveTriggerProps = React3.useMemo(() => getTriggerProps(), [getTriggerProps]);
  const popupProps = React3.useMemo(() => getFloatingProps(), [getFloatingProps]);
  store.useSyncedValues({
    activeTriggerProps,
    inactiveTriggerProps,
    popupProps
  });
  return /* @__PURE__ */ _jsx(PreviewCardRootContext.Provider, {
    value: store,
    children: typeof children === "function" ? children({
      payload
    }) : children
  });
}
function PreviewCardRoot(props) {
  if (usePreviewCardRootContext(true)) {
    return /* @__PURE__ */ _jsx(PreviewCardRootComponent, {
      ...props
    });
  }
  return /* @__PURE__ */ _jsx(FloatingTree, {
    children: /* @__PURE__ */ _jsx(PreviewCardRootComponent, {
      ...props
    })
  });
}
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/portal/PreviewCardPortal.js
import * as React5 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/portal/PreviewCardPortalContext.js
import * as React4 from "react";
"use client";
var PreviewCardPortalContext = /* @__PURE__ */ React4.createContext(undefined);
if (true)
  PreviewCardPortalContext.displayName = "PreviewCardPortalContext";
function usePreviewCardPortalContext() {
  const value = React4.useContext(PreviewCardPortalContext);
  if (value === undefined) {
    throw new Error("Base UI: <PreviewCard.Portal> is missing.");
  }
  return value;
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/portal/PreviewCardPortal.js
import { jsx as _jsx2 } from "react/jsx-runtime";
"use client";
var PreviewCardPortal = /* @__PURE__ */ React5.forwardRef(function PreviewCardPortal2(props, forwardedRef) {
  const {
    keepMounted = false,
    ...portalProps
  } = props;
  const store = usePreviewCardRootContext();
  const mounted = store.useState("mounted");
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ _jsx2(PreviewCardPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ _jsx2(FloatingPortalLite, {
      ref: forwardedRef,
      ...portalProps
    })
  });
});
if (true)
  PreviewCardPortal.displayName = "PreviewCardPortal";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/trigger/PreviewCardTrigger.js
import * as React6 from "react";
"use client";
var PreviewCardTrigger = /* @__PURE__ */ React6.forwardRef(function PreviewCardTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    delay,
    closeDelay,
    id: idProp,
    payload,
    handle,
    style,
    ...elementProps
  } = componentProps;
  const rootContext = usePreviewCardRootContext(true);
  const store = handle?.store ?? rootContext;
  if (!store) {
    throw new Error("Base UI: <PreviewCard.Trigger> must be either used within a <PreviewCard.Root> component or provided with a handle.");
  }
  const thisTriggerId = useBaseUiId(idProp);
  const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
  const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
  const floatingRootContext = store.useState("floatingRootContext");
  const triggerElementRef = React6.useRef(null);
  const delayWithDefault = delay ?? OPEN_DELAY;
  const closeDelayWithDefault = closeDelay ?? CLOSE_DELAY;
  const {
    registerTrigger,
    isMountedByThisTrigger
  } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
    payload
  });
  useIsoLayoutEffect(() => {
    if (isMountedByThisTrigger) {
      store.context.closeDelayRef.current = closeDelayWithDefault;
    }
  }, [store, isMountedByThisTrigger, closeDelayWithDefault]);
  const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
    mouseOnly: true,
    move: false,
    handleClose: safePolygon(),
    delay: () => ({
      open: delayWithDefault,
      close: closeDelayWithDefault
    }),
    triggerElementRef,
    isActiveTrigger: isTriggerActive,
    isClosing: () => store.select("transitionStatus") === "ending"
  });
  const focusProps = useFocus(floatingRootContext, {
    delay: delayWithDefault
  });
  const state = {
    open: isOpenedByThisTrigger
  };
  const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
  const element = useRenderElement("a", componentProps, {
    state,
    ref: [forwardedRef, registerTrigger, triggerElementRef],
    props: [hoverProps, focusProps.reference, rootTriggerProps, {
      id: thisTriggerId
    }, elementProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
  return element;
});
if (true)
  PreviewCardTrigger.displayName = "PreviewCardTrigger";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/positioner/PreviewCardPositioner.js
import * as React8 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/positioner/PreviewCardPositionerContext.js
import * as React7 from "react";
"use client";
var PreviewCardPositionerContext = /* @__PURE__ */ React7.createContext(undefined);
if (true)
  PreviewCardPositionerContext.displayName = "PreviewCardPositionerContext";
function usePreviewCardPositionerContext() {
  const context = React7.useContext(PreviewCardPositionerContext);
  if (context === undefined) {
    throw new Error("Base UI: <PreviewCard.Popup> and <PreviewCard.Arrow> must be used within the <PreviewCard.Positioner> component");
  }
  return context;
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/positioner/PreviewCardPositioner.js
import { jsx as _jsx3 } from "react/jsx-runtime";
"use client";
var PreviewCardPositioner = /* @__PURE__ */ React8.forwardRef(function PreviewCardPositioner2(componentProps, forwardedRef) {
  const {
    render,
    className,
    anchor,
    positionMethod = "absolute",
    side = "bottom",
    align = "center",
    sideOffset = 0,
    alignOffset = 0,
    collisionBoundary = "clipping-ancestors",
    collisionPadding = 5,
    arrowPadding = 5,
    sticky = false,
    disableAnchorTracking = false,
    collisionAvoidance = POPUP_COLLISION_AVOIDANCE,
    style,
    ...elementProps
  } = componentProps;
  const store = usePreviewCardRootContext();
  const keepMounted = usePreviewCardPortalContext();
  const nodeId = useFloatingNodeId();
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const floatingRootContext = store.useState("floatingRootContext");
  const instantType = store.useState("instantType");
  const transitionStatus = store.useState("transitionStatus");
  const hasViewport = store.useState("hasViewport");
  const positioning = useAnchorPositioning({
    anchor,
    floatingRootContext,
    positionMethod,
    mounted,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    collisionBoundary,
    collisionPadding,
    sticky,
    disableAnchorTracking,
    keepMounted,
    nodeId,
    collisionAvoidance,
    adaptiveOrigin: hasViewport ? adaptiveOrigin : undefined
  });
  const state = {
    open,
    side: positioning.side,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden,
    instant: instantType
  };
  const element = usePositioner(componentProps, state, {
    styles: positioning.positionerStyles,
    transitionStatus,
    props: elementProps,
    refs: [forwardedRef, store.useStateSetter("positionerElement")],
    hidden: !mounted,
    inert: !open
  });
  return /* @__PURE__ */ _jsx3(PreviewCardPositionerContext.Provider, {
    value: positioning,
    children: /* @__PURE__ */ _jsx3(FloatingNode, {
      id: nodeId,
      children: element
    })
  });
});
if (true)
  PreviewCardPositioner.displayName = "PreviewCardPositioner";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/popup/PreviewCardPopup.js
import * as React9 from "react";
"use client";
var stateAttributesMapping = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
var PreviewCardPopup = /* @__PURE__ */ React9.forwardRef(function PreviewCardPopup2(componentProps, forwardedRef) {
  const {
    className,
    render,
    style,
    ...elementProps
  } = componentProps;
  const store = usePreviewCardRootContext();
  const {
    side,
    align
  } = usePreviewCardPositionerContext();
  const open = store.useState("open");
  const instantType = store.useState("instantType");
  const transitionStatus = store.useState("transitionStatus");
  const popupProps = store.useState("popupProps");
  const floatingContext = store.useState("floatingRootContext");
  useOpenChangeComplete({
    open,
    ref: store.context.popupRef,
    onComplete() {
      if (open) {
        store.context.onOpenChangeComplete?.(true);
      }
    }
  });
  const getCloseDelay = useStableCallback(() => store.context.closeDelayRef.current);
  useHoverFloatingInteraction(floatingContext, {
    closeDelay: getCloseDelay
  });
  const state = {
    open,
    side,
    align,
    instant: instantType,
    transitionStatus
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, store.context.popupRef, store.useStateSetter("popupElement")],
    props: [popupProps, getDisabledMountTransitionStyles(transitionStatus), elementProps],
    stateAttributesMapping
  });
  return element;
});
if (true)
  PreviewCardPopup.displayName = "PreviewCardPopup";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/arrow/PreviewCardArrow.js
import * as React10 from "react";
"use client";
var PreviewCardArrow = /* @__PURE__ */ React10.forwardRef(function PreviewCardArrow2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const store = usePreviewCardRootContext();
  const {
    arrowRef,
    side,
    align,
    arrowUncentered,
    arrowStyles
  } = usePreviewCardPositionerContext();
  const open = store.useState("open");
  const state = {
    open,
    side,
    align,
    uncentered: arrowUncentered
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [arrowRef, forwardedRef],
    props: [{
      style: arrowStyles,
      "aria-hidden": true
    }, elementProps],
    stateAttributesMapping: popupStateMapping
  });
  return element;
});
if (true)
  PreviewCardArrow.displayName = "PreviewCardArrow";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/backdrop/PreviewCardBackdrop.js
import * as React11 from "react";
"use client";
var stateAttributesMapping2 = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
var PreviewCardBackdrop = /* @__PURE__ */ React11.forwardRef(function PreviewCardBackdrop2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const store = usePreviewCardRootContext();
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const transitionStatus = store.useState("transitionStatus");
  const state = {
    open,
    transitionStatus
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef],
    props: [{
      role: "presentation",
      hidden: !mounted,
      style: {
        pointerEvents: "none",
        userSelect: "none",
        WebkitUserSelect: "none"
      }
    }, elementProps],
    stateAttributesMapping: stateAttributesMapping2
  });
  return element;
});
if (true)
  PreviewCardBackdrop.displayName = "PreviewCardBackdrop";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/viewport/PreviewCardViewport.js
import * as React12 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/viewport/PreviewCardViewportCssVars.js
var PreviewCardViewportCssVars = /* @__PURE__ */ function(PreviewCardViewportCssVars2) {
  PreviewCardViewportCssVars2["popupWidth"] = "--popup-width";
  PreviewCardViewportCssVars2["popupHeight"] = "--popup-height";
  return PreviewCardViewportCssVars2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/viewport/PreviewCardViewport.js
"use client";
var stateAttributesMapping3 = {
  activationDirection: (value) => value ? {
    "data-activation-direction": value
  } : null
};
var PreviewCardViewport = /* @__PURE__ */ React12.forwardRef(function PreviewCardViewport2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    children,
    ...elementProps
  } = componentProps;
  const store = usePreviewCardRootContext();
  const positioner = usePreviewCardPositionerContext();
  const instantType = store.useState("instantType");
  const {
    children: childrenToRender,
    state: viewportState
  } = usePopupViewport({
    store,
    side: positioner.side,
    cssVars: PreviewCardViewportCssVars,
    children
  });
  const state = {
    activationDirection: viewportState.activationDirection,
    transitioning: viewportState.transitioning,
    instant: instantType
  };
  return useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [elementProps, {
      children: childrenToRender
    }],
    stateAttributesMapping: stateAttributesMapping3
  });
});
if (true)
  PreviewCardViewport.displayName = "PreviewCardViewport";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/preview-card/store/PreviewCardHandle.js
class PreviewCardHandle {
  constructor() {
    this.store = new PreviewCardStore;
  }
  open(triggerId) {
    const triggerElement = triggerId ? this.store.context.triggerElements.getById(triggerId) : undefined;
    if (triggerId && !triggerElement) {
      throw new Error(`Base UI: PreviewCardHandle.open: No trigger found with id "${triggerId}".`);
    }
    this.store.setOpen(true, createChangeEventDetails(exports_reason_parts.imperativeAction, undefined, triggerElement));
  }
  close() {
    this.store.setOpen(false, createChangeEventDetails(exports_reason_parts.imperativeAction, undefined, undefined));
  }
  get isOpen() {
    return this.store.state.open;
  }
}
function createPreviewCardHandle() {
  return new PreviewCardHandle;
}
export {
  exports_index_parts as PreviewCard
};
