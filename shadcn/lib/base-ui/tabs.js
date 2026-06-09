/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  useIsHydrating
} from "./_chunk-p0e2qacz.js";
import {
  useCSPContext
} from "./_chunk-watha94s.js";
import {
  CompositeRoot
} from "./_chunk-cdj8cpx5.js";
import {
  ACTIVE_COMPOSITE_ITEM
} from "./_chunk-5tt5hk59.js";
import"./_chunk-dzvjwv25.js";
import {
  useCompositeItem
} from "./_chunk-j3qkyd10.js";
import {
  getCssDimensions
} from "./_chunk-xcqbtm2f.js";
import {
  useCompositeListItem
} from "./_chunk-3enq1vat.js";
import"./_chunk-26cc610z.js";
import {
  CompositeList
} from "./_chunk-j29xjete.js";
import"./_chunk-3xpke33f.js";
import"./_chunk-gy0bpkmx.js";
import {
  useControlled
} from "./_chunk-9x63vfqj.js";
import {
  inertValue
} from "./_chunk-3cpd1vjz.js";
import"./_chunk-1vw45v38.js";
import {
  activeElement,
  contains
} from "./_chunk-cgptgywc.js";
import"./_chunk-pv7b791x.js";
import"./_chunk-kw8nnq00.js";
import"./_chunk-rrh8rt4v.js";
import"./_chunk-x11e1k9r.js";
import {
  ownerDocument
} from "./_chunk-451nqgsa.js";
import {
  createChangeEventDetails,
  exports_reason_parts
} from "./_chunk-e56mpvk1.js";
import {
  useBaseUiId
} from "./_chunk-wdqynnjf.js";
import {
  TransitionStatusDataAttributes,
  transitionStatusMapping,
  useOpenChangeComplete,
  useTransitionStatus
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
  EMPTY_ARRAY,
  useRenderElement
} from "./_chunk-x8xehj6d.js";
import {
  __export
} from "./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/tabs/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  Tab: () => TabsTab,
  Root: () => TabsRoot,
  Panel: () => TabsPanel,
  List: () => TabsList,
  Indicator: () => TabsIndicator
});

// node_modules/@base-ui/react/esm/tabs/root/TabsRoot.js
import * as React2 from "react";

