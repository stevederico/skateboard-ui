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
  popupStateMapping,
  triggerOpenStateMapping
} from "./_chunk-t7ppm3t0.js";
import"./_chunk-3cpd1vjz.js";
import {
  FloatingNode,
  FloatingTree,
  POPUP_COLLISION_AVOIDANCE,
  PopupTriggerMap,
  ReactStore,
  createSelector,
  fastComponent,
  fastComponentRef,
  safePolygon,
  useDismiss,
  useFloatingNodeId,
  useFocus,
  useHoverFloatingInteraction,
  useHoverReferenceInteraction
} from "./_chunk-2z044bba.js";
import"./_chunk-1vw45v38.js";
import"./_chunk-cgptgywc.js";
import"./_chunk-kw8nnq00.js";
import"./_chunk-rrh8rt4v.js";
import"./_chunk-b6dkjkbw.js";
import"./_chunk-dan0mva4.js";
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
  useOpenChangeComplete
} from "./_chunk-e13rsb6b.js";
import"./_chunk-zk4mtm9m.js";
import"./_chunk-8a9vv8am.js";
import"./_chunk-6ejf1z1r.js";
import {
  isElement
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

// node_modules/@base-ui/react/esm/preview-card/index.parts.js
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

// node_modules/@base-ui/react/esm/preview-card/root/PreviewCardRoot.js
import * as React3 from "react";

// node_modules/@base-ui/react/esm/utils/popups/inlineRect.js
function createRect(left, top, right, bottom) {
  return {
    left,
    top,
    right,
    bottom,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top
  };
}
function copyRect(rect) {
  return {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height
  };
}
function getLineRects(rects) {
  const lines = [];
  let previousRect;
  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;
  for (const rect of Array.from(rects).sort((a, b) => a.top - b.top)) {
    left = Math.min(left, rect.left);
    top = Math.min(top, rect.top);
    right = Math.max(right, rect.right);
    bottom = Math.max(bottom, rect.bottom);
    if (!previousRect || rect.top - previousRect.top > previousRect.height / 2) {
      lines.push(copyRect(rect));
    } else {
      const line = lines[lines.length - 1];
      line.left = Math.min(line.left, rect.left);
      line.right = Math.max(line.right, rect.right);
      line.bottom = Math.max(line.bottom, rect.bottom);
      line.width = line.right - line.left;
      line.height = line.bottom - line.top;
    }
    previousRect = rect;
  }
  return {
    lines,
    fallback: createRect(left, top, right, bottom)
  };
}
function findLineIndex(lines, x, y) {
  return lines.findIndex((lineRect) => x > lineRect.left - 2 && x < lineRect.right + 2 && y > lineRect.top - 2 && y < lineRect.bottom + 2);
}
function createClientRect(rect) {
  return createRect(rect.left, rect.top, rect.right, rect.bottom);
}
function getInlineRectCoords(element, clientX, clientY) {
  const {
    lines
  } = getLineRects(element.getClientRects());
  if (lines.length < 2) {
    return;
  }
  const lineIndex = findLineIndex(lines, clientX, clientY);
  return {
    x: clientX,
    y: clientY,
    lineIndex: lineIndex === -1 ? undefined : lineIndex,
    element
  };
}
function getInlineReferenceRect(reference, placement, coords) {
  const {
    lines,
    fallback
  } = getLineRects(reference.getClientRects());
  if (lines.length < 2) {
    return null;
  }
  const x = coords?.x;
  const y = coords?.y;
  const side = placement[0];
  if (coords?.lineIndex != null && lines[coords.lineIndex]) {
    return createClientRect(lines[coords.lineIndex]);
  }
  if (x != null && y != null) {
    const lineIndex = findLineIndex(lines, x, y);
    if (lineIndex !== -1) {
      return createClientRect(lines[lineIndex]);
    }
  }
  if (lines.length === 2 && lines[0].left > lines[1].right && x != null && y != null) {
    return fallback;
  }
  if (side === "t" || side === "b") {
    const firstRect = lines[0];
    const lastRect = lines[lines.length - 1];
    const targetRect = side === "t" ? firstRect : lastRect;
    return createRect(targetRect.left, firstRect.top, targetRect.right, lastRect.bottom);
  }
  const isLeft = side === "l";
  let left = lines[0].left;
  let right = lines[0].right;
  let edge = isLeft ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  let targetFirstRect = lines[0];
  let targetLastRect = lines[0];
  for (const rect of lines) {
    left = Math.min(left, rect.left);
    right = Math.max(right, rect.right);
    const nextEdge = isLeft ? rect.left : rect.right;
    if (isLeft && nextEdge < edge || !isLeft && nextEdge > edge) {
      edge = nextEdge;
      targetFirstRect = rect;
      targetLastRect = rect;
    } else if (nextEdge === edge) {
      targetLastRect = rect;
    }
  }
  return createRect(left, targetFirstRect.top, right, targetLastRect.bottom);
}
function getContextElement(reference) {
  if ("contextElement" in reference && reference.contextElement) {
    return reference.contextElement;
  }
  return isElement(reference) ? reference : undefined;
}
function getInlineRectTriggerProps(coordsRef, isOpen) {
  function updateCoords(event) {
    updateInlineRectCoords(coordsRef, event.currentTarget, event.clientX, event.clientY);
  }
  function updateCoordsOnMove(event) {
    if (!isOpen) {
      updateCoords(event);
    }
  }
  return {
    onFocus() {
      coordsRef.current = undefined;
    },
    onMouseEnter: updateCoords,
    onMouseMove: updateCoordsOnMove
  };
}
function updateInlineRectCoords(coordsRef, element, clientX, clientY) {
  const nextCoords = getInlineRectCoords(element, clientX, clientY);
  coordsRef.current = nextCoords;
  return nextCoords;
}
function createInlineMiddleware(coordsRef) {
  return {
    name: "inline",
    async fn(state) {
      const reference = state.elements.reference;
      if (typeof reference?.getClientRects !== "function") {
        return {};
      }
      const contextElement = getContextElement(reference);
      const coords = coordsRef.current;
      const currentCoords = coords?.element === reference || coords?.element === contextElement ? coords : undefined;
      const rect = getInlineReferenceRect(reference, state.placement, currentCoords);
      if (!rect || typeof state.platform.getElementRects !== "function") {
        return {};
      }
      const resetRects = await state.platform.getElementRects({
        reference: {
          contextElement,
          getBoundingClientRect() {
            return rect;
          }
        },
        floating: state.elements.floating,
        strategy: state.strategy
      });
      if (state.rects.reference.x === resetRects.reference.x && state.rects.reference.y === resetRects.reference.y && state.rects.reference.width === resetRects.reference.width && state.rects.reference.height === resetRects.reference.height) {
        return {};
      }
      return {
        reset: {
          rects: resetRects
        }
      };
    }
  };
}

// node_modules/@base-ui/react/esm/preview-card/root/PreviewCardContext.js
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

// node_modules/@base-ui/react/esm/preview-card/store/PreviewCardStore.js
import * as React2 from "react";
import * as ReactDOM from "react-dom";

// node_modules/@base-ui/react/esm/preview-card/utils/constants.js
var OPEN_DELAY = 600;
var CLOSE_DELAY = 300;

// node_modules/@base-ui/react/esm/preview-card/store/PreviewCardStore.js
var selectors = {
  ...popupStoreSelectors,
  instantType: createSelector((state) => state.instantType),
  hasViewport: createSelector((state) => state.hasViewport)
};

class PreviewCardStore extends ReactStore {
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
      triggerElements,
      closeDelayRef: {
        current: CLOSE_DELAY
      },
      inlineRectCoordsRef: {
        current: undefined
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
    const event = eventDetails.event;
    if (nextOpen && isHover && eventDetails.trigger && "clientX" in event && "clientY" in event && this.context.inlineRectCoordsRef.current?.element !== eventDetails.trigger) {
      updateInlineRectCoords(this.context.inlineRectCoordsRef, eventDetails.trigger, event.clientX, event.clientY);
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
      setOpenTriggerState(updatedState, nextOpen, eventDetails.trigger);
      this.update(updatedState);
    };
    if (isHover) {
      ReactDOM.flushSync(changeState);
    } else {
      changeState();
    }
  };
  static useStore(externalStore, initialState) {
    const store = usePopupStore(externalStore, (floatingId, nested) => new PreviewCardStore(initialState, floatingId, nested)).store;
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

// node_modules/@base-ui/react/esm/preview-card/root/PreviewCardRoot.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  const activeTriggerId = store.useState("activeTriggerId");
  const mounted = store.useState("mounted");
  const payload = store.useState("payload");
  useImplicitActiveTrigger(store);
  const {
    forceUnmount
  } = useOpenStateTransitions(open, store, () => {
    store.context.inlineRectCoordsRef.current = undefined;
  });
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
  const shouldRenderInteractions = open || mounted;
  return /* @__PURE__ */ _jsxs(PreviewCardRootContext.Provider, {
    value: store,
    children: [shouldRenderInteractions && /* @__PURE__ */ _jsx(PreviewCardInteractions, {
      store
    }), typeof children === "function" ? children({
      payload
    }) : children]
  });
}
function PreviewCardInteractions({
  store
}) {
  const floatingRootContext = store.useState("floatingRootContext");
  const dismiss = useDismiss(floatingRootContext);
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
var PreviewCardRoot = fastComponent(function PreviewCardRoot2(props) {
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
});
if (true)
  PreviewCardRoot.displayName = "PreviewCardRoot";
// node_modules/@base-ui/react/esm/preview-card/portal/PreviewCardPortal.js
import * as React5 from "react";

// node_modules/@base-ui/react/esm/preview-card/portal/PreviewCardPortalContext.js
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

// node_modules/@base-ui/react/esm/preview-card/portal/PreviewCardPortal.js
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
// node_modules/@base-ui/react/esm/preview-card/trigger/PreviewCardTrigger.js
import * as React6 from "react";
"use client";
var PreviewCardTrigger = fastComponentRef(function PreviewCardTrigger2(componentProps, forwardedRef) {
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
  const inlineRectCoordsRef = store.context.inlineRectCoordsRef;
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
  const inlineRectTriggerProps = getInlineRectTriggerProps(inlineRectCoordsRef, isOpenedByThisTrigger);
  const element = useRenderElement("a", componentProps, {
    state,
    ref: [forwardedRef, registerTrigger, triggerElementRef],
    props: [hoverProps, focusProps.reference, rootTriggerProps, inlineRectTriggerProps, {
      id: thisTriggerId
    }, elementProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
  return element;
});
if (true)
  PreviewCardTrigger.displayName = "PreviewCardTrigger";
// node_modules/@base-ui/react/esm/preview-card/positioner/PreviewCardPositioner.js
import * as React8 from "react";

// node_modules/@base-ui/react/esm/preview-card/positioner/PreviewCardPositionerContext.js
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

// node_modules/@base-ui/react/esm/preview-card/positioner/PreviewCardPositioner.js
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
  const inlineRectCoordsRef = store.context.inlineRectCoordsRef;
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
    adaptiveOrigin: hasViewport ? adaptiveOrigin : undefined,
    inline: createInlineMiddleware(inlineRectCoordsRef)
  });
  const updatePosition = positioning.update;
  useIsoLayoutEffect(() => {
    if (open && mounted) {
      updatePosition();
    }
  }, [open, mounted, updatePosition]);
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
// node_modules/@base-ui/react/esm/preview-card/popup/PreviewCardPopup.js
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
// node_modules/@base-ui/react/esm/preview-card/arrow/PreviewCardArrow.js
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
// node_modules/@base-ui/react/esm/preview-card/backdrop/PreviewCardBackdrop.js
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
// node_modules/@base-ui/react/esm/preview-card/viewport/PreviewCardViewport.js
import * as React12 from "react";

// node_modules/@base-ui/react/esm/preview-card/viewport/PreviewCardViewportCssVars.js
var PreviewCardViewportCssVars = /* @__PURE__ */ function(PreviewCardViewportCssVars2) {
  PreviewCardViewportCssVars2["popupWidth"] = "--popup-width";
  PreviewCardViewportCssVars2["popupHeight"] = "--popup-height";
  return PreviewCardViewportCssVars2;
}({});

// node_modules/@base-ui/react/esm/preview-card/viewport/PreviewCardViewport.js
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
// node_modules/@base-ui/react/esm/preview-card/store/PreviewCardHandle.js
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
    return this.store.select("open");
  }
}
function createPreviewCardHandle() {
  return new PreviewCardHandle;
}
export {
  exports_index_parts as PreviewCard
};
