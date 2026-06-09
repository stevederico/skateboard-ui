/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  FloatingPortalLite
} from "./_chunk-fdzctasg.js";
import {
  usePopupViewport
} from "./_chunk-qbezxj1g.js";
import"./_chunk-m307wpdj.js";
import {
  adaptiveOrigin,
  getDisabledMountTransitionStyles,
  useAnchorPositioning,
  usePositioner
} from "./_chunk-fqry7pew.js";
import"./_chunk-xcqbtm2f.js";
import"./_chunk-gy0bpkmx.js";
import {
  createInitialPopupStoreState,
  createPopupFloatingRootContext,
  popupStoreSelectors
} from "./_chunk-q5cg71p7.js";
import {
  FOCUSABLE_POPUP_PROPS,
  setOpenTriggerState,
  useImplicitActiveTrigger,
  useOnFirstRender,
  useOpenStateTransitions,
  usePopupInteractionProps,
  usePopupStore,
  useTriggerDataForwarding
} from "./_chunk-242gh8ph.js";
import"./_chunk-5gaqyne5.js";
import {
  CommonTriggerDataAttributes,
  popupStateMapping,
  triggerOpenStateMapping
} from "./_chunk-t7ppm3t0.js";
import"./_chunk-3cpd1vjz.js";
import {
  FloatingDelayGroup,
  POPUP_COLLISION_AVOIDANCE,
  PopupTriggerMap,
  ReactStore,
  createSelector,
  fastComponent,
  fastComponentRef,
  safePolygon,
  useClientPoint,
  useDelayGroup,
  useDismiss,
  useFocus,
  useHoverFloatingInteraction,
  useHoverInteractionSharedState,
  useHoverReferenceInteraction
} from "./_chunk-2z044bba.js";
import"./_chunk-1vw45v38.js";
import {
  contains
} from "./_chunk-cgptgywc.js";
import {
  isMouseLikePointerType
} from "./_chunk-kw8nnq00.js";
import"./_chunk-rrh8rt4v.js";
import {
  useTimeout
} from "./_chunk-b6dkjkbw.js";
import"./_chunk-dan0mva4.js";
import"./_chunk-ase0ydtt.js";
import {
  useValueAsRef
} from "./_chunk-6kqramh9.js";
import"./_chunk-451nqgsa.js";
import {
  createChangeEventDetails,
  exports_reason_parts
} from "./_chunk-e56mpvk1.js";
import {
  useBaseUiId
} from "./_chunk-wdqynnjf.js";
import {
  transitionStatusMapping,
  useOpenChangeComplete
} from "./_chunk-e13rsb6b.js";
import"./_chunk-zk4mtm9m.js";
import"./_chunk-8a9vv8am.js";
import"./_chunk-6ejf1z1r.js";
import {
  isElement
} from "./_chunk-000kmre8.js";
import"./_chunk-cwvtvwc7.js";
import {
  useIsoLayoutEffect
} from "./_chunk-5tze5c8q.js";
import {
  useRenderElement
} from "./_chunk-x8xehj6d.js";
import {
  __export,
  mergeProps
} from "./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/tooltip/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  createHandle: () => createTooltipHandle,
  Viewport: () => TooltipViewport,
  Trigger: () => TooltipTrigger,
  Root: () => TooltipRoot,
  Provider: () => TooltipProvider,
  Positioner: () => TooltipPositioner,
  Portal: () => TooltipPortal,
  Popup: () => TooltipPopup,
  Handle: () => TooltipHandle,
  Arrow: () => TooltipArrow
});

// node_modules/@base-ui/react/esm/tooltip/root/TooltipRoot.js
import * as React3 from "react";

