/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  CompositeRoot
} from "./_chunk-cdj8cpx5.js";
import"./_chunk-5tt5hk59.js";
import {
  CompositeItem
} from "./_chunk-f2wttwrf.js";
import"./_chunk-j3qkyd10.js";
import {
  adaptiveOrigin,
  useAnchorPositioning,
  usePositioner
} from "./_chunk-fqry7pew.js";
import {
  getCssDimensions
} from "./_chunk-xcqbtm2f.js";
import"./_chunk-3enq1vat.js";
import"./_chunk-26cc610z.js";
import"./_chunk-j29xjete.js";
import"./_chunk-3xpke33f.js";
import {
  useDirection
} from "./_chunk-gy0bpkmx.js";
import {
  useControlled
} from "./_chunk-9x63vfqj.js";
import {
  getEmptyRootContext
} from "./_chunk-5gaqyne5.js";
import {
  popupStateMapping,
  pressableTriggerOpenStateMapping,
  triggerOpenStateMapping
} from "./_chunk-t7ppm3t0.js";
import {
  inertValue
} from "./_chunk-3cpd1vjz.js";
import {
  DROPDOWN_COLLISION_AVOIDANCE,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  FocusGuard,
  PATIENT_CLICK_THRESHOLD,
  POPUP_COLLISION_AVOIDANCE,
  applySafePolygonPointerEventsMutation,
  clearSafePolygonPointerEventsMutation,
  disableFocusInside,
  enableFocusInside,
  getNextTabbable,
  getNodeChildren,
  getPreviousTabbable,
  getTabbableAfterElement,
  isOutsideEvent,
  mergeCleanups,
  ownerVisuallyHidden,
  safePolygon,
  useClick,
  useDismiss,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingRootContext,
  useFloatingTree,
  useHoverFloatingInteraction,
  useHoverInteractionSharedState,
  useHoverReferenceInteraction
} from "./_chunk-2z044bba.js";
import"./_chunk-1vw45v38.js";
import {
  activeElement,
  contains,
  getTarget
} from "./_chunk-cgptgywc.js";
import"./_chunk-pv7b791x.js";
import {
  stopEvent
} from "./_chunk-kw8nnq00.js";
import"./_chunk-rrh8rt4v.js";
import {
  useTimeout
} from "./_chunk-b6dkjkbw.js";
import"./_chunk-dan0mva4.js";
import"./_chunk-x11e1k9r.js";
import {
  addEventListener
} from "./_chunk-ase0ydtt.js";
import {
  useValueAsRef
} from "./_chunk-6kqramh9.js";
import {
  ownerDocument
} from "./_chunk-451nqgsa.js";
import {
  createChangeEventDetails,
  exports_reason_parts
} from "./_chunk-e56mpvk1.js";
import {
  useBaseUiId,
  useId
} from "./_chunk-wdqynnjf.js";
import {
  TransitionStatusDataAttributes,
  transitionStatusMapping,
  useAnimationsFinished,
  useOpenChangeComplete,
  useTransitionStatus
} from "./_chunk-e13rsb6b.js";
import"./_chunk-zk4mtm9m.js";
import {
  useAnimationFrame
} from "./_chunk-8a9vv8am.js";
import"./_chunk-6ejf1z1r.js";
import {
  useButton
} from "./_chunk-5xmdvndx.js";
import"./_chunk-hm5h9vsk.js";
import"./_chunk-cdgfsr3q.js";
import {
  getWindow,
  isHTMLElement
} from "./_chunk-000kmre8.js";
import {
  useStableCallback
} from "./_chunk-cwvtvwc7.js";
import {
  useIsoLayoutEffect
} from "./_chunk-5tze5c8q.js";
import {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  useRenderElement
} from "./_chunk-x8xehj6d.js";
import {
  __export,
  mergeProps
} from "./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/navigation-menu/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  Viewport: () => NavigationMenuViewport,
  Trigger: () => NavigationMenuTrigger,
  Root: () => NavigationMenuRoot,
  Positioner: () => NavigationMenuPositioner,
  Portal: () => NavigationMenuPortal,
  Popup: () => NavigationMenuPopup,
  List: () => NavigationMenuList,
  Link: () => NavigationMenuLink,
  Item: () => NavigationMenuItem,
  Icon: () => NavigationMenuIcon,
  Content: () => NavigationMenuContent,
  Backdrop: () => NavigationMenuBackdrop,
  Arrow: () => NavigationMenuArrow
});

// node_modules/@base-ui/react/esm/navigation-menu/root/NavigationMenuRoot.js
import * as React2 from "react";

// node_modules/@base-ui/react/esm/navigation-menu/root/NavigationMenuRootContext.js
import * as React from "react";
"use client";
var NavigationMenuRootContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  NavigationMenuRootContext.displayName = "NavigationMenuRootContext";
if (true) {
  NavigationMenuRootContext.displayName = "NavigationMenuRootContext";
}
function useNavigationMenuRootContext(optional) {
  const context = React.useContext(NavigationMenuRootContext);
  if (context === undefined && !optional) {
    throw new Error("Base UI: NavigationMenuRootContext is missing. Navigation Menu parts must be placed within <NavigationMenu.Root>.");
  }
  return context;
}
var NavigationMenuTreeContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  NavigationMenuTreeContext.displayName = "NavigationMenuTreeContext";
function useNavigationMenuTreeContext() {
  return React.useContext(NavigationMenuTreeContext);
}

// node_modules/@base-ui/react/esm/navigation-menu/popup/NavigationMenuPopupCssVars.js
var NavigationMenuPopupCssVars = /* @__PURE__ */ function(NavigationMenuPopupCssVars2) {
  NavigationMenuPopupCssVars2["popupWidth"] = "--popup-width";
  NavigationMenuPopupCssVars2["popupHeight"] = "--popup-height";
  return NavigationMenuPopupCssVars2;
}({});

// node_modules/@base-ui/react/esm/navigation-menu/positioner/NavigationMenuPositionerCssVars.js
var NavigationMenuPositionerCssVars = /* @__PURE__ */ function(NavigationMenuPositionerCssVars2) {
  NavigationMenuPositionerCssVars2["availableWidth"] = "--available-width";
  NavigationMenuPositionerCssVars2["availableHeight"] = "--available-height";
  NavigationMenuPositionerCssVars2["anchorWidth"] = "--anchor-width";
  NavigationMenuPositionerCssVars2["anchorHeight"] = "--anchor-height";
  NavigationMenuPositionerCssVars2["transformOrigin"] = "--transform-origin";
  NavigationMenuPositionerCssVars2["positionerWidth"] = "--positioner-width";
  NavigationMenuPositionerCssVars2["positionerHeight"] = "--positioner-height";
  return NavigationMenuPositionerCssVars2;
}({});

