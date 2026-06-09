import {
  useControlled
} from "./_chunk-9x63vfqj.js";
import {
  addEventListener
} from "./_chunk-ase0ydtt.js";
import {
  useValueAsRef
} from "./_chunk-6kqramh9.js";
import {
  createChangeEventDetails,
  exports_reason_parts
} from "./_chunk-e56mpvk1.js";
import {
  useBaseUiId
} from "./_chunk-wdqynnjf.js";
import {
  TransitionStatusDataAttributes,
  useAnimationsFinished,
  useOpenChangeComplete,
  useTransitionStatus
} from "./_chunk-e13rsb6b.js";
import {
  AnimationFrame
} from "./_chunk-8a9vv8am.js";
import {
  getWindow
} from "./_chunk-000kmre8.js";
import {
  useStableCallback
} from "./_chunk-cwvtvwc7.js";
import {
  useIsoLayoutEffect
} from "./_chunk-5tze5c8q.js";
import {
  useMergedRefs,
  warn
} from "./_chunk-x8xehj6d.js";

// node_modules/@base-ui/react/esm/collapsible/root/useCollapsibleRoot.js
import * as React from "react";
"use client";
function useCollapsibleRoot(parameters) {
  const {
    open: openParam,
    defaultOpen,
    onOpenChange,
    disabled
  } = parameters;
  const [open, setOpen] = useControlled({
    controlled: openParam,
    default: defaultOpen,
    name: "Collapsible",
    state: "open"
  });
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open, true, true);
  const defaultPanelId = useBaseUiId();
  const [panelIdState, setPanelIdState] = React.useState();
  const panelId = panelIdState ?? defaultPanelId;
  const handleTrigger = useStableCallback((event) => {
    const nextOpen = !open;
    const eventDetails = createChangeEventDetails(exports_reason_parts.triggerPress, event.nativeEvent);
    onOpenChange(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setOpen(nextOpen);
  });
  return React.useMemo(() => ({
    disabled,
    handleTrigger,
    mounted,
    open,
    panelId,
    setMounted,
    setOpen,
    setPanelIdState,
    transitionStatus
  }), [disabled, handleTrigger, mounted, open, panelId, setMounted, setOpen, setPanelIdState, transitionStatus]);
}

// node_modules/@base-ui/react/esm/collapsible/root/CollapsibleRootContext.js
import * as React2 from "react";
"use client";
var CollapsibleRootContext = /* @__PURE__ */ React2.createContext(undefined);
if (true)
  CollapsibleRootContext.displayName = "CollapsibleRootContext";