// node_modules/@base-ui/react/esm/tabs/root/TabsRootContext.js
import * as React from "react";
"use client";
var TabsRootContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  TabsRootContext.displayName = "TabsRootContext";
function useTabsRootContext() {
  const context = React.useContext(TabsRootContext);
  if (context === undefined) {
    throw new Error("Base UI: TabsRootContext is missing. Tabs parts must be placed within <Tabs.Root>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/tabs/root/TabsRootDataAttributes.js
var TabsRootDataAttributes = /* @__PURE__ */ function(TabsRootDataAttributes2) {
  TabsRootDataAttributes2["activationDirection"] = "data-activation-direction";
  TabsRootDataAttributes2["orientation"] = "data-orientation";
  return TabsRootDataAttributes2;
}({});

// node_modules/@base-ui/react/esm/tabs/root/stateAttributesMapping.js
var tabsStateAttributesMapping = {
  tabActivationDirection: (dir) => ({
    [TabsRootDataAttributes.activationDirection]: dir
  })
};

// node_modules/@base-ui/react/esm/tabs/root/TabsRoot.js
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
var TabsRoot = /* @__PURE__ */ React2.forwardRef(function TabsRoot2(componentProps, forwardedRef) {
  const {
    className,
    defaultValue: defaultValueProp = 0,
    onValueChange: onValueChangeProp,
    orientation = "horizontal",
    render,
    value: valueProp,
    style,
    ...elementProps
  } = componentProps;
  const hasExplicitDefaultValueProp = componentProps.defaultValue !== undefined;
  const tabPanelRefs = React2.useRef([]);
  const [mountedTabPanels, setMountedTabPanels] = React2.useState(() => new Map);
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValueProp,
    name: "Tabs",
    state: "value"
  });
  const isControlled = valueProp !== undefined;
  const [tabMap, setTabMap] = React2.useState(() => new Map);
  const getTabElementBySelectedValue = React2.useCallback((selectedValue) => {
    if (selectedValue === undefined) {
      return null;
    }
    for (const [tabElement, tabMetadata] of tabMap.entries()) {
      if (tabMetadata != null && selectedValue === (tabMetadata.value ?? tabMetadata.index)) {
        return tabElement;
      }
    }
    return null;
  }, [tabMap]);
  const [activationDirectionState, setActivationDirectionState] = React2.useState(() => ({
    previousValue: value,
    tabActivationDirection: "none"
  }));
  const {
    previousValue,
    tabActivationDirection: committedTabActivationDirection
  } = activationDirectionState;
  let tabActivationDirection = committedTabActivationDirection;
  let directionComputationIncomplete = false;
  if (previousValue !== value) {
    tabActivationDirection = computeActivationDirection(previousValue, value, orientation, tabMap);
    directionComputationIncomplete = previousValue != null && value != null && getTabElementBySelectedValue(value) == null;
  }
  const nextPreviousValue = directionComputationIncomplete ? previousValue : value;
  const shouldSyncActivationDirectionState = previousValue !== nextPreviousValue || committedTabActivationDirection !== tabActivationDirection;
  useIsoLayoutEffect(() => {
    if (!shouldSyncActivationDirectionState) {
      return;
    }
    setActivationDirectionState({
      previousValue: nextPreviousValue,
      tabActivationDirection
    });
  }, [nextPreviousValue, shouldSyncActivationDirectionState, tabActivationDirection]);
  const onValueChange = useStableCallback((newValue, eventDetails) => {
    const activationDirection = computeActivationDirection(value, newValue, orientation, tabMap);
    eventDetails.activationDirection = activationDirection;
    onValueChangeProp?.(newValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValue(newValue);
  });
  const notifyAutomaticValueChange = useStableCallback((nextValue, reason) => {
    onValueChangeProp?.(nextValue, createChangeEventDetails(reason, undefined, undefined, {
      activationDirection: "none"
    }));
  });
  const registerMountedTabPanel = useStableCallback((panelValue, panelId) => {
    setMountedTabPanels((prev) => {
      if (prev.get(panelValue) === panelId) {
        return prev;
      }
      const next = new Map(prev);
      next.set(panelValue, panelId);
      return next;
    });
  });
  const unregisterMountedTabPanel = useStableCallback((panelValue, panelId) => {
    setMountedTabPanels((prev) => {
      if (!prev.has(panelValue) || prev.get(panelValue) !== panelId) {
        return prev;
      }
      const next = new Map(prev);
      next.delete(panelValue);
      return next;
    });
  });
  const getTabPanelIdByValue = React2.useCallback((tabValue) => {
    return mountedTabPanels.get(tabValue);
  }, [mountedTabPanels]);
  const getTabIdByPanelValue = React2.useCallback((tabPanelValue) => {
    for (const tabMetadata of tabMap.values()) {
      if (tabPanelValue === tabMetadata?.value) {
        return tabMetadata?.id;
      }
    }
    return;
  }, [tabMap]);
  const tabsContextValue = React2.useMemo(() => ({
    getTabElementBySelectedValue,
    getTabIdByPanelValue,
    getTabPanelIdByValue,
    onValueChange,
    orientation,
    registerMountedTabPanel,
    setTabMap,
    unregisterMountedTabPanel,
    tabActivationDirection,
    value
  }), [getTabElementBySelectedValue, getTabIdByPanelValue, getTabPanelIdByValue, onValueChange, orientation, registerMountedTabPanel, setTabMap, unregisterMountedTabPanel, tabActivationDirection, value]);
  const selectedTabMetadata = React2.useMemo(() => {
    for (const tabMetadata of tabMap.values()) {
      if (tabMetadata != null && tabMetadata.value === value) {
        return tabMetadata;
      }
    }
    return;
  }, [tabMap, value]);
  const firstEnabledTabValue = React2.useMemo(() => {
    for (const tabMetadata of tabMap.values()) {
      if (tabMetadata != null && !tabMetadata.disabled) {
        return tabMetadata.value;
      }
    }
    return;
  }, [tabMap]);
  const shouldNotifyInitialValueChangeRef = React2.useRef(!hasExplicitDefaultValueProp);
  const shouldHonorDisabledDefaultValueRef = React2.useRef(hasExplicitDefaultValueProp);
  const didRegisterTabsRef = React2.useRef(false);
  useIsoLayoutEffect(() => {
    if (isControlled) {
      return;
    }
    function commitAutomaticValueChange(fallbackValue, fallbackReason) {
      setValue(fallbackValue);
      setActivationDirectionState((prev) => {
        if (prev.previousValue === fallbackValue && prev.tabActivationDirection === "none") {
          return prev;
        }
        return {
          previousValue: fallbackValue,
          tabActivationDirection: "none"
        };
      });
      notifyAutomaticValueChange(fallbackValue, fallbackReason);
      shouldNotifyInitialValueChangeRef.current = false;
    }
    if (tabMap.size === 0) {
      if (!didRegisterTabsRef.current || value === null) {
        return;
      }
      commitAutomaticValueChange(null, exports_reason_parts.missing);
      return;
    }
    didRegisterTabsRef.current = true;
    const selectionIsDisabled = selectedTabMetadata?.disabled;
    const selectionIsMissing = selectedTabMetadata == null && value !== null;
    if (!selectionIsDisabled && value === defaultValueProp) {
      shouldHonorDisabledDefaultValueRef.current = false;
    }
    if (shouldHonorDisabledDefaultValueRef.current && selectionIsDisabled && value === defaultValueProp) {
      return;
    }
    const shouldNotifyInitialValueChange = shouldNotifyInitialValueChangeRef.current;
    if (selectionIsDisabled || selectionIsMissing) {
      const fallbackValue = firstEnabledTabValue ?? null;
      if (value === fallbackValue) {
        shouldNotifyInitialValueChangeRef.current = false;
        return;
      }
      let fallbackReason = exports_reason_parts.missing;
      if (shouldNotifyInitialValueChange) {
        fallbackReason = exports_reason_parts.initial;
      } else if (selectionIsDisabled) {
        fallbackReason = exports_reason_parts.disabled;
      }
      commitAutomaticValueChange(fallbackValue, fallbackReason);
      return;
    }
    if (shouldNotifyInitialValueChange && selectedTabMetadata != null) {
      notifyAutomaticValueChange(value, exports_reason_parts.initial);
      shouldNotifyInitialValueChangeRef.current = false;
    }
  }, [defaultValueProp, firstEnabledTabValue, isControlled, notifyAutomaticValueChange, selectedTabMetadata, setValue, tabMap, value]);
  const state = {
    orientation,
    tabActivationDirection
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: tabsStateAttributesMapping
  });
  return /* @__PURE__ */ _jsx(TabsRootContext.Provider, {
    value: tabsContextValue,
    children: /* @__PURE__ */ _jsx(CompositeList, {
      elementsRef: tabPanelRefs,
      children: element
    })
  });
});
if (true)
  TabsRoot.displayName = "TabsRoot";
function computeActivationDirection(oldValue, newValue, orientation, tabMap) {
  if (oldValue == null || newValue == null) {
    return "none";
  }
  let oldTab = null;
  let newTab = null;
  for (const [tabElement, tabMetadata] of tabMap.entries()) {
    if (tabMetadata == null) {
      continue;
    }
    const tabValue = tabMetadata.value ?? tabMetadata.index;
    if (oldValue === tabValue) {
      oldTab = tabElement;
    }
    if (newValue === tabValue) {
      newTab = tabElement;
    }
    if (oldTab != null && newTab != null) {
      break;
    }
  }
  if (oldTab == null || newTab == null) {
    if (oldTab !== newTab && (typeof oldValue === "number" || typeof oldValue === "string") && typeof oldValue === typeof newValue) {
      if (orientation === "horizontal") {
        return newValue > oldValue ? "right" : "left";
      }
      return newValue > oldValue ? "down" : "up";
    }
    return "none";
  }
  const oldRect = oldTab.getBoundingClientRect();
  const newRect = newTab.getBoundingClientRect();
  if (orientation === "horizontal") {
    if (newRect.left < oldRect.left) {
      return "left";
    }
    if (newRect.left > oldRect.left) {
      return "right";
    }
  } else {
    if (newRect.top < oldRect.top) {
      return "up";
    }
    if (newRect.top > oldRect.top) {
      return "down";
    }
  }
  return "none";
}
// node_modules/@base-ui/react/esm/tabs/tab/TabsTab.js
import * as React4 from "react";

// node_modules/@base-ui/react/esm/tabs/list/TabsListContext.js
import * as React3 from "react";
"use client";
var TabsListContext = /* @__PURE__ */ React3.createContext(undefined);
if (true)
  TabsListContext.displayName = "TabsListContext";
function useTabsListContext() {
  const context = React3.useContext(TabsListContext);
  if (context === undefined) {
    throw new Error("Base UI: TabsListContext is missing. TabsList parts must be placed within <Tabs.List>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/tabs/tab/TabsTab.js
"use client";
var TabsTab = /* @__PURE__ */ React4.forwardRef(function TabsTab2(componentProps, forwardedRef) {
  const {
    className,
    disabled = false,
    render,
    value,
    id: idProp,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const {
    value: activeTabValue,
    getTabPanelIdByValue,
    orientation
  } = useTabsRootContext();
  const {
    activateOnFocus,
    highlightedTabIndex,
    onTabActivation,
    registerTabResizeObserverElement,
    setHighlightedTabIndex,
    tabsListElement
  } = useTabsListContext();
  const id = useBaseUiId(idProp);
  const tabMetadata = React4.useMemo(() => ({
    disabled,
    id,
    value
  }), [disabled, id, value]);
  const {
    compositeProps,
    compositeRef,
    index
  } = useCompositeItem({
    metadata: tabMetadata
  });
  const active = value === activeTabValue;
  const isNavigatingRef = React4.useRef(false);
  const tabElementRef = React4.useRef(null);
  React4.useEffect(() => {
    const tabElement = tabElementRef.current;
    if (!tabElement) {
      return;
    }
    return registerTabResizeObserverElement(tabElement);
  }, [registerTabResizeObserverElement]);
  useIsoLayoutEffect(() => {
    if (isNavigatingRef.current) {
      isNavigatingRef.current = false;
      return;
    }
    if (!(active && index > -1 && highlightedTabIndex !== index)) {
      return;
    }
    const listElement = tabsListElement;
    if (listElement != null) {
      const activeEl = activeElement(ownerDocument(listElement));
      if (activeEl && contains(listElement, activeEl)) {
        return;
      }
    }
    if (!disabled) {
      setHighlightedTabIndex(index);
    }
  }, [active, index, highlightedTabIndex, setHighlightedTabIndex, disabled, tabsListElement]);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton,
    focusableWhenDisabled: true
  });
  const tabPanelId = getTabPanelIdByValue(value);
  const isPressingRef = React4.useRef(false);
  const isMainButtonRef = React4.useRef(false);
  function onClick(event) {
    if (active || disabled) {
      return;
    }
    onTabActivation(value, createChangeEventDetails(exports_reason_parts.none, event.nativeEvent, undefined, {
      activationDirection: "none"
    }));
  }
  function onFocus(event) {
    if (active) {
      return;
    }
    if (index > -1 && !disabled) {
      setHighlightedTabIndex(index);
    }
    if (disabled) {
      return;
    }
    if (activateOnFocus && (!isPressingRef.current || isPressingRef.current && isMainButtonRef.current)) {
      onTabActivation(value, createChangeEventDetails(exports_reason_parts.none, event.nativeEvent, undefined, {
        activationDirection: "none"
      }));
    }
  }
  function onPointerDown(event) {
    if (active || disabled) {
      return;
    }
    isPressingRef.current = true;
    function handlePointerUp() {
      isPressingRef.current = false;
      isMainButtonRef.current = false;
    }
    if (!event.button || event.button === 0) {
      isMainButtonRef.current = true;
      const doc = ownerDocument(event.currentTarget);
      doc.addEventListener("pointerup", handlePointerUp, {
        once: true
      });
    }
  }
  const state = {
    disabled,
    active,
    orientation
  };
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef, compositeRef, tabElementRef],
    props: [compositeProps, {
      role: "tab",
      "aria-controls": tabPanelId,
      "aria-selected": active,
      id,
      onClick,
      onFocus,
      onPointerDown,
      [ACTIVE_COMPOSITE_ITEM]: active ? "" : undefined,
      onKeyDownCapture() {
        isNavigatingRef.current = true;
      }
    }, elementProps, getButtonProps]
  });
  return element;
});
if (true)
  TabsTab.displayName = "TabsTab";