// node_modules/@base-ui/react/esm/navigation-menu/root/NavigationMenuRoot.js
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
var blockedReturnFocusReasons = new Set([exports_reason_parts.triggerHover, exports_reason_parts.outsidePress, exports_reason_parts.focusOut]);
function setSharedFixedSize(popupElement, positionerElement) {
  const {
    width,
    height
  } = getCssDimensions(popupElement);
  if (width === 0 || height === 0) {
    return;
  }
  popupElement.style.setProperty(NavigationMenuPopupCssVars.popupWidth, `${width}px`);
  popupElement.style.setProperty(NavigationMenuPopupCssVars.popupHeight, `${height}px`);
  positionerElement.style.setProperty(NavigationMenuPositionerCssVars.positionerWidth, `${width}px`);
  positionerElement.style.setProperty(NavigationMenuPositionerCssVars.positionerHeight, `${height}px`);
}
var NavigationMenuRoot = /* @__PURE__ */ React2.forwardRef(function NavigationMenuRoot2(componentProps, forwardedRef) {
  const {
    defaultValue = null,
    value: valueParam,
    onValueChange,
    actionsRef,
    delay = 50,
    closeDelay = 50,
    orientation = "horizontal",
    onOpenChangeComplete
  } = componentProps;
  const nested = useFloatingParentNodeId() != null;
  const parentRootContext = useNavigationMenuRootContext(true);
  const [value, setValueUnwrapped] = useControlled({
    controlled: valueParam,
    default: defaultValue,
    name: "NavigationMenu",
    state: "value"
  });
  const open = value != null;
  const closeReasonRef = React2.useRef(undefined);
  const rootRef = React2.useRef(null);
  const [positionerElement, setPositionerElement] = React2.useState(null);
  const [popupElement, setPopupElement] = React2.useState(null);
  const [viewportElement, setViewportElement] = React2.useState(null);
  const [viewportTargetElement, setViewportTargetElement] = React2.useState(null);
  const [activationDirection, setActivationDirection] = React2.useState(null);
  const [floatingRootContext, setFloatingRootContext] = React2.useState(undefined);
  const [viewportInert, setViewportInert] = React2.useState(false);
  const prevTriggerElementRef = React2.useRef(null);
  const currentContentRef = React2.useRef(null);
  const beforeInsideRef = React2.useRef(null);
  const afterInsideRef = React2.useRef(null);
  const beforeOutsideRef = React2.useRef(null);
  const afterOutsideRef = React2.useRef(null);
  const popupAutoSizeResetRef = React2.useRef({
    abortController: null,
    owner: null
  });
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open);
  React2.useEffect(() => {
    setViewportInert(false);
  }, [value]);
  const setValue = useStableCallback((nextValue, eventDetails) => {
    if (!nextValue) {
      closeReasonRef.current = eventDetails.reason;
      setActivationDirection(null);
      setFloatingRootContext(undefined);
      if (positionerElement && popupElement) {
        setSharedFixedSize(popupElement, positionerElement);
      }
    }
    if (nextValue !== value) {
      onValueChange?.(nextValue, eventDetails);
    }
    if (eventDetails.isCanceled) {
      return;
    }
    setValueUnwrapped(nextValue);
    if (nested && !nextValue && eventDetails.reason === exports_reason_parts.linkPress && parentRootContext) {
      parentRootContext.setValue(null, eventDetails);
    }
  });
  const handleUnmount = useStableCallback(() => {
    const doc = ownerDocument(rootRef.current);
    const activeEl = activeElement(doc);
    const isReturnFocusBlocked = closeReasonRef.current ? blockedReturnFocusReasons.has(closeReasonRef.current) : false;
    if (!isReturnFocusBlocked && isHTMLElement(prevTriggerElementRef.current) && (activeEl === ownerDocument(popupElement).body || contains(popupElement, activeEl)) && popupElement) {
      prevTriggerElementRef.current.focus({
        preventScroll: true
      });
      prevTriggerElementRef.current = undefined;
    }
    setMounted(false);
    onOpenChangeComplete?.(false);
    setActivationDirection(null);
    setFloatingRootContext(undefined);
    currentContentRef.current = null;
    closeReasonRef.current = undefined;
  });
  useOpenChangeComplete({
    enabled: !actionsRef,
    open,
    ref: {
      current: popupElement
    },
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    }
  });
  useOpenChangeComplete({
    enabled: !actionsRef,
    open,
    ref: {
      current: viewportTargetElement
    },
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    }
  });
  const contextValue = React2.useMemo(() => ({
    open,
    value,
    setValue,
    mounted,
    transitionStatus,
    positionerElement,
    setPositionerElement,
    popupElement,
    setPopupElement,
    viewportElement,
    setViewportElement,
    viewportTargetElement,
    setViewportTargetElement,
    activationDirection,
    setActivationDirection,
    floatingRootContext,
    setFloatingRootContext,
    currentContentRef,
    nested,
    rootRef,
    beforeInsideRef,
    afterInsideRef,
    beforeOutsideRef,
    afterOutsideRef,
    prevTriggerElementRef,
    popupAutoSizeResetRef,
    delay,
    closeDelay,
    orientation,
    viewportInert,
    setViewportInert
  }), [open, value, setValue, mounted, transitionStatus, positionerElement, popupElement, viewportElement, viewportTargetElement, activationDirection, floatingRootContext, nested, delay, closeDelay, orientation, viewportInert]);
  const jsx = /* @__PURE__ */ _jsx(NavigationMenuRootContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ _jsx(TreeContext, {
      componentProps,
      forwardedRef,
      children: componentProps.children
    })
  });
  if (!nested) {
    return /* @__PURE__ */ _jsx(FloatingTree, {
      children: jsx
    });
  }
  return jsx;
});
if (true)
  NavigationMenuRoot.displayName = "NavigationMenuRoot";
function TreeContext(props) {
  const {
    className,
    render,
    defaultValue,
    value: valueParam,
    onValueChange,
    actionsRef,
    delay,
    closeDelay,
    orientation,
    onOpenChangeComplete,
    style,
    ...elementProps
  } = props.componentProps;
  const nodeId = useFloatingNodeId();
  const {
    rootRef,
    nested,
    open
  } = useNavigationMenuRootContext();
  const state = {
    open,
    nested
  };
  const element = useRenderElement(nested ? "div" : "nav", props.componentProps, {
    state,
    ref: [props.forwardedRef, rootRef],
    props: elementProps
  });
  return /* @__PURE__ */ _jsx(NavigationMenuTreeContext.Provider, {
    value: nodeId,
    children: /* @__PURE__ */ _jsx(FloatingNode, {
      id: nodeId,
      children: element
    })
  });
}
// node_modules/@base-ui/react/esm/navigation-menu/list/NavigationMenuList.js
import * as React4 from "react";

// node_modules/@base-ui/react/esm/navigation-menu/utils/constants.js
var NAVIGATION_MENU_TRIGGER_IDENTIFIER = "data-base-ui-navigation-menu-trigger";

// node_modules/@base-ui/react/esm/navigation-menu/list/NavigationMenuDismissContext.js
import * as React3 from "react";
"use client";
var NavigationMenuDismissContext = /* @__PURE__ */ React3.createContext(undefined);
if (true)
  NavigationMenuDismissContext.displayName = "NavigationMenuDismissContext";
function useNavigationMenuDismissContext() {
  return React3.useContext(NavigationMenuDismissContext);
}

