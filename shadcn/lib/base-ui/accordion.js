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
import {
  useCompositeListItem
} from "./_chunk-ek863ta9.js";
import {
  isElementDisabled
} from "./_chunk-vdc01ss3.js";
import {
  CompositeList
} from "./_chunk-p6qynd6r.js";
import"./_chunk-20rtfsz9.js";
import {
  useDirection
} from "./_chunk-wtw745qd.js";
import {
  useControlled
} from "./_chunk-01rqe37g.js";
import {
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
  END,
  HOME
} from "./_chunk-qce0xt57.js";
import {
  stopEvent
} from "./_chunk-nya71ccw.js";
import"./_chunk-t7j3rbpv.js";
import"./_chunk-f5d01bp9.js";
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
  useMergedRefs,
  useRenderElement,
  warn
} from "./_chunk-1s41sngz.js";
import {
  __export
} from "./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/accordion/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  Trigger: () => AccordionTrigger,
  Root: () => AccordionRoot,
  Panel: () => AccordionPanel,
  Item: () => AccordionItem,
  Header: () => AccordionHeader
});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/accordion/root/AccordionRoot.js
import * as React2 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/accordion/root/AccordionRootContext.js
import * as React from "react";
"use client";
var AccordionRootContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  AccordionRootContext.displayName = "AccordionRootContext";
function useAccordionRootContext() {
  const context = React.useContext(AccordionRootContext);
  if (context === undefined) {
    throw new Error("Base UI: AccordionRootContext is missing. Accordion parts must be placed within <Accordion.Root>.");
  }
  return context;
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/accordion/root/AccordionRoot.js
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
var rootStateAttributesMapping = {
  value: () => null
};
var AccordionRoot = /* @__PURE__ */ React2.forwardRef(function AccordionRoot2(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled = false,
    hiddenUntilFound: hiddenUntilFoundProp,
    keepMounted: keepMountedProp,
    loopFocus = true,
    onValueChange: onValueChangeProp,
    multiple = false,
    orientation = "vertical",
    value: valueProp,
    defaultValue: defaultValueProp,
    style,
    ...elementProps
  } = componentProps;
  const direction = useDirection();
  if (true) {
    useIsoLayoutEffect(() => {
      if (hiddenUntilFoundProp && keepMountedProp === false) {
        warn("The `keepMounted={false}` prop on a Accordion.Root will be ignored when using `hiddenUntilFound` since it requires Panels to remain mounted when closed.");
      }
    }, [hiddenUntilFoundProp, keepMountedProp]);
  }
  const defaultValue = React2.useMemo(() => {
    if (valueProp === undefined) {
      return defaultValueProp ?? [];
    }
    return;
  }, [valueProp, defaultValueProp]);
  const onValueChange = useStableCallback(onValueChangeProp);
  const accordionItemRefs = React2.useRef([]);
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "Accordion",
    state: "value"
  });
  const handleValueChange = useStableCallback((newValue, nextOpen) => {
    const details = createChangeEventDetails(exports_reason_parts.none);
    if (!multiple) {
      const nextValue = value[0] === newValue ? [] : [newValue];
      onValueChange(nextValue, details);
      if (details.isCanceled) {
        return;
      }
      setValue(nextValue);
    } else if (nextOpen) {
      const nextOpenValues = value.slice();
      nextOpenValues.push(newValue);
      onValueChange(nextOpenValues, details);
      if (details.isCanceled) {
        return;
      }
      setValue(nextOpenValues);
    } else {
      const nextOpenValues = value.filter((v) => v !== newValue);
      onValueChange(nextOpenValues, details);
      if (details.isCanceled) {
        return;
      }
      setValue(nextOpenValues);
    }
  });
  const state = React2.useMemo(() => ({
    value,
    disabled,
    orientation
  }), [value, disabled, orientation]);
  const contextValue = React2.useMemo(() => ({
    accordionItemRefs,
    direction,
    disabled,
    handleValueChange,
    hiddenUntilFound: hiddenUntilFoundProp ?? false,
    keepMounted: keepMountedProp ?? false,
    loopFocus,
    orientation,
    state,
    value
  }), [direction, disabled, handleValueChange, hiddenUntilFoundProp, keepMountedProp, loopFocus, orientation, state, value]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      dir: direction,
      role: "region"
    }, elementProps],
    stateAttributesMapping: rootStateAttributesMapping
  });
  return /* @__PURE__ */ _jsx(AccordionRootContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ _jsx(CompositeList, {
      elementsRef: accordionItemRefs,
      children: element
    })
  });
});
if (true)
  AccordionRoot.displayName = "AccordionRoot";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/accordion/item/AccordionItem.js
