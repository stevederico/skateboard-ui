/* @base-ui/react 1.4.1 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  RadioGroupContext
} from "./_chunk-3f31ka8n.js";
import {
  useFieldsetRootContext
} from "./_chunk-c3572b5x.js";
import {
  CompositeRoot
} from "./_chunk-0h5sskyw.js";
import"./_chunk-r0vsdknk.js";
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
import"./_chunk-vdc01ss3.js";
import"./_chunk-p6qynd6r.js";
import"./_chunk-20rtfsz9.js";
import"./_chunk-wtw745qd.js";
import {
  useControlled
} from "./_chunk-01rqe37g.js";
import {
  contains
} from "./_chunk-atnkefgd.js";
import {
  SHIFT
} from "./_chunk-qce0xt57.js";
import"./_chunk-nya71ccw.js";
import"./_chunk-t7j3rbpv.js";
import {
  useValueChanged
} from "./_chunk-cwr896nf.js";
import {
  useBaseUiId
} from "./_chunk-8kh3xk78.js";
import"./_chunk-71zm6zgv.js";
import"./_chunk-6xevjepc.js";
import"./_chunk-sx6vkz01.js";
import"./_chunk-n7dnqnbw.js";
import {
  useStableCallback
} from "./_chunk-mznt6ktj.js";
import"./_chunk-b40erthe.js";
import"./_chunk-1s41sngz.js";
import"./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/radio-group/RadioGroup.js
import * as React from "react";
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
var MODIFIER_KEYS = [SHIFT];
var RadioGroup = /* @__PURE__ */ React.forwardRef(function RadioGroup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled: disabledProp,
    readOnly,
    required,
    onValueChange: onValueChangeProp,
    value: externalValue,
    defaultValue,
    form,
    name: nameProp,
    inputRef: inputRefProp,
    id: idProp,
    style,
    ...elementProps
  } = componentProps;
  const {
    setTouched: setFieldTouched,
    setFocused,
    shouldValidateOnChange,
    validationMode,
    name: fieldName,
    disabled: fieldDisabled,
    state: fieldState,
    validation,
    setDirty,
    setFilled,
    validityData
  } = useFieldRootContext();
  const {
    labelId
  } = useLabelableContext();
  const {
    clearErrors
  } = useFormContext();
  const fieldsetContext = useFieldsetRootContext(true);
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const id = useBaseUiId(idProp);
  const [checkedValue, setCheckedValueUnwrapped] = useControlled({
    controlled: externalValue,
    default: defaultValue,
    name: "RadioGroup",
    state: "value"
  });
  const onValueChange = useStableCallback(onValueChangeProp);
  const setCheckedValue = useStableCallback((value, eventDetails) => {
    onValueChange(value, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setCheckedValueUnwrapped(value);
  });
  const controlRef = React.useRef(null);
  const groupInputRef = React.useRef(null);
  const firstEnabledInputRef = React.useRef(null);
  function setInputRef(hiddenInput) {
    let cleanup = undefined;
    if (inputRefProp) {
      if (typeof inputRefProp === "function") {
        cleanup = inputRefProp(hiddenInput);
      } else {
        inputRefProp.current = hiddenInput;
      }
    }
    groupInputRef.current = hiddenInput;
    validation.inputRef.current = hiddenInput;
    return cleanup;
  }
  const registerControlRef = useStableCallback((element, isDisabled = false) => {
    if (!element) {
      return;
    }
    if (isDisabled) {
      if (controlRef.current === element) {
        controlRef.current = null;
      }
      return;
    }
    if (controlRef.current == null) {
      controlRef.current = element;
    }
  });
  const registerInputRef = useStableCallback((input) => {
    if (!input || input.disabled) {
      return;
    }
    if (!firstEnabledInputRef.current) {
      firstEnabledInputRef.current = input;
    }
    const currentInput = groupInputRef.current;
    if (input.checked || currentInput == null || currentInput.disabled) {
      return setInputRef(input);
    }
    return;
  });
  const getFieldValue = useStableCallback(() => checkedValue ?? null);
  useRegisterFieldControl(controlRef, {
    id,
    value: checkedValue,
    getValue: getFieldValue
  });
  useValueChanged(checkedValue, () => {
    clearErrors(name);
    setDirty(checkedValue !== validityData.initialValue);
    setFilled(checkedValue != null);
    if (shouldValidateOnChange()) {
      validation.commit(checkedValue);
    } else {
      validation.commit(checkedValue, true);
    }
    const fallbackInput = firstEnabledInputRef.current;
    if (checkedValue == null && fallbackInput && !fallbackInput.disabled) {
      setInputRef(fallbackInput);
    }
  });
  const [touched, setTouched] = React.useState(false);
  const ariaLabelledby = elementProps["aria-labelledby"] ?? labelId ?? fieldsetContext?.legendId;
  const state = {
    ...fieldState,
    disabled: disabled ?? false,
    required: required ?? false,
    readOnly: readOnly ?? false
  };
  const contextValue = React.useMemo(() => ({
    ...fieldState,
    checkedValue,
    disabled,
    form,
    validation,
    name,
    onValueChange,
    readOnly,
    registerControlRef,
    registerInputRef,
    required,
    setCheckedValue,
    setTouched,
    touched
  }), [checkedValue, disabled, form, validation, fieldState, name, onValueChange, readOnly, registerControlRef, registerInputRef, required, setCheckedValue, setTouched, touched]);
  const defaultProps = {
    role: "radiogroup",
    "aria-required": required || undefined,
    "aria-disabled": disabled || undefined,
    "aria-readonly": readOnly || undefined,
    "aria-labelledby": ariaLabelledby,
    onFocus() {
      setFocused(true);
    },
    onBlur(event) {
      if (!contains(event.currentTarget, event.relatedTarget)) {
        setFieldTouched(true);
        setFocused(false);
        if (validationMode === "onBlur") {
          validation.commit(checkedValue);
        }
      }
    },
    onKeyDownCapture(event) {
      if (event.key.startsWith("Arrow")) {
        setFieldTouched(true);
        setTouched(true);
        setFocused(true);
      }
    }
  };
  return /* @__PURE__ */ _jsx(RadioGroupContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ _jsx(CompositeRoot, {
      render,
      className,
      style,
      state,
      props: [defaultProps, validation.getValidationProps, elementProps],
      refs: [forwardedRef],
      stateAttributesMapping: fieldValidityMapping,
      enableHomeAndEndKeys: false,
      modifierKeys: MODIFIER_KEYS
    })
  });
});
if (true)
  RadioGroup.displayName = "RadioGroup";
export {
  RadioGroup
};