// node_modules/@base-ui/react/esm/tabs/indicator/TabsIndicator.js
import * as React6 from "react";

// node_modules/@base-ui/utils/esm/useForcedRerendering.js
import * as React5 from "react";
"use client";
function useForcedRerendering() {
  const [, setState] = React5.useState({});
  return React5.useCallback(() => {
    setState({});
  }, []);
}

// node_modules/@base-ui/react/esm/tabs/indicator/prehydrationScript.min.js
var script = '!function(){const t=document.currentScript.previousElementSibling;if(!t)return;const e=t.closest(\'[role="tablist"]\');if(!e)return;const i=e.querySelector("[data-active]");if(!i)return;if(0===i.offsetWidth||0===e.offsetWidth)return;let o=0,n=0,h=0,l=0,r=0,f=0;function s(t){const e=getComputedStyle(t);let i=parseFloat(e.width)||0,o=parseFloat(e.height)||0;return(Math.round(i)!==t.offsetWidth||Math.round(o)!==t.offsetHeight)&&(i=t.offsetWidth,o=t.offsetHeight),{width:i,height:o}}if(null!=i&&null!=e){const{width:t,height:c}=s(i),{width:u,height:d}=s(e),a=i.getBoundingClientRect(),g=e.getBoundingClientRect(),p=u>0?g.width/u:1,b=d>0?g.height/d:1;if(Math.abs(p)>Number.EPSILON&&Math.abs(b)>Number.EPSILON){const t=a.left-g.left,i=a.top-g.top;o=t/p+e.scrollLeft-e.clientLeft,h=i/b+e.scrollTop-e.clientTop}else o=i.offsetLeft,h=i.offsetTop;r=t,f=c,n=e.scrollWidth-o-r,l=e.scrollHeight-h-f}function c(e,i){t.style.setProperty(`--active-tab-${e}`,`${i}px`)}c("left",o),c("right",n),c("top",h),c("bottom",l),c("width",r),c("height",f),r>0&&f>0&&t.removeAttribute("hidden")}();';