import * as React4 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/accordion/item/AccordionItemContext.js
import * as React3 from "react";
"use client";
var AccordionItemContext = /* @__PURE__ */ React3.createContext(undefined);
if (true)
  AccordionItemContext.displayName = "AccordionItemContext";
function useAccordionItemContext() {
  const context = React3.useContext(AccordionItemContext);
  if (context === undefined) {
    throw new Error("Base UI: AccordionItemContext is missing. Accordion parts must be placed within <Accordion.Item>.");
  }
  return context;
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/accordion/item/AccordionItemDataAttributes.js
var AccordionItemDataAttributes = /* @__PURE__ */ function(AccordionItemDataAttributes2) {
  AccordionItemDataAttributes2["index"] = "data-index";
  AccordionItemDataAttributes2["disabled"] = "data-disabled";
  AccordionItemDataAttributes2["open"] = "data-open";
  return AccordionItemDataAttributes2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/accordion/item/stateAttributesMapping.js
var accordionStateAttributesMapping = {
  ...collapsibleOpenStateMapping,
  index: (value) => {
    return Number.isInteger(value) ? {
      [AccordionItemDataAttributes.index]: String(value)
    } : null;
  },
  ...transitionStatusMapping,
  value: () => null
};

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/accordion/item/AccordionItem.js
import { jsx as _jsx2 } from "react/jsx-runtime";
"use client";
var AccordionItem = /* @__PURE__ */ React4.forwardRef(function AccordionItem2(componentProps, forwardedRef) {
  const {
    className,
    disabled: disabledProp = false,
    onOpenChange: onOpenChangeProp,
    render,
    value: valueProp,
    style,
    ...elementProps
  } = componentProps;
  const {
    ref: listItemRef,
    index
  } = useCompositeListItem();
  const mergedRef = useMergedRefs(forwardedRef, listItemRef);
  const {
    disabled: contextDisabled,
    handleValueChange,
    state: rootState,
    value: openValues
  } = useAccordionRootContext();
  const fallbackValue = useBaseUiId();
  const value = valueProp ?? fallbackValue;
  const disabled = disabledProp || contextDisabled;
  const isOpen = React4.useMemo(() => {
    if (!openValues) {
      return false;
    }
    for (let i = 0;i < openValues.length; i += 1) {
      if (openValues[i] === value) {
        return true;
      }
    }
    return false;
  }, [openValues, value]);
  const onOpenChange = useStableCallback((nextOpen, eventDetails) => {
    onOpenChangeProp?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    handleValueChange(value, nextOpen);
  });
  const collapsible = useCollapsibleRoot({
    open: isOpen,
    onOpenChange,
    disabled
  });
  const collapsibleState = React4.useMemo(() => ({
    open: collapsible.open,
    disabled: collapsible.disabled,
    hidden: !collapsible.mounted,
    transitionStatus: collapsible.transitionStatus
  }), [collapsible.open, collapsible.disabled, collapsible.mounted, collapsible.transitionStatus]);
  const collapsibleContext = React4.useMemo(() => ({
    ...collapsible,
    onOpenChange,
    state: collapsibleState
  }), [collapsible, collapsibleState, onOpenChange]);
  const state = React4.useMemo(() => ({
    ...rootState,
    index,
    disabled,
    open: isOpen
  }), [disabled, index, isOpen, rootState]);
  const [triggerId, setTriggerId] = React4.useState(useBaseUiId());
  const accordionItemContext = React4.useMemo(() => ({
    open: isOpen,
    state,
    setTriggerId,
    triggerId
  }), [isOpen, state, setTriggerId, triggerId]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: mergedRef,
    props: elementProps,
    stateAttributesMapping: accordionStateAttributesMapping
  });
  return /* @__PURE__ */ _jsx2(CollapsibleRootContext.Provider, {
    value: collapsibleContext,
    children: /* @__PURE__ */ _jsx2(AccordionItemContext.Provider, {
      value: accordionItemContext,
      children: element
    })
  });
});
if (true)
  AccordionItem.displayName = "AccordionItem";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/accordion/header/AccordionHeader.js
import * as React5 from "react";
"use client";
var AccordionHeader = /* @__PURE__ */ React5.forwardRef(function AccordionHeader2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    state
  } = useAccordionItemContext();
  const element = useRenderElement("h3", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: accordionStateAttributesMapping
  });
  return element;
});
if (true)
  AccordionHeader.displayName = "AccordionHeader";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/accordion/trigger/AccordionTrigger.js
