/* @base-ui/react 1.4.1 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  useLabelableId
} from "./_chunk-k4mc2kan.js";
import {
  useAriaLabelledBy
} from "./_chunk-a8fwg9d0.js";
import {
  useFormContext,
  useRegisterFieldControl
} from "./_chunk-97tas84n.js";
import {
  fieldValidityMapping,
  useFieldRootContext,
  useLabelableContext
} from "./_chunk-kfz96xv1.js";
import"./_chunk-ds8fnpjj.js";
import {
  useControlled
} from "./_chunk-01rqe37g.js";
import {
  useValueChanged
} from "./_chunk-cwr896nf.js";
import {
  visuallyHidden,
  visuallyHiddenInput
} from "./_chunk-hzgetm70.js";
import"./_chunk-f5d01bp9.js";
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
  EMPTY_OBJECT,
  useMergedRefs,
  useRenderElement
} from "./_chunk-1s41sngz.js";
import {
  __export,
  mergeProps
} from "./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/switch/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  Thumb: () => SwitchThumb,
  Root: () => SwitchRoot
});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/switch/root/SwitchRoot.js
import * as React2 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/switch/root/SwitchRootContext.js
import * as React from "react";
"use client";
var SwitchRootContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  SwitchRootContext.displayName = "SwitchRootContext";
function useSwitchRootContext() {
  const context = React.useContext(SwitchRootContext);
  if (context === undefined) {
    throw new Error("Base UI: SwitchRootContext is missing. Switch parts must be placed within <Switch.Root>.");
  }
  return context;
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/switch/root/SwitchRootDataAttributes.js
var SwitchRootDataAttributes = /* @__PURE__ */ function(SwitchRootDataAttributes2) {
  SwitchRootDataAttributes2["checked"] = "data-checked";
  SwitchRootDataAttributes2["unchecked"] = "data-unchecked";
  SwitchRootDataAttributes2["disabled"] = "data-disabled";
  SwitchRootDataAttributes2["readonly"] = "data-readonly";
  SwitchRootDataAttributes2["required"] = "data-required";
  SwitchRootDataAttributes2["valid"] = "data-valid";
  SwitchRootDataAttributes2["invalid"] = "data-invalid";
  SwitchRootDataAttributes2["touched"] = "data-touched";
  SwitchRootDataAttributes2["dirty"] = "data-dirty";
  SwitchRootDataAttributes2["filled"] = "data-filled";
  SwitchRootDataAttributes2["focused"] = "data-focused";
  return SwitchRootDataAttributes2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/switch/stateAttributesMapping.js
var stateAttributesMapping = {
  ...fieldValidityMapping,
  checked(value) {
    if (value) {
      return {
        [SwitchRootDataAttributes.checked]: ""
      };
    }
    return {
      [SwitchRootDataAttributes.unchecked]: ""
    };
  }
};

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/switch/root/SwitchRoot.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
"use client";
var SwitchRoot = /* @__PURE__ */ React2.forwardRef(function SwitchRoot2(componentProps, forwardedRef) {
  const {
    checked: checkedProp,
    className,
    defaultChecked,
    "aria-labelledby": ariaLabelledByProp,
    form,
    id: idProp,
    inputRef: externalInputRef,
    name: nameProp,
    nativeButton = false,
    onCheckedChange: onCheckedChangeProp,
    readOnly = false,
    required = false,
    disabled: disabledProp = false,
    render,
    uncheckedValue,
    value,
    style,
    ...elementProps
  } = componentProps;
  const {
    clearErrors
  } = useFormContext();
  const {
    state: fieldState,
    setTouched,
    setDirty,
    validityData,
    setFilled,
    setFocused,
    shouldValidateOnChange,
    validationMode,
    disabled: fieldDisabled,
    name: fieldName,
    validation
  } = useFieldRootContext();
  const {
    labelId
  } = useLabelableContext();
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const onCheckedChange = useStableCallback(onCheckedChangeProp);
  const inputRef = React2.useRef(null);
  const handleInputRef = useMergedRefs(inputRef, externalInputRef, validation.inputRef);
  const switchRef = React2.useRef(null);
  const id = useBaseUiId();
  const controlId = useLabelableId({
    id: idProp,
    implicit: false,
    controlRef: switchRef
  });
  const hiddenInputId = nativeButton ? undefined : controlId;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "Switch",
    state: "checked"
  });
  useRegisterFieldControl(switchRef, {
    id,
    value: checked
  });
  useIsoLayoutEffect(() => {
    if (inputRef.current) {
      setFilled(inputRef.current.checked);
    }
  }, [inputRef, setFilled]);
  useValueChanged(checked, () => {
    clearErrors(name);
    setDirty(checked !== validityData.initialValue);
    setFilled(checked);
    if (shouldValidateOnChange()) {
      validation.commit(checked);
    } else {
      validation.commit(checked, true);
    }
  });
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const ariaLabelledBy = useAriaLabelledBy(ariaLabelledByProp, labelId, inputRef, !nativeButton, hiddenInputId);
  const rootProps = {
    id: nativeButton ? controlId : id,
    role: "switch",
    "aria-checked": checked,
    "aria-readonly": readOnly || undefined,
    "aria-required": required || undefined,
    "aria-labelledby": ariaLabelledBy,
    onFocus() {
      if (!disabled) {
        setFocused(true);
      }
    },
    onBlur() {
      const element2 = inputRef.current;
      if (!element2 || disabled) {
        return;
      }
      setTouched(true);
      setFocused(false);
      if (validationMode === "onBlur") {
        validation.commit(element2.checked);
      }
    },
    onClick(event) {
      if (readOnly || disabled) {
        return;
      }
      event.preventDefault();
      inputRef.current?.dispatchEvent(new PointerEvent("click", {
        bubbles: true,
        shiftKey: event.shiftKey,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        metaKey: event.metaKey
      }));
    }
  };
  const inputProps = React2.useMemo(() => mergeProps({
    checked,
    disabled,
    form,
    id: hiddenInputId,
    name,
    required,
    style: name ? visuallyHiddenInput : visuallyHidden,
    tabIndex: -1,
    type: "checkbox",
    "aria-hidden": true,
    ref: handleInputRef,
    onChange(event) {
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      if (readOnly) {
        event.preventDefault();
        return;
      }
      const nextChecked = event.currentTarget.checked;
      const eventDetails = createChangeEventDetails(exports_reason_parts.none, event.nativeEvent);
      onCheckedChange?.(nextChecked, eventDetails);
      if (eventDetails.isCanceled) {
        return;
      }
      setCheckedState(nextChecked);
    },
    onFocus() {
      switchRef.current?.focus();
    }
  }, validation.getInputValidationProps, value !== undefined ? {
    value
  } : EMPTY_OBJECT), [checked, disabled, form, handleInputRef, hiddenInputId, name, onCheckedChange, readOnly, required, setCheckedState, validation, value]);
  const state = React2.useMemo(() => ({
    ...fieldState,
    checked,
    disabled,
    readOnly,
    required
  }), [fieldState, checked, disabled, readOnly, required]);
  const element = useRenderElement("span", componentProps, {
    state,
    ref: [forwardedRef, switchRef, buttonRef],
    props: [rootProps, validation.getValidationProps, elementProps, getButtonProps],
    stateAttributesMapping
  });
  return /* @__PURE__ */ _jsxs(SwitchRootContext.Provider, {
    value: state,
    children: [element, !checked && name && uncheckedValue !== undefined && /* @__PURE__ */ _jsx("input", {
      type: "hidden",
      form,
      name,
      value: uncheckedValue
    }), /* @__PURE__ */ _jsx("input", {
      ...inputProps,
      suppressHydrationWarning: true
    })]
  });
});
if (true)
  SwitchRoot.displayName = "SwitchRoot";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/switch/thumb/SwitchThumb.js
import * as React3 from "react";
"use client";
var SwitchThumb = /* @__PURE__ */ React3.forwardRef(function SwitchThumb2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    state: fieldState
  } = useFieldRootContext();
  const state = useSwitchRootContext();
  const extendedState = {
    ...fieldState,
    ...state
  };
  return useRenderElement("span", componentProps, {
    state: extendedState,
    ref: forwardedRef,
    stateAttributesMapping,
    props: elementProps
  });
});
if (true)
  SwitchThumb.displayName = "SwitchThumb";
export {
  exports_index_parts as Switch
};
