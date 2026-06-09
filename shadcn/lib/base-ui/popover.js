/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  useTriggerFocusGuards
} from "./_chunk-8ganmsbg.js";
import {
  useAnchoredPopupScrollLock
} from "./_chunk-ebyxgtb4.js";
import {
  useToolbarRootContext
} from "./_chunk-mnd0j7v9.js";
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
  InternalBackdrop,
  useOpenMethodTriggerProps
} from "./_chunk-ytnp24gq.js";
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
  usePopupRootSync,
  usePopupStore,
  useTriggerDataForwarding
} from "./_chunk-242gh8ph.js";
import"./_chunk-5gaqyne5.js";
import {
  popupStateMapping,
  pressableTriggerOpenStateMapping,
  triggerOpenStateMapping
} from "./_chunk-t7ppm3t0.js";
import {
  inertValue
} from "./_chunk-3cpd1vjz.js";
import {
  CLICK_TRIGGER_IDENTIFIER,
  FloatingFocusManager,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  FocusGuard,
  PATIENT_CLICK_THRESHOLD,
  POPUP_COLLISION_AVOIDANCE,
  PopupTriggerMap,
  ReactStore,
  createSelector,
  safePolygon,
  useClick,
  useDismiss,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useHoverFloatingInteraction,
  useHoverReferenceInteraction
} from "./_chunk-2z044bba.js";
import"./_chunk-1vw45v38.js";
import"./_chunk-cgptgywc.js";
import {
  COMPOSITE_KEYS
} from "./_chunk-pv7b791x.js";
import"./_chunk-kw8nnq00.js";
import"./_chunk-rrh8rt4v.js";
import {
  Timeout
} from "./_chunk-b6dkjkbw.js";
import"./_chunk-s5pwkz8v.js";
import"./_chunk-dan0mva4.js";
import"./_chunk-x11e1k9r.js";
import"./_chunk-ase0ydtt.js";
import"./_chunk-6kqramh9.js";
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
  useAnimationsFinished,
  useOpenChangeComplete
} from "./_chunk-e13rsb6b.js";
import"./_chunk-zk4mtm9m.js";
import"./_chunk-8a9vv8am.js";
import"./_chunk-6ejf1z1r.js";
import {
  useButton
} from "./_chunk-5xmdvndx.js";
import"./_chunk-hm5h9vsk.js";
import"./_chunk-cdgfsr3q.js";
import {
  isHTMLElement
} from "./_chunk-000kmre8.js";
import {
  useStableCallback
} from "./_chunk-cwvtvwc7.js";
import {
  useIsoLayoutEffect
} from "./_chunk-5tze5c8q.js";
import {
  EMPTY_OBJECT,
  useRenderElement
} from "./_chunk-x8xehj6d.js";
import {
  __export,
  mergeProps
} from "./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/popover/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  createHandle: () => createPopoverHandle,
  Viewport: () => PopoverViewport,
  Trigger: () => PopoverTrigger,
  Title: () => PopoverTitle,
  Root: () => PopoverRoot,
  Positioner: () => PopoverPositioner,
  Portal: () => PopoverPortal,
  Popup: () => PopoverPopup,
  Handle: () => PopoverHandle,
  Description: () => PopoverDescription,
  Close: () => PopoverClose,
  Backdrop: () => PopoverBackdrop,
  Arrow: () => PopoverArrow
});

// node_modules/@base-ui/react/esm/popover/root/PopoverRoot.js
import * as React3 from "react";