// node_modules/@base-ui/react/esm/navigation-menu/list/NavigationMenuList.js
import { jsx as _jsx2 } from "react/jsx-runtime";
"use client";
var NavigationMenuList = /* @__PURE__ */ React4.forwardRef(function NavigationMenuList2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const nodeId = useNavigationMenuTreeContext();
  const {
    orientation,
    open,
    floatingRootContext,
    positionerElement,
    value,
    closeDelay,
    viewportElement,
    nested
  } = useNavigationMenuRootContext();
  const fallbackContext = React4.useMemo(() => getEmptyRootContext(), []);
  const context = floatingRootContext || fallbackContext;
  const interactionsEnabled = positionerElement ? true : !value;
  const hoverInteractionsEnabled = positionerElement || viewportElement ? true : !value;
  useHoverFloatingInteraction(context, {
    enabled: Boolean(floatingRootContext) && hoverInteractionsEnabled,
    closeDelay,
    nodeId
  });
  const dismiss = useDismiss(context, {
    enabled: interactionsEnabled,
    outsidePressEvent: "intentional",
    outsidePress(event) {
      const target = getTarget(event);
      const closestNavigationMenuTrigger = target?.closest(`[${NAVIGATION_MENU_TRIGGER_IDENTIFIER}]`);
      return closestNavigationMenuTrigger === null;
    }
  });
  const dismissProps = floatingRootContext ? dismiss : undefined;
  const state = {
    open
  };
  const defaultProps = nested ? EMPTY_OBJECT : {
    onKeyDown(event) {
      const shouldStop = orientation === "horizontal" && (event.key === "ArrowLeft" || event.key === "ArrowRight") || orientation === "vertical" && (event.key === "ArrowUp" || event.key === "ArrowDown");
      if (shouldStop) {
        event.stopPropagation();
      }
    }
  };
  const props = [dismissProps?.floating || EMPTY_OBJECT, defaultProps, {
    "aria-orientation": undefined
  }, elementProps];
  const element = useRenderElement("ul", componentProps, {
    state,
    ref: forwardedRef,
    props,
    enabled: nested
  });
  if (nested) {
    return /* @__PURE__ */ _jsx2(NavigationMenuDismissContext.Provider, {
      value: dismissProps,
      children: element
    });
  }
  return /* @__PURE__ */ _jsx2(NavigationMenuDismissContext.Provider, {
    value: dismissProps,
    children: /* @__PURE__ */ _jsx2(CompositeRoot, {
      render,
      className,
      style,
      state,
      refs: [forwardedRef],
      props,
      loopFocus: false,
      orientation,
      tag: "ul"
    })
  });
});
if (true)
  NavigationMenuList.displayName = "NavigationMenuList";
// node_modules/@base-ui/react/esm/navigation-menu/item/NavigationMenuItem.js
import * as React6 from "react";

// node_modules/@base-ui/react/esm/navigation-menu/item/NavigationMenuItemContext.js
import * as React5 from "react";
"use client";
var NavigationMenuItemContext = /* @__PURE__ */ React5.createContext(undefined);
if (true)
  NavigationMenuItemContext.displayName = "NavigationMenuItemContext";
function useNavigationMenuItemContext() {
  const value = React5.useContext(NavigationMenuItemContext);
  if (!value) {
    throw new Error("Base UI: NavigationMenuItem parts must be used within a <NavigationMenu.Item>.");
  }
  return value;
}

// node_modules/@base-ui/react/esm/navigation-menu/item/NavigationMenuItem.js
import { jsx as _jsx3 } from "react/jsx-runtime";
"use client";
var NavigationMenuItem = /* @__PURE__ */ React6.forwardRef(function NavigationMenuItem2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    value: valueProp,
    ...elementProps
  } = componentProps;
  const fallbackValue = useBaseUiId();
  const value = valueProp ?? fallbackValue;
  const element = useRenderElement("li", componentProps, {
    ref: forwardedRef,
    props: elementProps
  });
  const contextValue = React6.useMemo(() => ({
    value
  }), [value]);
  return /* @__PURE__ */ _jsx3(NavigationMenuItemContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (true)
  NavigationMenuItem.displayName = "NavigationMenuItem";
// node_modules/@base-ui/react/esm/navigation-menu/content/NavigationMenuContent.js
import * as React7 from "react";
import * as ReactDOM from "react-dom";
import { jsx as _jsx4 } from "react/jsx-runtime";
"use client";
var stateAttributesMapping = {
  ...popupStateMapping,
  ...transitionStatusMapping,
  activationDirection(value) {
    if (!value) {
      return null;
    }
    return {
      "data-activation-direction": value
    };
  }
};
var NavigationMenuContent = /* @__PURE__ */ React7.forwardRef(function NavigationMenuContent2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    keepMounted = false,
    ...elementProps
  } = componentProps;
  const {
    mounted: popupMounted,
    viewportElement,
    value,
    activationDirection,
    currentContentRef,
    viewportTargetElement
  } = useNavigationMenuRootContext();
  const {
    value: itemValue
  } = useNavigationMenuItemContext();
  const nodeId = useNavigationMenuTreeContext();
  const open = popupMounted && value === itemValue;
  const ref = React7.useRef(null);
  const [hasMountedInPortal, setHasMountedInPortal] = React7.useState(false);
  const [focusInside, setFocusInside] = React7.useState(false);
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open);
  if (mounted && !popupMounted) {
    setMounted(false);
  }
  useOpenChangeComplete({
    ref,
    open,
    onComplete() {
      if (!open) {
        setMounted(false);
      }
    }
  });
  useIsoLayoutEffect(() => {
    if (open && ref.current) {
      currentContentRef.current = ref.current;
    }
  }, [open, currentContentRef]);
  const state = {
    open,
    transitionStatus,
    activationDirection
  };
  const handleCurrentContentRef = useStableCallback((node) => {
    if (node && open) {
      currentContentRef.current = node;
    }
  });
  const commonProps = {
    onFocus(event) {
      const target = getTarget(event.nativeEvent);
      if (target?.hasAttribute("data-base-ui-focus-guard")) {
        return;
      }
      setFocusInside(true);
    },
    onBlur(event) {
      if (!contains(event.currentTarget, event.relatedTarget)) {
        setFocusInside(false);
      }
    }
  };
  const defaultProps = !open && mounted ? {
    style: {
      position: "absolute",
      top: 0,
      left: 0
    },
    inert: inertValue(!focusInside),
    ...commonProps
  } : commonProps;
  const portalContainer = viewportTargetElement || viewportElement;
  const hidden = keepMounted && !mounted;
  const shouldRenderInline = keepMounted && !portalContainer && !hasMountedInPortal;
  if (keepMounted && portalContainer && !hasMountedInPortal) {
    setHasMountedInPortal(true);
  }
  if (shouldRenderInline) {
    return /* @__PURE__ */ _jsx4(CompositeRoot, {
      render,
      className,
      style,
      state,
      refs: [forwardedRef],
      props: [defaultProps, {
        hidden: true
      }, elementProps],
      stateAttributesMapping
    });
  }
  if (!portalContainer || !mounted && !keepMounted) {
    return null;
  }
  return /* @__PURE__ */ ReactDOM.createPortal(/* @__PURE__ */ _jsx4(FloatingNode, {
    id: nodeId,
    children: /* @__PURE__ */ _jsx4(CompositeRoot, {
      render,
      className,
      style,
      state,
      refs: [forwardedRef, ref, handleCurrentContentRef],
      props: [defaultProps, hidden ? {
        hidden: true
      } : EMPTY_OBJECT, elementProps],
      stateAttributesMapping
    })
  }), portalContainer);
});
if (true)
  NavigationMenuContent.displayName = "NavigationMenuContent";
// node_modules/@base-ui/react/esm/navigation-menu/trigger/NavigationMenuTrigger.js
import * as React8 from "react";
import * as ReactDOM2 from "react-dom";

// node_modules/@base-ui/react/esm/navigation-menu/utils/isOutsideMenuEvent.js
function isOutsideMenuEvent({
  currentTarget,
  relatedTarget
}, params) {
  const {
    popupElement,
    rootRef,
    tree,
    nodeId
  } = params;
  const nodeChildrenContains = tree ? getNodeChildren(tree.nodesRef.current, nodeId).some((node) => contains(node.context?.elements.floating, relatedTarget)) : [];
  if (!popupElement) {
    return !contains(rootRef.current, relatedTarget) && !nodeChildrenContains;
  }
  return !contains(popupElement, currentTarget) && !contains(popupElement, relatedTarget) && !contains(rootRef.current, relatedTarget) && !nodeChildrenContains && !(contains(popupElement, relatedTarget) && relatedTarget?.hasAttribute("data-base-ui-focus-guard"));
}