// node_modules/@base-ui/react/esm/tabs/indicator/TabsIndicatorCssVars.js
var TabsIndicatorCssVars = /* @__PURE__ */ function(TabsIndicatorCssVars2) {
  TabsIndicatorCssVars2["activeTabLeft"] = "--active-tab-left";
  TabsIndicatorCssVars2["activeTabRight"] = "--active-tab-right";
  TabsIndicatorCssVars2["activeTabTop"] = "--active-tab-top";
  TabsIndicatorCssVars2["activeTabBottom"] = "--active-tab-bottom";
  TabsIndicatorCssVars2["activeTabWidth"] = "--active-tab-width";
  TabsIndicatorCssVars2["activeTabHeight"] = "--active-tab-height";
  return TabsIndicatorCssVars2;
}({});

// node_modules/@base-ui/react/esm/tabs/indicator/TabsIndicator.js
import { jsx as _jsx2, jsxs as _jsxs } from "react/jsx-runtime";
"use client";
var stateAttributesMapping = {
  ...tabsStateAttributesMapping,
  activeTabPosition: () => null,
  activeTabSize: () => null
};
var TabsIndicator = /* @__PURE__ */ React6.forwardRef(function TabsIndicator2(componentProps, forwardedRef) {
  const {
    className,
    render,
    renderBeforeHydration = false,
    style: styleProp,
    ...elementProps
  } = componentProps;
  const {
    nonce
  } = useCSPContext();
  const {
    getTabElementBySelectedValue,
    orientation,
    tabActivationDirection,
    value
  } = useTabsRootContext();
  const {
    tabsListElement,
    registerIndicatorUpdateListener
  } = useTabsListContext();
  const isHydrating = useIsHydrating();
  const rerender = useForcedRerendering();
  React6.useEffect(() => {
    return registerIndicatorUpdateListener(rerender);
  }, [registerIndicatorUpdateListener, rerender]);
  let left = 0;
  let right = 0;
  let top = 0;
  let bottom = 0;
  let width = 0;
  let height = 0;
  let isTabSelected = false;
  if (value != null && tabsListElement != null) {
    const activeTab = getTabElementBySelectedValue(value);
    isTabSelected = true;
    if (activeTab != null) {
      const {
        width: computedWidth,
        height: computedHeight
      } = getCssDimensions(activeTab);
      const {
        width: tabListWidth,
        height: tabListHeight
      } = getCssDimensions(tabsListElement);
      const tabRect = activeTab.getBoundingClientRect();
      const tabsListRect = tabsListElement.getBoundingClientRect();
      const scaleX = tabListWidth > 0 ? tabsListRect.width / tabListWidth : 1;
      const scaleY = tabListHeight > 0 ? tabsListRect.height / tabListHeight : 1;
      const hasNonZeroScale = Math.abs(scaleX) > Number.EPSILON && Math.abs(scaleY) > Number.EPSILON;
      if (hasNonZeroScale) {
        const tabLeftDelta = tabRect.left - tabsListRect.left;
        const tabTopDelta = tabRect.top - tabsListRect.top;
        left = tabLeftDelta / scaleX + tabsListElement.scrollLeft - tabsListElement.clientLeft;
        top = tabTopDelta / scaleY + tabsListElement.scrollTop - tabsListElement.clientTop;
      } else {
        left = activeTab.offsetLeft;
        top = activeTab.offsetTop;
      }
      width = computedWidth;
      height = computedHeight;
      right = tabsListElement.scrollWidth - left - width;
      bottom = tabsListElement.scrollHeight - top - height;
    }
  }
  const activeTabPosition = isTabSelected ? {
    left,
    right,
    top,
    bottom
  } : null;
  const activeTabSize = isTabSelected ? {
    width,
    height
  } : null;
  const style = isTabSelected ? {
    [TabsIndicatorCssVars.activeTabLeft]: `${left}px`,
    [TabsIndicatorCssVars.activeTabRight]: `${right}px`,
    [TabsIndicatorCssVars.activeTabTop]: `${top}px`,
    [TabsIndicatorCssVars.activeTabBottom]: `${bottom}px`,
    [TabsIndicatorCssVars.activeTabWidth]: `${width}px`,
    [TabsIndicatorCssVars.activeTabHeight]: `${height}px`
  } : undefined;
  const displayIndicator = isTabSelected && width > 0 && height > 0;
  const state = {
    orientation,
    activeTabPosition,
    activeTabSize,
    tabActivationDirection
  };
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      role: "presentation",
      style,
      hidden: !displayIndicator
    }, elementProps, {
      suppressHydrationWarning: true
    }],
    stateAttributesMapping
  });
  if (value == null) {
    return null;
  }
  return /* @__PURE__ */ _jsxs(React6.Fragment, {
    children: [element, isHydrating && renderBeforeHydration && /* @__PURE__ */ _jsx2("script", {
      nonce,
      dangerouslySetInnerHTML: {
        __html: script
      },
      suppressHydrationWarning: true
    })]
  });
});
if (true)
  TabsIndicator.displayName = "TabsIndicator";