import * as React6 from "react";
"use client";
var SUPPORTED_KEYS = new Set([ARROW_DOWN, ARROW_UP, ARROW_RIGHT, ARROW_LEFT, HOME, END]);
function getActiveTriggers(accordionItemRefs) {
  const {
    current: accordionItemElements
  } = accordionItemRefs;
  const output = [];
  for (let i = 0;i < accordionItemElements.length; i += 1) {
    const section = accordionItemElements[i];
    if (!isElementDisabled(section)) {
      const trigger = section?.querySelector('[type="button"], [role="button"]');
      if (trigger && !isElementDisabled(trigger)) {
        output.push(trigger);
      }
    }
  }
  return output;
}
var AccordionTrigger = /* @__PURE__ */ React6.forwardRef(function AccordionTrigger2(componentProps, forwardedRef) {
  const {
    disabled: disabledProp,
    className,
    id: idProp,
    render,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const {
    panelId,
    open,
    handleTrigger,
    disabled: contextDisabled
  } = useCollapsibleRootContext();
  const disabled = disabledProp ?? contextDisabled;
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton,
    composite: true
  });
  const {
    accordionItemRefs,
    direction,
    loopFocus,
    orientation
  } = useAccordionRootContext();
  const isRtl = direction === "rtl";
  const isHorizontal = orientation === "horizontal";
  const {
    state,
    setTriggerId,
    triggerId: id
  } = useAccordionItemContext();
  useIsoLayoutEffect(() => {
    if (idProp) {
      setTriggerId(idProp);
    }
    return () => {
      setTriggerId(undefined);
    };
  }, [idProp, setTriggerId]);
  const props = React6.useMemo(() => ({
    "aria-controls": open ? panelId : undefined,
    "aria-expanded": open,
    id,
    tabIndex: 0,
    onClick: handleTrigger,
    onKeyDown(event) {
      if (!SUPPORTED_KEYS.has(event.key)) {
        return;
      }
      stopEvent(event);
      const triggers = getActiveTriggers(accordionItemRefs);
      const numOfEnabledTriggers = triggers.length;
      const lastIndex = numOfEnabledTriggers - 1;
      let nextIndex = -1;
      const thisIndex = triggers.indexOf(event.currentTarget);
      function toNext() {
        if (loopFocus) {
          nextIndex = thisIndex + 1 > lastIndex ? 0 : thisIndex + 1;
        } else {
          nextIndex = Math.min(thisIndex + 1, lastIndex);
        }
      }
      function toPrev() {
        if (loopFocus) {
          nextIndex = thisIndex === 0 ? lastIndex : thisIndex - 1;
        } else {
          nextIndex = thisIndex - 1;
        }
      }
      switch (event.key) {
        case ARROW_DOWN:
          if (!isHorizontal) {
            toNext();
          }
          break;
        case ARROW_UP:
          if (!isHorizontal) {
            toPrev();
          }
          break;
        case ARROW_RIGHT:
          if (isHorizontal) {
            if (isRtl) {
              toPrev();
            } else {
              toNext();
            }
          }
          break;
        case ARROW_LEFT:
          if (isHorizontal) {
            if (isRtl) {
              toNext();
            } else {
              toPrev();
            }
          }
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = lastIndex;
          break;
        default:
          break;
      }
      if (nextIndex > -1) {
        triggers[nextIndex].focus();
      }
    }
  }), [accordionItemRefs, handleTrigger, id, isHorizontal, isRtl, loopFocus, open, panelId]);
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef],
    props: [props, elementProps, getButtonProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
  return element;
});
if (true)
  AccordionTrigger.displayName = "AccordionTrigger";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/accordion/panel/AccordionPanel.js