// node_modules/@base-ui/react/esm/navigation-menu/trigger/NavigationMenuTrigger.js
import { jsx as _jsx5, jsxs as _jsxs } from "react/jsx-runtime";
"use client";
var DEFAULT_SIZE = {
  width: 0,
  height: 0
};
var NavigationMenuTrigger = /* @__PURE__ */ React8.forwardRef(function NavigationMenuTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    nativeButton = true,
    disabled,
    ...elementProps
  } = componentProps;
  const {
    value,
    setValue,
    mounted,
    open,
    positionerElement,
    setActivationDirection,
    setFloatingRootContext,
    popupElement,
    viewportElement,
    transitionStatus,
    rootRef,
    beforeOutsideRef,
    afterOutsideRef,
    afterInsideRef,
    beforeInsideRef,
    prevTriggerElementRef,
    popupAutoSizeResetRef,
    currentContentRef,
    delay,
    closeDelay,
    orientation,
    setViewportInert,
    nested
  } = useNavigationMenuRootContext();
  const {
    value: itemValue
  } = useNavigationMenuItemContext();
  const nodeId = useNavigationMenuTreeContext();
  const tree = useFloatingTree();
  const dismissProps = useNavigationMenuDismissContext();
  const direction = useDirection();
  const stickIfOpenTimeout = useTimeout();
  const focusFrame = useAnimationFrame();
  const mutationFrame = useAnimationFrame();
  const resizeFrame = useAnimationFrame();
  const sizeFrame = useAnimationFrame();
  const [triggerElement, setTriggerElement] = React8.useState(null);
  const [stickIfOpen, setStickIfOpen] = React8.useState(true);
  const [pointerType, setPointerType] = React8.useState("");
  const triggerElementRef = React8.useRef(null);
  const allowFocusRef = React8.useRef(false);
  const prevSizeRef = React8.useRef(DEFAULT_SIZE);
  const skipAutoSizeSyncRef = React8.useRef(false);
  const isActiveItem = open && value === itemValue;
  const isActiveItemRef = useValueAsRef(isActiveItem);
  const interactionsEnabled = positionerElement ? true : !value;
  const hoverFloatingElement = positionerElement || viewportElement;
  const hoverInteractionsEnabled = hoverFloatingElement ? true : !value;
  const runOnceAnimationsFinish = useAnimationsFinished(popupElement, false, false);
  const handleTriggerElement = React8.useCallback((element) => {
    triggerElementRef.current = element;
    setTriggerElement(element);
  }, []);
  const cancelAutoSizeReset = useStableCallback((force = false) => {
    if (!force && popupAutoSizeResetRef.current.owner !== itemValue) {
      return;
    }
    popupAutoSizeResetRef.current.abortController?.abort();
    popupAutoSizeResetRef.current.abortController = null;
    popupAutoSizeResetRef.current.owner = null;
  });
  useIsoLayoutEffect(() => {
    if (isActiveItem) {
      return;
    }
    mutationFrame.cancel();
    sizeFrame.cancel();
    cancelAutoSizeReset();
  }, [isActiveItem, mutationFrame, sizeFrame, cancelAutoSizeReset]);
  function setAutoSizes() {
    if (!popupElement) {
      return;
    }
    popupElement.style.setProperty(NavigationMenuPopupCssVars.popupWidth, "auto");
    popupElement.style.setProperty(NavigationMenuPopupCssVars.popupHeight, "auto");
  }
  function clearFixedSizes() {
    if (!popupElement || !positionerElement) {
      return;
    }
    popupElement.style.removeProperty(NavigationMenuPopupCssVars.popupWidth);
    popupElement.style.removeProperty(NavigationMenuPopupCssVars.popupHeight);
    positionerElement.style.removeProperty(NavigationMenuPositionerCssVars.positionerWidth);
    positionerElement.style.removeProperty(NavigationMenuPositionerCssVars.positionerHeight);
  }
  function setSharedFixedSizes(width, height) {
    if (!popupElement || !positionerElement) {
      return;
    }
    popupElement.style.setProperty(NavigationMenuPopupCssVars.popupWidth, `${width}px`);
    popupElement.style.setProperty(NavigationMenuPopupCssVars.popupHeight, `${height}px`);
    positionerElement.style.setProperty(NavigationMenuPositionerCssVars.positionerWidth, `${width}px`);
    positionerElement.style.setProperty(NavigationMenuPositionerCssVars.positionerHeight, `${height}px`);
  }
  function scheduleAutoSizeReset() {
    cancelAutoSizeReset(true);
    const abortController = new AbortController;
    popupAutoSizeResetRef.current.abortController = abortController;
    popupAutoSizeResetRef.current.owner = itemValue;
    runOnceAnimationsFinish(() => {
      if (popupAutoSizeResetRef.current.abortController !== abortController || popupAutoSizeResetRef.current.owner !== itemValue) {
        return;
      }
      popupAutoSizeResetRef.current.abortController = null;
      popupAutoSizeResetRef.current.owner = null;
      setAutoSizes();
    }, abortController.signal);
  }
  const handleValueChange = useStableCallback((currentWidth, currentHeight, options = {}) => {
    if (!popupElement || !positionerElement) {
      return;
    }
    cancelAutoSizeReset(true);
    const {
      syncPositioner = false
    } = options;
    clearFixedSizes();
    const {
      width,
      height
    } = getCssDimensions(popupElement);
    const measuredWidth = width || prevSizeRef.current.width;
    const measuredHeight = height || prevSizeRef.current.height;
    if (currentHeight === 0 || currentWidth === 0) {
      currentWidth = measuredWidth;
      currentHeight = measuredHeight;
    }
    popupElement.style.setProperty(NavigationMenuPopupCssVars.popupWidth, `${currentWidth}px`);
    popupElement.style.setProperty(NavigationMenuPopupCssVars.popupHeight, `${currentHeight}px`);
    positionerElement.style.setProperty(NavigationMenuPositionerCssVars.positionerWidth, `${syncPositioner ? currentWidth : measuredWidth}px`);
    positionerElement.style.setProperty(NavigationMenuPositionerCssVars.positionerHeight, `${syncPositioner ? currentHeight : measuredHeight}px`);
    sizeFrame.request(() => {
      if (!isActiveItemRef.current) {
        return;
      }
      popupElement.style.setProperty(NavigationMenuPopupCssVars.popupWidth, `${measuredWidth}px`);
      popupElement.style.setProperty(NavigationMenuPopupCssVars.popupHeight, `${measuredHeight}px`);
      if (syncPositioner) {
        positionerElement.style.setProperty(NavigationMenuPositionerCssVars.positionerWidth, `${measuredWidth}px`);
        positionerElement.style.setProperty(NavigationMenuPositionerCssVars.positionerHeight, `${measuredHeight}px`);
      }
      scheduleAutoSizeReset();
    });
  });
  const handleInterruptedMutationResize = useStableCallback((currentWidth, currentHeight) => {
    if (!popupElement || !positionerElement) {
      return;
    }
    sizeFrame.cancel();
    mutationFrame.cancel();
    cancelAutoSizeReset(true);
    if (currentWidth === 0 || currentHeight === 0) {
      return;
    }
    setSharedFixedSizes(currentWidth, currentHeight);
    mutationFrame.request(() => {
      mutationFrame.request(() => {
        clearFixedSizes();
        const {
          width,
          height
        } = getCssDimensions(popupElement);
        const measuredWidth = width || currentWidth || prevSizeRef.current.width;
        const measuredHeight = height || currentHeight || prevSizeRef.current.height;
        setSharedFixedSizes(currentWidth, currentHeight);
        sizeFrame.request(() => {
          if (!isActiveItemRef.current) {
            return;
          }
          setSharedFixedSizes(measuredWidth, measuredHeight);
          scheduleAutoSizeReset();
        });
      });
    });
  });
  const syncCurrentSize = useStableCallback(() => {
    if (!popupElement || !positionerElement) {
      return;
    }
    sizeFrame.cancel();
    cancelAutoSizeReset(true);
    clearFixedSizes();
    const {
      width,
      height
    } = getCssDimensions(popupElement);
    if (width === 0 || height === 0) {
      return;
    }
    prevSizeRef.current = {
      width,
      height
    };
    setAutoSizes();
    positionerElement.style.setProperty(NavigationMenuPositionerCssVars.positionerWidth, `${width}px`);
    positionerElement.style.setProperty(NavigationMenuPositionerCssVars.positionerHeight, `${height}px`);
  });
  const getMutationBaseline = useStableCallback(() => {
    if (!popupElement) {
      return {
        size: prevSizeRef.current,
        syncPositioner: false
      };
    }
    const popupWidth = popupElement.style.getPropertyValue(NavigationMenuPopupCssVars.popupWidth);
    const popupHeight = popupElement.style.getPropertyValue(NavigationMenuPopupCssVars.popupHeight);
    const isResizing = popupWidth !== "" && popupWidth !== "auto" && popupHeight !== "" && popupHeight !== "auto";
    if (!isResizing) {
      return {
        size: prevSizeRef.current,
        syncPositioner: false
      };
    }
    return {
      size: {
        width: popupElement.offsetWidth || prevSizeRef.current.width,
        height: popupElement.offsetHeight || prevSizeRef.current.height
      },
      syncPositioner: true
    };
  });
  React8.useEffect(() => {
    if (!open) {
      stickIfOpenTimeout.clear();
      mutationFrame.cancel();
      resizeFrame.cancel();
      sizeFrame.cancel();
      cancelAutoSizeReset(true);
      skipAutoSizeSyncRef.current = false;
      setPointerType("");
    }
  }, [stickIfOpenTimeout, open, mutationFrame, resizeFrame, sizeFrame, cancelAutoSizeReset]);
  React8.useEffect(() => {
    if (!mounted) {
      prevSizeRef.current = DEFAULT_SIZE;
    }
  }, [mounted]);
  React8.useEffect(() => {
    if (!popupElement || typeof ResizeObserver !== "function") {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      prevSizeRef.current = {
        width: popupElement.offsetWidth,
        height: popupElement.offsetHeight
      };
    });
    resizeObserver.observe(popupElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [popupElement]);
  React8.useEffect(() => {
    if (!open || !isActiveItem || !popupElement || !positionerElement) {
      return;
    }
    const win = getWindow(positionerElement);
    function handleResize() {
      resizeFrame.cancel();
      resizeFrame.request(syncCurrentSize);
    }
    const unsubscribe = addEventListener(win, "resize", handleResize);
    return () => {
      resizeFrame.cancel();
      unsubscribe();
    };
  }, [open, isActiveItem, popupElement, positionerElement, resizeFrame, syncCurrentSize]);
  React8.useEffect(() => {
    const observedElement = currentContentRef.current;
    if (!observedElement || !popupElement || !isActiveItem || typeof MutationObserver !== "function") {
      return;
    }
    const mutationObserver = new MutationObserver(() => {
      if (transitionStatus === "starting" || popupElement.hasAttribute(TransitionStatusDataAttributes.startingStyle)) {
        syncCurrentSize();
        return;
      }
      const {
        size,
        syncPositioner
      } = getMutationBaseline();
      if (syncPositioner) {
        handleInterruptedMutationResize(size.width, size.height);
        return;
      }
      handleValueChange(size.width, size.height);
    });
    mutationObserver.observe(observedElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["hidden"]
    });
    return () => {
      mutationObserver.disconnect();
    };
  }, [currentContentRef, popupElement, isActiveItem, transitionStatus, getMutationBaseline, handleInterruptedMutationResize, handleValueChange, syncCurrentSize]);
  React8.useEffect(() => {
    if (isActiveItem && open && popupElement && allowFocusRef.current) {
      allowFocusRef.current = false;
      focusFrame.request(() => {
        beforeOutsideRef.current?.focus();
      });
    }
    return () => {
      focusFrame.cancel();
    };
  }, [beforeOutsideRef, focusFrame, isActiveItem, open, popupElement]);
  useIsoLayoutEffect(() => {
    if (isActiveItemRef.current && open && popupElement) {
      const hasNestedMenu = currentContentRef.current?.querySelector("[data-nested]") != null;
      if (transitionStatus === "starting" && hasNestedMenu) {
        sizeFrame.request(syncCurrentSize);
        return () => {
          sizeFrame.cancel();
        };
      }
      if (skipAutoSizeSyncRef.current) {
        skipAutoSizeSyncRef.current = false;
        return;
      }
      const {
        width,
        height
      } = getCssDimensions(popupElement);
      handleValueChange(width, height);
    }
    return;
  }, [currentContentRef, handleValueChange, isActiveItemRef, open, popupElement, sizeFrame, syncCurrentSize, transitionStatus]);
  function handleOpenChange(nextOpen, eventDetails) {
    const isHover = eventDetails.reason === exports_reason_parts.triggerHover;
    if (!interactionsEnabled) {
      return;
    }
    if (pointerType === "touch" && isHover) {
      return;
    }
    if (!nextOpen && value !== itemValue) {
      return;
    }
    function changeState() {
      if (isHover) {
        setStickIfOpen(true);
        stickIfOpenTimeout.clear();
        stickIfOpenTimeout.start(PATIENT_CLICK_THRESHOLD, () => {
          setStickIfOpen(false);
        });
      }
      if (nextOpen) {
        setValue(itemValue, eventDetails);
      } else {
        setValue(null, eventDetails);
        setPointerType("");
      }
    }
    if (isHover) {
      ReactDOM2.flushSync(changeState);
    } else {
      changeState();
    }
  }
  const context = useFloatingRootContext({
    open,
    onOpenChange: handleOpenChange,
    elements: {
      reference: triggerElement,
      floating: hoverFloatingElement
    }
  });
  const hoverInteractionState = useHoverInteractionSharedState(context);
  const shouldBlockSafePolygonPointerEvents = pointerType !== "touch";
  React8.useEffect(() => {
    if (!open) {
      context.context.dataRef.current.openEvent = undefined;
      hoverInteractionState.pointerType = undefined;
      hoverInteractionState.interactedInside = false;
      hoverInteractionState.restTimeoutPending = false;
      hoverInteractionState.openChangeTimeout.clear();
      hoverInteractionState.restTimeout.clear();
      clearSafePolygonPointerEventsMutation(hoverInteractionState);
    }
  }, [context, hoverInteractionState, open]);
  const getInlineHandleCloseContext = useStableCallback(() => {
    if (!nested || positionerElement || !triggerElementRef.current || !hoverFloatingElement) {
      return null;
    }
    return getHandleCloseContext(triggerElementRef.current, hoverFloatingElement, nodeId);
  });
  function getScope() {
    if (!nested || !positionerElement) {
      return triggerElementRef.current?.closest("ul") ?? null;
    }
    return null;
  }
  const hoverProps = useHoverReferenceInteraction(context, {
    enabled: hoverInteractionsEnabled,
    move: false,
    handleClose: safePolygon({
      blockPointerEvents: shouldBlockSafePolygonPointerEvents,
      getScope
    }),
    restMs: mounted && positionerElement ? 0 : delay,
    delay: {
      close: closeDelay
    },
    triggerElementRef,
    getHandleCloseContext: getInlineHandleCloseContext
  });
  const hover = React8.useMemo(() => hoverProps ? {
    reference: hoverProps
  } : undefined, [hoverProps]);
  const click = useClick(context, {
    enabled: interactionsEnabled,
    stickIfOpen,
    toggle: isActiveItem
  });
  const referenceProps = React8.useMemo(() => mergeProps(click.reference, hover?.reference), [click.reference, hover]);
  useIsoLayoutEffect(() => {
    if (isActiveItem) {
      setFloatingRootContext(context);
      prevTriggerElementRef.current = triggerElement;
    }
  }, [isActiveItem, context, setFloatingRootContext, prevTriggerElementRef, triggerElement]);
  function handleActivation(event) {
    ReactDOM2.flushSync(() => {
      const currentTarget = isHTMLElement(event.currentTarget) ? event.currentTarget : null;
      const prevTriggerRect = prevTriggerElementRef.current?.getBoundingClientRect();
      if (mounted && prevTriggerRect && triggerElement) {
        const nextTriggerRect = triggerElement.getBoundingClientRect();
        const isMovingRight = nextTriggerRect.left > prevTriggerRect.left;
        const isMovingDown = nextTriggerRect.top > prevTriggerRect.top;
        if (orientation === "horizontal" && nextTriggerRect.left !== prevTriggerRect.left) {
          setActivationDirection(isMovingRight ? "right" : "left");
        } else if (orientation === "vertical" && nextTriggerRect.top !== prevTriggerRect.top) {
          setActivationDirection(isMovingDown ? "down" : "up");
        }
      }
      if (event.type !== "click" && value != null) {
        context.context.dataRef.current.openEvent = undefined;
      }
      if (pointerType === "touch" && event.type !== "click") {
        return;
      }
      if (value != null) {
        setValue(itemValue, createChangeEventDetails(event.type === "mouseenter" ? exports_reason_parts.triggerHover : exports_reason_parts.triggerPress, event.nativeEvent));
      }
      if (event.type === "mouseenter" && shouldBlockSafePolygonPointerEvents && (!nested || !positionerElement) && hoverFloatingElement && currentTarget) {
        const applyPointerEventsMutation = () => {
          const scopeElement = getScope() ?? currentTarget.ownerDocument.body;
          applySafePolygonPointerEventsMutation(hoverInteractionState, {
            scopeElement,
            referenceElement: currentTarget,
            floatingElement: hoverFloatingElement
          });
        };
        if (value != null && value !== itemValue) {
          queueMicrotask(applyPointerEventsMutation);
        } else {
          applyPointerEventsMutation();
        }
      }
    });
  }
  const handleOpenEvent = useStableCallback((event) => {
    if (!popupElement || !positionerElement) {
      handleActivation(event);
      return;
    }
    const {
      width,
      height
    } = getCssDimensions(popupElement);
    const shouldSkipAutoSizeSync = value != null && value !== itemValue && (event.type === "click" || pointerType !== "touch");
    handleActivation(event);
    if (shouldSkipAutoSizeSync) {
      skipAutoSizeSyncRef.current = true;
    }
    handleValueChange(width, height);
  });
  const state = {
    open: isActiveItem
  };
  function handleSetPointerType(event) {
    setPointerType(event.pointerType);
  }
  function handleTriggerPointerDown(event) {
    handleSetPointerType(event);
    clearSafePolygonPointerEventsMutation(hoverInteractionState);
  }
  const defaultProps = {
    tabIndex: 0,
    onMouseEnter: handleOpenEvent,
    onClick: handleOpenEvent,
    onPointerEnter: handleSetPointerType,
    onPointerDown: handleTriggerPointerDown,
    "aria-expanded": isActiveItem,
    "aria-controls": isActiveItem ? popupElement?.id : undefined,
    [NAVIGATION_MENU_TRIGGER_IDENTIFIER]: "",
    onFocus() {
      if (!isActiveItem) {
        return;
      }
      setViewportInert(false);
    },
    onMouseMove() {
      allowFocusRef.current = false;
    },
    onKeyDown(event) {
      allowFocusRef.current = true;
      if (nested) {
        return;
      }
      const verticalOpenKey = direction === "rtl" ? "ArrowLeft" : "ArrowRight";
      const openHorizontal = orientation === "horizontal" && event.key === "ArrowDown";
      const openVertical = orientation === "vertical" && event.key === verticalOpenKey;
      if (openHorizontal || openVertical) {
        setValue(itemValue, createChangeEventDetails(exports_reason_parts.listNavigation, event.nativeEvent));
        handleOpenEvent(event);
        stopEvent(event);
      }
    },
    onBlur(event) {
      if (positionerElement && popupElement && isOutsideMenuEvent({
        currentTarget: event.currentTarget,
        relatedTarget: event.relatedTarget
      }, {
        popupElement,
        rootRef,
        tree,
        nodeId
      })) {
        setValue(null, createChangeEventDetails(exports_reason_parts.focusOut, event.nativeEvent));
      }
    }
  };
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton
  });
  const referenceElement = hoverFloatingElement;
  return /* @__PURE__ */ _jsxs(React8.Fragment, {
    children: [/* @__PURE__ */ _jsx5(CompositeItem, {
      tag: "button",
      render,
      className,
      style,
      state,
      stateAttributesMapping: pressableTriggerOpenStateMapping,
      refs: [forwardedRef, handleTriggerElement, buttonRef],
      props: [referenceProps, dismissProps?.reference || EMPTY_ARRAY, defaultProps, elementProps, getButtonProps]
    }), isActiveItem && /* @__PURE__ */ _jsxs(React8.Fragment, {
      children: [/* @__PURE__ */ _jsx5(FocusGuard, {
        ref: beforeOutsideRef,
        onFocus: (event) => {
          if (referenceElement && isOutsideEvent(event, referenceElement)) {
            beforeInsideRef.current?.focus();
          } else {
            const prevTabbable = getPreviousTabbable(triggerElement);
            prevTabbable?.focus();
          }
        }
      }), /* @__PURE__ */ _jsx5("span", {
        "aria-owns": viewportElement?.id,
        style: ownerVisuallyHidden
      }), /* @__PURE__ */ _jsx5(FocusGuard, {
        ref: afterOutsideRef,
        onFocus: (event) => {
          if (referenceElement && isOutsideEvent(event, referenceElement)) {
            ReactDOM2.flushSync(() => {
              setViewportInert(false);
            });
            const elementToFocus = afterInsideRef.current || triggerElement;
            elementToFocus?.focus();
          } else {
            let nextTabbable = getNextTabbable(triggerElement);
            if (nested && !positionerElement && referenceElement && nextTabbable && contains(referenceElement, nextTabbable)) {
              nextTabbable = getTabbableAfterElement(afterInsideRef.current);
            }
            nextTabbable?.focus();
            if ((!nested || positionerElement) && !contains(rootRef.current, nextTabbable)) {
              setValue(null, createChangeEventDetails(exports_reason_parts.focusOut, event.nativeEvent));
            }
          }
        }
      })]
    })]
  });
});
if (true)
  NavigationMenuTrigger.displayName = "NavigationMenuTrigger";