// node_modules/@base-ui/react/esm/tooltip/root/TooltipRootContext.js
import * as React from "react";
"use client";
var TooltipRootContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  TooltipRootContext.displayName = "TooltipRootContext";
function useTooltipRootContext(optional) {
  const context = React.useContext(TooltipRootContext);
  if (context === undefined && !optional) {
    throw new Error("Base UI: TooltipRootContext is missing. Tooltip parts must be placed within <Tooltip.Root>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/tooltip/store/TooltipStore.js
import * as React2 from "react";
import * as ReactDOM from "react-dom";
var selectors = {
  ...popupStoreSelectors,
  disabled: createSelector((state) => state.disabled),
  instantType: createSelector((state) => state.instantType),
  isInstantPhase: createSelector((state) => state.isInstantPhase),
  trackCursorAxis: createSelector((state) => state.trackCursorAxis),
  disableHoverablePopup: createSelector((state) => state.disableHoverablePopup),
  lastOpenChangeReason: createSelector((state) => state.openChangeReason),
  closeOnClick: createSelector((state) => state.closeOnClick),
  closeDelay: createSelector((state) => state.closeDelay),
  hasViewport: createSelector((state) => state.hasViewport)
};

class TooltipStore extends ReactStore {
  constructor(initialState, floatingId, nested = false) {
    const triggerElements = new PopupTriggerMap;
    const state = {
      ...createInitialState(),
      ...initialState
    };
    state.floatingRootContext = createPopupFloatingRootContext(triggerElements, floatingId, nested);
    super(state, {
      popupRef: /* @__PURE__ */ React2.createRef(),
      onOpenChange: undefined,
      onOpenChangeComplete: undefined,
      triggerElements
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
        open: nextOpen,
        openChangeReason: reason
      };
      if (isFocusOpen) {
        updatedState.instantType = "focus";
      } else if (isDismissClose) {
        updatedState.instantType = "dismiss";
      } else if (reason === exports_reason_parts.triggerHover) {
        updatedState.instantType = undefined;
      }
      setOpenTriggerState(updatedState, nextOpen, eventDetails.trigger);
      this.update(updatedState);
    };
    if (isHover) {
      ReactDOM.flushSync(changeState);
    } else {
      changeState();
    }
  };
  cancelPendingOpen(event) {
    this.state.floatingRootContext.dispatchOpenChange(false, createChangeEventDetails(exports_reason_parts.triggerPress, event));
  }
  static useStore(externalStore, initialState) {
    const store = usePopupStore(externalStore, (floatingId, nested) => new TooltipStore(initialState, floatingId, nested)).store;
    return store;
  }
}
function createInitialState() {
  return {
    ...createInitialPopupStoreState(),
    disabled: false,
    instantType: undefined,
    isInstantPhase: false,
    trackCursorAxis: "none",
    disableHoverablePopup: false,
    openChangeReason: null,
    closeOnClick: true,
    closeDelay: 0,
    hasViewport: false
  };
}

// node_modules/@base-ui/react/esm/tooltip/root/TooltipRoot.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
"use client";
var TooltipRoot = fastComponent(function TooltipRoot2(props) {
  const {
    disabled = false,
    defaultOpen = false,
    open: openProp,
    disableHoverablePopup = false,
    trackCursorAxis = "none",
    actionsRef,
    onOpenChange,
    onOpenChangeComplete,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null,
    children
  } = props;
  const store = TooltipStore.useStore(handle?.store, {
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
  const openState = store.useState("open");
  const open = !disabled && openState;
  const activeTriggerId = store.useState("activeTriggerId");
  const mounted = store.useState("mounted");
  const payload = store.useState("payload");
  store.useSyncedValues({
    trackCursorAxis,
    disableHoverablePopup
  });
  store.useSyncedValue("disabled", disabled);
  useImplicitActiveTrigger(store);
  const {
    forceUnmount,
    transitionStatus
  } = useOpenStateTransitions(open, store);
  const isInstantPhase = store.useState("isInstantPhase");
  const instantType = store.useState("instantType");
  const lastOpenChangeReason = store.useState("lastOpenChangeReason");
  const previousInstantTypeRef = React3.useRef(null);
  useIsoLayoutEffect(() => {
    if (openState && disabled) {
      store.setOpen(false, createChangeEventDetails(exports_reason_parts.disabled));
    }
  }, [openState, disabled, store]);
  useIsoLayoutEffect(() => {
    if (transitionStatus === "ending" && lastOpenChangeReason === exports_reason_parts.none || transitionStatus !== "ending" && isInstantPhase) {
      if (instantType !== "delay") {
        previousInstantTypeRef.current = instantType;
      }
      store.set("instantType", "delay");
    } else if (previousInstantTypeRef.current !== null) {
      store.set("instantType", previousInstantTypeRef.current);
      previousInstantTypeRef.current = null;
    }
  }, [transitionStatus, isInstantPhase, lastOpenChangeReason, instantType, store]);
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
  const shouldRenderInteractions = open || mounted || !disabled && trackCursorAxis !== "none";
  return /* @__PURE__ */ _jsxs(TooltipRootContext.Provider, {
    value: store,
    children: [shouldRenderInteractions && /* @__PURE__ */ _jsx(TooltipInteractions, {
      store,
      disabled,
      trackCursorAxis
    }), typeof children === "function" ? children({
      payload
    }) : children]
  });
});
if (true)
  TooltipRoot.displayName = "TooltipRoot";
function TooltipInteractions({
  store,
  disabled,
  trackCursorAxis
}) {
  const floatingRootContext = store.useState("floatingRootContext");
  const dismiss = useDismiss(floatingRootContext, {
    enabled: !disabled,
    referencePress: () => store.select("closeOnClick")
  });
  const clientPoint = useClientPoint(floatingRootContext, {
    enabled: !disabled && trackCursorAxis !== "none",
    axis: trackCursorAxis === "none" ? undefined : trackCursorAxis
  });
  const activeTriggerProps = React3.useMemo(() => mergeProps(clientPoint.reference, dismiss.reference), [clientPoint.reference, dismiss.reference]);
  const inactiveTriggerProps = React3.useMemo(() => mergeProps(clientPoint.trigger, dismiss.trigger), [clientPoint.trigger, dismiss.trigger]);
  const popupProps = React3.useMemo(() => mergeProps(FOCUSABLE_POPUP_PROPS, clientPoint.floating, dismiss.floating), [clientPoint.floating, dismiss.floating]);
  usePopupInteractionProps(store, {
    activeTriggerProps,
    inactiveTriggerProps,
    popupProps
  });
  return null;
}
// node_modules/@base-ui/react/esm/tooltip/trigger/TooltipTrigger.js
import * as React5 from "react";

// node_modules/@base-ui/react/esm/tooltip/provider/TooltipProviderContext.js
import * as React4 from "react";
"use client";
var TooltipProviderContext = /* @__PURE__ */ React4.createContext(undefined);
if (true)
  TooltipProviderContext.displayName = "TooltipProviderContext";
function useTooltipProviderContext() {
  return React4.useContext(TooltipProviderContext);
}

// node_modules/@base-ui/react/esm/tooltip/trigger/TooltipTriggerDataAttributes.js
var TooltipTriggerDataAttributes = function(TooltipTriggerDataAttributes2) {
  TooltipTriggerDataAttributes2[TooltipTriggerDataAttributes2["popupOpen"] = CommonTriggerDataAttributes.popupOpen] = "popupOpen";
  TooltipTriggerDataAttributes2["triggerDisabled"] = "data-trigger-disabled";
  return TooltipTriggerDataAttributes2;
}({});

// node_modules/@base-ui/react/esm/tooltip/utils/constants.js
var OPEN_DELAY = 600;

// node_modules/@base-ui/react/esm/tooltip/trigger/TooltipTrigger.js
"use client";
var TOOLTIP_TRIGGER_IDENTIFIER = "data-base-ui-tooltip-trigger";
function getTargetElement(event) {
  if ("composedPath" in event) {
    const path = event.composedPath();
    for (let i = 0;i < path.length; i += 1) {
      const element = path[i];
      if (isElement(element)) {
        return element;
      }
    }
  }
  const target = event.target;
  if (isElement(target)) {
    return target;
  }
  return null;
}
function closestEnabledTooltipTrigger(element) {
  let current = element;
  while (current) {
    if (current.hasAttribute(TOOLTIP_TRIGGER_IDENTIFIER)) {
      return current;
    }
    const parentElement = current.parentElement;
    if (parentElement) {
      current = parentElement;
      continue;
    }
    const root = current.getRootNode();
    current = "host" in root && isElement(root.host) ? root.host : null;
  }
  return null;
}
var TooltipTrigger = fastComponentRef(function TooltipTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    handle,
    payload,
    disabled: disabledProp,
    delay,
    closeOnClick = true,
    closeDelay,
    id: idProp,
    ...elementProps
  } = componentProps;
  const rootContext = useTooltipRootContext(true);
  const store = handle?.store ?? rootContext;
  if (!store) {
    throw new Error("Base UI: <Tooltip.Trigger> must be either used within a <Tooltip.Root> component or provided with a handle.");
  }
  const thisTriggerId = useBaseUiId(idProp);
  const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
  const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
  const floatingRootContext = store.useState("floatingRootContext");
  const triggerElementRef = React5.useRef(null);
  const delayWithDefault = delay ?? OPEN_DELAY;
  const closeDelayWithDefault = closeDelay ?? 0;
  const {
    registerTrigger,
    isMountedByThisTrigger
  } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
    payload,
    closeOnClick,
    closeDelay: closeDelayWithDefault
  });
  const providerContext = useTooltipProviderContext();
  const {
    delayRef,
    isInstantPhase,
    hasProvider
  } = useDelayGroup(floatingRootContext, {
    open: isOpenedByThisTrigger
  });
  const hoverInteraction = useHoverInteractionSharedState(floatingRootContext);
  store.useSyncedValue("isInstantPhase", isInstantPhase);
  const rootDisabled = store.useState("disabled");
  const disabled = disabledProp ?? rootDisabled;
  const disabledRef = useValueAsRef(disabled);
  const trackCursorAxis = store.useState("trackCursorAxis");
  const disableHoverablePopup = store.useState("disableHoverablePopup");
  const isNestedTriggerHoveredRef = React5.useRef(false);
  const nestedTriggerOpenTimeout = useTimeout();
  const pointerTypeRef = React5.useRef(undefined);
  function getOpenDelay() {
    const providerDelay = providerContext?.delay;
    const groupOpenValue = typeof delayRef.current === "object" ? delayRef.current.open : undefined;
    let computedOpenDelay = delayWithDefault;
    if (hasProvider) {
      if (groupOpenValue !== 0) {
        computedOpenDelay = delay ?? providerDelay ?? delayWithDefault;
      } else {
        computedOpenDelay = 0;
      }
    }
    return computedOpenDelay;
  }
  function isEnabledNestedTriggerTarget(target) {
    const triggerEl = triggerElementRef.current;
    if (!triggerEl || !target) {
      return false;
    }
    const nearestTrigger = closestEnabledTooltipTrigger(target);
    return nearestTrigger !== null && nearestTrigger !== triggerEl && contains(triggerEl, nearestTrigger);
  }
  function detectNestedTriggerHover(target) {
    const nestedTriggerHovered = isEnabledNestedTriggerTarget(target);
    isNestedTriggerHoveredRef.current = nestedTriggerHovered;
    if (nestedTriggerHovered) {
      hoverInteraction.openChangeTimeout.clear();
      hoverInteraction.restTimeout.clear();
      hoverInteraction.restTimeoutPending = false;
      nestedTriggerOpenTimeout.clear();
    }
    return nestedTriggerHovered;
  }
  const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
    enabled: !disabled,
    mouseOnly: true,
    move: false,
    handleClose: !disableHoverablePopup && trackCursorAxis !== "both" ? safePolygon() : null,
    restMs: getOpenDelay,
    delay() {
      const closeValue = typeof delayRef.current === "object" ? delayRef.current.close : undefined;
      let computedCloseDelay = closeDelayWithDefault;
      if (closeDelay == null && hasProvider) {
        computedCloseDelay = closeValue;
      }
      return {
        close: computedCloseDelay
      };
    },
    triggerElementRef,
    isActiveTrigger: isTriggerActive,
    isClosing: () => store.select("transitionStatus") === "ending",
    shouldOpen() {
      return !isNestedTriggerHoveredRef.current;
    }
  });
  const focusProps = useFocus(floatingRootContext, {
    enabled: !disabled
  }).reference;
  const handleNestedTriggerHover = (event) => {
    const wasNestedTriggerHovered = isNestedTriggerHoveredRef.current;
    const target = getTargetElement(event);
    const nestedTriggerHovered = detectNestedTriggerHover(target);
    const triggerEl = triggerElementRef.current;
    const targetInsideTrigger = triggerEl && target && contains(triggerEl, target);
    if (nestedTriggerHovered && store.select("open") && store.select("lastOpenChangeReason") === exports_reason_parts.triggerHover) {
      store.setOpen(false, createChangeEventDetails(exports_reason_parts.triggerHover, event));
      return;
    }
    if (wasNestedTriggerHovered && !nestedTriggerHovered && targetInsideTrigger && !disabledRef.current && !store.select("open") && triggerEl && isMouseLikePointerType(pointerTypeRef.current)) {
      const open = () => {
        if (!isNestedTriggerHoveredRef.current && !disabledRef.current && !store.select("open")) {
          store.setOpen(true, createChangeEventDetails(exports_reason_parts.triggerHover, event, triggerEl));
        }
      };
      const openDelay = getOpenDelay();
      if (openDelay === 0) {
        nestedTriggerOpenTimeout.clear();
        open();
      } else {
        nestedTriggerOpenTimeout.start(openDelay, open);
      }
    }
  };
  const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
  const shouldApplyRootTriggerProps = isMountedByThisTrigger || trackCursorAxis !== "none";
  const state = {
    open: isOpenedByThisTrigger
  };
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, registerTrigger, triggerElementRef],
    props: [hoverProps, focusProps, shouldApplyRootTriggerProps ? rootTriggerProps : undefined, {
      onMouseOver(event) {
        handleNestedTriggerHover(event.nativeEvent);
      },
      onFocus(event) {
        if (isEnabledNestedTriggerTarget(getTargetElement(event.nativeEvent))) {
          event.preventBaseUIHandler();
        }
      },
      onMouseLeave() {
        isNestedTriggerHoveredRef.current = false;
        nestedTriggerOpenTimeout.clear();
        pointerTypeRef.current = undefined;
      },
      onPointerEnter(event) {
        pointerTypeRef.current = event.pointerType;
      },
      onPointerDown(event) {
        pointerTypeRef.current = event.pointerType;
        store.set("closeOnClick", closeOnClick);
        if (closeOnClick && !store.select("open")) {
          store.cancelPendingOpen(event.nativeEvent);
        }
      },
      onClick(event) {
        if (closeOnClick && !store.select("open")) {
          store.cancelPendingOpen(event.nativeEvent);
        }
      },
      id: thisTriggerId,
      [TooltipTriggerDataAttributes.triggerDisabled]: disabled ? "" : undefined,
      [TOOLTIP_TRIGGER_IDENTIFIER]: disabled ? undefined : ""
    }, elementProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
  return element;
});
if (true)
  TooltipTrigger.displayName = "TooltipTrigger";
