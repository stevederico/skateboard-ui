/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  ToggleGroupContext
} from "./_chunk-qmsqz6nt.js";
import {
  CompositeRoot
} from "./_chunk-cdj8cpx5.js";
import"./_chunk-5tt5hk59.js";
import {
  useToolbarRootContext
} from "./_chunk-mnd0j7v9.js";
import"./_chunk-26cc610z.js";
import"./_chunk-j29xjete.js";
import"./_chunk-3xpke33f.js";
import"./_chunk-gy0bpkmx.js";
import {
  useControlled
} from "./_chunk-9x63vfqj.js";
import"./_chunk-cgptgywc.js";
import"./_chunk-pv7b791x.js";
import"./_chunk-kw8nnq00.js";
import"./_chunk-rrh8rt4v.js";
import"./_chunk-hm5h9vsk.js";
import"./_chunk-cdgfsr3q.js";
import"./_chunk-000kmre8.js";
import {
  useStableCallback
} from "./_chunk-cwvtvwc7.js";
import"./_chunk-5tze5c8q.js";
import {
  EMPTY_ARRAY,
  useRenderElement
} from "./_chunk-x8xehj6d.js";
import"./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/toggle-group/ToggleGroup.js
import * as React from "react";

// node_modules/@base-ui/react/esm/toggle-group/ToggleGroupDataAttributes.js
var ToggleGroupDataAttributes = /* @__PURE__ */ function(ToggleGroupDataAttributes2) {
  ToggleGroupDataAttributes2["disabled"] = "data-disabled";
  ToggleGroupDataAttributes2["orientation"] = "data-orientation";
  ToggleGroupDataAttributes2["multiple"] = "data-multiple";
  return ToggleGroupDataAttributes2;
}({});

// node_modules/@base-ui/react/esm/toggle-group/ToggleGroup.js
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
  const isValueInitialized = React.useMemo(() => valueProp !== undefined || defaultValueProp !== undefined, [valueProp, defaultValueProp]);
  const disabled = (toolbarContext?.disabled ?? false) || disabledProp;
  const [groupValue, setValueState] = useControlled({
    controlled: valueProp,
    default: valueProp === undefined ? defaultValueProp ?? EMPTY_ARRAY : undefined,
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
    onValueChange?.(newGroupValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValueState(newGroupValue);
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