function getPlacementFromElements(domReferenceElement, floatingElement) {
  const referenceRect = domReferenceElement.getBoundingClientRect();
  const floatingRect = floatingElement.getBoundingClientRect();
  const referenceCenterX = referenceRect.left + referenceRect.width / 2;
  const referenceCenterY = referenceRect.top + referenceRect.height / 2;
  const floatingCenterX = floatingRect.left + floatingRect.width / 2;
  const floatingCenterY = floatingRect.top + floatingRect.height / 2;
  const deltaX = floatingCenterX - referenceCenterX;
  const deltaY = floatingCenterY - referenceCenterY;
  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    return deltaX >= 0 ? "right" : "left";
  }
  return deltaY >= 0 ? "bottom" : "top";
}
function getHandleCloseContext(domReferenceElement, floatingElement, nodeId) {
  return {
    placement: getPlacementFromElements(domReferenceElement, floatingElement),
    elements: {
      domReference: domReferenceElement,
      floating: floatingElement
    },
    nodeId
  };
}
// node_modules/@base-ui/react/esm/navigation-menu/portal/NavigationMenuPortal.js
import * as React10 from "react";

// node_modules/@base-ui/react/esm/navigation-menu/portal/NavigationMenuPortalContext.js
import * as React9 from "react";
"use client";
var NavigationMenuPortalContext = /* @__PURE__ */ React9.createContext(undefined);
if (true)
  NavigationMenuPortalContext.displayName = "NavigationMenuPortalContext";