// node_modules/@base-ui/react/esm/popover/root/PopoverRootContext.js
import * as React from "react";
"use client";
var PopoverRootContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  PopoverRootContext.displayName = "PopoverRootContext";
function usePopoverRootContext(optional) {
  const context = React.useContext(PopoverRootContext);
  if (context === undefined && !optional) {
    throw new Error("Base UI: PopoverRootContext is missing. Popover parts must be placed within <Popover.Root>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/popover/store/PopoverStore.js
import * as React2 from "react";
import * as ReactDOM from "react-dom";
"use client";
function createInitialState() {
  return {
    ...createInitialPopupStoreState(),
    disabled: false,
    modal: false,
    focusManagerModal: false,
    instantType: undefined,
    openMethod: null,
    openChangeReason: null,
    titleElementId: undefined,
    descriptionElementId: undefined,
    stickIfOpen: true,
    nested: false,
    openOnHover: false,
    closeDelay: 0,
    hasViewport: false
  };
}
var selectors = {
  ...popupStoreSelectors,
  disabled: createSelector((state) => state.disabled),
  instantType: createSelector((state) => state.instantType),
  openMethod: createSelector((state) => state.openMethod),
  openChangeReason: createSelector((state) => state.openChangeReason),
  modal: createSelector((state) => state.modal),
  focusManagerModal: createSelector((state) => state.focusManagerModal),
  stickIfOpen: createSelector((state) => state.stickIfOpen),
  titleElementId: createSelector((state) => state.titleElementId),
  descriptionElementId: createSelector((state) => state.descriptionElementId),
  openOnHover: createSelector((state) => state.openOnHover),
  closeDelay: createSelector((state) => state.closeDelay),
  hasViewport: createSelector((state) => state.hasViewport)
};

class PopoverStore extends ReactStore {
  constructor(initialState, floatingId, nested = false) {
    const initial = {
      ...createInitialState(),
      ...initialState
    };
    const triggerElements = new PopupTriggerMap;
    if (initial.open && initialState?.mounted === undefined) {
      initial.mounted = true;
    }
    initial.floatingRootContext = createPopupFloatingRootContext(triggerElements, floatingId, nested);
    super(initial, {
      popupRef: /* @__PURE__ */ React2.createRef(),
      backdropRef: /* @__PURE__ */ React2.createRef(),
      internalBackdropRef: /* @__PURE__ */ React2.createRef(),
      onOpenChange: undefined,
      onOpenChangeComplete: undefined,
      triggerFocusTargetRef: /* @__PURE__ */ React2.createRef(),
      beforeContentFocusGuardRef: /* @__PURE__ */ React2.createRef(),
      stickIfOpenTimeout: new Timeout,
      triggerElements
    }, selectors);
  }
  setOpen = (nextOpen, eventDetails) => {
    const isHover = eventDetails.reason === exports_reason_parts.triggerHover;
    const isKeyboardClick = eventDetails.reason === exports_reason_parts.triggerPress && eventDetails.event.detail === 0;
    const isDismissClose = !nextOpen && (eventDetails.reason === exports_reason_parts.escapeKey || eventDetails.reason == null);
    eventDetails.preventUnmountOnClose = () => {
      this.set("preventUnmountingOnClose", true);
    };
    const activeTriggerId = this.select("activeTriggerId");
    if (!nextOpen && eventDetails.reason === exports_reason_parts.closePress && eventDetails.trigger == null && activeTriggerId != null) {
      eventDetails.trigger = this.context.triggerElements.getById(activeTriggerId) ?? this.select("activeTriggerElement") ?? undefined;
    }
    this.context.onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
    const changeState = () => {
      const updatedState = {
        open: nextOpen,
        openChangeReason: eventDetails.reason
      };
      setOpenTriggerState(updatedState, nextOpen, eventDetails.trigger);
      this.update(updatedState);
    };
    if (isHover) {
      this.set("stickIfOpen", true);
      this.context.stickIfOpenTimeout.start(PATIENT_CLICK_THRESHOLD, () => {
        this.set("stickIfOpen", false);
      });
      ReactDOM.flushSync(changeState);
    } else {
      changeState();
    }
    if (isKeyboardClick || isDismissClose) {
      this.set("instantType", isKeyboardClick ? "click" : "dismiss");
    } else if (eventDetails.reason === exports_reason_parts.focusOut) {
      this.set("instantType", "focus");
    } else {
      this.set("instantType", undefined);
    }
  };
  static useStore(externalStore, initialState) {
    const {
      store,
      internalStore
    } = usePopupStore(externalStore, (floatingId, nested) => new PopoverStore(initialState, floatingId, nested));
    React2.useEffect(() => internalStore?.disposeEffect(), [internalStore]);
    return store;
  }
  disposeEffect = () => {
    return this.context.stickIfOpenTimeout.disposeEffect();
  };
}

// node_modules/@base-ui/react/esm/popover/root/PopoverRoot.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
"use client";
function PopoverRootComponent({
  props
}) {
  const {
    children,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    modal = false,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null
  } = props;
  const store = PopoverStore.useStore(handle?.store, {
    modal,
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
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const payload = store.useState("payload");
  const nested = useFloatingParentNodeId() != null;
  store.useContextCallback("onOpenChange", onOpenChange);
  store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
  usePopupRootSync(store, open);
  useImplicitActiveTrigger(store);
  const {
    forceUnmount
  } = useOpenStateTransitions(open, store, () => {
    store.update({
      stickIfOpen: true,
      openChangeReason: null
    });
  });
  store.useSyncedValues({
    modal,
    nested
  });
  React3.useEffect(() => {
    if (!open) {
      store.context.stickIfOpenTimeout.clear();
    }
  }, [store, open]);
  const handleImperativeClose = React3.useCallback(() => {
    store.setOpen(false, createChangeEventDetails(exports_reason_parts.imperativeAction));
  }, [store]);
  React3.useImperativeHandle(props.actionsRef, () => ({
    unmount: forceUnmount,
    close: handleImperativeClose
  }), [forceUnmount, handleImperativeClose]);
  const shouldRenderInteractions = open || mounted;
  const popoverContext = React3.useMemo(() => ({
    store
  }), [store]);
  return /* @__PURE__ */ _jsxs(PopoverRootContext.Provider, {
    value: popoverContext,
    children: [shouldRenderInteractions && /* @__PURE__ */ _jsx(PopoverInteractions, {
      store,
      modal
    }), typeof children === "function" ? children({
      payload
    }) : children]
  });
}
function PopoverRoot(props) {
  if (usePopoverRootContext(true)) {
    return /* @__PURE__ */ _jsx(PopoverRootComponent, {
      props
    });
  }
  return /* @__PURE__ */ _jsx(FloatingTree, {
    children: /* @__PURE__ */ _jsx(PopoverRootComponent, {
      props
    })
  });
}
function PopoverInteractions({
  store,
  modal
}) {
  const floatingRootContext = store.useState("floatingRootContext");
  const dismiss = useDismiss(floatingRootContext, {
    outsidePressEvent: {
      mouse: modal === "trap-focus" ? "sloppy" : "intentional",
      touch: "sloppy"
    }
  });
  const activeTriggerProps = dismiss.reference ?? EMPTY_OBJECT;
  const inactiveTriggerProps = dismiss.trigger ?? EMPTY_OBJECT;
  const popupProps = React3.useMemo(() => mergeProps(FOCUSABLE_POPUP_PROPS, dismiss.floating), [dismiss.floating]);
  usePopupInteractionProps(store, {
    activeTriggerProps,
    inactiveTriggerProps,
    popupProps
  });
  return null;
}
// node_modules/@base-ui/react/esm/popover/trigger/PopoverTrigger.js
import * as React4 from "react";

// node_modules/@base-ui/react/esm/popover/utils/constants.js
var OPEN_DELAY = 300;

// node_modules/@base-ui/react/esm/popover/trigger/PopoverTrigger.js
import { jsx as _jsx2, jsxs as _jsxs2 } from "react/jsx-runtime";
"use client";
var PopoverTrigger = /* @__PURE__ */ React4.forwardRef(function PopoverTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    disabled = false,
    nativeButton = true,
    handle,
    payload,
    openOnHover = false,
    delay = OPEN_DELAY,
    closeDelay = 0,
    id: idProp,
    ...elementProps
  } = componentProps;
  const rootContext = usePopoverRootContext(true);
  const store = handle?.store ?? rootContext?.store;
  if (!store) {
    throw new Error("Base UI: <Popover.Trigger> must be either used within a <Popover.Root> component or provided with a handle.");
  }
  const thisTriggerId = useBaseUiId(idProp);
  const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
  const floatingContext = store.useState("floatingRootContext");
  const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
  const popupId = store.useState("triggerPopupId", thisTriggerId);
  const triggerElementRef = React4.useRef(null);
  const {
    registerTrigger,
    isMountedByThisTrigger
  } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
    payload,
    disabled,
    openOnHover,
    closeDelay
  });
  const openReason = store.useState("openChangeReason");
  const stickIfOpen = store.useState("stickIfOpen");
  const openMethod = store.useState("openMethod");
  const focusManagerModal = store.useState("focusManagerModal");
  const hoverProps = useHoverReferenceInteraction(floatingContext, {
    enabled: floatingContext != null && openOnHover && (openMethod !== "touch" || openReason !== exports_reason_parts.triggerPress),
    mouseOnly: true,
    move: false,
    handleClose: safePolygon(),
    restMs: delay,
    delay: {
      close: closeDelay
    },
    triggerElementRef,
    isActiveTrigger: isTriggerActive,
    isClosing: () => store.select("transitionStatus") === "ending"
  });
  const click = useClick(floatingContext, {
    enabled: floatingContext != null,
    stickIfOpen
  });
  const interactionTypeProps = useOpenMethodTriggerProps(() => store.select("open"), (interactionType) => {
    store.set("openMethod", interactionType);
  });
  const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const stateAttributesMapping = {
    open(value) {
      if (value && openReason === exports_reason_parts.triggerPress) {
        return pressableTriggerOpenStateMapping.open(value);
      }
      return triggerOpenStateMapping.open(value);
    }
  };
  const {
    preFocusGuardRef,
    handlePreFocusGuardFocus,
    handleFocusTargetFocus
  } = useTriggerFocusGuards(store, triggerElementRef);
  const state = {
    disabled,
    open: isOpenedByThisTrigger
  };
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [buttonRef, forwardedRef, registerTrigger, triggerElementRef],
    props: [click.reference, hoverProps, rootTriggerProps, interactionTypeProps, {
      [CLICK_TRIGGER_IDENTIFIER]: "",
      id: thisTriggerId,
      "aria-haspopup": "dialog",
      "aria-expanded": isOpenedByThisTrigger,
      "aria-controls": popupId
    }, elementProps, getButtonProps],
    stateAttributesMapping
  });
  if (isMountedByThisTrigger && !focusManagerModal) {
    return /* @__PURE__ */ _jsxs2(React4.Fragment, {
      children: [/* @__PURE__ */ _jsx2(FocusGuard, {
        ref: preFocusGuardRef,
        onFocus: handlePreFocusGuardFocus
      }), /* @__PURE__ */ _jsx2(React4.Fragment, {
        children: element
      }, thisTriggerId), /* @__PURE__ */ _jsx2(FocusGuard, {
        ref: store.context.triggerFocusTargetRef,
        onFocus: handleFocusTargetFocus
      })]
    });
  }
  return /* @__PURE__ */ _jsx2(React4.Fragment, {
    children: element
  }, thisTriggerId);
});
if (true)
  PopoverTrigger.displayName = "PopoverTrigger";