import * as React7 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/accordion/panel/AccordionPanelCssVars.js
var AccordionPanelCssVars = /* @__PURE__ */ function(AccordionPanelCssVars2) {
  AccordionPanelCssVars2["accordionPanelHeight"] = "--accordion-panel-height";
  AccordionPanelCssVars2["accordionPanelWidth"] = "--accordion-panel-width";
  return AccordionPanelCssVars2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/accordion/panel/AccordionPanel.js
"use client";
var AccordionPanel = /* @__PURE__ */ React7.forwardRef(function AccordionPanel2(componentProps, forwardedRef) {
  const {
    className,
    hiddenUntilFound: hiddenUntilFoundProp,
    keepMounted: keepMountedProp,
    id: idProp,
    render,
    style,
    ...elementProps
  } = componentProps;
  const {
    hiddenUntilFound: contextHiddenUntilFound,
    keepMounted: contextKeepMounted
  } = useAccordionRootContext();
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
    setOpen,
    setVisible,
    transitionDimensionRef,
    visible,
    width,
    setPanelIdState,
    transitionStatus
  } = useCollapsibleRootContext();
  const hiddenUntilFound = hiddenUntilFoundProp ?? contextHiddenUntilFound;
  const keepMounted = keepMountedProp ?? contextKeepMounted;
  if (true) {
    useIsoLayoutEffect(() => {
      if (keepMountedProp === false && hiddenUntilFound) {
        warn("The `keepMounted={false}` prop on a Accordion.Panel will be ignored when using `contextHiddenUntilFound` on the Panel or the Root since it requires the panel to remain mounted when closed.");
      }
    }, [hiddenUntilFound, keepMountedProp]);
  }
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
  useOpenChangeComplete({
    open: open && transitionStatus === "idle",
    ref: panelRef,
    onComplete() {
      if (!open) {
        return;
      }
      setDimensions({
        width: undefined,
        height: undefined
      });
    }
  });
  const {
    props
  } = useCollapsiblePanel({
    abortControllerRef,
    animationTypeRef,
    externalRef: forwardedRef,
    height,
    hiddenUntilFound,
    id: idProp ?? panelId,
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
  const {
    state,
    triggerId
  } = useAccordionItemContext();
  const panelState = React7.useMemo(() => ({
    ...state,
    transitionStatus
  }), [state, transitionStatus]);
  const element = useRenderElement("div", componentProps, {
    state: panelState,
    ref: [forwardedRef, panelRef],
    props: [props, {
      "aria-labelledby": triggerId,
      role: "region",
      style: {
        [AccordionPanelCssVars.accordionPanelHeight]: height === undefined ? "auto" : `${height}px`,
        [AccordionPanelCssVars.accordionPanelWidth]: width === undefined ? "auto" : `${width}px`
      }
    }, elementProps],
    stateAttributesMapping: accordionStateAttributesMapping
  });
  const shouldRender = keepMounted || hiddenUntilFound || mounted;
  if (!shouldRender) {
    return null;
  }
  return element;
});
if (true)
  AccordionPanel.displayName = "AccordionPanel";
export {
  exports_index_parts as Accordion
};