function useNavigationMenuPortalContext() {
  const value = React9.useContext(NavigationMenuPortalContext);
  if (value === undefined) {
    throw new Error("Base UI: <NavigationMenu.Portal> is missing.");
  }
  return value;
}

// node_modules/@base-ui/react/esm/navigation-menu/portal/NavigationMenuPortal.js
import { jsx as _jsx6 } from "react/jsx-runtime";
"use client";
var NavigationMenuPortal = /* @__PURE__ */ React10.forwardRef(function NavigationMenuPortal2(props, forwardedRef) {
  const {
    keepMounted = false,
    ...portalProps
  } = props;
  const {
    mounted
  } = useNavigationMenuRootContext();
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ _jsx6(NavigationMenuPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ _jsx6(FloatingPortal, {
      ref: forwardedRef,
      ...portalProps
    })
  });
});
if (true)
  NavigationMenuPortal.displayName = "NavigationMenuPortal";
// node_modules/@base-ui/react/esm/navigation-menu/positioner/NavigationMenuPositioner.js
import * as React12 from "react";
import * as ReactDOM3 from "react-dom";

// node_modules/@base-ui/react/esm/navigation-menu/positioner/NavigationMenuPositionerContext.js
import * as React11 from "react";
"use client";
var NavigationMenuPositionerContext = /* @__PURE__ */ React11.createContext(undefined);
if (true)
  NavigationMenuPositionerContext.displayName = "NavigationMenuPositionerContext";
