/* @base-ui/react 1.4.1 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  useToggleGroupContext
} from "./_chunk-m45547cc.js";
import {
  CompositeItem
} from "./_chunk-j0eqdjta.js";
import"./_chunk-b5jsqt97.js";
import"./_chunk-ek863ta9.js";
import"./_chunk-20rtfsz9.js";
import {
  useControlled
} from "./_chunk-01rqe37g.js";
import {
  createChangeEventDetails,
  exports_reason_parts
} from "./_chunk-4s0k3h7t.js";
import {
  useBaseUiId
} from "./_chunk-8kh3xk78.js";
import {
  useButton
} from "./_chunk-85vrgzwr.js";
import {
  error
} from "./_chunk-71zm6zgv.js";
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
  useRenderElement
} from "./_chunk-1s41sngz.js";
import"./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/toggle/Toggle.js
import * as React from "react";
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
var Toggle = /* @__PURE__ */ React.forwardRef(function Toggle2(componentProps, forwardedRef) {
  const {
    className,
    defaultPressed: defaultPressedProp = false,
    disabled: disabledProp = false,
    form,
    onPressedChange: onPressedChangeProp,
    pressed: pressedProp,
    render,
    type,
    value: valueProp,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const value = useBaseUiId(valueProp || undefined);
  const groupContext = useToggleGroupContext();
  const groupValue = groupContext?.value ?? [];
  const defaultPressed = groupContext ? undefined : defaultPressedProp;
  const disabled = (disabledProp || groupContext?.disabled) ?? false;
  if (true) {
    useIsoLayoutEffect(() => {
      if (groupContext && valueProp === undefined && groupContext.isValueInitialized) {
        error("A `<Toggle>` component rendered in a `<ToggleGroup>` has no explicit `value` prop.", "This will cause issues between the Toggle Group and Toggle values.", "Provide the `<Toggle>` with a `value` prop matching the `<ToggleGroup>` values prop type.");
      }
    }, [groupContext, valueProp, groupContext?.isValueInitialized]);
  }
  const [pressed, setPressedState] = useControlled({
    controlled: groupContext ? value !== undefined && groupValue.indexOf(value) > -1 : pressedProp,
    default: defaultPressed,
    name: "Toggle",
    state: "pressed"
  });
  const onPressedChange = useStableCallback((nextPressed, eventDetails) => {
    if (value) {
      groupContext?.setGroupValue?.(value, nextPressed, eventDetails);
    }
    onPressedChangeProp?.(nextPressed, eventDetails);
  });
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const state = {
    disabled,
    pressed
  };
  const refs = [buttonRef, forwardedRef];
  const props = [{
    "aria-pressed": pressed,
    onClick(event) {
      const nextPressed = !pressed;
      const details = createChangeEventDetails(exports_reason_parts.none, event.nativeEvent);
      onPressedChange(nextPressed, details);
      if (details.isCanceled) {
        return;
      }
      setPressedState(nextPressed);
    }
  }, elementProps, getButtonProps];
  const element = useRenderElement("button", componentProps, {
    enabled: !groupContext,
    state,
    ref: refs,
    props
  });
  if (groupContext) {
    return /* @__PURE__ */ _jsx(CompositeItem, {
      tag: "button",
      render,
      className,
      style,
      state,
      refs,
      props
    });
  }
  return element;
});
if (true)
  Toggle.displayName = "Toggle";
export {
  Toggle
};
