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
import {
  useCompositeListItem
} from "./_chunk-3enq1vat.js";
import {
  isElementDisabled
} from "./_chunk-26cc610z.js";
import {
  CompositeList
} from "./_chunk-j29xjete.js";
import"./_chunk-3xpke33f.js";
import {
  useDirection
} from "./_chunk-gy0bpkmx.js";
import {
  useControlled
} from "./_chunk-9x63vfqj.js";
import {
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
  COMPOSITE_KEYS
} from "./_chunk-pv7b791x.js";
import {
  stopEvent
} from "./_chunk-kw8nnq00.js";
import"./_chunk-rrh8rt4v.js";
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
  useMergedRefs,
  useRenderElement,
  warn
} from "./_chunk-x8xehj6d.js";
import {
  __export
} from "./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/accordion/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  Trigger: () => AccordionTrigger,
  Root: () => AccordionRoot,
  Panel: () => AccordionPanel,
  Item: () => AccordionItem,
  Header: () => AccordionHeader
});

// node_modules/@base-ui/react/esm/accordion/root/AccordionRoot.js
import * as React2 from "react";

// node_modules/@base-ui/react/esm/accordion/root/AccordionRootContext.js
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

// node_modules/@base-ui/react/esm/accordion/root/AccordionRoot.js
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
    onValueChange,
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
        warn("The `keepMounted={false}` prop on `Accordion.Root` is ignored when `hiddenUntilFound` is enabled, since panels must remain mounted while closed.");
      }
    }, [hiddenUntilFoundProp, keepMountedProp]);
  }
  const defaultValue = React2.useMemo(() => {
    if (valueProp === undefined) {
      return defaultValueProp ?? [];
    }
    return;
  }, [valueProp, defaultValueProp]);
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
      onValueChange?.(nextValue, details);
      if (details.isCanceled) {
        return;
      }
      setValue(nextValue);
    } else if (nextOpen) {
      const nextOpenValues = value.slice();
      nextOpenValues.push(newValue);
      onValueChange?.(nextOpenValues, details);
      if (details.isCanceled) {
        return;
      }
      setValue(nextOpenValues);
    } else {
      const nextOpenValues = value.filter((v) => v !== newValue);
      onValueChange?.(nextOpenValues, details);
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
// node_modules/@base-ui/react/esm/accordion/item/AccordionItem.js
import * as React4 from "react";

// node_modules/@base-ui/react/esm/accordion/item/AccordionItemContext.js
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

// node_modules/@base-ui/react/esm/accordion/item/AccordionItemDataAttributes.js
var AccordionItemDataAttributes = /* @__PURE__ */ function(AccordionItemDataAttributes2) {
  AccordionItemDataAttributes2["index"] = "data-index";
  AccordionItemDataAttributes2["disabled"] = "data-disabled";
  AccordionItemDataAttributes2["open"] = "data-open";
  return AccordionItemDataAttributes2;
}({});

// node_modules/@base-ui/react/esm/accordion/item/stateAttributesMapping.js
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

// node_modules/@base-ui/react/esm/accordion/item/AccordionItem.js
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
    transitionStatus: collapsible.transitionStatus
  }), [collapsible.open, collapsible.disabled, collapsible.transitionStatus]);
  const collapsibleContext = React4.useMemo(() => ({
    ...collapsible,
    onOpenChange,
    state: collapsibleState
  }), [collapsible, collapsibleState, onOpenChange]);
  const state = React4.useMemo(() => ({
    ...rootState,
    hidden: !isOpen && !collapsible.mounted,
    index,
    disabled,
    open: isOpen
  }), [collapsible.mounted, disabled, index, isOpen, rootState]);
  const defaultTriggerId = useBaseUiId();
  const [triggerId, setTriggerId] = React4.useState(defaultTriggerId);
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
// node_modules/@base-ui/react/esm/accordion/header/AccordionHeader.js
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
// node_modules/@base-ui/react/esm/accordion/trigger/AccordionTrigger.js
import * as React6 from "react";
"use client";
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
  const props = {
    "aria-controls": open ? panelId : undefined,
    "aria-expanded": open,
    id,
    tabIndex: 0,
    onClick: handleTrigger,
    onKeyDown(event) {
      if (!COMPOSITE_KEYS.has(event.key)) {
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
  };
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
// node_modules/@base-ui/react/esm/accordion/panel/AccordionPanel.js
import * as React7 from "react";

// node_modules/@base-ui/react/esm/accordion/panel/AccordionPanelCssVars.js
var AccordionPanelCssVars = /* @__PURE__ */ function(AccordionPanelCssVars2) {
  AccordionPanelCssVars2["accordionPanelHeight"] = "--accordion-panel-height";
  AccordionPanelCssVars2["accordionPanelWidth"] = "--accordion-panel-width";
  return AccordionPanelCssVars2;
}({});

// node_modules/@base-ui/react/esm/accordion/panel/AccordionPanel.js
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
    mounted,
    onOpenChange,
    open,
    panelId,
    setMounted,
    setOpen,
    setPanelIdState,
    transitionStatus
  } = useCollapsibleRootContext();
  const hiddenUntilFound = hiddenUntilFoundProp ?? contextHiddenUntilFound;
  const keepMounted = keepMountedProp ?? contextKeepMounted;
  if (true) {
    useIsoLayoutEffect(() => {
      if (keepMountedProp === false && hiddenUntilFound) {
        warn("The `keepMounted={false}` prop on an `Accordion.Panel` is ignored when `hiddenUntilFound` is enabled on the panel or root, since the panel must remain mounted while closed.");
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
    id: idProp ?? panelId,
    keepMounted,
    mounted,
    onOpenChange,
    open,
    setMounted,
    setOpen,
    transitionStatus
  });
  const {
    state,
    triggerId
  } = useAccordionItemContext();
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
        "aria-labelledby": triggerId,
        role: "region",
        style: {
          [AccordionPanelCssVars.accordionPanelHeight]: height === undefined ? "auto" : `${height}px`,
          [AccordionPanelCssVars.accordionPanelWidth]: width === undefined ? "auto" : `${width}px`
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
    stateAttributesMapping: accordionStateAttributesMapping
  });
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
