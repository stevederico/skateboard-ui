/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  useToggleGroupContext
} from "./_chunk-qmsqz6nt.js";
import {
  CompositeItem
} from "./_chunk-f2wttwrf.js";
import"./_chunk-j3qkyd10.js";
import"./_chunk-3enq1vat.js";
import"./_chunk-3xpke33f.js";
import {
  useControlled
} from "./_chunk-9x63vfqj.js";
import {
  createChangeEventDetails,
  exports_reason_parts
} from "./_chunk-e56mpvk1.js";
import {
  useBaseUiId
} from "./_chunk-wdqynnjf.js";
import {
  useButton
} from "./_chunk-5xmdvndx.js";
import {
  error
} from "./_chunk-hm5h9vsk.js";
import"./_chunk-cdgfsr3q.js";
import"./_chunk-000kmre8.js";
import"./_chunk-cwvtvwc7.js";
import {
  useIsoLayoutEffect
} from "./_chunk-5tze5c8q.js";
import {
  useRenderElement
} from "./_chunk-x8xehj6d.js";
import"./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/toggle/Toggle.js
import * as React from "react";
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
var Toggle = /* @__PURE__ */ React.forwardRef(function Toggle2(componentProps, forwardedRef) {
  const {
    className,
    defaultPressed: defaultPressedProp = false,
    disabled: disabledProp = false,
    form,
    onPressedChange,
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
      if (value) {
        groupContext?.setGroupValue?.(value, nextPressed, details);
      }
      onPressedChange?.(nextPressed, details);
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