function useCollapsibleRootContext() {
  const context = React2.useContext(CollapsibleRootContext);
  if (context === undefined) {
    throw new Error("Base UI: CollapsibleRootContext is missing. Collapsible parts must be placed within <Collapsible.Root>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/collapsible/panel/CollapsiblePanelDataAttributes.js
var CollapsiblePanelDataAttributes = function(CollapsiblePanelDataAttributes2) {
  CollapsiblePanelDataAttributes2["open"] = "data-open";
  CollapsiblePanelDataAttributes2["closed"] = "data-closed";
  CollapsiblePanelDataAttributes2[CollapsiblePanelDataAttributes2["startingStyle"] = TransitionStatusDataAttributes.startingStyle] = "startingStyle";
  CollapsiblePanelDataAttributes2[CollapsiblePanelDataAttributes2["endingStyle"] = TransitionStatusDataAttributes.endingStyle] = "endingStyle";
  return CollapsiblePanelDataAttributes2;
}({});

// node_modules/@base-ui/react/esm/collapsible/trigger/CollapsibleTriggerDataAttributes.js
var CollapsibleTriggerDataAttributes = /* @__PURE__ */ function(CollapsibleTriggerDataAttributes2) {
  CollapsibleTriggerDataAttributes2["panelOpen"] = "data-panel-open";
  return CollapsibleTriggerDataAttributes2;
}({});

// node_modules/@base-ui/react/esm/utils/collapsibleOpenStateMapping.js
var PANEL_OPEN_HOOK = {
  [CollapsiblePanelDataAttributes.open]: ""
};
var PANEL_CLOSED_HOOK = {
  [CollapsiblePanelDataAttributes.closed]: ""
};
var triggerOpenStateMapping = {
  open(value) {
    if (value) {
      return {
        [CollapsibleTriggerDataAttributes.panelOpen]: ""
      };
    }
    return null;
  }
};
var collapsibleOpenStateMapping = {
  open(value) {
    if (value) {
      return PANEL_OPEN_HOOK;
    }
    return PANEL_CLOSED_HOOK;
  }
};

// node_modules/@base-ui/react/esm/collapsible/panel/useCollapsiblePanel.js
import * as React3 from "react";
"use client";
var EMPTY_DIMENSIONS = {
  height: undefined,
  width: undefined
};
function useCollapsiblePanel(parameters) {
  const {
    externalRef,
    hiddenUntilFound,
    id: idParam,
    keepMounted,
    mounted,
    onOpenChange,
    open,
    setMounted,
    setOpen,
    transitionStatus
  } = parameters;
  const panelRef = React3.useRef(null);
  const animationTypeRef = React3.useRef(null);
  const [dimensions, setDimensionsUnwrapped] = React3.useState(EMPTY_DIMENSIONS);
  const lastMeasuredDimensionsRef = React3.useRef(EMPTY_DIMENSIONS);
  const shouldSkipNextOpenRef = React3.useRef(false);
  const shouldPreventMountAnimationRef = React3.useRef(open);
  const shouldPreventActivityResumeAnimationRef = React3.useRef(false);
  const [forcePanelIdle, setForcePanelIdle] = React3.useState(false);
  const pendingTemporaryStyleRestoreRef = React3.useRef(null);
  const mergedPanelRef = useMergedRefs(externalRef, panelRef);
  const latestStateRef = useValueAsRef({
    mounted,
    open
  });
  const runOnceCloseAnimationsFinish = useAnimationsFinished(panelRef, false, false);
  const hidden = !open && !mounted;
  const panelTransitionStatus = forcePanelIdle ? "idle" : transitionStatus;
  const shouldPreventOpenAnimation = open && (shouldPreventMountAnimationRef.current || shouldPreventActivityResumeAnimationRef.current);
  const renderedDimensions = !open && mounted && animationTypeRef.current === "css-animation" && dimensions.height === undefined && dimensions.width === undefined ? lastMeasuredDimensionsRef.current : dimensions;
  const shouldPersistHiddenTransitionStyles = hiddenUntilFound && hidden && animationTypeRef.current !== "css-animation";
  const setDimensions = useStableCallback((nextDimensions, shouldCacheMeasurement = true) => {
    if (shouldCacheMeasurement) {
      lastMeasuredDimensionsRef.current = nextDimensions;
    }
    setDimensionsUnwrapped(nextDimensions);
  });
  const restorePendingTemporaryStyle = useStableCallback(() => {
    pendingTemporaryStyleRestoreRef.current?.();
    pendingTemporaryStyleRestoreRef.current = null;
  });
  const setPendingTemporaryStyleRestore = useStableCallback((restore) => {
    restorePendingTemporaryStyle();
    pendingTemporaryStyleRestoreRef.current = () => {
      pendingTemporaryStyleRestoreRef.current = null;
      restore();
    };
  });
  const markActivityResumeAnimationSuppressed = useStableCallback(() => {
    if (open && mounted && animationTypeRef.current === "css-animation") {
      shouldPreventActivityResumeAnimationRef.current = true;
    }
  });
  useIsoLayoutEffect(() => {
    if (!forcePanelIdle || transitionStatus === "starting") {
      return;
    }
    setForcePanelIdle(false);
  }, [forcePanelIdle, transitionStatus]);
  React3.useEffect(() => {
    return () => {
      markActivityResumeAnimationSuppressed();
      restorePendingTemporaryStyle();
    };
  }, [markActivityResumeAnimationSuppressed, restorePendingTemporaryStyle]);
  useIsoLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }
    if (!open && pendingTemporaryStyleRestoreRef.current) {
      restorePendingTemporaryStyle();
    }
    const animationType = getAnimationType(panel, shouldPreventOpenAnimation);
    animationTypeRef.current = animationType;
    if (open && transitionStatus === "idle" && shouldPreventMountAnimationRef.current && animationType === "css-animation") {
      lastMeasuredDimensionsRef.current = getDimensions(panel);
      return;
    }
    if (open && transitionStatus === "starting") {
      const skipNextOpen = shouldSkipNextOpenRef.current;
      shouldSkipNextOpenRef.current = false;
      if (animationType === "none") {
        setDimensions(getDimensions(panel));
        setForcePanelIdle(true);
        return;
      }
      if (animationType === "css-transition") {
        const restoreLayoutStyles = resetLayoutStyles(panel);
        setDimensions(getDimensions(panel));
        if (!skipNextOpen) {
          return restoreLayoutStyles;
        }
        const restoreTransitionDuration = setTemporaryStyle(panel, "transition-duration", "0s");
        setPendingTemporaryStyleRestore(restoreTransitionDuration);
        setForcePanelIdle(true);
        return restoreLayoutStyles;
      }
      if (animationType === "css-animation") {
        setDimensions(getDimensions(panel));
        if (!skipNextOpen) {
          const restoreAnimationName2 = setTemporaryStyle(panel, "animation-name", "none");
          restoreAnimationName2();
          return;
        }
        const restoreAnimationName = setTemporaryStyle(panel, "animation-name", "none");
        const restoreAnimationDuration = setTemporaryStyle(panel, "animation-duration", "0s");
        restoreAnimationName();
        setPendingTemporaryStyleRestore(restoreAnimationDuration);
        setForcePanelIdle(true);
        return;
      }
    }
    if (!open && mounted && (transitionStatus === "idle" || transitionStatus === "starting")) {
      if (animationType === "none") {
        setDimensions(EMPTY_DIMENSIONS, false);
        setMounted(false);
        return;
      }
      if (animationType === "css-animation") {
        shouldPreventMountAnimationRef.current = false;
        shouldPreventActivityResumeAnimationRef.current = false;
      }
      setDimensions(getDimensions(panel));
      return;
    }
    if (transitionStatus !== "ending") {
      return;
    }
    if (animationType === "none") {
      setMounted(false);
      return;
    }
    const nextDimensions = getDimensions(panel);
    const hasMeasuredSize = (nextDimensions.height ?? 0) > 0 || (nextDimensions.width ?? 0) > 0;
    if (!hasMeasuredSize) {
      setMounted(false);
      return;
    }
    setDimensions(nextDimensions);
    if (animationType === "css-animation") {
      const restoreAnimationName = setTemporaryStyle(panel, "animation-name", "none");
      restoreAnimationName();
    }
    return;
  }, [mounted, open, restorePendingTemporaryStyle, setDimensions, setMounted, setPendingTemporaryStyleRestore, shouldPreventOpenAnimation, transitionStatus]);
  useOpenChangeComplete({
    enabled: open && mounted && panelTransitionStatus === "idle",
    open: true,
    ref: panelRef,
    onComplete() {
      if (!open) {
        return;
      }
      setDimensions(EMPTY_DIMENSIONS, false);
    }
  });
  React3.useEffect(() => {
    if (open || !mounted || panelTransitionStatus !== "ending") {
      return;
    }
    const panel = panelRef.current;
    if (!panel) {
      return;
    }
    const abortController = new AbortController;
    let endingStyleFrame = -1;
    function handleComplete() {
      if (latestStateRef.current.open) {
        return;
      }
      setMounted(false);
      setDimensions(EMPTY_DIMENSIONS, false);
    }
    endingStyleFrame = AnimationFrame.request(() => {
      if (!abortController.signal.aborted) {
        runOnceCloseAnimationsFinish(handleComplete, abortController.signal);
      }
    });
    return () => {
      AnimationFrame.cancel(endingStyleFrame);
      abortController.abort();
    };
  }, [latestStateRef, mounted, open, panelTransitionStatus, runOnceCloseAnimationsFinish, setDimensions, setMounted]);
  useIsoLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel || !hiddenUntilFound || !hidden) {
      return;
    }
    panel.setAttribute("hidden", "until-found");
  }, [hidden, hiddenUntilFound]);
  React3.useEffect(function registerBeforeMatchListener() {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }
    function handleBeforeMatch(event) {
      shouldSkipNextOpenRef.current = true;
      setOpen(true);
      onOpenChange(true, createChangeEventDetails(exports_reason_parts.none, event));
    }
    return addEventListener(panel, "beforematch", handleBeforeMatch);
  }, [onOpenChange, setOpen]);
  const shouldRender = keepMounted || hiddenUntilFound || mounted || open;
  return {
    height: renderedDimensions.height,
    props: {
      ...shouldPersistHiddenTransitionStyles ? {
        [CollapsiblePanelDataAttributes.startingStyle]: ""
      } : undefined,
      hidden,
      id: idParam
    },
    ref: mergedPanelRef,
    shouldPreventOpenAnimation,
    shouldRender,
    transitionStatus: panelTransitionStatus,
    width: renderedDimensions.width
  };
}
function getDimensions(element) {
  return {
    height: element.scrollHeight,
    width: element.scrollWidth
  };
}
function getAnimationType(element, hasSuppressedMountAnimation = false) {
  const panelStyles = getWindow(element).getComputedStyle(element);
  const hasAnimation = (panelStyles.animationName.split(",").map((name) => name.trim()).some((name) => name !== "" && name !== "none") || hasSuppressedMountAnimation) && hasNonZeroDuration(panelStyles.animationDuration);
  const hasTransition = hasNonZeroDuration(panelStyles.transitionDuration);
  if (hasAnimation && hasTransition) {
    if (true) {
      warn("CSS transitions and CSS animations both detected on Collapsible or Accordion panel.", "Only one of either animation type should be used.");
    }
    return "css-transition";
  }
  if (hasTransition) {
    return "css-transition";
  }
  if (hasAnimation) {
    return "css-animation";
  }
  return "none";
}
function hasNonZeroDuration(value) {
  return value.split(",").map((part) => part.trim()).some((part) => part !== "" && Number.parseFloat(part) > 0);
}
function setTemporaryStyle(element, property, value) {
  const previousValue = element.style.getPropertyValue(property);
  const previousPriority = element.style.getPropertyPriority(property);
  element.style.setProperty(property, value);
  return () => {
    if (previousValue === "") {
      element.style.removeProperty(property);
      return;
    }
    element.style.setProperty(property, previousValue, previousPriority);
  };
}
function resetLayoutStyles(element) {
  const originalLayoutStyles = {
    "justify-content": element.style.justifyContent,
    "align-items": element.style.alignItems,
    "align-content": element.style.alignContent,
    "justify-items": element.style.justifyItems
  };
  Object.keys(originalLayoutStyles).forEach((key) => {
    element.style.setProperty(key, "initial", "important");
  });
  function restoreLayoutStyles() {
    Object.entries(originalLayoutStyles).forEach(([key, value]) => {
      if (value === "") {
        element.style.removeProperty(key);
        return;
      }
      element.style.setProperty(key, value);
    });
  }
  const frame = AnimationFrame.request(restoreLayoutStyles);
  return () => {
    AnimationFrame.cancel(frame);
    restoreLayoutStyles();
  };
}

export { useCollapsibleRoot, CollapsibleRootContext, useCollapsibleRootContext, triggerOpenStateMapping, collapsibleOpenStateMapping, useCollapsiblePanel };