// node_modules/@base-ui/react/esm/popover/portal/PopoverPortal.js
import * as React6 from "react";

// node_modules/@base-ui/react/esm/popover/portal/PopoverPortalContext.js
import * as React5 from "react";
"use client";
var PopoverPortalContext = /* @__PURE__ */ React5.createContext(undefined);
if (true)
  PopoverPortalContext.displayName = "PopoverPortalContext";
function usePopoverPortalContext() {
  const value = React5.useContext(PopoverPortalContext);
  if (value === undefined) {
    throw new Error("Base UI: <Popover.Portal> is missing.");
  }
  return value;
}

// node_modules/@base-ui/react/esm/popover/portal/PopoverPortal.js
import { jsx as _jsx3 } from "react/jsx-runtime";
"use client";
var PopoverPortal = /* @__PURE__ */ React6.forwardRef(function PopoverPortal2(props, forwardedRef) {
  const {
    keepMounted = false,
    ...portalProps
  } = props;
  const {
    store
  } = usePopoverRootContext();
  const mounted = store.useState("mounted");
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ _jsx3(PopoverPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ _jsx3(FloatingPortal, {
      ref: forwardedRef,
      ...portalProps
    })
  });
});
if (true)
  PopoverPortal.displayName = "PopoverPortal";
// node_modules/@base-ui/react/esm/popover/positioner/PopoverPositioner.js
import * as React8 from "react";