// node_modules/@base-ui/react/esm/tabs/panel/TabsPanel.js
import * as React7 from "react";

// node_modules/@base-ui/react/esm/tabs/panel/TabsPanelDataAttributes.js
var TabsPanelDataAttributes = function(TabsPanelDataAttributes2) {
  TabsPanelDataAttributes2["index"] = "data-index";
  TabsPanelDataAttributes2["activationDirection"] = "data-activation-direction";
  TabsPanelDataAttributes2["orientation"] = "data-orientation";
  TabsPanelDataAttributes2["hidden"] = "data-hidden";
  TabsPanelDataAttributes2[TabsPanelDataAttributes2["startingStyle"] = TransitionStatusDataAttributes.startingStyle] = "startingStyle";
  TabsPanelDataAttributes2[TabsPanelDataAttributes2["endingStyle"] = TransitionStatusDataAttributes.endingStyle] = "endingStyle";
  return TabsPanelDataAttributes2;
}({});

// node_modules/@base-ui/react/esm/tabs/panel/TabsPanel.js
"use client";
var stateAttributesMapping2 = {
  ...tabsStateAttributesMapping,
  ...transitionStatusMapping
};
var TabsPanel = /* @__PURE__ */ React7.forwardRef(function TabsPanel2(componentProps, forwardedRef) {
  const {
    className,
    value,
    render,
    keepMounted = false,
    style,
    ...elementProps
  } = componentProps;
  const {
    value: selectedValue,
    getTabIdByPanelValue,
    orientation,
    tabActivationDirection,
    registerMountedTabPanel,
    unregisterMountedTabPanel
  } = useTabsRootContext();
  const id = useBaseUiId();
  const metadata = React7.useMemo(() => ({
    id,
    value
  }), [id, value]);
  const {
    ref: listItemRef,
    index
  } = useCompositeListItem({
    metadata
  });
  const open = value === selectedValue;
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(open);
  const hidden = !mounted;
  const correspondingTabId = getTabIdByPanelValue(value);
  const state = {
    hidden,
    orientation,
    tabActivationDirection,
    transitionStatus
  };
  const panelRef = React7.useRef(null);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, listItemRef, panelRef],
    props: [{
      "aria-labelledby": correspondingTabId,
      hidden,
      id,
      role: "tabpanel",
      tabIndex: open ? 0 : -1,
      inert: inertValue(!open),
      [TabsPanelDataAttributes.index]: index
    }, elementProps],
    stateAttributesMapping: stateAttributesMapping2
  });
  useOpenChangeComplete({
    open,
    ref: panelRef,
    onComplete() {
      if (!open) {
        setMounted(false);
      }
    }
  });
  useIsoLayoutEffect(() => {
    if (hidden && !keepMounted) {
      return;
    }
    if (id == null) {
      return;
    }
    registerMountedTabPanel(value, id);
    return () => {
      unregisterMountedTabPanel(value, id);
    };
  }, [hidden, keepMounted, value, id, registerMountedTabPanel, unregisterMountedTabPanel]);
  const shouldRender = keepMounted || mounted;
  if (!shouldRender) {
    return null;
  }
  return element;
});
if (true)
  TabsPanel.displayName = "TabsPanel";