// node_modules/@base-ui/react/esm/tooltip/portal/TooltipPortal.js
import * as React7 from "react";

// node_modules/@base-ui/react/esm/tooltip/portal/TooltipPortalContext.js
import * as React6 from "react";
"use client";
var TooltipPortalContext = /* @__PURE__ */ React6.createContext(undefined);
if (true)
  TooltipPortalContext.displayName = "TooltipPortalContext";
function useTooltipPortalContext() {
  const value = React6.useContext(TooltipPortalContext);
  if (value === undefined) {
    throw new Error("Base UI: <Tooltip.Portal> is missing.");
  }
  return value;
}

// node_modules/@base-ui/react/esm/tooltip/portal/TooltipPortal.js
import { jsx as _jsx2 } from "react/jsx-runtime";
"use client";
var TooltipPortal = /* @__PURE__ */ React7.forwardRef(function TooltipPortal2(props, forwardedRef) {
  const {
    keepMounted = false,
    ...portalProps
  } = props;
  const store = useTooltipRootContext();
  const mounted = store.useState("mounted");
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ _jsx2(TooltipPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ _jsx2(FloatingPortalLite, {
      ref: forwardedRef,
      ...portalProps
    })
  });
});
if (true)
  TooltipPortal.displayName = "TooltipPortal";
