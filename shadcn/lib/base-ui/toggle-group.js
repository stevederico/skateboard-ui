/* @base-ui/react 1.4.1 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  ToggleGroupContext
} from "./_chunk-m45547cc.js";
import {
  CompositeRoot
} from "./_chunk-0h5sskyw.js";
import"./_chunk-r0vsdknk.js";
import {
  useToolbarRootContext
} from "./_chunk-y887e46p.js";
import"./_chunk-vdc01ss3.js";
import"./_chunk-p6qynd6r.js";
import"./_chunk-20rtfsz9.js";
import"./_chunk-wtw745qd.js";
import {
  useControlled
} from "./_chunk-01rqe37g.js";
import"./_chunk-atnkefgd.js";
import"./_chunk-qce0xt57.js";
import"./_chunk-nya71ccw.js";
import"./_chunk-t7j3rbpv.js";
import"./_chunk-71zm6zgv.js";
import"./_chunk-6xevjepc.js";
import"./_chunk-sx6vkz01.js";
import {
  useStableCallback
} from "./_chunk-mznt6ktj.js";
import"./_chunk-b40erthe.js";
import {
  useRenderElement
} from "./_chunk-1s41sngz.js";
import"./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/toggle-group/ToggleGroup.js
import * as React from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/toggle-group/ToggleGroupDataAttributes.js
var ToggleGroupDataAttributes = /* @__PURE__ */ function(ToggleGroupDataAttributes2) {
  ToggleGroupDataAttributes2["disabled"] = "data-disabled";
  ToggleGroupDataAttributes2["orientation"] = "data-orientation";
  ToggleGroupDataAttributes2["multiple"] = "data-multiple";
  return ToggleGroupDataAttributes2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/toggle-group/ToggleGroup.js
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
var stateAttributesMapping = {
  multiple(value) {
    if (value) {
      return {
        [ToggleGroupDataAttributes.multiple]: ""
      };
    }
    return null;
  }
};
var ToggleGroup = /* @__PURE__ */ React.forwardRef(function ToggleGroup2(componentProps, forwardedRef) {
  const {
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    loopFocus = true,
    onValueChange,
    orientation = "horizontal",
    multiple = false,
    value: valueProp,
    className,
    render,
    style,
    ...elementProps
  } = componentProps;
  const toolbarContext = useToolbarRootContext(true);
  const defaultValue = React.useMemo(() => {
    if (valueProp === undefined) {
      return defaultValueProp ?? [];
    }
    return;
  }, [valueProp, defaultValueProp]);
  const isValueInitialized = React.useMemo(() => valueProp !== undefined || defaultValueProp !== undefined, [valueProp, defaultValueProp]);
  const disabled = (toolbarContext?.disabled ?? false) || disabledProp;
  const [groupValue, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "ToggleGroup",
    state: "value"
  });
  const setGroupValue = useStableCallback((newValue, nextPressed, eventDetails) => {
    let newGroupValue;
    if (multiple) {
      newGroupValue = groupValue.slice();
      if (nextPressed) {
        newGroupValue.push(newValue);
      } else {
        newGroupValue.splice(groupValue.indexOf(newValue), 1);
      }
    } else {
      newGroupValue = nextPressed ? [newValue] : [];
    }
    if (Array.isArray(newGroupValue)) {
      onValueChange?.(newGroupValue, eventDetails);
      if (eventDetails.isCanceled) {
        return;
      }
      setValueState(newGroupValue);
    }
  });
  const state = {
    disabled,
    multiple,
    orientation
  };
  const contextValue = React.useMemo(() => ({
    disabled,
    orientation,
    setGroupValue,
    value: groupValue,
    isValueInitialized
  }), [disabled, orientation, setGroupValue, groupValue, isValueInitialized]);
  const defaultProps = {
    role: "group"
  };
  const element = useRenderElement("div", componentProps, {
    enabled: Boolean(toolbarContext),
    state,
    ref: forwardedRef,
    props: [defaultProps, elementProps],
    stateAttributesMapping
  });
  return /* @__PURE__ */ _jsx(ToggleGroupContext.Provider, {
    value: contextValue,
    children: toolbarContext ? element : /* @__PURE__ */ _jsx(CompositeRoot, {
      render,
      className,
      style,
      state,
      refs: [forwardedRef],
      props: [defaultProps, elementProps],
      stateAttributesMapping,
      loopFocus,
      enableHomeAndEndKeys: true,
      orientation
    })
  });
});
if (true)
  ToggleGroup.displayName = "ToggleGroup";
export {
  ToggleGroup
};