function useNavigationMenuPositionerContext(optional = false) {
  const context = React11.useContext(NavigationMenuPositionerContext);
  if (!context && !optional) {
    throw new Error("Base UI: NavigationMenuPositionerContext is missing. NavigationMenuPositioner parts must be placed within <NavigationMenu.Positioner>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/navigation-menu/positioner/NavigationMenuPositioner.js
import { jsx as _jsx7 } from "react/jsx-runtime";
"use client";
var EMPTY_ROOT_CONTEXT = getEmptyRootContext();
var NavigationMenuPositioner = /* @__PURE__ */ React12.forwardRef(function NavigationMenuPositioner2(componentProps, forwardedRef) {
  const {
    open,
    mounted,
    positionerElement,
    setPositionerElement,
    floatingRootContext,
    nested,
    transitionStatus
  } = useNavigationMenuRootContext();
  const {
    className,
    render,
    anchor,
    positionMethod = "absolute",
    side = "bottom",
    align = "center",
    sideOffset = 0,
    alignOffset = 0,
    collisionBoundary = "clipping-ancestors",
    collisionPadding = 5,
    collisionAvoidance = nested ? POPUP_COLLISION_AVOIDANCE : DROPDOWN_COLLISION_AVOIDANCE,
    arrowPadding = 5,
    sticky = false,
    disableAnchorTracking = false,
    style,
    ...elementProps
  } = componentProps;
  const keepMounted = useNavigationMenuPortalContext();
  const nodeId = useNavigationMenuTreeContext();
  const resizeTimeout = useTimeout();
  const [instant, setInstant] = React12.useState(false);
  const positionerRef = React12.useRef(null);
  const prevTriggerElementRef = React12.useRef(null);
  React12.useEffect(() => {
    if (!positionerElement) {
      return;
    }
    function onFocus(event) {
      if (positionerElement && isOutsideEvent(event)) {
        const focusing = event.type === "focusin";
        const manageFocus = focusing ? enableFocusInside : disableFocusInside;
        manageFocus(positionerElement);
      }
    }
    return mergeCleanups(addEventListener(positionerElement, "focusin", onFocus, true), addEventListener(positionerElement, "focusout", onFocus, true));
  }, [positionerElement]);
  const domReference = (floatingRootContext || EMPTY_ROOT_CONTEXT).useState("domReferenceElement");
  const positioning = useAnchorPositioning({
    anchor: anchor ?? domReference ?? prevTriggerElementRef,
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
    floatingRootContext,
    collisionAvoidance,
    nodeId,
    adaptiveOrigin
  });
  const state = {
    open,
    side: positioning.side,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden,
    instant
  };
  React12.useEffect(() => {
    if (!open) {
      return;
    }
    function handleResize() {
      ReactDOM3.flushSync(() => {
        setInstant(true);
      });
      resizeTimeout.start(100, () => {
        setInstant(false);
      });
    }
    const win = getWindow(positionerElement);
    return addEventListener(win, "resize", handleResize);
  }, [open, resizeTimeout, positionerElement]);
  const element = usePositioner(componentProps, state, {
    styles: positioning.positionerStyles,
    transitionStatus,
    props: elementProps,
    refs: [forwardedRef, setPositionerElement, positionerRef],
    hidden: !mounted,
    inert: !open
  });
  return /* @__PURE__ */ _jsx7(NavigationMenuPositionerContext.Provider, {
    value: positioning,
    children: element
  });
});
if (true)
  NavigationMenuPositioner.displayName = "NavigationMenuPositioner";
// node_modules/@base-ui/react/esm/navigation-menu/viewport/NavigationMenuViewport.js
import * as React13 from "react";
import { jsx as _jsx8, jsxs as _jsxs2 } from "react/jsx-runtime";
"use client";
var EMPTY_ROOT_CONTEXT2 = getEmptyRootContext();
function Guards({
  children
}) {
  const {
    beforeInsideRef,
    beforeOutsideRef,
    afterInsideRef,
    afterOutsideRef,
    positionerElement,
    viewportElement,
    floatingRootContext
  } = useNavigationMenuRootContext();
  const hasPositioner = Boolean(useNavigationMenuPositionerContext(true));
  const referenceElement = positionerElement || viewportElement;
  if (!floatingRootContext && !hasPositioner) {
    return children;
  }
  return /* @__PURE__ */ _jsxs2(React13.Fragment, {
    children: [/* @__PURE__ */ _jsx8(FocusGuard, {
      ref: beforeInsideRef,
      onFocus: (event) => {
        if (referenceElement && isOutsideEvent(event, referenceElement)) {
          getNextTabbable(referenceElement)?.focus();
        } else {
          beforeOutsideRef.current?.focus();
        }
      }
    }), children, /* @__PURE__ */ _jsx8(FocusGuard, {
      ref: afterInsideRef,
      onFocus: (event) => {
        if (referenceElement && isOutsideEvent(event, referenceElement)) {
          getPreviousTabbable(referenceElement)?.focus();
        } else {
          afterOutsideRef.current?.focus();
        }
      }
    })]
  });
}
var NavigationMenuViewport = /* @__PURE__ */ React13.forwardRef(function NavigationMenuViewport2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    children,
    id: idProp,
    ...elementProps
  } = componentProps;
  const id = useId(idProp);
  const {
    setViewportElement,
    setViewportTargetElement,
    floatingRootContext,
    prevTriggerElementRef,
    viewportInert,
    setViewportInert
  } = useNavigationMenuRootContext();
  const positioning = useNavigationMenuPositionerContext(true);
  const hasPositioner = Boolean(positioning);
  const domReference = (floatingRootContext || EMPTY_ROOT_CONTEXT2).useState("domReferenceElement");
  useIsoLayoutEffect(() => {
    if (domReference) {
      prevTriggerElementRef.current = domReference;
    }
  }, [domReference, prevTriggerElementRef]);
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, setViewportElement],
    props: [{
      id,
      onBlur(event) {
        const relatedTarget = event.relatedTarget;
        const currentTarget = event.currentTarget;
        if (relatedTarget && !contains(currentTarget, relatedTarget) && relatedTarget !== domReference) {
          setViewportInert(true);
        }
      },
      ...!hasPositioner && viewportInert && {
        inert: inertValue(true)
      },
      children: hasPositioner ? children : /* @__PURE__ */ _jsx8(Guards, {
        children: /* @__PURE__ */ _jsx8("div", {
          ref: setViewportTargetElement,
          children
        })
      })
    }, elementProps]
  });
  return hasPositioner ? /* @__PURE__ */ _jsx8(Guards, {
    children: element
  }) : element;
});
if (true)
  NavigationMenuViewport.displayName = "NavigationMenuViewport";