// node_modules/@base-ui/react/esm/popover/positioner/PopoverPositionerContext.js
import * as React7 from "react";
"use client";
var PopoverPositionerContext = /* @__PURE__ */ React7.createContext(undefined);
if (true)
  PopoverPositionerContext.displayName = "PopoverPositionerContext";
function usePopoverPositionerContext() {
  const context = React7.useContext(PopoverPositionerContext);
  if (!context) {
    throw new Error("Base UI: PopoverPositionerContext is missing. PopoverPositioner parts must be placed within <Popover.Positioner>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/popover/positioner/PopoverPositioner.js
import { jsx as _jsx4, jsxs as _jsxs3 } from "react/jsx-runtime";
"use client";
var PopoverPositioner = /* @__PURE__ */ React8.forwardRef(function PopoverPositioner2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
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
    ...elementProps
  } = componentProps;
  const {
    store
  } = usePopoverRootContext();
  const keepMounted = usePopoverPortalContext();
  const nodeId = useFloatingNodeId();
  const floatingRootContext = store.useState("floatingRootContext");
  const mounted = store.useState("mounted");
  const open = store.useState("open");
  const openReason = store.useState("openChangeReason");
  const triggerElement = store.useState("activeTriggerElement");
  const modal = store.useState("modal");
  const openMethod = store.useState("openMethod");
  const positionerElement = store.useState("positionerElement");
  const instantType = store.useState("instantType");
  const transitionStatus = store.useState("transitionStatus");
  const hasViewport = store.useState("hasViewport");
  const prevTriggerElementRef = React8.useRef(null);
  const runOnceAnimationsFinish = useAnimationsFinished(positionerElement, false, false);
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
  const domReference = floatingRootContext.useState("domReferenceElement");
  useIsoLayoutEffect(() => {
    const currentTriggerElement = domReference;
    const prevTriggerElement = prevTriggerElementRef.current;
    if (currentTriggerElement) {
      prevTriggerElementRef.current = currentTriggerElement;
    }
    if (prevTriggerElement && currentTriggerElement && currentTriggerElement !== prevTriggerElement) {
      store.set("instantType", undefined);
      const ac = new AbortController;
      runOnceAnimationsFinish(() => {
        store.set("instantType", "trigger-change");
      }, ac.signal);
      return () => {
        ac.abort();
      };
    }
    return;
  }, [domReference, runOnceAnimationsFinish, store]);
  useAnchoredPopupScrollLock(open && modal === true && openReason !== exports_reason_parts.triggerHover, openMethod === "touch", positionerElement, triggerElement);
  const setPositionerElement = React8.useCallback((element2) => {
    store.set("positionerElement", element2);
  }, [store]);
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
    refs: [forwardedRef, setPositionerElement],
    hidden: !mounted,
    inert: !open
  });
  return /* @__PURE__ */ _jsxs3(PopoverPositionerContext.Provider, {
    value: positioning,
    children: [mounted && modal === true && openReason !== exports_reason_parts.triggerHover && /* @__PURE__ */ _jsx4(InternalBackdrop, {
      ref: store.context.internalBackdropRef,
      inert: inertValue(!open),
      cutout: triggerElement
    }), /* @__PURE__ */ _jsx4(FloatingNode, {
      id: nodeId,
      children: element
    })]
  });
});
if (true)
  PopoverPositioner.displayName = "PopoverPositioner";