// node_modules/@base-ui/react/esm/tooltip/positioner/TooltipPositioner.js
import * as React9 from "react";

// node_modules/@base-ui/react/esm/tooltip/positioner/TooltipPositionerContext.js
import * as React8 from "react";
"use client";
var TooltipPositionerContext = /* @__PURE__ */ React8.createContext(undefined);
if (true)
  TooltipPositionerContext.displayName = "TooltipPositionerContext";
function useTooltipPositionerContext() {
  const context = React8.useContext(TooltipPositionerContext);
  if (context === undefined) {
    throw new Error("Base UI: TooltipPositionerContext is missing. TooltipPositioner parts must be placed within <Tooltip.Positioner>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/tooltip/positioner/TooltipPositioner.js
import { jsx as _jsx3 } from "react/jsx-runtime";
"use client";
var TooltipPositioner = /* @__PURE__ */ React9.forwardRef(function TooltipPositioner2(componentProps, forwardedRef) {
  const {
    render,
    className,
    anchor,
    positionMethod = "absolute",
    side = "top",
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
  const store = useTooltipRootContext();
  const keepMounted = useTooltipPortalContext();
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const trackCursorAxis = store.useState("trackCursorAxis");
  const disableHoverablePopup = store.useState("disableHoverablePopup");
  const floatingRootContext = store.useState("floatingRootContext");
  const instantType = store.useState("instantType");
  const transitionStatus = store.useState("transitionStatus");
  const hasViewport = store.useState("hasViewport");
  const positioning = useAnchorPositioning({
    anchor,
    positionMethod,
    floatingRootContext,
    mounted,
    side,
    sideOffset,
    align,
    alignOffset,
    collisionBoundary,
    collisionPadding,
    sticky,
    arrowPadding,
    disableAnchorTracking,
    keepMounted,
    collisionAvoidance,
    adaptiveOrigin: hasViewport ? adaptiveOrigin : undefined
  });
  const state = React9.useMemo(() => ({
    open,
    side: positioning.side,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden,
    instant: trackCursorAxis !== "none" ? "tracking-cursor" : instantType
  }), [open, positioning.side, positioning.align, positioning.anchorHidden, trackCursorAxis, instantType]);
  const element = usePositioner(componentProps, state, {
    styles: positioning.positionerStyles,
    transitionStatus,
    props: elementProps,
    refs: [forwardedRef, store.useStateSetter("positionerElement")],
    hidden: !mounted,
    inert: !open || trackCursorAxis === "both" || disableHoverablePopup
  });
  return /* @__PURE__ */ _jsx3(TooltipPositionerContext.Provider, {
    value: positioning,
    children: element
  });
});
if (true)
  TooltipPositioner.displayName = "TooltipPositioner";
// node_modules/@base-ui/react/esm/tooltip/popup/TooltipPopup.js
import * as React10 from "react";
"use client";
var stateAttributesMapping = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
var TooltipPopup = /* @__PURE__ */ React10.forwardRef(function TooltipPopup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const store = useTooltipRootContext();
  const {
    side,
    align
  } = useTooltipPositionerContext();
  const open = store.useState("open");
  const instantType = store.useState("instantType");
  const transitionStatus = store.useState("transitionStatus");
  const popupProps = store.useState("popupProps");
  const floatingContext = store.useState("floatingRootContext");
  const disabled = store.useState("disabled");
  const closeDelay = store.useState("closeDelay");
  useOpenChangeComplete({
    open,
    ref: store.context.popupRef,
    onComplete() {
      if (open) {
        store.context.onOpenChangeComplete?.(true);
      }
    }
  });
  useHoverFloatingInteraction(floatingContext, {
    enabled: !disabled,
    closeDelay
  });
  const setPopupElement = store.useStateSetter("popupElement");
  const state = {
    open,
    side,
    align,
    instant: instantType,
    transitionStatus
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, store.context.popupRef, setPopupElement],
    props: [popupProps, getDisabledMountTransitionStyles(transitionStatus), elementProps],
    stateAttributesMapping
  });
  return element;
});
if (true)
  TooltipPopup.displayName = "TooltipPopup";
// node_modules/@base-ui/react/esm/tooltip/arrow/TooltipArrow.js
import * as React11 from "react";
"use client";
var TooltipArrow = /* @__PURE__ */ React11.forwardRef(function TooltipArrow2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const store = useTooltipRootContext();
  const {
    arrowRef,
    side,
    align,
    arrowUncentered,
    arrowStyles
  } = useTooltipPositionerContext();
  const open = store.useState("open");
  const instantType = store.useState("instantType");
  const state = {
    open,
    side,
    align,
    uncentered: arrowUncentered,
    instant: instantType
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, arrowRef],
    props: [{
      style: arrowStyles,
      "aria-hidden": true
    }, elementProps],
    stateAttributesMapping: popupStateMapping
  });
  return element;
});
if (true)
  TooltipArrow.displayName = "TooltipArrow";