// node_modules/@base-ui/react/esm/navigation-menu/backdrop/NavigationMenuBackdrop.js
import * as React14 from "react";
"use client";
var stateAttributesMapping2 = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
var NavigationMenuBackdrop = /* @__PURE__ */ React14.forwardRef(function NavigationMenuBackdrop2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    open,
    mounted,
    transitionStatus
  } = useNavigationMenuRootContext();
  const state = {
    open,
    transitionStatus
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      role: "presentation",
      hidden: !mounted,
      style: {
        userSelect: "none",
        WebkitUserSelect: "none"
      }
    }, elementProps],
    stateAttributesMapping: stateAttributesMapping2
  });
  return element;
});
if (true)
  NavigationMenuBackdrop.displayName = "NavigationMenuBackdrop";
// node_modules/@base-ui/react/esm/navigation-menu/popup/NavigationMenuPopup.js
import * as React15 from "react";
"use client";
var stateAttributesMapping3 = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
var NavigationMenuPopup = /* @__PURE__ */ React15.forwardRef(function NavigationMenuPopup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    ...elementProps
  } = componentProps;
  const {
    open,
    transitionStatus,
    setPopupElement
  } = useNavigationMenuRootContext();
  const positioning = useNavigationMenuPositionerContext();
  const direction = useDirection();
  const id = useBaseUiId(idProp);
  const state = {
    open,
    transitionStatus,
    side: positioning.side,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden
  };
  let isOriginSide = positioning.side === "top";
  let isPhysicalLeft = positioning.side === "left";
  if (direction === "rtl") {
    isOriginSide = isOriginSide || positioning.side === "inline-end";
    isPhysicalLeft = isPhysicalLeft || positioning.side === "inline-end";
  } else {
    isOriginSide = isOriginSide || positioning.side === "inline-start";
    isPhysicalLeft = isPhysicalLeft || positioning.side === "inline-start";
  }
  const element = useRenderElement("nav", componentProps, {
    state,
    ref: [forwardedRef, setPopupElement],
    props: [{
      id,
      tabIndex: -1,
      style: isOriginSide ? {
        position: "absolute",
        [positioning.side === "top" ? "bottom" : "top"]: "0",
        [isPhysicalLeft ? "right" : "left"]: "0"
      } : {}
    }, elementProps],
    stateAttributesMapping: stateAttributesMapping3
  });
  return element;
});
if (true)
  NavigationMenuPopup.displayName = "NavigationMenuPopup";
// node_modules/@base-ui/react/esm/navigation-menu/arrow/NavigationMenuArrow.js
import * as React16 from "react";
"use client";
var NavigationMenuArrow = /* @__PURE__ */ React16.forwardRef(function NavigationMenuArrow2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    open
  } = useNavigationMenuRootContext();
  const {
    arrowRef,
    side,
    align,
    arrowUncentered,
    arrowStyles
  } = useNavigationMenuPositionerContext();
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
  NavigationMenuArrow.displayName = "NavigationMenuArrow";
// node_modules/@base-ui/react/esm/navigation-menu/link/NavigationMenuLink.js
import * as React17 from "react";
import { jsx as _jsx9 } from "react/jsx-runtime";
"use client";
var NavigationMenuLink = /* @__PURE__ */ React17.forwardRef(function NavigationMenuLink2(componentProps, forwardedRef) {
  const {
    className,
    render,
    active = false,
    closeOnClick = false,
    style,
    ...elementProps
  } = componentProps;
  const {
    setValue,
    popupElement,
    positionerElement,
    rootRef
  } = useNavigationMenuRootContext();
  const nodeId = useNavigationMenuTreeContext();
  const tree = useFloatingTree();
  const state = {
    active
  };
  const defaultProps = {
    "aria-current": active ? "page" : undefined,
    tabIndex: undefined,
    onClick(event) {
      if (closeOnClick) {
        setValue(null, createChangeEventDetails(exports_reason_parts.linkPress, event.nativeEvent));
      }
    },
    onBlur(event) {
      if (positionerElement && popupElement && isOutsideMenuEvent({
        currentTarget: event.currentTarget,
        relatedTarget: event.relatedTarget
      }, {
        popupElement,
        rootRef,
        tree,
        nodeId
      })) {
        setValue(null, createChangeEventDetails(exports_reason_parts.focusOut, event.nativeEvent));
      }
    }
  };
  return /* @__PURE__ */ _jsx9(CompositeItem, {
    tag: "a",
    render,
    className,
    style,
    state,
    refs: [forwardedRef],
    props: [defaultProps, elementProps]
  });
});
if (true)
  NavigationMenuLink.displayName = "NavigationMenuLink";
// node_modules/@base-ui/react/esm/navigation-menu/icon/NavigationMenuIcon.js
import * as React18 from "react";
"use client";
var NavigationMenuIcon = /* @__PURE__ */ React18.forwardRef(function NavigationMenuIcon2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    value: itemValue
  } = useNavigationMenuItemContext();
  const {
    open,
    value
  } = useNavigationMenuRootContext();
  const isActiveItem = open && value === itemValue;
  const state = {
    open: isActiveItem
  };
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      "aria-hidden": true,
      children: "▼"
    }, elementProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
  return element;
});
if (true)
  NavigationMenuIcon.displayName = "NavigationMenuIcon";
export {
  exports_index_parts as NavigationMenu
};
