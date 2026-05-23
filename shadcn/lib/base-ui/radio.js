/* @base-ui/react 1.4.1 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  useRadioGroupContext
} from "./_chunk-3f31ka8n.js";
import {
  serializeValue
} from "./_chunk-xxhqanfd.js";
import {
  useLabelableId
} from "./_chunk-k4mc2kan.js";
import {
  ACTIVE_COMPOSITE_ITEM
} from "./_chunk-r0vsdknk.js";
import {
  useAriaLabelledBy
} from "./_chunk-a8fwg9d0.js";
import {
  useFieldItemContext
} from "./_chunk-qgzhcjsj.js";
import {
  fieldValidityMapping,
  useFieldRootContext,
  useLabelableContext
} from "./_chunk-kfz96xv1.js";
import"./_chunk-ds8fnpjj.js";
import {
  CompositeItem
} from "./_chunk-j0eqdjta.js";
import"./_chunk-b5jsqt97.js";
import"./_chunk-ek863ta9.js";
import"./_chunk-20rtfsz9.js";
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
  transitionStatusMapping,
  useOpenChangeComplete,
  useTransitionStatus
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
  EMPTY_OBJECT,
  NOOP,
  useMergedRefs,
  useRenderElement
} from "./_chunk-1s41sngz.js";
import {
  __export
} from "./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/radio/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  Root: () => RadioRoot,
  Indicator: () => RadioIndicator
});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/radio/root/RadioRoot.js
import * as React2 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/radio/root/RadioRootDataAttributes.js
var RadioRootDataAttributes = /* @__PURE__ */ function(RadioRootDataAttributes2) {
  RadioRootDataAttributes2["checked"] = "data-checked";
  RadioRootDataAttributes2["unchecked"] = "data-unchecked";
  RadioRootDataAttributes2["disabled"] = "data-disabled";
  RadioRootDataAttributes2["readonly"] = "data-readonly";
  RadioRootDataAttributes2["required"] = "data-required";
  RadioRootDataAttributes2["valid"] = "data-valid";
  RadioRootDataAttributes2["invalid"] = "data-invalid";
  RadioRootDataAttributes2["touched"] = "data-touched";
  RadioRootDataAttributes2["dirty"] = "data-dirty";
  RadioRootDataAttributes2["filled"] = "data-filled";
  RadioRootDataAttributes2["focused"] = "data-focused";
  return RadioRootDataAttributes2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/radio/utils/stateAttributesMapping.js
var stateAttributesMapping = {
  checked(value) {
    if (value) {
      return {
        [RadioRootDataAttributes.checked]: ""
      };
    }
    return {
      [RadioRootDataAttributes.unchecked]: ""
    };
  },
  ...transitionStatusMapping,
  ...fieldValidityMapping
};

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/radio/root/RadioRootContext.js
import * as React from "react";
"use client";
var RadioRootContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  RadioRootContext.displayName = "RadioRootContext";
function useRadioRootContext() {
  const value = React.useContext(RadioRootContext);
  if (value === undefined) {
    throw new Error("Base UI: RadioRootContext is missing. Radio parts must be placed within <Radio.Root>.");
  }
  return value;
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/radio/root/RadioRoot.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
"use client";
var RadioRoot = /* @__PURE__ */ React2.forwardRef(function RadioRoot2(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled: disabledProp = false,
    readOnly: readOnlyProp = false,
    required: requiredProp = false,
    "aria-labelledby": ariaLabelledByProp,
    value,
    inputRef: inputRefProp,
    nativeButton = false,
    id: idProp,
    style,
    ...elementProps
  } = componentProps;
  const groupContext = useRadioGroupContext();
  const {
    disabled: disabledGroup,
    readOnly: readOnlyGroup,
    required: requiredGroup,
    form: formGroup,
    checkedValue,
    touched = false,
    validation,
    name
  } = groupContext ?? {};
  const setCheckedValue = groupContext?.setCheckedValue ?? NOOP;
  const setTouched = groupContext?.setTouched ?? NOOP;
  const registerControlRef = groupContext?.registerControlRef ?? NOOP;
  const registerInputRef = groupContext?.registerInputRef ?? NOOP;
  const {
    setDirty,
    validityData,
    setTouched: setFieldTouched,
    setFilled,
    state: fieldState,
    disabled: fieldDisabled
  } = useFieldRootContext();
  const fieldItemContext = useFieldItemContext();
  const {
    labelId,
    getDescriptionProps
  } = useLabelableContext();
  const disabled = fieldDisabled || fieldItemContext.disabled || disabledGroup || disabledProp;
  const readOnly = readOnlyGroup || readOnlyProp;
  const required = requiredGroup || requiredProp;
  const form = formGroup;
  const checked = groupContext ? checkedValue === value : value === "";
  const serializedValue = React2.useMemo(() => serializeValue(value), [value]);
  const radioRef = React2.useRef(null);
  const inputRef = React2.useRef(null);
  const handleControlRef = useStableCallback((element2) => {
    if (!element2) {
      return;
    }
    registerControlRef(element2, disabled);
  });
  const mergedInputRef = useMergedRefs(inputRefProp, inputRef, registerInputRef);
  useIsoLayoutEffect(() => {
    if (inputRef.current?.checked) {
      setFilled(true);
    }
  }, [setFilled]);
  useIsoLayoutEffect(() => {
    if (!inputRef.current) {
      return;
    }
    if (disabled && checked) {
      registerInputRef(null);
      return;
    }
    if (radioRef.current) {
      registerControlRef(radioRef.current, disabled);
    }
    registerInputRef(inputRef.current);
  }, [checked, disabled, registerControlRef, registerInputRef]);
  const id = useBaseUiId();
  const inputId = useLabelableId({
    id: idProp,
    implicit: false,
    controlRef: radioRef
  });
  const hiddenInputId = nativeButton ? undefined : inputId;
  const ariaLabelledBy = useAriaLabelledBy(ariaLabelledByProp, labelId, inputRef, !nativeButton, hiddenInputId);
  const rootProps = {
    role: "radio",
    "aria-checked": checked,
    "aria-required": required || undefined,
    "aria-readonly": readOnly || undefined,
    "aria-labelledby": ariaLabelledBy,
    [ACTIVE_COMPOSITE_ITEM]: checked ? "" : undefined,
    id: nativeButton ? inputId : id,
    onKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    },
    onClick(event) {
      if (event.defaultPrevented || disabled || readOnly) {
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
    },
    onFocus(event) {
      if (event.defaultPrevented || disabled || readOnly || !touched) {
        return;
      }
      inputRef.current?.click();
      setTouched(false);
    }
  };
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const inputProps = {
    type: "radio",
    ref: mergedInputRef,
    form,
    id: hiddenInputId,
    name,
    tabIndex: -1,
    style: name ? visuallyHiddenInput : visuallyHidden,
    "aria-hidden": true,
    ...value !== undefined ? {
      value: serializedValue
    } : EMPTY_OBJECT,
    disabled,
    checked,
    required,
    readOnly,
    onChange(event) {
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      if (disabled || readOnly || value === undefined) {
        return;
      }
      const details = createChangeEventDetails(exports_reason_parts.none, event.nativeEvent);
      if (details.isCanceled) {
        return;
      }
      setFieldTouched(true);
      setDirty(value !== validityData.initialValue);
      setFilled(true);
      setCheckedValue(value, details);
    },
    onFocus() {
      radioRef.current?.focus();
    }
  };
  const state = React2.useMemo(() => ({
    ...fieldState,
    required,
    disabled,
    readOnly,
    checked
  }), [fieldState, disabled, readOnly, checked, required]);
  const contextValue = state;
  const isRadioGroup = groupContext !== undefined;
  const refs = [forwardedRef, radioRef, buttonRef, handleControlRef];
  const props = [rootProps, getDescriptionProps, validation?.getValidationProps ?? EMPTY_OBJECT, elementProps, getButtonProps];
  const element = useRenderElement("span", componentProps, {
    enabled: !isRadioGroup,
    state,
    ref: refs,
    props,
    stateAttributesMapping
  });
  return /* @__PURE__ */ _jsxs(RadioRootContext.Provider, {
    value: contextValue,
    children: [isRadioGroup ? /* @__PURE__ */ _jsx(CompositeItem, {
      tag: "span",
      render,
      className,
      style,
      state,
      refs,
      props,
      stateAttributesMapping
    }) : element, /* @__PURE__ */ _jsx("input", {
      ...inputProps,
      suppressHydrationWarning: true
    })]
  });
});
if (true)
  RadioRoot.displayName = "RadioRoot";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/radio/indicator/RadioIndicator.js
import * as React3 from "react";
"use client";
var RadioIndicator = /* @__PURE__ */ React3.forwardRef(function RadioIndicator2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    keepMounted = false,
    ...elementProps
  } = componentProps;
  const rootState = useRadioRootContext();
  const rendered = rootState.checked;
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(rendered);
  const state = {
    ...rootState,
    transitionStatus
  };
  const indicatorRef = React3.useRef(null);
  const shouldRender = keepMounted || mounted;
  const element = useRenderElement("span", componentProps, {
    ref: [forwardedRef, indicatorRef],
    state,
    props: elementProps,
    stateAttributesMapping
  });
  useOpenChangeComplete({
    open: rendered,
    ref: indicatorRef,
    onComplete() {
      if (!rendered) {
        setMounted(false);
      }
    }
  });
  if (!shouldRender) {
    return null;
  }
  return element;
});
if (true)
  RadioIndicator.displayName = "RadioIndicator";
export {
  exports_index_parts as Radio
};