// node_modules/@base-ui/react/esm/tooltip/provider/TooltipProvider.js
import * as React12 from "react";
import { jsx as _jsx4 } from "react/jsx-runtime";
"use client";
var TooltipProvider = function TooltipProvider2(props) {
  const {
    delay,
    closeDelay,
    timeout = 400
  } = props;
  const contextValue = React12.useMemo(() => ({
    delay,
    closeDelay
  }), [delay, closeDelay]);
  const delayValue = React12.useMemo(() => ({
    open: delay,
    close: closeDelay
  }), [delay, closeDelay]);
  return /* @__PURE__ */ _jsx4(TooltipProviderContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ _jsx4(FloatingDelayGroup, {
      delay: delayValue,
      timeoutMs: timeout,
      children: props.children
    })
  });
};
if (true)
  TooltipProvider.displayName = "TooltipProvider";
// node_modules/@base-ui/react/esm/tooltip/viewport/TooltipViewport.js
import * as React13 from "react";

// node_modules/@base-ui/react/esm/tooltip/viewport/TooltipViewportCssVars.js
var TooltipViewportCssVars = /* @__PURE__ */ function(TooltipViewportCssVars2) {
  TooltipViewportCssVars2["popupWidth"] = "--popup-width";
  TooltipViewportCssVars2["popupHeight"] = "--popup-height";
  return TooltipViewportCssVars2;
}({});