// node_modules/@base-ui/react/esm/popover/popup/PopoverPopup.js
import * as React10 from "react";

// node_modules/@base-ui/react/esm/utils/closePart.js
import * as React9 from "react";
import { jsx as _jsx5 } from "react/jsx-runtime";
"use client";
var ClosePartContext = /* @__PURE__ */ React9.createContext(undefined);
if (true)
  ClosePartContext.displayName = "ClosePartContext";
function useClosePartCount() {
  const [closePartCount, setClosePartCount] = React9.useState(0);
  const register = useStableCallback(() => {
    setClosePartCount((count) => count + 1);
    return () => {
      setClosePartCount((count) => Math.max(0, count - 1));
    };
  });
  const context = React9.useMemo(() => ({
    register
  }), [register]);
  return {
    context,
    hasClosePart: closePartCount > 0
  };
}
function ClosePartProvider(props) {
  const {
    value,
    children
  } = props;
  return /* @__PURE__ */ _jsx5(ClosePartContext.Provider, {
    value,
    children
  });
}
function useClosePartRegistration() {
  const context = React9.useContext(ClosePartContext);
  useIsoLayoutEffect(() => {
    return context?.register();
  }, [context]);
}

// node_modules/@base-ui/react/esm/popover/popup/PopoverPopup.js
import { jsx as _jsx6 } from "react/jsx-runtime";
"use client";
var stateAttributesMapping = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
var PopoverPopup = /* @__PURE__ */ React10.forwardRef(function PopoverPopup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    initialFocus,
    finalFocus,
    ...elementProps
  } = componentProps;
  const {
    store
  } = usePopoverRootContext();
  const positioner = usePopoverPositionerContext();
  const insideToolbar = useToolbarRootContext(true) != null;
  const {
    context: closePartContext,
    hasClosePart
  } = useClosePartCount();
  const open = store.useState("open");
  const openMethod = store.useState("openMethod");
  const instantType = store.useState("instantType");
  const transitionStatus = store.useState("transitionStatus");
  const popupProps = store.useState("popupProps");
  const titleId = store.useState("titleElementId");
  const descriptionId = store.useState("descriptionElementId");
  const modal = store.useState("modal");
  const mounted = store.useState("mounted");
  const openReason = store.useState("openChangeReason");
  const activeTriggerElement = store.useState("activeTriggerElement");
  const floatingContext = store.useState("floatingRootContext");
  const floatingId = floatingContext.useState("floatingId");
  const disabled = store.useState("disabled");
  const openOnHover = store.useState("openOnHover");
  const closeDelay = store.useState("closeDelay");
  const popupId = elementProps.id ?? floatingId;
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
    enabled: openOnHover && !disabled,
    closeDelay
  });
  function defaultInitialFocus(interactionType) {
    if (interactionType === "touch") {
      return store.context.popupRef.current;
    }
    return true;
  }
  const resolvedInitialFocus = initialFocus === undefined ? defaultInitialFocus : initialFocus;
  const focusManagerModal = modal !== false && hasClosePart;
  store.useSyncedValue("focusManagerModal", focusManagerModal);
  const setPopupElement = React10.useCallback((element2) => {
    store.set("popupElement", element2);
  }, [store]);
  const state = {
    open,
    side: positioner.side,
    align: positioner.align,
    instant: instantType,
    transitionStatus
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, store.context.popupRef, setPopupElement],
    props: [popupProps, {
      id: popupId,
      role: "dialog",
      ...FOCUSABLE_POPUP_PROPS,
      "aria-labelledby": titleId,
      "aria-describedby": descriptionId,
      onKeyDown(event) {
        if (insideToolbar && COMPOSITE_KEYS.has(event.key)) {
          event.stopPropagation();
        }
      }
    }, getDisabledMountTransitionStyles(transitionStatus), elementProps],
    stateAttributesMapping
  });
  return /* @__PURE__ */ _jsx6(FloatingFocusManager, {
    context: floatingContext,
    openInteractionType: openMethod,
    modal: focusManagerModal,
    disabled: !mounted || openReason === exports_reason_parts.triggerHover,
    initialFocus: resolvedInitialFocus,
    returnFocus: finalFocus,
    restoreFocus: "popup",
    previousFocusableElement: isHTMLElement(activeTriggerElement) ? activeTriggerElement : undefined,
    nextFocusableElement: store.context.triggerFocusTargetRef,
    beforeContentFocusGuardRef: store.context.beforeContentFocusGuardRef,
    children: /* @__PURE__ */ _jsx6(ClosePartProvider, {
      value: closePartContext,
      children: element
    })
  });
});
if (true)
  PopoverPopup.displayName = "PopoverPopup";