// node_modules/@base-ui/react/esm/tabs/list/TabsList.js
import * as React8 from "react";
import { jsx as _jsx3 } from "react/jsx-runtime";
"use client";
var TabsList = /* @__PURE__ */ React8.forwardRef(function TabsList2(componentProps, forwardedRef) {
  const {
    activateOnFocus = false,
    className,
    loopFocus = true,
    render,
    style,
    ...elementProps
  } = componentProps;
  const {
    onValueChange,
    orientation,
    value,
    setTabMap,
    tabActivationDirection
  } = useTabsRootContext();
  const [highlightedTabIndex, setHighlightedTabIndex] = React8.useState(0);
  const [tabsListElement, setTabsListElement] = React8.useState(null);
  const indicatorUpdateListenersRef = React8.useRef(new Set);
  const tabResizeObserverElementsRef = React8.useRef(new Set);
  const resizeObserverRef = React8.useRef(null);
  React8.useEffect(() => {
    if (typeof ResizeObserver === "undefined") {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      indicatorUpdateListenersRef.current.forEach((listener) => {
        listener();
      });
    });
    resizeObserverRef.current = resizeObserver;
    if (tabsListElement) {
      resizeObserver.observe(tabsListElement);
    }
    tabResizeObserverElementsRef.current.forEach((element) => {
      resizeObserver.observe(element);
    });
    return () => {
      resizeObserver.disconnect();
      resizeObserverRef.current = null;
    };
  }, [tabsListElement]);
  const registerIndicatorUpdateListener = useStableCallback((listener) => {
    indicatorUpdateListenersRef.current.add(listener);
    return () => {
      indicatorUpdateListenersRef.current.delete(listener);
    };
  });
  const registerTabResizeObserverElement = useStableCallback((element) => {
    tabResizeObserverElementsRef.current.add(element);
    resizeObserverRef.current?.observe(element);
    return () => {
      tabResizeObserverElementsRef.current.delete(element);
      resizeObserverRef.current?.unobserve(element);
    };
  });
  const onTabActivation = useStableCallback((newValue, eventDetails) => {
    if (newValue !== value) {
      onValueChange(newValue, eventDetails);
    }
  });
  const state = {
    orientation,
    tabActivationDirection
  };
  const defaultProps = {
    "aria-orientation": orientation === "vertical" ? "vertical" : undefined,
    role: "tablist"
  };
  const tabsListContextValue = React8.useMemo(() => ({
    activateOnFocus,
    highlightedTabIndex,
    registerIndicatorUpdateListener,
    registerTabResizeObserverElement,
    onTabActivation,
    setHighlightedTabIndex,
    tabsListElement
  }), [activateOnFocus, highlightedTabIndex, registerIndicatorUpdateListener, registerTabResizeObserverElement, onTabActivation, setHighlightedTabIndex, tabsListElement]);
  return /* @__PURE__ */ _jsx3(TabsListContext.Provider, {
    value: tabsListContextValue,
    children: /* @__PURE__ */ _jsx3(CompositeRoot, {
      render,
      className,
      style,
      state,
      refs: [forwardedRef, setTabsListElement],
      props: [defaultProps, elementProps],
      stateAttributesMapping: tabsStateAttributesMapping,
      highlightedIndex: highlightedTabIndex,
      enableHomeAndEndKeys: true,
      loopFocus,
      orientation,
      onHighlightedIndexChange: setHighlightedTabIndex,
      onMapChange: setTabMap,
      disabledIndices: EMPTY_ARRAY
    })
  });
});
if (true)
  TabsList.displayName = "TabsList";
export {
  exports_index_parts as Tabs
};