// node_modules/@base-ui/react/esm/tooltip/viewport/TooltipViewport.js
"use client";
var stateAttributesMapping2 = {
  activationDirection: (value) => value ? {
    "data-activation-direction": value
  } : null
};
var TooltipViewport = /* @__PURE__ */ React13.forwardRef(function TooltipViewport2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    children,
    ...elementProps
  } = componentProps;
  const store = useTooltipRootContext();
  const positioner = useTooltipPositionerContext();
  const instantType = store.useState("instantType");
  const {
    children: childrenToRender,
    state: viewportState
  } = usePopupViewport({
    store,
    side: positioner.side,
    cssVars: TooltipViewportCssVars,
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
    stateAttributesMapping: stateAttributesMapping2
  });
});
if (true)
  TooltipViewport.displayName = "TooltipViewport";
// node_modules/@base-ui/react/esm/tooltip/store/TooltipHandle.js
class TooltipHandle {
  constructor() {
    this.store = new TooltipStore;
  }
  open(triggerId) {
    const triggerElement = triggerId ? this.store.context.triggerElements.getById(triggerId) : undefined;
    if (triggerId && !triggerElement) {
      throw new Error(`Base UI: TooltipHandle.open: No trigger found with id "${triggerId}".`);
    }
    this.store.setOpen(true, createChangeEventDetails(exports_reason_parts.imperativeAction, undefined, triggerElement));
  }
  close() {
    this.store.setOpen(false, createChangeEventDetails(exports_reason_parts.imperativeAction, undefined, undefined));
  }
  get isOpen() {
    return this.store.select("open");
  }
}
function createTooltipHandle() {
  return new TooltipHandle;
}
export {
  exports_index_parts as Tooltip
};