// node_modules/@base-ui/react/esm/popover/arrow/PopoverArrow.js
import * as React11 from "react";
"use client";
var PopoverArrow = /* @__PURE__ */ React11.forwardRef(function PopoverArrow2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    store
  } = usePopoverRootContext();
  const open = store.useState("open");
  const {
    arrowRef,
    side,
    align,
    arrowUncentered,
    arrowStyles
  } = usePopoverPositionerContext();
  const state = {
    open,
    side,
    align,
    uncentered: arrowUncentered
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
  PopoverArrow.displayName = "PopoverArrow";
// node_modules/@base-ui/react/esm/popover/backdrop/PopoverBackdrop.js
import * as React12 from "react";
"use client";
var stateAttributesMapping2 = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
var PopoverBackdrop = /* @__PURE__ */ React12.forwardRef(function PopoverBackdrop2(props, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = props;
  const {
    store
  } = usePopoverRootContext();
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const transitionStatus = store.useState("transitionStatus");
  const openReason = store.useState("openChangeReason");
  const state = {
    open,
    transitionStatus
  };
  const element = useRenderElement("div", props, {
    state,
    ref: [store.context.backdropRef, forwardedRef],
    props: [{
      role: "presentation",
      hidden: !mounted,
      style: {
        pointerEvents: openReason === exports_reason_parts.triggerHover ? "none" : undefined,
        userSelect: "none",
        WebkitUserSelect: "none"
      }
    }, elementProps],
    stateAttributesMapping: stateAttributesMapping2
  });
  return element;
});
if (true)
  PopoverBackdrop.displayName = "PopoverBackdrop";
// node_modules/@base-ui/react/esm/popover/title/PopoverTitle.js
import * as React13 from "react";
"use client";
var PopoverTitle = /* @__PURE__ */ React13.forwardRef(function PopoverTitle2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    store
  } = usePopoverRootContext();
  const id = useBaseUiId(elementProps.id);
  store.useSyncedValueWithCleanup("titleElementId", id);
  const element = useRenderElement("h2", componentProps, {
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
  return element;
});
if (true)
  PopoverTitle.displayName = "PopoverTitle";
// node_modules/@base-ui/react/esm/popover/description/PopoverDescription.js
import * as React14 from "react";
"use client";
var PopoverDescription = /* @__PURE__ */ React14.forwardRef(function PopoverDescription2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    store
  } = usePopoverRootContext();
  const id = useBaseUiId(elementProps.id);
  store.useSyncedValueWithCleanup("descriptionElementId", id);
  const element = useRenderElement("p", componentProps, {
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
  return element;
});
if (true)
  PopoverDescription.displayName = "PopoverDescription";
// node_modules/@base-ui/react/esm/popover/close/PopoverClose.js
import * as React15 from "react";
"use client";
var PopoverClose = /* @__PURE__ */ React15.forwardRef(function PopoverClose2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    disabled = false,
    nativeButton = true,
    ...elementProps
  } = componentProps;
  const {
    buttonRef,
    getButtonProps
  } = useButton({
    disabled,
    focusableWhenDisabled: false,
    native: nativeButton
  });
  const {
    store
  } = usePopoverRootContext();
  useClosePartRegistration();
  const element = useRenderElement("button", componentProps, {
    ref: [forwardedRef, buttonRef],
    props: [{
      onClick(event) {
        store.setOpen(false, createChangeEventDetails(exports_reason_parts.closePress, event.nativeEvent));
      }
    }, elementProps, getButtonProps]
  });
  return element;
});
if (true)
  PopoverClose.displayName = "PopoverClose";
// node_modules/@base-ui/react/esm/popover/viewport/PopoverViewport.js
import * as React16 from "react";

// node_modules/@base-ui/react/esm/popover/viewport/PopoverViewportCssVars.js
var PopoverViewportCssVars = /* @__PURE__ */ function(PopoverViewportCssVars2) {
  PopoverViewportCssVars2["popupWidth"] = "--popup-width";
  PopoverViewportCssVars2["popupHeight"] = "--popup-height";
  return PopoverViewportCssVars2;
}({});

// node_modules/@base-ui/react/esm/popover/viewport/PopoverViewport.js
"use client";
var stateAttributesMapping3 = {
  activationDirection: (value) => value ? {
    "data-activation-direction": value
  } : null
};
var PopoverViewport = /* @__PURE__ */ React16.forwardRef(function PopoverViewport2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    children,
    ...elementProps
  } = componentProps;
  const {
    store
  } = usePopoverRootContext();
  const {
    side
  } = usePopoverPositionerContext();
  const instantType = store.useState("instantType");
  const {
    children: childrenToRender,
    state: viewportState
  } = usePopupViewport({
    store,
    side,
    cssVars: PopoverViewportCssVars,
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
  PopoverViewport.displayName = "PopoverViewport";
// node_modules/@base-ui/react/esm/popover/store/PopoverHandle.js
class PopoverHandle {
  constructor() {
    this.store = new PopoverStore;
  }
  open(triggerId) {
    const triggerElement = triggerId ? this.store.context.triggerElements.getById(triggerId) ?? undefined : undefined;
    if (triggerId && !triggerElement) {
      throw new Error(`Base UI: PopoverHandle.open: No trigger found with id "${triggerId}".`);
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
function createPopoverHandle() {
  return new PopoverHandle;
}
export {
  exports_index_parts as Popover
};
